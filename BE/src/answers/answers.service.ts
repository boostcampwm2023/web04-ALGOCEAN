import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { PrismaService } from '../prisma.service';
import { AdoptAnswerDto } from './dto/adopt-answer.dto';

@Injectable()
export class AnswersService {
  constructor(private prisma: PrismaService) {}
  async create(createAnswerDto: CreateAnswerDto) {
    const { content, videoLink } = createAnswerDto;
    return this.prisma.answer.create({
      data: {
        Content: content,
        VideoLink: videoLink,
        UserId: 1, // TODO: get user id from request
      },
    });
  }

  async adopt(adoptAnswerDto: AdoptAnswerDto) {
    const { answerId } = adoptAnswerDto;
    await this.prisma.$transaction(async (prisma) => {
      //TODO: check if user is the owner of the question

      const adoptedAnswer = await prisma.answer.findUnique({
        where: { Id: answerId },
        include: { Question: true },
      });

      if (!adoptedAnswer) {
        throw new Error('Answer not found. Rolling back transaction.');
      }

      if (adoptedAnswer.Question.IsAdopted) {
        throw new Error('Question already adopted. Rolling back transaction.');
      }

      await prisma.answer.update({
        where: { Id: answerId },
        data: { IsAdopted: true },
      });

      if (adoptedAnswer.Question) {
        await prisma.question.update({
          where: { Id: adoptedAnswer.Question.Id },
          data: { IsAdopted: true },
        });
      } else {
        throw new Error('Question not matched. Rolling back transaction.');
      }

      await prisma.user.update({
        where: { Id: adoptedAnswer.UserId },
        data: { Points: { increment: 1 } },
      });

      await prisma.user.update({
        where: { Id: adoptedAnswer.Question.UserId },
        data: { Points: { increment: 1 } },
      });
    });
  }
}

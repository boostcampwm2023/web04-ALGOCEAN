import { HttpException, Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { PrismaService } from '../prisma.service';
import { AdoptAnswerDto } from './dto/adopt-answer.dto';

@Injectable()
export class AnswersService {
  constructor(private prisma: PrismaService) {}
  async create(createAnswerDto: CreateAnswerDto) {
    const { questionId, content, videoLink } = createAnswerDto;
    return this.prisma.answer.create({
      data: {
        QuestionId: questionId,
        Content: content,
        VideoLink: videoLink,
        UserId: 1, // TODO: get user id from request
      },
    });
  }

  async findAllByQuestionId(questionId: string) {
    try {
      const questionIdAsNumber = parseInt(questionId, 10);
      return this.prisma.answer.findMany({
        where: { QuestionId: questionIdAsNumber, DeletedAt: null },
        select: {
          Id: true,
          User: {
            select: {
              Id: true,
              Nickname: true,
              ProfileImage: true,
            },
          },
          Content: true,
          VideoLink: true,
          IsAdopted: true,
          CreatedAt: true,
        },
      });
    } catch (e) {
      throw new HttpException('Answers not found', 404);
    }
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

  async findAllByUserId(userId: number) {
    const answerList = await this.prisma.answer.findMany({
      where: { UserId: userId, DeletedAt: null },
      select: {
        Question: {
          select: {
            Id: true,
            Title: true,
          },
        },
        Content: true,
        IsAdopted: true,
        CreatedAt: true,
      },
      orderBy: { CreatedAt: 'desc' },
      take: 3,
    });

    return answerList.map((answer) => {
      return {
        id: answer.Question.Id,
        title: answer.Question.Title,
        content: answer.Content,
        isAdopted: answer.IsAdopted,
        createdAt: answer.CreatedAt,
      };
    });
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        UserId: userId,
        DeletedAt: null,
      },
      select: { Id: true },
    });
    // 답변 갯수, 채택된 답변 갯수, 답변채택률, 최근 답변 최대 3개 반환
    const answerCount = await this.prisma.question.count({
      where: {
        UserId: user.Id,
        DeletedAt: null,
      },
    });

    const adoptedAnswerCount = await this.prisma.answer.count({
      where: {
        UserId: user.Id,
        IsAdopted: true,
        DeletedAt: null,
      },
    });

    const adoptionRate =
      answerCount === 0
        ? 0
        : Math.round((adoptedAnswerCount / answerCount) * 100);

    const recentAnswers = await this.prisma.answer.findMany({
      where: {
        UserId: parseInt(userId, 10),
        DeletedAt: null,
      },
      select: {
        Id: true,
        Question: {
          select: {
            Id: true,
            Title: true,
          },
        },
        Content: true,
        IsAdopted: true,
        CreatedAt: true,
      },
      orderBy: { CreatedAt: 'desc' },
      take: 3,
    });

    const likes = await this.prisma.answer.aggregate({
      where: {
        UserId: user.Id,
        DeletedAt: null,
      },
      _sum: { LikeCount: true },
    });

    return {
      answerCount,
      adoptedAnswerCount,
      adoptionRate,
      likes: likes._sum.LikeCount,
      recentAnswers: recentAnswers.map((answer) => ({
        id: answer.Id,
        questionId: answer.Question.Id,
        questionTitle: answer.Question.Title,
        content: answer.Content,
        isAdopted: answer.IsAdopted,
        createdAt: answer.CreatedAt,
      })),
    };
  }
}

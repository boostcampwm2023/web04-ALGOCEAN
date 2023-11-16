import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ReadQuestionDto } from './dto/read-question.dto';

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

  async readOneQuestion(id: number): Promise<ReadQuestionDto> {
    const question = await this.prisma.question.findUnique({
      where: {
        Id: id,
      },
      include: {
        User: {
          select: {
            Nickname: true,
            LikeInfo: {
              where: {
                LikedEntityId: id,
              },
            },
          },
        },
      },
    });

    return {
      id: question.Id,
      title: question.Title,
      nickname: question.User.Nickname,
      tag: question.Tag,
      createdAt: question.CreatedAt,
      programmingLanguage: question.ProgrammingLanguage,
      isAdopted: question.IsAdopted,
      viewCount: question.ViewCount,
      likeCount: question.LikeCount,
      isLiked: question.User.LikeInfo[0]?.IsLiked || false,
    };
  }

  async deleteOneQuestion(id: number, userId: number): Promise<boolean> {
    const question = await this.prisma.question.findUnique({
      where: {
        Id: id,
        IsAdopted: false,
      },
      include: {
        User: {
          select: {
            Id: true,
          },
        },
      },
    });

    if (!question) {
      return false;
    }

    if (question.User.Id !== userId) {
      throw new Error('User is not the owner of the question');
    }

    await this.prisma.question.delete({
      where: {
        Id: id,
      },
    });

    return true;
  }
}

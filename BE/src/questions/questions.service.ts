import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ReadQuestionDto } from './dto/read-question.dto';
import { CreateQuestionDto } from './dto/create-question.dto';

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

  // TODO: Implement logic to associate the question with the user by including the user id
  async createOneQuestion(
    createQuestionDto: CreateQuestionDto,
    userId: number,
  ): Promise<number> {
    try {
      const question = await this.prisma.question.create({
        data: {
          User: {
            connect: {
              Id: userId,
            },
          },
          Title: createQuestionDto.title,
          Content: createQuestionDto.content,
          Tag: createQuestionDto.tag,
          ProgrammingLanguage: createQuestionDto.programmingLanguage,
          OriginalLink: createQuestionDto.originalLink,
        },
      });
      return question.Id;
    } catch (error) {
      throw new Error('Failed to create question');
    }
  }

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

  // TODO: check if user is owner of the question
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

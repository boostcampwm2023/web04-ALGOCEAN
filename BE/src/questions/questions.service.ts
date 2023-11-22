import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ReadQuestionDto } from './dto/read-question.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { ReadQuestionListDto } from './dto/read-question-list.dto';

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

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

  async deleteOneQuestion(id: number, userId: number): Promise<boolean> {
    try {
      await this.prisma.question.update({
        where: {
          Id: id,
          UserId: userId,
          IsAdopted: false,
          DeletedAt: null,
        },
        data: {
          DeletedAt: new Date(),
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async readQuestionList(page: number): Promise<ReadQuestionListDto[]> {
    const pageSize = 10; // 한 페이지당 질문 개수는 10개
    const skip = (page - 1) * pageSize;

    const questions = await this.prisma.question.findMany({
      skip,
      take: pageSize,
      include: {
        User: {
          select: {
            Nickname: true,
          },
        },
      },
    });

    return questions.map((question) => ({
      id: question.Id,
      title: question.Title,
      nickname: question.User.Nickname,
      tag: question.Tag,
      createdAt: question.CreatedAt,
      programmingLanguage: question.ProgrammingLanguage,
      isAdopted: question.IsAdopted,
      viewCount: question.ViewCount,
      likeCount: question.LikeCount,
    }));
  }

  async findQuestionByTitle(
    title: string,
    page: number,
  ): Promise<ReadQuestionListDto[]> {
    try {
      const pageSize = 10;
      const skip = (page - 1) * pageSize;
      const questions = await this.prisma.question.findMany({
        where: {
          Title: {
            contains: title,
          },
        },
        select: {
          Id: true,
          Title: true,
          Tag: true,
          CreatedAt: true,
          ProgrammingLanguage: true,
          IsAdopted: true,
          ViewCount: true,
          LikeCount: true,
          User: {
            select: {
              Nickname: true,
            },
          },
        },
        skip,
        take: pageSize,
      });
      return questions.map((question) => ({
        id: question.Id,
        title: question.Title,
        nickname: question.User?.Nickname,
        tag: question.Tag,
        createdAt: question.CreatedAt,
        programmingLanguage: question.ProgrammingLanguage,
        isAdopted: question.IsAdopted,
        viewCount: question.ViewCount,
        likeCount: question.LikeCount,
      }));
    } catch (error) {
      throw new Error('Failed to find question by title');
    }
  }

  async updateOneQuestion(id: number, userId: number, updateQuestionDto) {
    try {
      await this.prisma.question.update({
        where: {
          Id: id,
          UserId: userId,
          IsAdopted: false,
          DeletedAt: null,
        },
        data: {
          Title: updateQuestionDto.title,
          Content: updateQuestionDto.content,
          Tag: updateQuestionDto.tag,
          ProgrammingLanguage: updateQuestionDto.programmingLanguage,
          OriginalLink: updateQuestionDto.originalLink,
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}

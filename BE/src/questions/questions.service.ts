import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ReadQuestionDto } from './dto/read-question.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { ReadQuestionListDto } from './dto/read-question-list.dto';
import { QuestionListOptionsDto } from './dto/read-question-list-options.dto';
import { UpdateQuestionDraftDto } from './dto/update-question-draft.dto';

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

  async createOneQuestion(
    createQuestionDto: CreateQuestionDto,
    userId: number,
  ): Promise<number> {
    try {
      const question = this.prisma.question.create({
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

      const updatePoint = this.prisma.user.update({
        where: {
          Id: userId,
        },
        data: {
          Points: {
            increment: 10,
          },
        },
      });

      const updatePointHistory = this.prisma.point_History.create({
        data: {
          User: {
            connect: {
              Id: userId,
            },
          },
          PointChange: 10,
          Reason: 'create question',
        },
      });

      const deleteDraft = this.prisma.question_Temporary.delete({
        where: {
          Id: createQuestionDto.draftId,
        },
      });

      const queryResult = await this.prisma.$transaction([
        question,
        updatePoint,
        updatePointHistory,
        deleteDraft,
      ]);

      return queryResult[0].Id;
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

  async readQuestionList(
    options: QuestionListOptionsDto,
  ): Promise<ReadQuestionListDto[]> {
    const {
      tag,
      programmingLanguage,
      isAdopted,
      sortByCreatedAt,
      sortByViewCount,
      sortByLikeCount,
      page,
    } = options;

    const pageSize = 10;

    const whereConditions = [
      tag && { Tag: tag },
      programmingLanguage && { ProgrammingLanguage: programmingLanguage },
      isAdopted && { IsAdopted: isAdopted },
    ].filter(Boolean);

    const orderByConditions = [
      sortByCreatedAt && { CreatedAt: sortByCreatedAt },
      sortByViewCount && { ViewCount: sortByViewCount },
      sortByLikeCount && { LikeCount: sortByLikeCount },
    ].filter(Boolean);

    const questions = await this.prisma.question.findMany({
      where: {
        OR: whereConditions.length > 0 ? whereConditions : undefined,
      },
      orderBy: orderByConditions,
      select: {
        Id: true,
        Title: true,
        User: {
          select: {
            Nickname: true,
          },
        },
        Tag: true,
        CreatedAt: true,
        ProgrammingLanguage: true,
        IsAdopted: true,
        ViewCount: true,
        LikeCount: true,
      },
      take: pageSize,
      skip: (page - 1) * pageSize,
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

  async createOneQuestionDraft(userId: number): Promise<number> {
    try {
      const draft = await this.prisma.question_Temporary.create({
        data: {
          User: {
            connect: {
              Id: userId,
            },
          },
        },
      });
      return draft.Id;
    } catch (error) {
      throw new Error('Failed to create question draft');
    }
  }

  async updateOneQuestionDraft(
    id: number,
    userId: number,
    updateQuestionDraftDto: UpdateQuestionDraftDto,
  ): Promise<void> {
    try {
      await this.prisma.question_Temporary.update({
        where: {
          Id: id,
          UserId: userId,
        },
        data: {
          Title: updateQuestionDraftDto.title,
          Content: updateQuestionDraftDto.content,
          Tag: updateQuestionDraftDto.tag,
          ProgrammingLanguage: updateQuestionDraftDto.programmingLanguage,
          OriginalLink: updateQuestionDraftDto.originalLink,
        },
      });
    } catch (error) {
      throw new Error('Failed to update question draft');
    }
  }

  async deleteOneQuestionDraft(id: number, userId: number): Promise<void> {
    try {
      await this.prisma.question_Temporary.delete({
        where: {
          Id: id,
          UserId: userId,
        },
      });
    } catch (error) {
      throw new Error('Failed to delete question draft');
    }
  }
}

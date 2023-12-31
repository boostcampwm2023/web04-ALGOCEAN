import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ReadQuestionDto } from './dto/read-question.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { ReadQuestionListDto } from './dto/read-question-list.dto';
import { QuestionListOptionsDto } from './dto/read-question-list-options.dto';
import { UpdateQuestionDraftDto } from './dto/update-question-draft.dto';
import { ReadQuestionDraftDto } from './dto/read-question-draft.dto';

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
    const readQuestion = this.prisma.question.findUnique({
      where: {
        Id: id,
        DeletedAt: null,
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

    const updateViewCount = this.prisma.question.update({
      where: {
        Id: id,
      },
      data: {
        ViewCount: {
          increment: 1,
        },
      },
    });

    const queryResult = await this.prisma.$transaction([
      readQuestion,
      updateViewCount,
    ]);

    this.logView(id);

    const question = queryResult[0];

    return {
      id: question.Id,
      title: question.Title,
      nickname: question.User.Nickname,
      content: question.Content,
      tag: question.Tag,
      createdAt: question.CreatedAt,
      programmingLanguage: question.ProgrammingLanguage,
      originalLink: question.OriginalLink,
      isAdopted: question.IsAdopted,
      viewCount: question.ViewCount,
      likeCount: question.LikeCount,
      isLiked: question.User.LikeInfo[0]?.IsLiked || false,
    };
  }

  async logView(questionId: number): Promise<void> {
    await this.prisma.viewLog.create({
      data: {
        QuestionId: questionId,
      },
    });
  }

  async getTrendingQuestion() {
    const thirtyMinutesAgo = new Date();
    thirtyMinutesAgo.setMinutes(thirtyMinutesAgo.getMinutes() - 30);

    const mostViewedQuestion = await this.prisma.viewLog.groupBy({
      by: ['QuestionId'],
      _count: {
        QuestionId: true,
      },
      where: {
        CreatedAt: {
          gte: thirtyMinutesAgo,
        },
      },
      orderBy: {
        _count: {
          QuestionId: 'desc',
        },
      },
      take: 1,
    });

    if (mostViewedQuestion.length === 0) {
      const lastQuestion = await this.prisma.question.findFirst({
        where: {
          DeletedAt: null,
        },
        orderBy: {
          CreatedAt: 'desc',
        },
        select: {
          Id: true,
          Title: true,
        },
      });
      return {
        id: lastQuestion.Id,
        title: lastQuestion.Title,
      };
    }

    const questionId = mostViewedQuestion[0].QuestionId;

    const question = await this.prisma.question.findUnique({
      where: {
        Id: questionId,
      },
      select: {
        Id: true,
        Title: true,
      },
    });
    return {
      id: question.Id,
      title: question.Title,
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
  ): Promise<{ questions: ReadQuestionListDto[]; totalQuestions: number }> {
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
        DeletedAt: null,
        Title: options.title
          ? {
              contains: options.title,
            }
          : undefined,
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

    const total = await this.prisma.question.count({
      where: {
        OR: whereConditions.length > 0 ? whereConditions : undefined,
        DeletedAt: null,
        Title: options.title
          ? {
              contains: options.title,
            }
          : undefined,
      },
    });

    return {
      questions: questions.map((question) => ({
        id: question.Id,
        title: question.Title,
        nickname: question.User.Nickname,
        tag: question.Tag,
        createdAt: question.CreatedAt,
        programmingLanguage: question.ProgrammingLanguage,
        isAdopted: question.IsAdopted,
        viewCount: question.ViewCount,
        likeCount: question.LikeCount,
      })),
      totalQuestions: total,
    };
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
          DeletedAt: null,
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

  async getRandomQuestion() {
    try {
      const totalRows = await this.prisma.question.count({
        where: {
          DeletedAt: null,
        },
      });
      const randomIndex = Math.floor(Math.random() * totalRows);

      const randomQuestion = await this.prisma.question.findFirst({
        select: {
          Id: true,
          Title: true,
        },
        where: {
          DeletedAt: null,
        },
        skip: randomIndex,
      });

      return {
        id: randomQuestion.Id,
        title: randomQuestion.Title,
      };
    } catch (error) {
      throw new Error('Failed to get a random question id');
    }
  }

  async createOneQuestionDraft(userId: number): Promise<number> {
    try {
      const existingDraft = await this.prisma.question_Temporary.findFirst({
        where: {
          UserId: userId,
        },
      });

      if (existingDraft) {
        return existingDraft.Id;
      }

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

  async readOneQuestionDraft(userId: number): Promise<ReadQuestionDraftDto> {
    try {
      const draft = await this.prisma.question_Temporary.findFirstOrThrow({
        where: {
          UserId: userId,
        },
      });
      return {
        title: draft?.Title,
        content: draft?.Content,
        tag: draft?.Tag,
        programmingLanguage: draft?.ProgrammingLanguage,
        originalLink: draft?.OriginalLink,
      };
    } catch (error) {
      throw new Error('Failed to read question draft');
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

  async getTodayQuestion() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const question = await this.prisma.question.findFirst({
      where: {
        CreatedAt: {
          gte: today,
          lt: tomorrow,
        },
        DeletedAt: null,
      },
      orderBy: {
        ViewCount: 'desc',
      },
      select: {
        Id: true,
        Title: true,
      },
    });

    if (!question) {
      const lastQuestion = await this.prisma.question.findFirst({
        where: {
          DeletedAt: null,
        },
        orderBy: {
          CreatedAt: 'desc',
        },
        select: {
          Id: true,
          Title: true,
        },
      });
      return {
        id: lastQuestion.Id,
        title: lastQuestion.Title,
      };
    }

    return {
      id: question.Id,
      title: question.Title,
    };
  }

  async findAllByUserId(userId: number) {
    try {
      return this.prisma.question.findMany({
        where: {
          UserId: userId,
          DeletedAt: null,
        },
        orderBy: {
          CreatedAt: 'desc',
        },
        select: {
          Id: true,
          Title: true,
          CreatedAt: true,
          Tag: true,
          ProgrammingLanguage: true,
          IsAdopted: true,
          ViewCount: true,
          LikeCount: true,
        },
        take: 3,
      });
    } catch (error) {
      throw new Error('Failed to find all by user id');
    }
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { UserId: userId, DeletedAt: null },
      select: { Id: true },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const questionCount = await this.prisma.question.count({
      where: {
        UserId: user.Id,
        DeletedAt: null,
      },
    });

    const answeredQuestionCount = await this.prisma.question.count({
      where: {
        UserId: user.Id,
        Answer: { some: {} },
        DeletedAt: null,
      },
    });

    const adoptedQuestionCount = await this.prisma.question.count({
      where: {
        UserId: user.Id,
        IsAdopted: true,
        DeletedAt: null,
      },
    });

    // 답변 받은 질문 중 채택 완료한 질문의 퍼센트
    const adoptionRate =
      answeredQuestionCount === 0
        ? 0
        : Math.floor((adoptedQuestionCount / answeredQuestionCount) * 100);

    const questions = await this.prisma.question.findMany({
      where: {
        UserId: user.Id,
        DeletedAt: null,
      },
      select: {
        Id: true,
        Title: true,
        CreatedAt: true,
        Tag: true,
        ProgrammingLanguage: true,
        IsAdopted: true,
        ViewCount: true,
        LikeCount: true,
      },
      orderBy: { CreatedAt: 'desc' },
      take: 3,
    });

    // 질문에 받은 좋아요의 합
    const likes = await this.prisma.question.aggregate({
      where: {
        UserId: user.Id,
        DeletedAt: null,
      },
      _sum: { LikeCount: true },
    });

    return {
      questionCount,
      answeredQuestionCount,
      adoptionRate,
      likes: likes._sum.LikeCount,
      recentQuestions: questions.map((question) => ({
        id: question.Id,
        title: question.Title,
        createdAt: question.CreatedAt,
        tag: question.Tag,
        programmingLanguage: question.ProgrammingLanguage,
        isAdopted: question.IsAdopted,
        viewCount: question.ViewCount,
        likeCount: question.LikeCount,
      })),
    };
  }
}

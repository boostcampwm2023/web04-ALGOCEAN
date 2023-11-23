import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ReadQuestionDto } from './dto/read-question.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { ReadQuestionListDto } from './dto/read-question-list.dto';
import { QuestionListOptionsDto } from './dto/read-question-list-options.dto';

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

  async getRandomQuestion(): Promise<ReadQuestionDto> {
    try {
      const randomQuestion = await this.prisma.$queryRaw`
      SELECT
        Q.Id,
        Q.Title,
        Q.Tag,
        Q.ProgrammingLanguage,
        Q.IsAdopted,
        Q.CreatedAt,
        Q.ViewCount,
        Q.LikeCount,
        U.Nickname,
        LI.IsLiked
      FROM
        Question Q
      JOIN
        User U ON Q.UserId = U.Id
      LEFT JOIN
        LikeInfo LI ON LI.LikedEntityId = Q.Id AND LI.UserId = U.Id
      ORDER BY
        RAND()
      LIMIT 1;
    `;

      await this.prisma.question.update({
        where: {
          Id: randomQuestion[0].Id,
        },
        data: {
          ViewCount: {
            increment: 1,
          },
        },
      });

      return {
        id: randomQuestion[0].Id,
        title: randomQuestion[0].Title,
        nickname: randomQuestion[0].Nickname,
        tag: randomQuestion[0].Tag,
        createdAt: randomQuestion[0].CreatedAt,
        programmingLanguage: randomQuestion[0].ProgrammingLanguage,
        isAdopted: randomQuestion[0].IsAdopted,
        viewCount: randomQuestion[0].ViewCount,
        likeCount: randomQuestion[0].LikeCount,
        isLiked: randomQuestion[0].IsLiked || false,
      };
    } catch (error) {
      throw new Error('Failed to get a random question');
    }
  }
}

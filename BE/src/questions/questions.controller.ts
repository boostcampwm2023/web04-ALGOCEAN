import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Put,
  Res,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { ReadQuestionListDto } from './dto/read-question-list.dto';
import { QuestionListOptionsDto } from './dto/read-question-list-options.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { UpdateQuestionDraftDto } from './dto/update-question-draft.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('questions')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @ApiOperation({
    summary: '질문 초안 생성',
    description:
      '질문 초안을 생성합니다. 게시글 작성 페이지로 이동할 때 이 API를 반드시 호출해야합니다.',
  })
  // TODO: Use UserGuard to obtain the user ID and associate it with the question
  @Post('drafts')
  async createDraft(@Res() res: Response) {
    try {
      const questionId = await this.questionsService.createOneQuestionDraft(1);

      return res
        .status(HttpStatus.CREATED)
        .json({ message: 'Draft created successfully', id: questionId });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiOperation({
    summary: '질문 초안 읽기',
    description: '질문 초안을 읽어옵니다.',
  })
  @Get('drafts')
  // TODO: Use UserGuard to obtain the user ID and associate it with the question
  async readDraft(@Res() res: Response) {
    try {
      const draft = await this.questionsService.readOneQuestionDraft(1);

      if (!draft) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ error: 'Draft not found' });
      }

      return res.status(HttpStatus.OK).json(draft);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiOperation({
    summary: '질문 초안 수정',
    description: '질문 초안을 수정합니다.',
  })
  // TODO: Use UserGuard to obtain the user ID and associate it with the question
  @Put('drafts/:id')
  async updateDraft(
    @Param('id') id: number,
    @Body() updateQuestionDraftDto: UpdateQuestionDraftDto,
    @Res() res: Response,
  ) {
    try {
      await this.questionsService.updateOneQuestionDraft(
        id,
        1,
        updateQuestionDraftDto,
      );

      return res
        .status(HttpStatus.OK)
        .json({ message: 'Draft updated successfully' });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiOperation({
    summary: '질문 초안 삭제',
    description: '질문 초안을 삭제합니다.',
  })
  // TODO: Use UserGuard to obtain the user ID and associate it with the question
  @Delete('drafts/:id')
  async deleteDraft(@Param('id') id: number, @Res() res: Response) {
    try {
      await this.questionsService.deleteOneQuestionDraft(id, 1);

      return res
        .status(HttpStatus.OK)
        .json({ message: 'Draft deleted successfully' });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('today')
  async readTodayQuestion() {
    try {
      return await this.questionsService.getRandomQuestion();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      if (error.message === 'Failed to get today question id') {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }

      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/random')
  async readRandomQuestion() {
    try {
      return await this.questionsService.getRandomQuestion();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiOperation({
    summary: '급상승 질문 API',
    description: '급상승 질문을 조회합니다.',
  })
  @Get('/trending')
  async getMostViewedQuestion() {
    const trendingQuetion = await this.questionsService.getTrendingQuestion();

    if (!trendingQuetion) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return trendingQuetion;
  }

  @ApiOperation({
    summary: '질문 목록 조회',
    description:
      '질문 목록을 조회합니다.\n 쿼리스트링으로 옵션을 줄 수 있습니다.\n 옵션은 read-question-list-options.dto.ts를 ' +
      '참고해주세요.\n page의 기본값은 1이며 sortByCreatedAt의 기본값은 desc입니다.',
  })
  @Get('lists')
  async getQuestionList(
    @Query() options: QuestionListOptionsDto,
    @Res() res: Response,
  ) {
    try {
      const { questions, totalQuestions } =
        await this.questionsService.readQuestionList(options);
      const totalPage = Math.ceil(totalQuestions / 10);
      return res.status(HttpStatus.OK).json({ questions, totalPage });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Internal server error' });
    }
  }

  @ApiOperation({
    summary: '질문 생성',
    description: '질문을 생성합니다.',
  })

  // TODO: Use UserGuard to obtain the user ID and associate it with the question
  @Post()
  async createQuestion(
    @Body() createQuestionDto: CreateQuestionDto,
    @Res() res: Response,
  ) {
    try {
      const questionId = await this.questionsService.createOneQuestion(
        createQuestionDto,
        1,
      );

      return res
        .status(HttpStatus.CREATED)
        .json({ message: 'Question created successfully', id: questionId });
    } catch (error) {
      if (error.message === 'Failed to create question') {
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ error: 'Internal server error' });
      }

      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Bad request' });
    }
  }

  @ApiOperation({
    summary: '질문 조회',
    description: '질문을 조회합니다.',
  })
  @Get(':id')
  async readOneQuestion(@Param('id') id: number, @Res() res: Response) {
    try {
      const question = await this.questionsService.readOneQuestion(id);

      if (!question) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ error: 'Question not found' });
      }

      return res.status(HttpStatus.OK).json(question);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Internal server error' });
    }
  }

  @ApiOperation({
    summary: '질문 삭제',
    description: '질문을 삭제합니다.',
  })
  // TODO: use UserGuard to check if user is the owner of the question
  @Delete(':id')
  async deleteOneQuestion(@Param('id') id: number, @Res() res: Response) {
    try {
      const isDeleted = await this.questionsService.deleteOneQuestion(id, 1);

      if (isDeleted) {
        return res
          .status(HttpStatus.OK)
          .json({ message: 'Question deleted successfully' });
      } else {
        return res
          .status(HttpStatus.FORBIDDEN)
          .json({ error: 'Question is not able to deleted' });
      }
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Internal server error' });
    }
  }

  @ApiOperation({
    summary: '질문 검색',
    description: '질문을 검색합니다.',
  })
  @Get('finds/:title')
  async getQuestionListByTitle(
    @Param('title') title: string,
    @Query('page', new DefaultValuePipe(1)) page: number,
    @Res() res: Response,
  ) {
    try {
      const questionList: ReadQuestionListDto[] =
        await this.questionsService.findQuestionByTitle(title, page);

      return res.status(HttpStatus.OK).json(questionList);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Internal server error' });
    }
  }

  @ApiOperation({
    summary: '질문 수정',
    description: '질문을 수정합니다.',
  })
  // TODO: use UserGuard to check if user is the owner of the question
  @Put(':id')
  async updateOneQuestion(
    @Param('id') id: number,
    @Body() updateQuestionDto: UpdateQuestionDto,
    @Res() res: Response,
  ) {
    try {
      const isUpdated = await this.questionsService.updateOneQuestion(
        id,
        1,
        updateQuestionDto,
      );

      if (isUpdated) {
        return res
          .status(HttpStatus.OK)
          .json({ message: 'Question updated successfully' });
      } else {
        return res
          .status(HttpStatus.FORBIDDEN)
          .json({ error: 'Question is not able to be modified' });
      }
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Internal server error' });
    }
  }
}

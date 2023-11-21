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
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { ReadQuestionListDto } from './dto/read-question-list.dto';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

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

  @Get('lists/:page')
  async getQuestionList(@Param('page') page: number, @Res() res: Response) {
    try {
      const questionList: ReadQuestionListDto[] =
        await this.questionsService.readQuestionList(page);
      if (questionList.length === 0) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ error: 'No questions found' });
      }

      return res.status(HttpStatus.OK).json(questionList);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Internal server error' });
    }
  }

  @Get('finds/:title')
  async getQuestionListByTitle(
    @Param('title') title: string,
    @Query('page', new DefaultValuePipe(1)) page: number,
    @Res() res: Response,
  ) {
    console.log(page);
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
}

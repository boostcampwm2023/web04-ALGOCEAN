import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Res,
  Param,
  HttpException,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { AdoptAnswerDto } from './dto/adopt-answer.dto';
import { Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('answers')
@Controller('answers')
export class AnswersController {
  constructor(
    private readonly answersService: AnswersService,
    private readonly usersService: UsersService,
  ) {}

  @ApiOperation({
    summary: '답변 생성',
    description: '답변을 생성합니다.',
  })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Body() createAnswerDto: CreateAnswerDto,
    @Req() req,
    @Res() res: Response,
  ) {
    try {
      const userId = await this.usersService.getIdByUserId(req.user.userId);
      await this.answersService.create(createAnswerDto, userId);
      return res
        .status(HttpStatus.CREATED)
        .json({ message: 'Answer created successfully' });
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Answer creation failed' });
    }
  }

  @ApiOperation({
    summary: '질문별 답변 조회',
    description: '질문별 답변 목록을 조회합니다.',
  })
  @Get(':questionId')
  async findAllByQuestionId(
    @Param('questionId') questionId: string,
    @Res() res: Response,
  ) {
    const answers = await this.answersService.findAllByQuestionId(questionId);
    if (answers.length === 0) {
      throw new HttpException('Answers not found', HttpStatus.NOT_FOUND);
    }
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Answers found', answers });
  }

  @ApiOperation({
    summary: '답변 채택',
    description: '답변을 채택합니다.',
  })
  @UseGuards(AuthGuard('jwt'))
  @Post('adopt')
  async adopt(
    @Body() adoptAnswerDto: AdoptAnswerDto,
    @Req() req,
    @Res() res: Response,
  ) {
    try {
      const userId = await this.usersService.getIdByUserId(req.user.userId);
      await this.answersService.adopt(adoptAnswerDto, userId);
      return res.status(HttpStatus.OK).json({ message: 'Answer adopted' });
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Answer adoption failed' });
    }
  }
}

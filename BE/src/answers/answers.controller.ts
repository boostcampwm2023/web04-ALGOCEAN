import { Controller, Post, Body, HttpStatus, Res } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { AdoptAnswerDto } from './dto/adopt-answer.dto';
import { Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('answers')
@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @ApiOperation({
    summary: '답변 생성',
    description: '답변을 생성합니다.',
  })
  @Post()
  async create(@Body() createAnswerDto: CreateAnswerDto, @Res() res: Response) {
    try {
      await this.answersService.create(createAnswerDto);
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
    summary: '답변 채택',
    description: '답변을 채택합니다.',
  })
  @Post('adopt')
  adopt(@Body() adoptAnswerDto: AdoptAnswerDto, @Res() res: Response) {
    //TODO: get user id from request, and pass it to answersService.adopt
    try {
      this.answersService.adopt(adoptAnswerDto);
      return res.status(HttpStatus.OK).json({ message: 'Answer adopted' });
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Answer adoption failed' });
    }
  }
}

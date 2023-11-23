import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { AdoptAnswerDto } from './dto/adopt-answer.dto';
import { Response } from 'express';

@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

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

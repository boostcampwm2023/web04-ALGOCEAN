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
    // this.answersService.create(createAnswerDto) 가 성공하면 201, 실패하면 400 리턴
    try {
      await this.answersService.create(createAnswerDto);
      return res
        .status(HttpStatus.CREATED)
        .json({ message: 'Answer created successfully' });
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: e.message });
    }
  }

  @Post('adopt')
  adopt(@Body() adoptAnswerDto: AdoptAnswerDto) {
    //TODO: get user id from request, and pass it to answersService.adopt
    return this.answersService.adopt(adoptAnswerDto);
  }
}

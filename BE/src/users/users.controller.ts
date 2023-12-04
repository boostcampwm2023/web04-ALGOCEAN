import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AnswersService } from '../answers/answers.service';
import { QuestionsService } from '../questions/questions.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly questionsService: QuestionsService,
    private readonly answersService: AnswersService,
  ) {}

  @ApiOperation({
    summary: '회원가입',
    description: '회원가입합니다.',
  })
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<void> {
    try {
      await this.usersService.createUser(createUserDto);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'User registration failed.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiOperation({
    summary: '아이디 중복 확인',
    description: '아이디가 중복되는지 확인합니다.',
  })
  @Get('check/:userId')
  async checkUserId(
    @Param('userId') userId: string,
  ): Promise<{ isDuplicated: boolean }> {
    const isDuplicated = await this.usersService.isUserIdTaken(userId);
    return { isDuplicated };
  }

  @Get('points/:userId')
  async getPoints(@Param('userId') userId: string): Promise<number> {
    return await this.usersService.getPoints(userId);
  }

  @Get('nickname/:userId')
  async getNickname(@Param('userId') userId: string): Promise<string> {
    const user = await this.usersService.getUserByUserId(userId);
    return user.Nickname;
  }

  @Get('/grade/:userId')
  getUserGrade(@Param('userId') userId: string) {
    return this.usersService.getUserGrade(userId);
  }

  @ApiOperation({
    summary: '내 질문 조회',
    description: '내가 작성한 질문을 조회합니다.',
  })
  @Get('/myQuestions/:userId')
  async getMyQuestions(@Param('userId') userId: number) {
    return this.questionsService.findAllByUserId(userId);
  }

  @ApiOperation({
    summary: '내 답변 조회',
    description: '내가 작성한 답변을 조회합니다.',
  })
  @Get('/myAnswers/:userId')
  async getMyAnswers(@Param('userId') userId: number) {
    return this.answersService.findAllByUserId(userId);
  }
}

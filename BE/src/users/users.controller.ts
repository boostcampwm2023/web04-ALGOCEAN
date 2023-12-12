import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AnswersService } from '../answers/answers.service';
import { QuestionsService } from '../questions/questions.service';
import { AuthGuard } from '@nestjs/passport';

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
      if (createUserDto.userId.charAt(0) === '_') {
        throw new HttpException(
          'User ID cannot start with an underscore.',
          HttpStatus.BAD_REQUEST,
        );
      }
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
  async getUserGrade(@Param('userId') userId: string) {
    const { grade } = await this.usersService.getUserGradeAndRanking(userId);

    return grade;
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

  @ApiOperation({
    summary: '프로필 조회 (타인)',
    description:
      '프로필을 조회합니다. 닉네임, 포인트, 등급, 프로필 사진 링크, 좋아요 합, 질문 갯수, 답변이 존재하는 질문 수, 질문 채택마감률, 최근 질문 최대 3개, 답변 갯수, 채택된 답변 갯수, 답변채택률, 최근 답변 최대 3개를 반환합니다.',
  })
  @Get('/profile/:userId')
  async getProfile(@Param('userId') userId: string) {
    return await this.profileInfo(userId);
  }

  @ApiOperation({
    summary: '프로필 조회 (본인)',
    description:
      '본인 프로필을 조회합니다. 닉네임, 포인트, 등급, 프로필 사진 링크, 좋아요 합, 질문 갯수, 답변이 존재하는 질문 수, 질문 채택마감률, 최근 질문 최대 3개, 답변 갯수, 채택된 답변 갯수, 답변채택률, 최근 답변 최대 3개를 반환합니다.',
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('/me')
  async getMyProfile(@Req() req) {
    const userId =
      req.user.provider === 'local' ? req.user.UserId : '_' + req.user.UserId;
    return await this.profileInfo(userId);
  }

  @ApiOperation({
    summary: '랭킹 조회',
    description:
      '랭킹 리스트를 조회합니다. 아이디, 닉네임, 포인트, 등급, 프로필 사진 링크들의 배열을 반환합니다.',
  })
  @Get('/ranking/lists')
  async getRankingLists() {
    return this.usersService.getRankingLists();
  }

  @ApiOperation({
    summary: '랭킹 조회 (본인)',
    description:
      '특정 유저의 랭킹을 조회합니다. 아이디, 닉네임, 포인트, 등급, 프로필 사진 링크를 반환합니다.',
  })
  @Get('/ranking/:userId')
  async getRanking(@Param('userId') userId: string) {
    return this.usersService.getRanking(userId);
  }

  private async profileInfo(userId) {
    const usersPromise = this.usersService.getUserProfile(userId);
    const questionsPromise = this.questionsService.getProfile(userId);
    const answersPromise = this.answersService.getProfile(userId);

    const [user, questions, answers] = await Promise.all([
      usersPromise,
      questionsPromise,
      answersPromise,
    ]);

    return {
      nickname: user.Nickname,
      points: user.Points,
      grade: user.grade,
      ranking: user.ranking,
      profileImage: user.ProfileImage,
      likeCount: questions.likes + answers.likes,
      questionCount: questions.questionCount,
      answeredQuestionCount: questions.answeredQuestionCount,
      questionAdoptionRate: questions.adoptionRate,
      recentQuestions: questions.recentQuestions,
      answerCount: answers.answerCount,
      adoptedAnswerCount: answers.adoptedAnswerCount,
      answerAdoptionRate: answers.adoptionRate,
      recentAnswers: answers.recentAnswers,
    };
  }
}

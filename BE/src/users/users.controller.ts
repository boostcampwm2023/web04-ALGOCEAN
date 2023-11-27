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

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
}

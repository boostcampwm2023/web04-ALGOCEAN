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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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

  @Get('check/:userId')
  async checkUserId(
    @Param('userId') userId: string,
  ): Promise<{ isDuplicated: boolean }> {
    const isDuplicated = await this.usersService.isUserIdTaken(userId);
    return { isDuplicated };
  }
}
import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('check/:userId')
  async checkUserId(
    @Param('userId') userId: string,
  ): Promise<{ isDuplicated: boolean }> {
    const isDuplicated = await this.usersService.isUserIdTaken(userId);
    return { isDuplicated };
  }
}

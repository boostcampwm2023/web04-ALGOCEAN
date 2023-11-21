import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('check-username/:userId')
  async checkUserId(
    @Param('userId') userId: string,
  ): Promise<{ isTaken: boolean }> {
    const isTaken = await this.usersService.isUserIdTaken(userId);
    return { isTaken };
  }
}

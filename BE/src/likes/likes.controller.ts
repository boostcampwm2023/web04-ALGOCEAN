import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikesDto } from './create-likes.dto';
import { UsersService } from '../users/users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('likes')
export class LikesController {
  constructor(
    private readonly likesService: LikesService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createLikesDto: CreateLikesDto, @Req() req) {
    const userId = await this.usersService.getIdByUserId(req.user.userId);
    return this.likesService.toggleLike(userId, createLikesDto);
  }
}

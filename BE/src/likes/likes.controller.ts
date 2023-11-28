import { Body, Controller, Post } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikesDto } from './create-likes.dto';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  // TODO: use UserGuard to obtain the user ID and associate it with the likes
  @Post()
  async create(@Body() createLikesDto: CreateLikesDto) {
    return this.likesService.toggleLike(1, createLikesDto);
  }
}

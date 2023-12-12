import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikesDto } from './create-likes.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @ApiOperation({
    summary: '좋아요',
    description: '좋아요를 토글합니다. (토큰 필요)',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createLikesDto: CreateLikesDto, @Req() req) {
    return this.likesService.toggleLike(req.user.Id, createLikesDto);
  }
}

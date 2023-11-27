import { Injectable } from '@nestjs/common';
import { CreateLikesDto } from './create-likes.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class LikesService {
  constructor(private readonly prisma: PrismaService) {}

  private async createLikeInfo(
    id: number,
    userId: number,
    type: string,
    isLiked: boolean,
  ) {
    return this.prisma.likeInfo.create({
      data: {
        UserId: userId,
        LikedEntityId: id,
        LikedEntityType: type,
        IsLiked: isLiked,
      },
    });
  }

  private async updateLikeInfo(id: number, isLiked: boolean, type: string) {
    return this.prisma[type].update({
      where: { Id: id },
      data: {
        LikeCount: isLiked ? { increment: 1 } : { decrement: 1 },
      },
    });
  }

  async toggleLike(
    userId: number,
    createLikesDto: CreateLikesDto,
  ): Promise<number> {
    const { id, type } = createLikesDto;

    return this.prisma.$transaction(async (prisma) => {
      const existingLike = await prisma.likeInfo.findFirst({
        where: {
          UserId: userId,
          LikedEntityId: id,
        },
      });

      if (existingLike) {
        const isLiked = !existingLike.IsLiked;

        await prisma.likeInfo.update({
          where: { Id: existingLike.Id },
          data: { IsLiked: isLiked },
        });

        await this.updateLikeInfo(id, isLiked, type);
        return isLiked ? 1 : 0;
      } else {
        await this.createLikeInfo(id, userId, type, true);
        await this.updateLikeInfo(id, true, type);
        return 1;
      }
    });
  }
}

import { Injectable } from '@nestjs/common';
import { CreateLikesDto } from './create-likes.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class LikesService {
  constructor(private readonly prisma: PrismaService) {}
  async toggleLike(
    userId: number,
    createLikesDto: CreateLikesDto,
  ): Promise<number> {
    const { id, type } = createLikesDto;

    const existingLike = await this.prisma.likeInfo.findFirst({
      where: {
        UserId: userId,
        LikedEntityId: id,
      },
    });

    if (existingLike) {
      if (existingLike.IsLiked) {
        const likeUpdate = this.prisma.likeInfo.update({
          where: {
            Id: existingLike.Id,
          },
          data: {
            IsLiked: false,
          },
        });

        const likeCountUpdate = this.decreaseLikeCount(type, id);
        await this.prisma.$transaction([likeUpdate, likeCountUpdate]);
        return 0;
      } else {
        const likeUpdate = this.prisma.likeInfo.update({
          where: {
            Id: existingLike.Id,
          },
          data: {
            IsLiked: true,
          },
        });

        const likeCountUpdate = this.increaseLikeCount(type, id);
        await this.prisma.$transaction([likeUpdate, likeCountUpdate]);
        return 1;
      }
    } else {
      const likeUpdate = await this.prisma.likeInfo.create({
        data: {
          UserId: userId,
          LikedEntityId: id,
          LikedEntityType: type,
          IsLiked: true,
        },
      });
      const likeCountUpdate = this.increaseLikeCount(type, id);
      await this.prisma.$transaction([likeUpdate, likeCountUpdate]);
      return 1;
    }
  }

  async increaseLikeCount(type: string, id: number) {
    if (type === 'question') {
      return this.prisma.question.update({
        where: {
          Id: id,
        },
        data: {
          LikeCount: {
            increment: 1,
          },
        },
      });
    } else {
      return this.prisma.answer.update({
        where: {
          Id: id,
        },
        data: {
          LikeCount: {
            increment: 1,
          },
        },
      });
    }
  }

  async decreaseLikeCount(type: string, id: number) {
    if (type === 'question') {
      return this.prisma.question.update({
        where: {
          Id: id,
        },
        data: {
          LikeCount: {
            decrement: 1,
          },
        },
      });
    } else {
      return this.prisma.answer.update({
        where: {
          Id: id,
        },
        data: {
          LikeCount: {
            decrement: 1,
          },
        },
      });
    }
  }
}

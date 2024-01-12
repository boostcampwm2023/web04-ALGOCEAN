import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    const { userId, password, nickname } = createUserDto;
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      await this.prisma.user.create({
        data: {
          UserId: userId,
          Password: hashedPassword,
          Nickname: nickname,
        },
      });
    } catch (error) {
      if (
        error.code === 'P2002' ||
        error.message.includes('unique constraint')
      ) {
        throw new HttpException(
          'User with this ID already exists.',
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        'User registration failed.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async isUserIdTaken(userId: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { UserId: userId },
    });
    return !!user;
  }

  async getPoints(userId: string): Promise<number> {
    const user = await this.prisma.user.findUnique({
      where: { UserId: userId, DeletedAt: null },
      select: { Points: true },
    });

    if (!user) {
      throw new HttpException('User not found.', HttpStatus.BAD_REQUEST);
    }

    return user.Points;
  }

  async getUserByUserId(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { UserId: userId, DeletedAt: null },
      select: { Nickname: true },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  async getUserGradeAndRanking(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { UserId: userId },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    const userPosition = await this.prisma.user.count({
      where: {
        Points: {
          gt: user.Points,
        },
        DeletedAt: null,
      },
    });

    const totalUsers = await this.prisma.user.count({
      where: { DeletedAt: null },
    });

    const percentile = ((userPosition + 1) / totalUsers) * 100;

    let grade: string;
    if (percentile >= 90) {
      grade = 'Platinum';
    } else if (percentile >= 70) {
      grade = 'Gold';
    } else if (percentile >= 50) {
      grade = 'Silver';
    } else {
      grade = 'Bronze';
    }

    return { grade, ranking: userPosition + 1 };
  }

  async getUserProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { UserId: userId },
      select: {
        Nickname: true,
        Points: true,
        ProfileImage: true,
      },
    });
    const { grade, ranking } = await this.getUserGradeAndRanking(userId);

    return { ...user, userId, grade, ranking };
  }

  async getRankingLists() {
    const users = await this.prisma.user.findMany({
      where: { DeletedAt: null },
      select: {
        UserId: true,
        Nickname: true,
        Points: true,
        ProfileImage: true,
      },
      orderBy: [{ Points: 'desc' }, { CreatedAt: 'asc' }],
      take: 30,
    });

    const rankingLists = await Promise.all(
      users.map(async (user) => {
        const { grade, ranking } = await this.getUserGradeAndRanking(
          user.UserId,
        );
        return { ...user, grade, ranking };
      }),
    );

    // userid, nickname, points, profileimage, grade, ranking를 key값으로
    // 하는 객체를 배열에 담아 반환
    return rankingLists.map((user) => {
      return {
        userId: user.UserId,
        nickname: user.Nickname,
        points: user.Points,
        profileImage: user.ProfileImage,
        grade: user.grade,
        ranking: user.ranking,
      };
    });
  }

  async getRanking(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { UserId: userId },
      select: {
        UserId: true,
        Nickname: true,
        Points: true,
        ProfileImage: true,
      },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    const { grade, ranking } = await this.getUserGradeAndRanking(userId);

    return {
      userId: user.UserId,
      nickname: user.Nickname,
      points: user.Points,
      profileImage: user.ProfileImage,
      grade: grade,
      ranking: ranking,
    };
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
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

  async getUserGrade(userId: string): Promise<string> {
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
      },
    });

    const totalUsers = await this.prisma.user.count();

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

    return grade;
  }
}

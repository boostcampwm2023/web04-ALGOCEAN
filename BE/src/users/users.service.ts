import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto): Promise<boolean> {
    const { userId, password, nickname, profileImage } = createUserDto;
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      await this.prisma.user.create({
        data: {
          UserId: userId,
          Password: hashedPassword,
          Nickname: nickname,
          ProfileImage: profileImage,
        },
      });

      return true;
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
}

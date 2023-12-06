import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Profile } from 'passport';
import { JwtPayloadDto } from './DTO/jwt-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(userId: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { UserId: userId },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordMatch = await bcrypt.compare(password, user.Password);

    if (!isPasswordMatch) {
      throw new UnauthorizedException();
    }

    return await this.createTokens({
      sub: user.UserId,
      username: user.Nickname,
      provider: 'local',
    });
  }

  async validateUser(payload: JwtPayloadDto): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { UserId: payload.sub, Nickname: payload.username },
    });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async validateGithubUser(payload: JwtPayloadDto): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { GithubId: payload.sub, Nickname: payload.username },
    });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async findOrCreateGithubUser(profile: Profile) {
    return this.prisma.user.upsert({
      where: { GithubId: profile.username },
      create: {
        GithubId: profile.username,
        Nickname: profile.displayName,
        UserId: '_' + profile.username,
      },
      update: { Nickname: profile.displayName },
    });
  }

  async createTokens(user: {
    sub: string;
    username: string;
    provider: string;
  }) {
    const payload = {
      sub: user.sub,
      username: user.username,
      provider: user.provider,
    };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, {
        expiresIn: '7d',
      }),
    };
  }

  async refreshToken(refreshToken: string) {
    const decoded = this.jwtService.verify(refreshToken);
    const user =
      decoded.provider === 'github'
        ? await this.validateGithubUser(decoded)
        : await this.validateUser(decoded);

    if (!user) {
      throw new Error('Invalid Refresh Token');
    }

    return await this.createTokens({
      sub: user.sub,
      username: user.username,
      provider: user.provider,
    });
  }
}

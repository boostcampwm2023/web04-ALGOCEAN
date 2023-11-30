import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { JwtPayloadDto } from '../DTO/jwt-payload.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayloadDto): Promise<any> {
    const user =
      payload.provider === 'github'
        ? await this.authService.validateGithubUser(payload)
        : await this.authService.validateUser(payload);

    if (!user) {
      throw new Error('Unauthorized');
    }

    return user;
  }
}

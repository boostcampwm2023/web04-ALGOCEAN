import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginDTO } from './DTO/login.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: '나는 누구',
    description: '로그인한 사용자의 정보를 반환합니다. (토큰 필요)',
  })
  @ApiBearerAuth('Authorization')
  @Get('whoami')
  @UseGuards(AuthGuard('jwt'))
  async whoami(@Req() req) {
    return req.user;
  }

  @ApiOperation({
    summary: '로그인',
    description: '로그인합니다.',
  })
  @Post('login')
  async login(@Body() loginDto: LoginDTO, @Res() res) {
    const { userId, password } = loginDto;
    const { access_token, refresh_token } = await this.authService.login(
      userId,
      password,
    );

    res.cookie('refreshToken', refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    res.send({ accessToken: access_token });
  }

  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubAuth() {}

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubAuthRedirect(@Req() req, @Res() res) {
    const user = await this.authService.findOrCreateGithubUser(req.user);

    const { access_token, refresh_token } = await this.authService.createTokens(
      {
        sub: user.GithubId,
        username: user.Nickname,
        provider: 'github',
      },
    );

    res.cookie('refreshToken', refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    res.send({ accessToken: access_token });
  }

  @Post('refresh')
  async refresh(@Req() req, @Res() res) {
    const refreshToken = req.headers['refreshtoken'];
    const { access_token, refresh_token } =
      await this.authService.refreshToken(refreshToken);

    res.cookie('refreshToken', refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    res.send({ accessToken: access_token });
  }
}

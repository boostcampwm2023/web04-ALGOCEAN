import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('whoami')
  @UseGuards(AuthGuard('jwt'))
  async whoami(@Req() req) {
    return req.user;
  }

  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubAuth() {}

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubAuthRedirect(@Req() req) {
    const user = await this.authService.findOrCreateGithubUser(req.user);

    return this.authService.createTokens({
      sub: user.GithubId,
      username: user.Nickname,
      provider: 'github',
    });
  }

  @Post('refresh')
  async refresh(@Req() req) {
    const { refreshToken } = req.body;
    return await this.authService.refreshToken(refreshToken);
  }
}

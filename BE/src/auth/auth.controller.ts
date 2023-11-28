import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginDTO } from './DTO/login.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: '나는 누구',
    description: '로그인한 사용자의 정보를 반환합니다.',
  })
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
  async login(@Body() loginDto: LoginDTO) {
    const { userId, password } = loginDto;
    return await this.authService.login(userId, password);
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

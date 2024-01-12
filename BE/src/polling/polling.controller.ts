import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { PollingService } from './polling.service';

@Controller('polling')
export class PollingController {
  constructor(private readonly pollingService: PollingService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getPolling(@Req() req: Request) {
    return this.pollingService.getNotification(req.body.userId);
  }

  @Get('test/:userId')
  async test(@Param('userId') userId: number) {
    return this.pollingService.getNotification(userId);
  }
}

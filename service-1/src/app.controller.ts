// app.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('send')
  async sendMessage(@Query('msg') msg: string) {
    this.appService.sendMessage(msg).catch((e) => console.log(e));
  }

  @EventPattern('youarealsoloved')
  getMessage(@Payload() data: any, @Ctx() context: RmqContext) {
    this.appService.handleMessage(data);
  }
}

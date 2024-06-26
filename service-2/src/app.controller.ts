// app.controller.ts
import {
  Controller,
  Get,
  Inject,
  Logger,
  OnModuleInit,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  ClientProxy,
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Get('send')
  async sendMessage(@Query('msg') msg: string) {
    this.appService.sendMessage(msg).catch((e) => console.log(e));
  }

  private readonly logger = new Logger('Consumer');

  @EventPattern('knowyouareloved')
  handleTask(message: any) {
    return this.appService.handleMessage(message);
  }
}

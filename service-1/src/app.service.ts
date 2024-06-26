// app.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { defaultIfEmpty, firstValueFrom, lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy,
  ) {}

  async sendMessage(message: string) {
    this.client.emit('knowyouareloved', message);
  }

  async handleMessage(message: string) {
    console.log(`message from service-2: ${message}`);
  }
}

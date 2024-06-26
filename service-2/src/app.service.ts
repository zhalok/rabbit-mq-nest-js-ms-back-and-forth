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
    this.client.emit('youarealsoloved', message);
  }

  async handleMessage(message) {
    console.log(`message from service-1: ${message}`);

    await this.simulateLongTask();

    this.sendMessage('love from service-2');
  }

  private async simulateLongTask() {
    console.log('sending love back...');
    return new Promise((resolve) => setTimeout(resolve, 10000)); // Simulates a task taking 10 seconds
  }
}

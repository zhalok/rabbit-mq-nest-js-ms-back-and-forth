import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { rabbitMQConsumerConfig } from './configs/rabbitmq.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>(rabbitMQConsumerConfig());

  await app.startAllMicroservices();

  await app.listen(3000);
}
bootstrap();

// rabbitmq.config.ts
import { RmqOptions, Transport } from '@nestjs/microservices';

export const rabbitMQPublisherConfig = () => ({
  transport: Transport.RMQ,
  options: {
    urls: [process.env.RABBITMQ_URL], // RabbitMQ connection URL
    queue: 'queue1', // Name of the queue you want to use
  },
});

export const rabbitMQConsumerConfig = () => ({
  transport: Transport.RMQ,
  options: {
    urls: [process.env.RABBITMQ_URL], // RabbitMQ connection URL
    queue: 'queue2', // Name of the queue you want to use
  },
});

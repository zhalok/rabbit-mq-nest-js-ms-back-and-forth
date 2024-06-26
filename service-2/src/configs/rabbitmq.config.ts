// rabbitmq.config.ts
import { RmqOptions, Transport } from '@nestjs/microservices';

export const rabbitmqConfig = {
  uri: 'amqp://localhost', // Replace with your RabbitMQ URI
  exchange: 'tasks-exchange',
  exchangeType: 'direct',
  routingKey: 'task-key',
  queue: 'tasks-queue',
  deadLetterExchange: 'tasks-dlx',
  deadLetterQueue: 'tasks-dlx-queue',
  retryDelay: 10000, // 10 seconds delay for retry
};

export const rabbitMQPulisherConfig = (): any => ({
  transport: Transport.RMQ,
  options: {
    urls: [process.env.RABBITMQ_URL], // RabbitMQ connection URL
    queue: 'queue2', // Name of the queue you want to use
  },
});

export const rabbitMQConsumerConfig = (): any => ({
  transport: Transport.RMQ,
  options: {
    urls: [process.env.RABBITMQ_URL], // RabbitMQ connection URL
    queue: 'queue1', // Name of the queue you want to use
  },
});

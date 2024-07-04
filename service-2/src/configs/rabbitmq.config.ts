// rabbitmq.config.ts
import { RmqOptions, Transport } from '@nestjs/microservices';

export const rabbitMQPulisherConfig = (): any => ({
  transport: Transport.RMQ,
  options: {
    urls: [process.env.RABBITMQ_URL], // RabbitMQ connection URL
    queue: 'test_queue', // Name of the queue you want to use,
    queueOptions: {
      durable: true,
    },
  },
});

export const rabbitMQConsumerConfig = (): any => ({
  transport: Transport.RMQ,
  options: {
    urls: [process.env.RABBITMQ_URL], // RabbitMQ connection URL
    queue: 'test_queue_1',
    queueOptions: {
      durable: false,
    }, // Name of the queue you want to use
  },
});

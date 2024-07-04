import aio_pika
import asyncio

class RabbitMQ:
    def __init__(self, host='localhost', queue='test_queue', exchange='test_exchange', exchange_type='direct'):
        self.host = host
        self.queue = queue
        self.exchange_name = exchange
        self.exchange_type = exchange_type

    async def connect(self):
        self.connection = await aio_pika.connect_robust(f"amqp://user:password@{self.host}/")
        self.channel = await self.connection.channel()
        await self.channel.declare_queue(self.queue)

    async def publish_message(self, message):
        await self.channel.default_exchange.publish(
            aio_pika.Message(body=message.encode()),
            routing_key=self.queue,
        )
        print(f" [x] Sent '{message}'")

    async def consume_messages(self, callback, queue_name, routing_keys):
        print("queue name from consume message function",queue_name)
        queue = await self.channel.declare_queue(queue_name)
        for routing_key in routing_keys:
            await queue.bind(self.exchange, routing_key=routing_key)
        
        async with queue.iterator() as queue_iter:
            async for message in queue_iter:
                async with message.process():
                    await callback(message.body.decode())

    async def close(self):
        await self.connection.close()

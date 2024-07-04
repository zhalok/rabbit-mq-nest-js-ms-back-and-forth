import pika
import json

# Define connection parameters

connection_params = pika.ConnectionParameters(
    host='localhost',
    port=5672,
    virtual_host='/',
    credentials=pika.PlainCredentials('user', 'password')
)

# Establish a connection
connection = pika.BlockingConnection(connection_params)
channel = connection.channel()

# Define the exchange and queue
exchange_name = ''
queue_name = 'test_queue_1'
routing_key = 'test_queue_1'

# Declare the exchange

# Declare the queue
channel.queue_declare(queue=queue_name)

# Bind the queue to the exchange with a routing key

# Publish a message
message = json.dumps({
    "pattern":"knowyouareloved",
    "data":"hello world"
})
channel.basic_publish(
    exchange=exchange_name,
    routing_key=routing_key,
    body=message,
    properties=pika.BasicProperties(
        delivery_mode=2  # make message persistent
    )
)

print(f" [x] Sent '{message}'")

# Close the connection
connection.close()

import pika
from service import handle_message


def consume():
    credentials = pika.PlainCredentials('user','password')
    connection_parameters = pika.ConnectionParameters(host="localhost",credentials=credentials)
    connection = pika.BlockingConnection(connection_parameters)
    channel = connection.channel()
    channel.queue_declare(queue='test_queue',durable=True)


    channel.basic_consume(queue='test_queue', on_message_callback=handle_message)
    print("Starting to consume...")
    channel.start_consuming()
import json
import pika

def send_message(message):
    credentials = pika.PlainCredentials('user','password')
    connection = pika.BlockingConnection(
        pika.ConnectionParameters(host='localhost',credentials=credentials))
    channel = connection.channel()

    channel.queue_declare(queue='test_queue_1')

    res= channel.basic_publish(exchange='', routing_key='knowyouareloved', body=message)
    print(res)
    print(" [x] Sent message back")
    connection.close()



def handle_message(ch, method, properties, body):
    
    # print(type(json.loads(body)))
    print(body)
    print(json.loads(body)["data"])
    send_message("you are also loved")



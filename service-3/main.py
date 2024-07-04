from fastapi import FastAPI
import asyncio
import pika
import uvicorn
import threading
from consumer import consume
from service import send_message

app = FastAPI()

# Replace with your RabbitMQ connection details


def process_message(channel, method, properties, body):
  # Process the message body (bytes)
  print(f"Received message: {body.decode()}")
#   channel.basic_ack(delivery_tag=method.delivery_tag)


# @app.on_event("startup")
# def startup_event():
    # thread = threading.Thread(target=consume)
    # thread.daemon = True
    # thread.start()



if __name__ == "__main__":
  # startup_event()
  consume()
  
#   uvicorn.run(app, host="0.0.0.0", port=8000)

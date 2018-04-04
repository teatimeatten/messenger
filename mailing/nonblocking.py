from flask import current_app
from threading import Thread

from . import mail

def async_send_message(message):
    thread = Thread(target=send_message, args=[current_app.app_context(), message])
    thread.start()
    return thread

def send_message(app_context, message):
    with app_context:
        mail.send(message)
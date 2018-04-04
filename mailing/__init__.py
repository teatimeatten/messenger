from flask_mail import Mail

mail = Mail()

from .nonblocking import async_send_message
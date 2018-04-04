from flask import Blueprint

conversations = Blueprint('conversations', __name__)

from .json import *
from .crud import *
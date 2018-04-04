from flask import session, g
from flask_socketio import emit, join_room, leave_room

from . import socketio
from database import Conversation, Message, db
from website.account import login_required

@socketio.on('connect', namespace='/messages')
def connected():
    print('Connected!')

@socketio.on('disconnect', namespace='/messages')
def disconnected():
    print('Disconnected!')

@socketio.on('new_message', namespace='/messages')
def new_message(conversation_id, text):
    print('new_message:' + text)
    print(conversation_id)
    conversation = Conversation.query.get(conversation_id)
    new_message = Message(text=text, conversation=conversation, user_id=session['user_id'])
    db.session.add(new_message)
    db.session.commit()
    emit('new_message', (conversation_id, new_message.lean()), room=conversation_id)

@socketio.on('join_conversation', namespace='/messages')
def join_conversation(id):
    print(id)
    join_room(id)
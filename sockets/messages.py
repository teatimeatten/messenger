online = {} # predeclared because of circular imports

from functools import wraps

from flask import session, g, abort, request
from flask_socketio import emit, join_room, leave_room

from database import Conversation, Message, db, User

from . import socketio

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return abort(403) # forbidden
        return f(*args, **kwargs)
    return decorated_function

@socketio.on('connect', namespace='/messages')
@login_required
def connected():
    print('Connected!')
    online[session['user_id']] = request.sid
    user = User.query.get(session['user_id'])

    emit('user_connected', user.lean(), broadcast=True)
    emit('online_users', list(online.keys()))
    emit('self', user.serialize())
    emit('conversations', [c.serialize() for c in user.conversations])
    emit('users', [u.lean() for u in User.query.all()])

@socketio.on('disconnect', namespace='/messages')
@login_required
def disconnected():
    print('Disconnected!')
    emit('user_disconnected', session['user_id'], broadcast=True)
    del online[session['user_id']]

@socketio.on('new_conversation', namespace='/messages')
@login_required
def new_conversation(conversation):
    for user in conversation['users']:
        if user['id'] in online:
            emit('new_conversation', conversation, room=online[user['id']])

@socketio.on('select_conversation', namespace='/messages')
@login_required
def select_conversation(conversation_id):
    print("Selected conversation " + str(conversation_id))

@socketio.on('add_user', namespace='/messages')
@login_required
def add_user(conversation_id, user_id):
    conversation = Conversation.query.get(conversation_id)
    user = User.query.get(user_id)
    conversation.users.append(user)
    db.session.add(conversation)
    db.session.commit(conversation)
    if user.id in online:
        emit('new_conversation', conversation.serialize(), room=online[user.id])

@socketio.on('rename_conversation', namespace='/messages')
@login_required
def rename_conversation(conversation_id, name):
    conversation = Conversation.query.get(conversation_id)
    conversation.display_name = name
    db.session.add(conversation)
    db.session.commit()
    for user in conversation.users:
        if user.id in online:
            emit('update_conversation', conversation.serialize(), room=online[user.id])

@socketio.on('delete_conversation', namespace='/messages')
@login_required
def delete_conversation(conversation_id):
    conversation = Conversation.query.get(conversation_id)
    for user in conversation.users:
        if user.id in online:
            emit('delete_conversation', conversation_id, room=online[user.id])

    db.session.delete(conversation)
    db.session.commit()

@socketio.on('new_message', namespace='/messages')
@login_required
def new_message(conversation_id, text):
    print('new_message:' + text)
    print(conversation_id)
    conversation = Conversation.query.get(conversation_id)
    new_message = Message(text=text, conversation=conversation, user_id=session['user_id'])
    db.session.add(new_message)
    db.session.commit()
    emit('new_message', (conversation_id, new_message.lean()), room=conversation.id)

@socketio.on('join_conversation', namespace='/messages')
@login_required
def join_conversation(id):
    join_room(id)
    conversation = Conversation.query.get(id)
    emit('messages', (id, [m.lean() for m in conversation.messages]))

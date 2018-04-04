from flask import jsonify, request, g, abort

from database import db, Conversation, User, Message
from website.account import login_required_json

from . import conversations

@conversations.route('', methods=['POST'])
@login_required_json
def create():

    data = request.get_json()
    user_ids = data['user_ids']
    name = data.get('name')
    new = Conversation(display_name=name)
    for user_id in user_ids:
        user = User.query.get(user_id)
        new.users.append(user)
    db.session.add(new)
    db.session.commit()

    return jsonify({
        'success': True,
        'conversation': new.serialize(),
    })

@conversations.route('/<id>', methods=['GET', 'DELETE'])
@login_required_json
def singular(id):
    conversation = Conversation.query.get(id)
    if not conversation:
        return abort(404)
    if request.method == 'GET':
        return jsonify(conversation.serialize())
    if request.method == 'DELETE':
        db.session.delete(conversation)
        db.session.commit()
        return jsonify({
            'success': True,
        })

@conversations.route('/<id>/messages', methods=['GET'])
@login_required_json
def messages(id):
    conversation = Conversation.query.get(id)
    if not conversation:
        return abort(404)

    return jsonify([m.lean() for m in conversation.messages])
from flask import jsonify, g

from database import Conversation
from website.account import login_required_json

from . import conversations

@conversations.route('/json', methods=['GET'])
@login_required_json
def json_all():
    return jsonify([c.lean() for c in Conversation.query.filter(Conversation.users.any(id=g.user.id))])

@conversations.route('/json/all', methods=['GET'])
def json():
    return jsonify([c.serialize() for c in Conversation.query.all()])

from flask import Blueprint, jsonify, g

from database import User, Conversation

from .account import login_required

users = Blueprint('users', __name__)


@users.route('', methods=['GET'], strict_slashes=False)
def get_users():
    return jsonify([u.lean() for u in User.query.all()])

@users.route('/<id>', methods=['GET'], strict_slashes=False)
def get_by_id(id):
    user = User.query.get_or_404(id)
    return jsonify(user.lean())

@users.route('/self', methods=['GET'], strict_slashes=False)
@login_required
def get_self():
    return jsonify(g.user.serialize())

@users.route('/self/conversations', methods=['GET'], strict_slashes=False)
@login_required
def get_conversations():
    return jsonify([c.lean() for c in g.user.conversations])
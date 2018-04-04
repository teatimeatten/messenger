from uuid import uuid4

from . import db
from .tracking import TrackingModel

class Message(TrackingModel):

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    conversation_id = db.Column(db.Integer, db.ForeignKey('conversation.id'), nullable=False)

    user = db.relationship('User')
    conversation = db.relationship('Conversation')

    text = db.Column(db.Text, nullable=False)

    def serialize(self):
        base = self.lean()
        data = {
            'conversation': self.conversation.lean()
        }
        data.update(base)
        return data

    def lean(self):
        base = super().serialize()
        data = {
            'user': self.user.lean(),
            'text': self.text,
        }
        data.update(base)
        return data

conversations_to_users = db.Table('conversations_to_users',
    db.Column('conversation_id', db.Integer, db.ForeignKey('conversation.id')),
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'))
)

class Conversation(TrackingModel):

    display_name = db.Column(db.Text(10), default=lambda: str(uuid4())[:10])

    users = db.relationship('User', secondary=conversations_to_users, lazy='subquery', backref=db.backref('conversations', lazy=True))
    messages = db.relationship('Message', cascade='all, delete-orphan')

    def lean(self):
        base = super().serialize()
        data = {
            'display_name': str(self.display_name),
        }
        data.update(base)
        return data

    def serialize(self):
        base = self.lean()
        data = {
            'users': [u.lean() for u in self.users],
            'messages': [m.lean() for m in self.messages],
        }
        data.update(base)
        return data
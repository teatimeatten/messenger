from datetime import datetime, timedelta
from uuid import uuid4

from . import db

from .tracking import TrackingModel

class User(TrackingModel):

    email = db.Column(db.String(length=50), nullable=False, unique=True)
    passhash = db.Column(db.Text)
    display_name = db.Column(db.String(length=50), unique=True)

    def lean(self):
        base = super().serialize()
        data = {
            'display_name': self.display_name,
        }
        data.update(base)
        return data

    def serialize(self):
        base = self.lean()
        data = {
            'email': self.email,
        }
        data.update(base)
        return data

class PasswordResetRequest(TrackingModel):

    code = db.Column(db.String(length=40), nullable=False, default=lambda: str(uuid4()))

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship('User')

    expires_on = db.Column(db.DateTime, default=lambda: datetime.utcnow() + timedelta(days=1))
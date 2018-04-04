from . import db

from datetime import datetime

class TrackingModel(db.Model):
    __abstract__ = True
    id = db.Column(db.Integer, primary_key=True)

    time_created = db.Column(
        db.DateTime,
        default = datetime.utcnow,
        nullable=False
    )

    time_updated = db.Column(
        db.DateTime,
        default = datetime.utcnow,
        onupdate = datetime.utcnow,
        nullable=False
    )

    def serialize(self):
        return {
            'id': self.id,
            'time_created': str(self.time_created),
            'time_updated': str(self.time_updated),
        }
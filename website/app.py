from os import environ as env
from flask import Flask, render_template, session, g
from sqlalchemy_utils import create_database, database_exists
from flask_migrate import Migrate

from mailing import mail
from database import db, User
from sockets import socketio

from .account import account, login_required
from .conversations import conversations
from .users import users

def create_app():

    app = Flask(__name__)
    app.secret_key = env.get('SESSION_SECRET_KEY') or 'keyboard cat'

    app.config.from_pyfile('default.cfg')
    app.config.from_pyfile('local.cfg', silent=True)

    @app.before_request
    def load_user():
        if 'user_id' in session:
            user = User.query.get(session['user_id'])
            if user:
                g.user = user

    @app.route('/')
    def index():
        return render_template('index.html')

    @app.route('/messages')
    @login_required
    def messages():
        return render_template('messages.html')

    app.register_blueprint(account)
    app.register_blueprint(conversations, url_prefix='/conversations')
    app.register_blueprint(users, url_prefix='/users')

    db_url = app.config['SQLALCHEMY_DATABASE_URI']

    db.init_app(app)
    if not database_exists(db_url):
        create_database(db_url)
    db.create_all(app=app)
    migrate = Migrate(app, db)

    mail.init_app(app)

    socketio.init_app(app)
    return app
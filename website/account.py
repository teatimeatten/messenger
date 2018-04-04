from flask import Blueprint, render_template, request, abort, jsonify, session, redirect, flash, g, url_for
from flask_mail import Message
from bcrypt import hashpw, checkpw, gensalt
from functools import wraps

from database import db, User, PasswordResetRequest
from mailing import mail, async_send_message

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return redirect(url_for('account.login'))
        if not g.user:
            return redirect(url_for('account.login'))
        return f(*args, **kwargs)
    return decorated_function

def login_required_json(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return jsonify({
                'success': False,
                'error': 'User must be logged in',
            })
        if not g.user:
            return jsonify({
                'success': False,
                'error': 'User must be logged in',
            })
        return f(*args, **kwargs)
    return decorated_function

account = Blueprint('account', __name__)

@account.route("/signup", methods=['GET', 'POST'])
def signup():

    if request.method == 'GET':
        return render_template('account/signup.html')

    fields = ['email', 'password', 'display_name']
    if not all(field in request.form for field in fields) or not all(fields):
        return abort(401)

    passhash = hashpw(request.form['password'].encode('utf-8'), gensalt())

    try:
        new_user = User(email=request.form['email'].lower().strip(), passhash=passhash, display_name=request.form['display_name'].strip())
        db.session.add(new_user)
        db.session.commit()
        session['user_id'] = new_user.id
        return redirect(url_for('messages'))
    except:
        flash("Signup Error: A user with that email or name already exists")
        return render_template('account/signup.html')


@account.route('/login', methods=['GET', 'POST'])
def login():

    if request.method == 'GET':
        return render_template('account/login.html')

    fields = ['email', 'password']
    if not all(field in request.form for field in fields) or not all(fields):
        return abort(401)

    user = User.query.filter(User.email == request.form['email']).first()
    if not user:
        flash('Invalid credentials')
        return render_template('account/login.html')
    if checkpw(request.form['password'].encode('utf-8'), user.passhash.encode('utf-8')):
        session['user_id'] = user.id
        return redirect('/')
    else:
        flash('Invalid credentials')
        return render_template('account/login.html')

@account.route('/logout')
@login_required
def logout():
    del session['user_id']
    return redirect('/')

@account.route('/password_reset', methods=['GET', 'POST'])
def password_reset():
    if request.method == 'GET':
        return render_template('account/password_reset.html')

    if request.method == 'POST':
        if 'email' not in request.values:
            flash('Missing field')
            return render_template('account/password_reset.html')
        user = User.query.filter(User.email == request.values['email']).first()
        if not user:
            flash('No such user')
            return render_template('account/password_reset.html')
        req = PasswordResetRequest(user_id=user.id)
        db.session.add(req)
        db.session.commit()

        message = Message(
            "Password Reset",
            recipients=[user.email],
            html=render_template('emails/password_reset.html', code=req.code)
        )
        print(message)
        async_send_message(message)

        return render_template('account/password_reset_sent.html')

@account.route('/reset/<string:code>', methods=['GET', 'POST'])
def reset(code):
    req = PasswordResetRequest.query.filter(PasswordResetRequest.code == code).first()
    if not req:
        return abort(404)
    if request.method == 'GET':
        return render_template('account/password_reset_approved.html')

    if request.method == 'POST':

        if 'password' not in request.values:
            flash('Missing required field')
            return render_template('account/password_reset_approved.html')

        req.user.passhash = hashpw(request.values['password'].encode('utf-8'), gensalt())
        db.session.add(req.user)
        PasswordResetRequest.query.filter(PasswordResetRequest.user_id == req.user.id).delete()
        db.session.commit()
        return render_template('account/password_reset_finished.html')
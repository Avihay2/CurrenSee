from flask import Blueprint, jsonify, request, current_app
import bcrypt
import datetime
import jwt

from BLL.users import Users_BLL

users = Blueprint('users', __name__)
users_bll = Users_BLL()


@users.route("/", methods=['GET'])
def get_all_users():
    users = users_bll.get_all_users()
    return jsonify(users)


@users.route("/<username>", methods=['GET'])
def get_user(username):
    user = users_bll.get_user(username)
    return jsonify(user)


@users.route("/signup", methods=['POST'])
def add_user():
    obj = request.json
    result = users_bll.add_user(obj)
    if isinstance(result, tuple):
        return jsonify({ 'error': result[0] }), result[1]
    return jsonify(result)


@users.route("/<username>", methods=['PATCH'])
def update_user(username):
    obj = request.json
    result = users_bll.update_user(username, obj)
    return jsonify(result)


@users.route("/login", methods=['POST'])
def login():
    obj = request.json
    username = obj["username"]
    password = obj["password"]

    response = get_user(username)
    if response.status_code == 200:
        user = response.json
        is_matched_passwords = bcrypt.checkpw(
            password.encode('utf-8'), user["password"].encode('utf-8'))
        if is_matched_passwords:
            token = jwt.encode({
                "username": username,
                "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
            }, current_app.config['JWT_SECRET_KEY'], algorithm="HS256")

            return jsonify({'token': token})

    return jsonify({'error': 'Invalid username or password'}), 401


@users.route("/token", methods=['POST'])
def authentication():
    obj = request.json
    token = obj["token"]
    msg = ''

    try:
        decoded_token = jwt.decode(token, current_app.config['JWT_SECRET_KEY'], algorithms="HS256")
        return jsonify(decoded_token)
    except jwt.ExpiredSignatureError:
        msg = 'Signature has expired'
    except jwt.DecodeError:
        msg = 'Error decoding signature'
    except jwt.InvalidTokenError:
        msg = 'Invalid token'   

    return jsonify({ 'error': msg }), 401

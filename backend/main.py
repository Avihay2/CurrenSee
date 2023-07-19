import os
import json
from flask import Flask
from flask_cors import CORS
from bson import ObjectId

from routers.users import users

# deserialize PyMongo ObjectId from JSON
class JSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        return json.JSONEncoder.default(self, obj)

def create_app():        
    app = Flask(__name__)

    jwt_secret_key = os.getenv("JWT_SECRET_KEY")
    mongo_uri = os.getenv("MONGO_URI")

    if jwt_secret_key is None or mongo_uri is None:
        raise ValueError("The secret keys wasn't found in the environment file.")

    app.config["JWT_SECRET_KEY"] = jwt_secret_key
    app.config["MONGO_URI"] = mongo_uri

    CORS(app)

    app.json_encoder = JSONEncoder

    app.register_blueprint(users, url_prefix='/users')

    return app

import os
from pymongo import MongoClient

class usersDB:
    def __init__(self):
        mongo_uri = os.getenv("MONGO_URI")
        self.__client = MongoClient(mongo_uri)
        self.__db = self.__client['mapProject']
        self.__collection = self.__db['users']

        try:
            self.__client.admin.command('ping')
            print("Pinged your deployment. You successfully connected to MongoDB!")
        except Exception as e:
            print(e)

    def get_all_users(self):
        users = list(self.__collection.find())
        return users

    def get_user(self, username):
        user = self.__collection.find_one({"username": username})
        return user

    def add_user(self, obj):
        self.__collection.insert_one(obj)
        return 'User created!'

    def update_user(self, username, obj):
        self.__collection.update_one({'username': username}, {"$set": {
            "fav_countries.main": obj["fav_countries"]["main"],
            "fav_countries.relatives": obj["fav_countries"]["relatives"]
        }})
        return 'Updated!'

    def is_duplicate(self, username, email):
        is_name = self.__collection.find_one({"username": username})
        is_email = self.__collection.find_one({"email": email})

        if is_name:
            return ' Username \'{}\' already in use. Choose another one!'.format(username)
        if is_email:
            return ' Email address \'{}\' already in use.\nOnly one user per email allowed!'.format(email)

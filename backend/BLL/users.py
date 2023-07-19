import bcrypt

from DAL.users import usersDB

class Users_BLL:
    def __init__(self):
        self.__users_db = usersDB()

    def get_all_users(self):
        users = []
        users_db = self.__users_db.get_all_users()

        for user in users_db:
            users.append(user)

        return users

    def get_user(self, username):
        user_data = self.__users_db.get_user(username)

        user = {}
        user["email"] = user_data["email"]
        user["username"] = user_data["username"]
        user["password"] = user_data["password"]
        user["fav_countries"] = user_data["fav_countries"]

        return user

    def add_user(self, obj):
        check_dup = self.__users_db.is_duplicate(obj["username"], obj["email"])
        if (check_dup): 
            return check_dup, 409

        bytes_psw = obj["password"].encode('utf-8')
        hashed_psw = bcrypt.hashpw(bytes_psw, bcrypt.gensalt(10)) 
        hashed_psw_str = hashed_psw.decode('utf-8') 

        newUser = {
            "email": obj["email"],
            "username": obj["username"],
            "password": hashed_psw_str ,
            "fav_countries": obj["fav_countries"]
        }

        self.__users_db.add_user(newUser)

        return "User Created!"

    def update_user(self, username, obj):      
        self.__users_db.update_user(username, obj)
        return 'Updated!'


from flask import request, session
from flask_restful import Resource
from models.user import User
from schemas.user_schema import user_schema

class LoginResource(Resource):
    def post(self):
        data = request.get_json() or {}
        email = data.get('email')
        password = data.get('password')

        user = User.query.filter_by(email=email).first()
        if user and user.authenticate(password):
            session['user_id'] = user.id
            return user_schema.dump(user), 200

        return {'error': 'Invalid email or password'}, 401

class LogoutResource(Resource):
    def delete(self):
        session.pop('user_id', None)
        return {}, 204

class CheckSessionResource(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id:
            user = User.query.get(user_id)
            if user:
                return user_schema.dump(user), 200
        return {'error': 'Unauthorized'}, 401
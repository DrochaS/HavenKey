from flask import request
from flask_restful import Resource
from extensions import db
from models.user import User
from schemas.user_schema import user_schema, users_schema


class UserListResource(Resource):
    def get(self):
        users = User.query.all()
        return users_schema.dump(users), 200

    def post(self):
        data = request.get_json() or {}
        try:
            user = User(
                name=data.get('name'),
                email=data.get('email'),
                role=data.get('role', 'tenant')
            )
            user.password = data.get('password', '')
            db.session.add(user)
            db.session.commit()
            return user_schema.dump(user), 201
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 400


class UserDetailResource(Resource):
    def get(self, id):
        user = User.query.get_or_404(id)
        return user_schema.dump(user), 200

    def put(self, id):
        user = User.query.get_or_404(id)
        data = request.get_json() or {}
        try:
            if 'name' in data:
                user.name = data['name']
            if 'email' in data:
                user.email = data['email']
            if 'role' in data:
                user.role = data['role']
            if 'password' in data and data['password']:
                user.password = data['password']
            db.session.commit()
            return user_schema.dump(user), 200
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 400

    def delete(self, id):
        user = User.query.get_or_404(id)
        db.session.delete(user)
        db.session.commit()
        return {}, 204

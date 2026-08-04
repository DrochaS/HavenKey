import os
from flask import Flask
from flask_cors import CORS
from extensions import db, migrate, ma, api, bcrypt

from models.user import User
from models.property import Property
from models.lease import Lease

from controllers.user_controller import UserListResource, UserDetailResource
from controllers.property_controller import PropertyListResource, PropertyByIdResource
from controllers.lease_controller import LeaseListResource, LeaseDetailResource
from controllers.auth_controller import LoginResource, LogoutResource, CheckSessionResource

basedir = os.path.abspath(os.path.dirname(__file__))
instance_path = os.path.join(basedir, 'instance')
os.makedirs(instance_path, exist_ok=True)

app = Flask(__name__)
app.secret_key = os.environ.get('FLASK_SECRET_KEY', 'super-secret-dev-key')

app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(instance_path, 'app.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

CORS(app, resources={r"/*": {"origins": "*"}})

db.init_app(app)
migrate.init_app(app, db)
ma.init_app(app)
bcrypt.init_app(app)

api.add_resource(LoginResource, '/api/login')
api.add_resource(LogoutResource, '/api/logout')
api.add_resource(CheckSessionResource, '/api/check_session')

api.add_resource(UserListResource, '/users')
api.add_resource(UserDetailResource, '/users/<int:id>')

api.add_resource(PropertyListResource, '/properties')
api.add_resource(PropertyByIdResource, '/properties/<int:id>')

api.add_resource(LeaseListResource, '/leases')
api.add_resource(LeaseDetailResource, '/leases/<int:id>')

api.init_app(app)

@app.route('/')
def index():
    return {'message': 'API operational'}, 200

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5555, debug=True)
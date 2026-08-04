from extensions import db, bcrypt

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    _password_hash = db.Column(db.String(256), nullable=False)
    role = db.Column(db.String(20), nullable=False)

    properties = db.relationship('Property', backref='landlord', cascade='all, delete-orphan')
    leases = db.relationship('Lease', backref='tenant', cascade='all, delete-orphan')

    @property
    def password(self):
        raise AttributeError('Password field is write-only.')

    @password.setter
    def password(self, plain_text_password):
        self._password_hash = bcrypt.generate_password_hash(
            plain_text_password.encode('utf-8')
        ).decode('utf-8')

    def authenticate(self, plain_text_password):
        return bcrypt.check_password_hash(
            self._password_hash, plain_text_password.encode('utf-8')
        )
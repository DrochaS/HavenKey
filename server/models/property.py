from extensions import db

class Property(db.Model):
    __tablename__ = 'properties'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    address = db.Column(db.String(200), nullable=False)
    city = db.Column(db.String(50), default='Nairobi')
    price = db.Column(db.Float, nullable=False)
    image_url = db.Column(db.String(500))

    landlord_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    leases = db.relationship('Lease', backref='property', cascade='all, delete-orphan')
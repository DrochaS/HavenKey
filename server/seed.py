from app import app
from extensions import db
from models import User, Property, Lease

with app.app_context():
    print("Clearing tables...")
    Lease.query.delete()
    Property.query.delete()
    User.query.delete()

    print("Seeding users...")
    landlord = User(name="Andrew Macharia", email="landlord@havenkey.co.ke", role="landlord")
    landlord.password = "password123"

    tenant = User(name="Jane Doe", email="jane@gmail.com", role="tenant")
    tenant.password = "password123"

    db.session.add_all([landlord, tenant])
    db.session.commit()

    print("Seeding properties...")
    p1 = Property(
        title="Skyline Heights Luxury Loft",
        address="45 Kilimani Rd",
        city="Nairobi",
        price=135000.0,
        image_url="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
        landlord_id=landlord.id
    )
    db.session.add(p1)
    db.session.commit()

    print("Database successfully populated!")
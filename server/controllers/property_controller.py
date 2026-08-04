from flask import request
from flask_restful import Resource
from extensions import db
from models.property import Property
from schemas.property_schema import property_schema, properties_schema

class PropertyListResource(Resource):
    def get(self):
        props = Property.query.all()
        return properties_schema.dump(props), 200

    def post(self):
        data = request.get_json() or {}
        try:
            new_prop = Property(
                title=data.get('title'),
                address=data.get('address'),
                city=data.get('city', 'Nairobi'),
                price=float(data.get('price', 0)),
                image_url=data.get('image_url'),
                landlord_id=data.get('landlord_id')
            )
            db.session.add(new_prop)
            db.session.commit()
            return property_schema.dump(new_prop), 201
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 400

class PropertyByIdResource(Resource):
    def get(self, id):
        prop = Property.query.get_or_404(id)
        return property_schema.dump(prop), 200

    def delete(self, id):
        prop = Property.query.get_or_404(id)
        db.session.delete(prop)
        db.session.commit()
        return {}, 204
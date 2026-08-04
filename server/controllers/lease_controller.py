from flask import request
from flask_restful import Resource
from extensions import db
from models.lease import Lease
from schemas.lease_schema import lease_schema, leases_schema

class LeaseListResource(Resource):
    def get(self):
        leases = Lease.query.all()
        return leases_schema.dump(leases), 200

    def post(self):
        data = request.get_json() or {}
        try:
            new_lease = Lease(
                monthly_rent=float(data.get('monthly_rent', 0)),
                start_date=data.get('start_date'),
                end_date=data.get('end_date'),
                status=data.get('status', 'active'),
                property_id=data.get('property_id'),
                tenant_id=data.get('tenant_id')
            )
            db.session.add(new_lease)
            db.session.commit()
            return lease_schema.dump(new_lease), 201
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 400


class LeaseDetailResource(Resource):
    def get(self, id):
        lease = Lease.query.get_or_404(id)
        return lease_schema.dump(lease), 200

    def delete(self, id):
        lease = Lease.query.get_or_404(id)
        db.session.delete(lease)
        db.session.commit()
        return {}, 204
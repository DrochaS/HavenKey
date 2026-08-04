from extensions import ma
from models.lease import Lease

class LeaseSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Lease
        load_instance = True
        include_fk = True

lease_schema = LeaseSchema()
leases_schema = LeaseSchema(many=True)
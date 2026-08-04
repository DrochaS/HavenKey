from extensions import ma
from models.property import Property

class PropertySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Property
        load_instance = True
        include_fk = True

property_schema = PropertySchema()
properties_schema = PropertySchema(many=True)
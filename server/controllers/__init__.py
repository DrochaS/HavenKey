from .auth_controller import LoginResource, LogoutResource, CheckSessionResource
from .property_controller import PropertyListResource, PropertyByIdResource
from .lease_controller import LeaseListResource

def register_routes(api):
    api.add_resource(LoginResource, '/api/login')
    api.add_resource(LogoutResource, '/api/logout')
    api.add_resource(CheckSessionResource, '/api/check_session')
    api.add_resource(PropertyListResource, '/api/properties')
    api.add_resource(PropertyByIdResource, '/api/properties/<int:id>')
    api.add_resource(LeaseListResource, '/api/leases')
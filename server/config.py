import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'havenkey-prod-secret-key-change-in-env')
    
    # Deployment DB setup (handles PostgreSQL URLs on Render/Heroku/Neon)
    db_url = os.environ.get('DATABASE_URL', 'sqlite:///instance/app.db')
    if db_url.startswith("postgres://"):
        db_url = db_url.replace("postgres://", "postgresql://", 1)
        
    SQLALCHEMY_DATABASE_URI = db_url
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JSON_COMPACT = False
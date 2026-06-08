from flask import Flask
from app.routes import main

def create_app():
    app = Flask(__name__)

    app.register_blueprint(main)

    @app.route("/")
    def home():
        return {"message": "Gloss & Glow Backend Running"}

    return app
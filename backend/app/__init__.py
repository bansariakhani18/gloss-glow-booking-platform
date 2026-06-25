from flask import Flask
from flask_session import Session
from app.routes import main


def create_app():
    app = Flask(__name__)

    app.config["SECRET_KEY"] = "gloss-glow-secret-key"
    app.config["SESSION_TYPE"] = "filesystem"

    Session(app)

    app.register_blueprint(main)

    @app.route("/")
    def home():
        return {"message": "Gloss & Glow Backend Running"}

    return app
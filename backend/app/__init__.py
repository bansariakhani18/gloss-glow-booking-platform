from flask import Flask
from flask_session import Session
from flask_cors import CORS
from app.routes import main


def create_app():
    app = Flask(__name__)

    app.config["SECRET_KEY"] = "gloss-glow-secret-key"

    app.config["SESSION_TYPE"] = "filesystem"
    app.config["SESSION_PERMANENT"] = False
    app.config["SESSION_USE_SIGNER"] = True

    app.config["SESSION_COOKIE_SAMESITE"] = "Lax"
    app.config["SESSION_COOKIE_SECURE"] = False
    app.config["SESSION_COOKIE_HTTPONLY"] = True

    CORS(
        app,
        supports_credentials=True,
        origins=["http://localhost:5173"]
    )

    Session(app)

    app.register_blueprint(main)

    @app.route("/")
    def home():
        return {"message": "Gloss & Glow Backend Running"}

    return app
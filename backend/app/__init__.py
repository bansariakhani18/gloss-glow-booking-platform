from flask import Flask
from flask_session import Session
from flask_cors import CORS
from dotenv import load_dotenv
import os

from app.routes import main

load_dotenv()


def create_app():
    app = Flask(__name__)

    # -----------------------------
    # Secret Key
    # -----------------------------
    app.config["SECRET_KEY"] = os.getenv(
        "SECRET_KEY",
        "gloss-glow-secret-key"
    )

    # -----------------------------
    # Session Configuration
    # -----------------------------
    app.config["SESSION_TYPE"] = "filesystem"
    app.config["SESSION_PERMANENT"] = False
    app.config["SESSION_USE_SIGNER"] = True

    app.config["SESSION_COOKIE_SAMESITE"] = "Lax"
    app.config["SESSION_COOKIE_HTTPONLY"] = True

    # Secure cookies only in production
    app.config["SESSION_COOKIE_SECURE"] = (
        os.getenv("FLASK_ENV") == "production"
    )

    # -----------------------------
    # CORS Configuration
    # -----------------------------
    allowed_origins = [
        "http://localhost:5173"
    ]

    frontend_url = os.getenv("FRONTEND_URL")

    if frontend_url:
        allowed_origins.append(frontend_url)

    CORS(
        app,
        supports_credentials=True,
        origins=allowed_origins
    )

    # -----------------------------
    # Extensions
    # -----------------------------
    Session(app)

    # -----------------------------
    # Routes
    # -----------------------------
    app.register_blueprint(main)

    @app.route("/")
    def home():
        return {
            "message": "Gloss & Glow Backend Running"
        }

    return app
import os
import libsql
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("TURSO_DATABASE_URL")
DATABASE_TOKEN = os.getenv("TURSO_AUTH_TOKEN")

LOCAL_DB = "/tmp/gloss_glow_replica.db"


def get_db():
    conn = libsql.connect(
        LOCAL_DB,
        sync_url=DATABASE_URL,
        auth_token=DATABASE_TOKEN
    )

    # Pull latest data from Turso
    conn.sync()

    return conn
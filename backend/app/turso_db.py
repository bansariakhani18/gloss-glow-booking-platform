import os
import sys
import libsql
from dotenv import load_dotenv

load_dotenv()

conn = libsql.connect(
    "/tmp/test.db",
    sync_url=os.getenv("TURSO_DATABASE_URL"),
    auth_token=os.getenv("TURSO_AUTH_TOKEN")
)

print("row_factory =", getattr(conn, "row_factory", None))

sys.exit(0)
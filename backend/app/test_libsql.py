import os
import libsql
from dotenv import load_dotenv

load_dotenv()

conn = libsql.connect(
    "/tmp/test.db",
    sync_url=os.getenv("TURSO_DATABASE_URL"),
    auth_token=os.getenv("TURSO_AUTH_TOKEN")
)

print(type(conn))

cursor = conn.cursor()

print(type(cursor))
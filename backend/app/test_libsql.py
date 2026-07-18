import os
from dotenv import load_dotenv
import libsql

load_dotenv("backend/.env")

print("libsql version:", getattr(libsql, "__version__", "unknown"))

conn = libsql.connect(
    "/tmp/test.db",
    sync_url=os.getenv("TURSO_DATABASE_URL"),
    auth_token=os.getenv("TURSO_AUTH_TOKEN"),
)

print("\nConnection methods:")
print([m for m in dir(conn) if not m.startswith("_")])

print("\nHas cursor():", hasattr(conn, "cursor"))

if hasattr(conn, "cursor"):
    cur = conn.cursor()
    print("\nCursor methods:")
    print([m for m in dir(cur) if not m.startswith("_")])
    print("has lastrowid:", hasattr(cur, "lastrowid"))
    print("has rowcount:", hasattr(cur, "rowcount"))
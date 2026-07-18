import os
import sys
import libsql
from dotenv import load_dotenv

load_dotenv()

print("LIBSQL MODULE:", libsql)
print("HAS Row:", hasattr(libsql, "Row"))

if hasattr(libsql, "Row"):
    print("Row object:", libsql.Row)

conn = libsql.connect(
    "/tmp/test.db",
    sync_url=os.getenv("TURSO_DATABASE_URL"),
    auth_token=os.getenv("TURSO_AUTH_TOKEN")
)

print("DEFAULT row_factory:", conn.row_factory)

sys.exit(0)
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

print("=" * 60)
print("CONNECTION METHODS")
print([x for x in dir(conn) if not x.startswith("_")])

print("=" * 60)

try:
    cur = conn.cursor()

    print("CURSOR METHODS")
    print([x for x in dir(cur) if not x.startswith("_")])

except Exception as e:
    print("CURSOR ERROR")
    print(type(e).__name__)
    print(e)

print("=" * 60)

sys.exit(0)
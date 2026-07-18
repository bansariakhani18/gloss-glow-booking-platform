import os
import libsql
from dotenv import load_dotenv

load_dotenv()

print("=" * 60)
print("LIBSQL IMPORTED")
print("VERSION:", getattr(libsql, "__version__", "unknown"))
print("MODULE:", libsql)
print("TOP LEVEL:")
print([x for x in dir(libsql) if not x.startswith("_")])
print("=" * 60)

DATABASE_URL = os.getenv("TURSO_DATABASE_URL")
DATABASE_TOKEN = os.getenv("TURSO_AUTH_TOKEN")

print("URL:", DATABASE_URL)
print("TOKEN:", bool(DATABASE_TOKEN))

# Stop here intentionally.
raise RuntimeError("LIBSQL API INSPECTION COMPLETE")
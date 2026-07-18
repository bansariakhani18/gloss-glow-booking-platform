import time
import os
from dotenv import load_dotenv
from libsql_client import create_client_sync

load_dotenv()

DATABASE_URL = os.getenv("TURSO_DATABASE_URL", "")
DATABASE_TOKEN = os.getenv("TURSO_AUTH_TOKEN", "")

if DATABASE_URL.startswith("libsql://"):
    DATABASE_URL = DATABASE_URL.replace("libsql://", "https://", 1)

print("=" * 60)
print("DATABASE_URL =", DATABASE_URL)
print("TOKEN EXISTS =", bool(DATABASE_TOKEN))
print("Creating Turso client...")
print("=" * 60)

_client = create_client_sync(
    url=DATABASE_URL,
    auth_token=DATABASE_TOKEN
)

print("Turso client created successfully")


class DBRow:
    def __init__(self, row, columns):
        self._row = row
        self._columns = list(columns)

    def __getitem__(self, key):
        if isinstance(key, int):
            return self._row[key]
        return self._row[self._columns.index(key)]

    def keys(self):
        return self._columns

    def items(self):
        return zip(self._columns, self._row)

    def __iter__(self):
        return iter(self.items())

    def __len__(self):
        return len(self._columns)

    def __repr__(self):
        return str(dict(self))


class TursoCursor:

    def __init__(self):
        self._result = None

    def execute(self, query, params=None):
        if params is None:
            params = []

        print("=" * 60)
        print("EXECUTE START")
        print(query)
        print("PARAMS:", params)
        print("=" * 60)

        start = time.time()

        try:
            self._result = _client.execute(query, params)

            elapsed = time.time() - start

            print("=" * 60)
            print("EXECUTE FINISHED")
            print("TIME:", elapsed)
            print("ROWS:", len(self._result.rows))
            print("=" * 60)

            return self

        except Exception as e:
            elapsed = time.time() - start

            print("=" * 60)
            print("EXECUTE FAILED")
            print(type(e).__name__)
            print(e)
            print("TIME:", elapsed)
            print("=" * 60)

            raise

    def fetchone(self):
        if len(self._result.rows) == 0:
            return None

        return DBRow(
            self._result.rows[0],
            self._result.columns
        )

    def fetchall(self):
        return [
            DBRow(row, self._result.columns)
            for row in self._result.rows
        ]

    @property
    def lastrowid(self):
        return self._result.last_insert_rowid

    @property
    def rowcount(self):
        return self._result.rows_affected


class TursoConnection:

    def cursor(self):
        return TursoCursor()

    def commit(self):
        pass

    def close(self):
        pass


def get_db():
    return TursoConnection()
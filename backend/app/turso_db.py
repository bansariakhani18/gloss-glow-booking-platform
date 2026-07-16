from libsql_client import create_client_sync
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("TURSO_DATABASE_URL")
DATABASE_TOKEN = os.getenv("TURSO_AUTH_TOKEN")

_client = create_client_sync(
    url=DATABASE_URL,
    auth_token=DATABASE_TOKEN
)


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

        print("\n========== TURSO DEBUG ==========")
        print("DATABASE_URL :", DATABASE_URL)
        print("QUERY        :", query)
        print("PARAMS       :", params)
        print("Executing...")
        print("=================================\n")

        self._result = _client.execute(query, params)

        print("\n========== TURSO DEBUG ==========")
        print("Execution Finished Successfully")
        print("Rows Returned :", len(self._result.rows))
        print("=================================\n")

        return self

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
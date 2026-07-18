import os
import libsql
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("TURSO_DATABASE_URL")
DATABASE_TOKEN = os.getenv("TURSO_AUTH_TOKEN")

LOCAL_DB = "/tmp/gloss_glow_replica.db"


class DBRow:
    def __init__(self, row, columns):
        self._row = tuple(row)
        self._columns = list(columns)

    def __getitem__(self, key):
        if isinstance(key, int):
            return self._row[key]
        return self._row[self._columns.index(key)]

    def __iter__(self):
        return iter(zip(self._columns, self._row))

    def keys(self):
        return self._columns

    def items(self):
        return zip(self._columns, self._row)

    def values(self):
        return self._row

    def __len__(self):
        return len(self._row)


class TursoCursor:
    def __init__(self, cursor):
        self.cursor = cursor

    def execute(self, query, params=()):
        self.cursor.execute(query, params)
        return self

    def executemany(self, query, params):
        self.cursor.executemany(query, params)
        return self

    def fetchone(self):
        row = self.cursor.fetchone()
        if row is None:
            return None
        columns = [c[0] for c in self.cursor.description]
        return DBRow(row, columns)

    def fetchall(self):
        rows = self.cursor.fetchall()
        columns = [c[0] for c in self.cursor.description]
        return [DBRow(r, columns) for r in rows]

    @property
    def lastrowid(self):
        return self.cursor.lastrowid

    @property
    def rowcount(self):
        return self.cursor.rowcount

    def close(self):
        self.cursor.close()


class TursoConnection:
    def __init__(self):
        self.conn = libsql.connect(
            LOCAL_DB,
            sync_url=DATABASE_URL,
            auth_token=DATABASE_TOKEN,
        )

        self.conn.sync()

    def cursor(self):
        return TursoCursor(self.conn.cursor())

    def execute(self, *args, **kwargs):
        return self.conn.execute(*args, **kwargs)

    def commit(self):
        self.conn.commit()
        self.conn.sync()

    def rollback(self):
        self.conn.rollback()

    def close(self):
        self.conn.close()


def get_db():
    return TursoConnection()
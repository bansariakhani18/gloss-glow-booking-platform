from turso_db import get_db

conn = get_db()

cursor = conn.cursor()

cursor.execute(
    "SELECT * FROM test LIMIT 1"
)

row = cursor.fetchone()

print(dict(row))

cursor.execute(
    "SELECT * FROM test"
)

rows = cursor.fetchall()

print(dict(rows[0]))

conn.commit()
conn.close()

print("DONE")
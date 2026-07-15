from turso_db import fetchone, fetchall

row, cols = fetchone("SELECT * FROM test LIMIT 1")

print(row)
print(cols)

rows, cols = fetchall("SELECT * FROM test")

print(rows)
print(cols)
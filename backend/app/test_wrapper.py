from turso_db import fetchone

row = fetchone("SELECT * FROM test LIMIT 1")

print(row)

print(row["id"])
print(row["name"])

print(dict(row))
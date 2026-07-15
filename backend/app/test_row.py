from turso_db import client

result = client.execute("SELECT * FROM test")

row = result.rows[0]

print(type(row))
print(row)

print("Length:", len(row))
print("Columns:", result.columns)
print("First value:", row[0])
print("Second value:", row[1])
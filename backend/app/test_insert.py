from turso_db import client

result = client.execute("SELECT * FROM test")

row = result.rows[0]

print(row.keys())
print(row.values())
print(row.items())
print(row.columns)
print(row)
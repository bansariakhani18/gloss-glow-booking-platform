from libsql_client import create_client_sync

URL = "https://gloss-glow-bansariakhani18.aws-ap-south-1.turso.io"
TOKEN = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3ODM5NjgxNjUsImlkIjoiMDE5ZjVjYmQtOWMwMS03NDk0LWI0ODYtZmRhYmRjYTZkODZlIiwia2lkIjoiRkJJaVdfUFpQNXlKT1ZvLTFRWi05N01yYmxOREU2SmZqN1NvaFNiSWRUWSIsInJpZCI6IjJlOGE2MjA0LTU2MzYtNGNkNi1hODJkLWMwODBmOTU2MjlkZiJ9.cY6zJaclkh85mCRFwpEj5dk3WB9h5kAYIndFpcDFuzP7TBDSrhIbkgEFNsFYscs-3nnvIsrFNWk0TazgPsMPDQ"

client = create_client_sync(
    url=URL,
    auth_token=TOKEN
)

result = client.execute("SELECT 1")

print(result.rows)
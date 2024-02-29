'''
This is the class that takes care of SQL queries for us
The API controller should be the caller of these queries.
'''
import sqlite3
# Query a user by name
def find_user_by_name(uname):
  # Establish connection
  db = sqlite3.connect("test.db")

  if db is None:
    return None

  # Now execute the query
  cursor = db.cursor()

  print(uname)

  cursor.execute("SELECT * FROM user WHERE username = ?", (uname,))

  # And return the tuples
  data = cursor.fetchall()
  return data
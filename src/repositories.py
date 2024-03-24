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

  #print(uname)

  cursor.execute("SELECT * FROM user WHERE username = ?", (uname,))

  data = cursor.fetchone()

  # If the data we are looking for is not found return None
  if data == None:
    return None

  # And return the tuples
  
  return data

# Return a list of tuples of the medicines in the meds table with a matching patientID
def find_meds_by_patientid(userid):
  # sql query the meds table
  db = sqlite3.connect("test.db")

  if db is None:
    return None

  # Now execute the query
  cursor = db.cursor()


  result = cursor.execute("SELECT medicineID, name, amount FROM meds WHERE patientID = ?", (userid,)).fetchall()
  if(len(result) == None):
    return None
  
  return result


# Create a new medicine for a specific user
# The new medicine needs a name, amount, and patient's id to work as a foreign key
def create_meds(userid, name, amount):
  db = sqlite3.connect("test.db")

  if db is None:
    return None
  
  # Now insert into the table a new medicine value with the params that were passed in
  # It would probably be smart to convert that collection into an object with the medicines
  cursor = db.cursor()

  cursor.execute("INSERT INTO meds (patientID, name, amount) VALUES (?, ?, ?)", (userid, name, amount))

  # Now commit the changes we inserted with
  db.commit()


#Delete a medicine from the table
def delete_meds_by_id(medid):
  db = sqlite3.connect("test.db")

  if db is None:
    return None
  
 
  cursor = db.cursor()

  # If we try to delete the medicine and it is not there return a false and 404 error
  


  #SQL deletion with a DELETE FROM command. The medicine ids are unique and reliable
  cursor.execute("DELETE FROM meds WHERE medicineID = ?", (medid,))

  # Now commit the changes we deleted
  db.commit()

  # Return the number of rows affected. If it is 1 then we did it right
  # IF it is more than 1 the table is screwed up
  # If it is 0 then 404 error
  return cursor.rowcount


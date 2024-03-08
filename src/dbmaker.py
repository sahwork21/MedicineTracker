import sqlite3
# Connect to a test.db and this will auto create it
connection = sqlite3.connect("test.db")

print(connection.total_changes)

cursor = connection.cursor()

# Create our tables
# Clear everything and truncate

#cursor.execute("DELETE FROM user")
#cursor.execute("DELETE FROM meds")

#cursor.execute("DROP TABLE user")
#cursor.execute("DROP TABLE meds")

# User table just has a username and basic info
#cursor.execute("CREATE TABLE user(userID INTEGER PRIMARY KEY NOT NULL, username VARCHAR(255), age INTEGER, gender VARCHAR(63), weight INTEGER, hpc VARCHAR(255))")

# Create medicine table. These can just be id, patientID, name, amount
#cursor.execute("CREATE TABLE  meds(medicineID INTEGER PRIMARY KEY NOT NULL, patientID INTEGER, name VARCHAR(255), amount INTEGER)")



 #Inject in some users here
'''
cursor.execute("INSERT INTO user (username, age, gender, weight, hpc) VALUES ('Alice', 32, 'F', 150, 'Dr. Cooper')")
cursor.execute("INSERT INTO user (username, age, gender, weight, hpc) VALUES ( 'Bob', 56, 'M', 160, 'Dr. Jones')")
cursor.execute("INSERT INTO user(username, age, gender, weight, hpc) VALUES ( 'Carol', 65, 'F', 170, 'Dr. Who')")

cursor.execute("INSERT INTO meds VALUES (1001, 1, 'Iburprofen', 50)")
cursor.execute("INSERT INTO meds VALUES (1002, 3, 'Vicodin', 25)")
cursor.execute("INSERT INTO meds VALUES (1003, 3, 'Amoxicillin', 60)")
'''
data = cursor.execute("SELECT * FROM user").fetchall()
print(data)
data = cursor.execute("SELECT * FROM meds").fetchall()
print(data)
# Commit changes and close our connection

# Run a check of select
#data = cursor.execute("SELECT username FROM user WHERE username = ?", ("Alice",)).fetchall()
#print(data)
#print(len(data))

#connection.commit()
cursor.close()

connection.close()

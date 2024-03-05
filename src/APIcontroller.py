'''
This is the API controller for the application
It deals with CRUD operations related to users and their medicines
'''
import sqlite3
from flask import Blueprint, jsonify, request

# Import the repo class to query
import repositories as repo

api = Blueprint('api', __name__)


# This is a global variable to hold all the usernames that have opened up a session
# If this were a real server after an hour has passed we would proably remove these or have TCP help us end the connection
concurrent_sessions = []

# Get the user's info from the table so we can display it
# Query by their unique username
@api.route('/user/<name>', methods=['GET'])
def get_user(name):
  # We will run an sqlite3 query here
  # Normally these type of queries are in another class, but this is still \
  data = repo.find_user_by_name(name)

  # If we got nothing return a 404 not found
  if data is None:
    return "User not found", 404


  # We should also look for their medicines, but maybe that can be another page
  # before we return the data we have to jsonify it with a dict
 

  json_data = {'userID' : data[0],
                    'username' : data[1],
                    'age' : data[2],
                    'gender' : data[3],
                    'weight' : data[4],
                    'hpc' : data[5] }
  

  
  return jsonify(json_data), 200

# API call to make a new user
# We have to use the request.json function to get the json in the request
@api.route('/user/<name>', methods=['POST'])
def make_user(name):
  # Get the JSON data in the request we sent
  # We may not get a json so fail if needed
  data = request.get_json(silent=True)

  #print(data)
  # Before querying we may want to check the username is alphanumeric and escaped

  # Santitize quoutes ' and " to prevent any conditions
  # Sanaitize anything that says <script> or <or>

  # I would just do this since we should not put all our faith into a library for safety

  # This should be a user. We need to pull out the relevant info, SQL query for duplicates, and respond.
  # Query our table
  connection = sqlite3.connect("test.db")
  cursor = connection.cursor()

  
  search = cursor.execute("SELECT username FROM user WHERE username = ?", (data.username,)).fetchall()

  # If the search comes up empty then we can insert this new user
  if len(search) == 0:
    # insert data with the help of our JSON object
    cursor.execute("INSERT INTO user (username, age, gender, weight, hpc) VALUES (?, ?, ?, ?, ?)", (data.username, data.age, data.gender, data.weight, data.hpc))
    return "Account Created.", 200


  # The account could not be created so we need to return a 409 conflict
  return "Account Not Created. Username in use.", 409

# Login the user and add them to a collection of sessions.
# We should probably do a select check of our database, but the previous API call should do that already
@api.route('/login', methods=['POST'])
def login():
  #Get the JSON data which is a username only.
  #If this is not a single string for username this is a bad requests
  name = request.get_json(silent=True)
  if isinstance(name, str):

    concurrent_sessions.append(name)
    return "You are now signed in", 200



  # They made a bad request since this isn't a string
  return "Login requires a string", 400

# Logout method that removes the input user string from the 
# Works to remove names from the session
@api.route('/logout', methods=["POST"])
def logout():
  #Get the JSON data which is a username only.
  #If this is not a single string for username this is a bad requests
  name = request.get_json()
  if isinstance(name, str):

    # Use some splices in a for loop
    concurrent_sessions = [user for user in concurrent_sessions if user != name]
    return "You are now signed out", 200



  # They made a bad request since this isn't a string
  return "Logout requires a string", 400

  


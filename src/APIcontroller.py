'''
This is the API controller for the application
It deals with CRUD operations related to users and their medicines
'''
import sqlite3
from flask import Blueprint, jsonify, request

# Import the repo class to query
import repositories as repo

api = Blueprint('api', __name__)

# Get the user's info from the table so we can display it
# Query by their unique username
@api.route('/user/<name>', methods=['GET'])
def get_user(name):
  # We will run an sqlite3 query here
  # Normally these type of queries are in another class, but this is still \
  data = repo.find_user_by_name(name)

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


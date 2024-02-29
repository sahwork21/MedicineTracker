'''
This is the API controller for the application
It deals with CRUD operations related to users and their medicines
'''
import sqlite3
from flask import Blueprint, jsonify

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

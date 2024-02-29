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
  
  return jsonify(data)

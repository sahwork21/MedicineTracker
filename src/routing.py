'''
This is the routing page that get us pages.
'''
from flask import Blueprint, render_template

# API operations need to be called here since flask and angular servers do not cooperate well
import APIcontroller as api

routes = Blueprint('routes', __name__)

# Get the index page to enforce logins
@routes.route("/")
def index():
  
  return render_template("index.html")

# Get the user page
@routes.route("/user/<name>")
def user(name):
  info = api.get_user(name)

  return info



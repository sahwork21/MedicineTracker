'''
This is the routing page that get us pages.
'''
from flask import Blueprint, render_template, request

# API operations need to be called here since flask and angular servers do not cooperate well
import APIcontroller as api



routes = Blueprint('routes', __name__)

# Get the index page to enforce logins
@routes.route("/")
def index():
  
  return render_template("index.html")

# Get the user page
@routes.route("/home/<name>", methods = ["POST", "GET"])
def user(name):
  if request.method == "POST":
    return render_template("user.html")

  # Return the jsonified data and the page
  return "400 Bad Request", 400



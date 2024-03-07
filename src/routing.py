'''
This is the routing page that get us pages.
'''
from flask import Blueprint, render_template, request, redirect, url_for

# API operations need to be called here since flask and angular servers do not cooperate well
import APIcontroller as api



routes = Blueprint('routes', __name__)

# Get the index page to enforce logins
@routes.route("/")
def index():
  
  return render_template("index.html")

# Get the user page
@routes.route("/home/", methods = ["POST", "GET"])
def user():
  return render_template("user.html")


# Get the profile page
@routes.route("/home/profile/")
def profile():
  return render_template("profile.html")




'''This is a demo for a web application that can track medicine usage for a bunch of users
Users contain info like name, gender, age, weight, and perscriptions
'''
import sqlite3

# Import our routing and api controller
from APIcontroller import api
from routing import routes

from flask import Flask, session, render_template, request, g, jsonify



# Create the Flask app
app = Flask(__name__, template_folder='template')

# Register our controller and blueprint router
app.register_blueprint(api)

app.register_blueprint(routes)

# Tear down the application by closing up the database connection 
@app.teardown_appcontext
def close_connection(exception):
  db = getattr(g, '_database', None)
  if db is not None:
    db.close()


if __name__ == '__main__':
  app.run(debug = True, port = 8080)
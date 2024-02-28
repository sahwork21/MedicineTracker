from flask import Blueprint, jsonify

api = Blueprint('api', __name__)

@api.route('/api/data', methods=['GET'])
def get_data():
  # Implement your API logic here
  data = {'message': 'This is sample API data!'}
  return jsonify(data)

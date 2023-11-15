from flask import Flask, send_from_directory, make_response
from flask_restful import Api, Resource, reqparse
from flask_mysqldb import MySQL
from flask_cors import CORS #comment this on deployment
from api.requestHandler import requestHandler
import dotenv
import os

app = Flask(__name__, static_url_path='', static_folder='react-app/build')
CORS(app) #comment this on deployment
api = Api(app)

dotenv.load_dotenv()

app.secret_key = os.environ.get("SECRET_KEY")

# Database configuration
app.config['MYSQL_HOST'] = os.environ.get("DATABASE_HOST")
app.config['MYSQL_USER'] = os.environ.get("DATABASE_USERNAME")
app.config['MYSQL_PASSWORD'] = os.environ.get("DATABASE_PASSWORD")
app.config['MYSQL_DB'] = os.environ.get("DATABASE_NAME")

# Establish MySQL connection
mysql = MySQL(app)


@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')

from flask import Flask, request, jsonify

app = Flask(__name__)

from flask import Flask, request, jsonify, make_response

app = Flask(__name__)

@app.route('/login', methods=['POST', 'OPTIONS'])
def login():

    # Handle preflight requests for CORS
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'POST,OPTIONS')
        return response

    # Handle actual login request
    data = request.json
    print(data)
    email = data.get('email')
    password = data.get('password')

    # Dummy validation logic
    if email == 'test@gmail.com' and password == 'password':
        response = jsonify({'message': 'Login Successful'})
    else:
        response = jsonify({'error': 'Invalid credentials'}), 401

    # Add CORS headers to the response
    response = make_response(response)
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    return response

if __name__ == '__main__':
    app.run(debug=True)


if __name__ == '__main__':
    app.run(debug=True)


api.add_resource(requestHandler, '/flask/hello')
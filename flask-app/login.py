from flask import Flask, send_from_directory, make_response, request, jsonify, session 
import MySQLdb.cursors, re, hashlib
from flask_restful import Api, Resource, reqparse
from flask_mysqldb import MySQL
from flask_cors import CORS #comment this on deployment
from api.requestHandler import requestHandler
import dotenv
import os
import json

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
    email = data.get('email')
    password = data.get('password')

    # Querying the database
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM users WHERE email = %s AND password = %s', (email, password))
    account = cursor.fetchone()
    print(account)

    if account:
        response = jsonify({'message': 'Login Successful'})
        # Set session variables for logged in user
        session['loggedin'] = True
        session['id'] = account['user_id']
        session['username'] = account['username']
        print("User exists.")
        response = jsonify({'success': 'Successful Login'}), 200

        # Return the dashboard here
    else:
        response = jsonify({'error': 'Invalid credentials'}), 401

        # Return the login page here again but with the error code for invalid creds
    
    # Add CORS headers to the response
    response = make_response(response)
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')

    return json.dumps(response)

if __name__ == '__main__':
    app.run(debug=True)


api.add_resource(requestHandler, '/flask/hello')
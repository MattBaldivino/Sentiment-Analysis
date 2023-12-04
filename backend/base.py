import os
import json
from datetime import datetime, timedelta, timezone
from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_jwt_extended import (
    create_access_token, get_jwt, get_jwt_identity,
    unset_jwt_cookies, JWTManager
)
from flask_bcrypt import Bcrypt
from flask_cors import CORS
import requests

# Initialize Flask app
api = Flask(__name__)

# JWT configuration
api.config["JWT_SECRET_KEY"] = os.environ.get("SECRET_KEY")
jwt = JWTManager(api)

# Database configuration
api.config['MYSQL_HOST'] = os.environ.get("DATABASE_HOST")
api.config['MYSQL_USER'] = os.environ.get("DATABASE_USERNAME")
api.config['MYSQL_PASSWORD'] = os.environ.get("DATABASE_PASSWORD")
api.config['MYSQL_DB'] = os.environ.get("DATABASE_NAME")

# Initialize MySQL
mysql = MySQL(api)

# Initialize bcrypt
bcrypt = Bcrypt(api)

# Origin from different ports not allowed, so adding CORs
CORS(api)

api_endpoint = "https://bbtflv6yqf.execute-api.us-east-1.amazonaws.com/Initial/sentimental-analysis"

def send_single_query(endpoint, text):
    payload = {
        'queryType': 'single',
        'query': text
    }
    response = requests.get(endpoint, params=payload)
    print(response)
    return response.json()

def send_multiple_query(endpoint, texts):
    json_data = json.dumps(texts)
    base64_encoded_data = base64.b64encode(json_data.encode()).decode()

    payload = {
        'queryType': 'multiple',
        'query': base64_encoded_data
    }
    response = requests.get(endpoint, params=payload)
    return response.json()


@api.route('/register', methods=["POST"])
def register():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
    account = cursor.fetchone()

    print(account)

    if account:
        return {"msg": "Email already exists"}, 409

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    cursor.execute("INSERT INTO users (email, password) VALUES (%s, %s)", (email, hashed_password))
    mysql.connection.commit()
    cursor.close()

    return {"msg": "User created successfully"}, 201

@api.route('/token', methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    cursor = mysql.connection.cursor()

    try:
        # Fetch user data based on email only
        cursor.execute("SELECT email, password FROM users WHERE email = %s", (email,))
        account = cursor.fetchone()

        if account:
            stored_password = account[1]  # Assuming the password is the second column

            # Check if entered password matches the stored hashed password
            if bcrypt.check_password_hash(stored_password, password):
                access_token = create_access_token(identity=email)
                response = {"access_token": access_token}
                return response
            else:
                msg = "Wrong email or password"
                return jsonify({"error": msg}), 401
        else:
            msg = "User not found"
            return jsonify({"error": msg}), 404

    except Exception as e:
        msg = f"Error during authentication: {str(e)}"
        return jsonify({"error": msg}), 500


@api.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

@api.route('/analyze-sentiment', methods=["POST"])
def analyze_sentiment():
    data = request.json
    query = data.get("query")

    print(data)

    if not query:
        return jsonify({"error": "No query provided"}), 400

    if isinstance(query, str):
        response = send_single_query(api_endpoint, query)
    elif isinstance(query, list):
        response = send_multiple_query(api_endpoint, query)
    else:
        return jsonify({"error": "Invalid query format"}), 400

    return jsonify(response)

@api.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original response
        return response

if __name__ == '__main__':
    api.run(debug=True)

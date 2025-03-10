from flask import Flask, jsonify, make_response, request
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
from datetime import datetime
from models import db, Users, Job, Admin, Groomer

app = Flask(__name__)

# Configure SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pet_store_database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'supersecretkey'  # Change this in production

# Initialize Extensions
db.init_app(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
# CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})  # Allow React frontend
CORS(app, supports_credentials=True)


@app.route("/")
def home():
    return jsonify({"message": "Welcome to the API!"}), 200

# 🟢 User Registration
@app.route("/register", methods=["POST"])
def register():
    try:
        data = request.get_json()
        
        # Validate required fields
        if not all(key in data for key in ["first_name", "last_name", "email", "password"]):
            return jsonify({"error": "Missing required fields"}), 400

        # Hash the password
        hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        new_user = Users(
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data['email'],
            password=hashed_password
        )
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User registered successfully!"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 🟢 User Login
@app.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        
        if not data or "email" not in data or "password" not in data:
            return jsonify({"error": "Email and password are required"}), 400

        user = Users.query.filter_by(email=data['email']).first()

        if user and bcrypt.check_password_hash(user.password, data['password']):
            access_token = create_access_token(identity=user.id)
            return jsonify({"token": access_token, "user_id": user.id}), 200
        
        return jsonify({"error": "Invalid credentials"}), 401

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 🟢 List all available job services
@app.route("/jobs", methods=["GET"])
def get_jobs():
    try:
        jobs = Job.query.all()
        jobs_list = [{
            "id": job.id,
            "title": job.title,
            "description": job.description,
            "cost": job.cost,
            "date_added": job.date_added.strftime('%Y-%m-%d %H:%M:%S')
        } for job in jobs]

        return jsonify(jobs_list), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 🟢 Book a Job (User must be logged in)
@app.route("/book", methods=["POST"])
@jwt_required()
def book_job():
    try:
        user_id = get_jwt_identity()
        data = request.get_json()

        if "job_id" not in data:
            return jsonify({"error": "Job ID is required"}), 400

        job = Job.query.get(data['job_id'])
        
        if not job:
            return jsonify({"error": "Job not found"}), 404

        return jsonify({"message": "Job booked successfully!", "job": job.title, "user_id": user_id}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 🟢 Get Available Groomers
@app.route("/groomers", methods=["GET"])
def get_groomers():
    try:
        groomers = Groomer.query.all()
        groomer_list = [{
            "id": groomer.id,
            "first_name": groomer.first_name,
            "last_name": groomer.last_name
        } for groomer in groomers]

        return jsonify(groomer_list), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 🛒 Add Shopping Cart Post Feature (Placeholder)
@app.route("/cart", methods=["POST"])
@jwt_required()
def add_to_cart():
    try:
        user_id = get_jwt_identity()
        data = request.get_json()

        if "product_id" not in data or "quantity" not in data:
            return jsonify({"error": "Product ID and quantity are required"}), 400

        return jsonify({"message": "Product added to cart!", "product_id": data["product_id"], "quantity": data["quantity"]}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/users/<int:user_id>", methods=["GET"])
@jwt_required()
def get_user(user_id):
    try:
        current_user_id = get_jwt_identity()
        
        # Ensure the logged-in user can only access their own profile
        if current_user_id != user_id:
            return jsonify({"error": "Unauthorized"}), 403
        
        user = Users.query.get(user_id)
        
        if not user:
            return jsonify({"error": "User not found"}), 404

        user_data = {
            "id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email
            # "phone": user.phone if hasattr(user, "phone") else None  # Ensure 'phone' exists
        }
        return jsonify(user_data), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500





if __name__ == "__main__":
    with app.app_context():
        db.create_all()  # Create tables if they don't exist
    app.run(debug=True)

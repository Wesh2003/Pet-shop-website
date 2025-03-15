from flask import Flask, jsonify, make_response, request
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
from datetime import datetime
from models import db, Users, Job, Admin, Groomer, Shopping_Cart, Receipt, Groomer_Shopping_Cart

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
            access_token = create_access_token(identity=str(user.id))
            return jsonify({"access_token": access_token, "user_id": user.id}), 200
        
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
# @app.route("/book", methods=["POST"])
# @jwt_required()
# def book_job():
#     try:
#         user_id = get_jwt_identity()
#         data = request.get_json()

#         if "job_id" not in data:
#             return jsonify({"error": "Job ID is required"}), 400

#         job = Job.query.get(data['job_id'])
        
#         if not job:
#             return jsonify({"error": "Job not found"}), 404

#         return jsonify({"message": "Job booked successfully!", "job": job.title, "user_id": user_id}), 200

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

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

# # 🛒 Add Shopping Cart Post Feature (Placeholder)
# @app.route("/cart", methods=["POST"])
# @jwt_required()
# def add_to_cart():
#     try:
#         user_id = get_jwt_identity()
#         data = request.get_json()

#         if "product_id" not in data or "quantity" not in data:
#             return jsonify({"error": "Product ID and quantity are required"}), 400

#         return jsonify({"message": "Product added to cart!", "product_id": data["product_id"], "quantity": data["quantity"]}), 200

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


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


@app.route("/shoppingcart/<int:user_id>", methods=["POST"])
@jwt_required()
def add_job_to_user_shoppingcart(user_id):
    try:
        auth_header = request.headers.get("Authorization")
        print("Authorization Header:", auth_header)  # Debugging
        current_user_id = get_jwt_identity()
        if int(current_user_id) != user_id:
            return jsonify({"error": "Unauthorized"}), 403
        data = request.get_json()
        print("Received data:", data)  # Debugging line
        if "job_id" not in data:
            return jsonify({"error": "Job ID is required"}), 400
        job = Job.query.get(data['job_id'])
        if not job:
            print(f"Job with ID {data['job_id']} not found!")
            return jsonify({"error": "Job not found"}), 404
        existing_entry = Shopping_Cart.query.filter_by(user_id=user_id, job_id=data["job_id"]).first()
        if existing_entry:
            print("Job already in cart!")  # Debugging
            return jsonify({"error": "Job already in cart"}), 400
        shopping_cart_entry = Shopping_Cart(user_id=user_id, job_id=data["job_id"])
        db.session.add(shopping_cart_entry)
        db.session.commit()
        return jsonify({"message": "Job added to shopping cart!"}), 200
    except Exception as e:
        print("Error:", str(e))  # Debugging
        return jsonify({"error": str(e)}), 500

@app.route("/shoppingcart/<int:user_id>", methods=["GET"])
@jwt_required()
def get_all_jobs_in_user_shoppingcart(user_id):
    try:
        current_user_id = get_jwt_identity()
        if int(current_user_id) != user_id:
            return jsonify({"error": "Unauthorized"}), 403
        shopping_cart = Shopping_Cart.query.filter_by(user_id=user_id).all()
        if not shopping_cart:
            print("Shopping cart is empty!")  # Debugging
            return jsonify({"cart": []}), 200  # Return an empty array instead of 404
        shopping_cart_list = [{
            "id": entry.id,
            "job_id": entry.job_id,
            "title": entry.job.title,
            "description": entry.job.description,
            "cost": entry.job.cost
        } for entry in shopping_cart]
        return jsonify({"cart": shopping_cart_list}), 200
    except Exception as e:
        print("Error fetching shopping cart:", str(e))
        return jsonify({"error": str(e)}), 500

@app.route("/shoppingcart/<int:user_id>/<int:job_id>", methods=["DELETE"])
@jwt_required()
def delete_job_from_user_shoppingcart(user_id, job_id):
    try:
        current_user_id = get_jwt_identity()
        if int(current_user_id) != user_id:
            return jsonify({"error": "Unauthorized"}), 403

        shopping_cart_entry = Shopping_Cart.query.filter_by(user_id=user_id, job_id=job_id).first()
        if not shopping_cart_entry:
            return jsonify({"error": "Item not found in shopping cart"}), 404

        db.session.delete(shopping_cart_entry)
        db.session.commit()
        return jsonify({"message": "Job removed from shopping cart!"}), 200
    except Exception as e:
        print("Error deleting job from shopping cart:", str(e))
        return jsonify({"error": str(e)}), 500


@app.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)  # Requires a refresh token
def refresh_token():
    current_user = get_jwt_identity()
    new_token = create_access_token(identity=str(current_user))
    return jsonify(access_token=new_token), 200


if __name__ == "__main__":
    with app.app_context():
        db.create_all()  # Create tables if they don't exist
    app.run(debug=True)


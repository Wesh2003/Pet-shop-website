from flask import Flask, jsonify, make_response, request
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
from datetime import datetime
from models import db, Users, Job, Admin, Groomer, Shopping_Cart, Receipt, UserPurchasedTasks, Groomer_Shopping_Cart

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

@app.route("/users", methods=["GET"])
def fetch_all_users():
    try:
        users = Users.query.all()
        users_list = [{
            "id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "password": user.password
        } for user in users]

        return jsonify(users_list), 200

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


@app.route("/users/<int:user_id>", methods=["DELETE"])
@jwt_required()
def delete_user_from_users_list(user_id):
    try:
        # Find user by ID
        user = Users.query.get(user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404

        # Delete user and commit changes
        db.session.delete(user)
        db.session.commit()

        return jsonify({"message": "User deleted successfully"}), 200

    except Exception as e:
        db.session.rollback()
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
            "location": job.location,
            "cost": job.cost,
            "date_added": job.date_added.strftime('%Y-%m-%d %H:%M:%S')
        } for job in jobs]

        return jsonify(jobs_list), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/jobs", methods=["POST"])
def add_job():
    try:
        data = request.get_json()  # Get JSON data from frontend

        # Validate required fields
        if not all(key in data for key in ["title", "description", "location", "cost"]):
            return jsonify({"error": "Missing required fields"}), 400

        # Create a new job entry
        new_job = Job(
            title=data["title"],
            description=data["description"],
            location=data["location"],
            cost=data["cost"],
        )

        # Add and commit to database
        db.session.add(new_job)
        db.session.commit()

        return jsonify({
            "id": new_job.id,
            "title": new_job.title,
            "description": new_job.description,
            "location": new_job.location,
            "cost": new_job.cost
        }), 201  # 201 Created status

    except Exception as e:
        db.session.rollback()  # Rollback in case of error
        return jsonify({"error": str(e)}), 500

@app.route("/jobs/<int:job_id>", methods=["DELETE"])
@jwt_required()
def delete_job_from_jobs_list(job_id):
    try:
        # Find job by ID
        job = Job.query.get(job_id)
        if not job:
            return jsonify({"error": "Job not found"}), 404

        # Delete job and commit changes
        db.session.delete(job)
        db.session.commit()

        return jsonify({"message": "Job deleted successfully"}), 200

    except Exception as e:
        db.session.rollback()  # Rollback in case of error
        return jsonify({"error": str(e)}), 500








# 🟢 Get Available Groomers
@app.route("/groomerregister", methods=["POST"])
def groomer_register():
    try:
        data = request.get_json()
        
        # Validate required fields
        if not all(key in data for key in ["first_name", "last_name", "email", "password"]):
            return jsonify({"error": "Missing required fields"}), 400

        # Hash the password
        hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        new_groomer = Groomer(
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data['email'],
            password=hashed_password
        )
        db.session.add(new_groomer)
        db.session.commit()
        return jsonify({"message": "Groomer registered successfully!"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 🟢 Groomer Login
@app.route("/groomerlogin", methods=["POST"])
def groomer_login():
    try:
        data = request.get_json()
        
        if not data or "email" not in data or "password" not in data:
            return jsonify({"error": "Email and password are required"}), 400

        groomer = Groomer.query.filter_by(email=data['email']).first()

        if groomer and bcrypt.check_password_hash(groomer.password, data['password']):
            groomer_access_token = create_access_token(identity=str(groomer.id))
            return jsonify({"groomer_access_token": groomer_access_token, "groomer_id": groomer.id}), 200
        
        return jsonify({"error": "Invalid credentials"}), 401

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/groomerrefresh", methods=["POST"])
@jwt_required(refresh=True)  # Requires a refresh token
def grooomer_refresh_token():
    current_groomer = get_jwt_identity()
    new_groomer_token = create_access_token(identity=str(current_groomer))
    return jsonify(groomer_access_token=new_groomer_token), 200

@app.route("/groomers", methods=["GET"])
def get_groomers():
    try:
        groomers = Groomer.query.all()
        return jsonify([{
            "id": groomer.id,
            "first_name": groomer.first_name,
            "last_name": groomer.last_name,
            "email": groomer.email
        } for groomer in groomers]), 200  # ✅ Fix: Return array directly

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/groomers/<int:groomer_id>", methods=["GET"])
@jwt_required()
def get_groomer(groomer_id):
    try:
        current_groomer_id = get_jwt_identity()
        
        # Ensure the logged-in groomer can only access their own profile
        if current_groomer_id != groomer_id:
            return jsonify({"error": "Unauthorized"}), 403
        
        groomer = Groomer.query.get(groomer_id)
        
        if not groomer:
            return jsonify({"error": "Groomer not found"}), 404

        groomer_data = {
            "id": groomer.id,
            "first_name": groomer.first_name,
            "last_name": groomer.last_name
        }
        return jsonify(groomer_data), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/groomers/<int:groomer_id>", methods=["DELETE"])
@jwt_required()
def delete_groomer_from_groomers_list(groomer_id):
    try:
        # Find groomer by ID
        groomer = Groomer.query.get(groomer_id)
        if not groomer:
            return jsonify({"error": "Groomer not found"}), 404

        # Delete groomer and commit changes
        db.session.delete(groomer)
        db.session.commit()

        return jsonify({"message": "Groomer deleted successfully"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route("/groomershoppingcart/<int:groomer_id>", methods=["POST"])
@jwt_required()
def add_job_to_groomer_shoppingcart(groomer_id):
    try:
        auth_header = request.headers.get("Authorization")
        print("Authorization Header:", auth_header)  # Debugging
        current_groomer_id = get_jwt_identity()
        if int(current_groomer_id) != groomer_id:
            return jsonify({"error": "Unauthorized"}), 403
        data = request.get_json()
        print("Received data:", data)  # Debugging line
        if "job_id" not in data:
            return jsonify({"error": "Job ID is required"}), 400
        user_purchased_task = UserPurchasedTasks.query.get(data['job_id'])
        if not user_purchased_task:
            print(f"Job with ID {data['job_id']} not found!")
            return jsonify({"error": "Job not found"}), 404
        existing_entry = Groomer_Shopping_Cart.query.filter_by(groomer_id=groomer_id, user_purchased_tasks_id=data["job_id"]).first()
        if existing_entry:
            print("Job already in cart!")  # Debugging
            return jsonify({"error": "Job already in cart"}), 400
        shopping_cart_entry = Groomer_Shopping_Cart(groomer_id=groomer_id, user_purchased_tasks_id=data["job_id"])
        db.session.add(shopping_cart_entry)
        db.session.commit()
        return jsonify({"message": "Job added to shopping cart!"}), 200
    except Exception as e:
        print("Error:", str(e))

@app.route("/groomershoppingcart/<int:groomer_id>", methods=["GET"])
@jwt_required()
def get_all_jobs_in_groomer_shoppingcart(groomer_id):
    try:
        current_groomer_id = get_jwt_identity()
        if int(current_groomer_id) != groomer_id:
            return jsonify({"error": "Unauthorized"}), 403
        shopping_cart = Groomer_Shopping_Cart.query.filter_by(groomer_id=groomer_id).all()
        if not shopping_cart:
            print("Shopping cart is empty!")  # Debugging
            return jsonify({"cart": []}), 200  # Return an empty array instead of 404
        shopping_cart_list = [{
            "id": entry.id,
            "task_id": entry.user_purchased_tasks_id,
            "title": entry.user_purchased_tasks.title,
            "description": entry.user_purchased_tasks.description,
            "location": entry.user_purchased_tasks.location,
            "cost": entry.user_purchased_tasks.cost
        } for entry in shopping_cart]
        return jsonify({"cart": shopping_cart_list}), 200
    except Exception as e:
        print("Error fetching shopping cart:", str(e))
        return jsonify({"error": str(e)}), 500

@app.route("/groomershoppingcart/<int:groomer_id>/<int:job_id>", methods=["DELETE"])
@jwt_required()
def delete_job_from_groomer_shoppingcart(groomer_id, job_id):
    try:
        current_groomer_id = get_jwt_identity()
        if int(current_groomer_id) != groomer_id:
            return jsonify({"error": "Unauthorized"}), 403

        shopping_cart_entry = Groomer_Shopping_Cart.query.filter_by(groomer_id=groomer_id, job_id=job_id).first()
        if not shopping_cart_entry:
            return jsonify({"error": "Item not found in shopping cart"}), 404

        db.session.delete(shopping_cart_entry)
        db.session.commit()
        return jsonify({"message": "Job removed from shopping cart!"}), 200
    except Exception as e:
        print("Error deleting job from shopping cart:", str(e))
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
            "location": entry.job.location,
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







@app.route("/adminregister", methods=["POST"])
def admin_register():
    try:
        data = request.get_json()
        
        # Validate required fields
        if not all(key in data for key in ["first_name", "last_name", "email", "password"]):
            return jsonify({"error": "Missing required fields"}), 400

        # Hash the password
        hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        new_admin = Admin(
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data['email'],
            password=hashed_password
        )
        db.session.add(new_admin)
        db.session.commit()
        return jsonify({"message": "Admin registered successfully!"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 🟢 User Login
@app.route("/adminlogin", methods=["POST"])
def admin_login():
    try:
        data = request.get_json()
        
        if not data or "email" not in data or "password" not in data:
            return jsonify({"error": "Email and password are required"}), 400

        admin = Admin.query.filter_by(email=data['email']).first()

        if admin and bcrypt.check_password_hash(admin.password, data['password']):
            admin_access_token = create_access_token(identity=str(admin.id))
            return jsonify({"admin_access_token": admin_access_token, "admin_id": admin.id}), 200
        
        return jsonify({"error": "Invalid credentials"}), 401

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/adminrefresh", methods=["POST"])
@jwt_required(refresh=True)  # Requires a refresh token
def admin_refresh_token():
    current_admin = get_jwt_identity()
    new_admin_token = create_access_token(identity=str(current_admin))
    return jsonify(admin_access_token=new_admin_token), 200











@app.route("/userpurchasedtask", methods=["POST"])
def add_purchased_job_to_collective():
    try:
        data = request.get_json()  # Get JSON data from frontend

        # Validate required fields
        if not all(key in data for key in ["title", "description", "location","cost"]):
            return jsonify({"error": "Missing required fields"}), 400

        # Create a new job entry
        new_purchased_task = UserPurchasedTasks(
            title=data["title"],
            description=data["description"],
            location=data["location"],
            cost=data["cost"],
        )

        # Add and commit to database
        db.session.add(new_purchased_task)
        db.session.commit()

        return jsonify({
            "id": new_purchased_task.id,
            "title": new_purchased_task.title,
            "description": new_purchased_task.description,
            "location": new_purchased_task.location,
            "cost": new_purchased_task.cost
        }), 201  # 201 Created status

    except Exception as e:
        db.session.rollback()  # Rollback in case of error
        return jsonify({"error": str(e)}), 500


@app.route("/userpurchasedtask", methods=["GET"])
def fetch_all_purchased_job_from_collective():
    try:
        purchased_tasks = UserPurchasedTasks.query.all()
        purchased_tasks_list = [{
            "id": purchased_task.id,
            "title": purchased_task.title,
            "description": purchased_task.description,
            "location": purchased_task.location,
            "cost": purchased_task.cost
        } for purchased_task in purchased_tasks]

        return jsonify(purchased_tasks_list), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/userpurchasedtask/<int:task_id>/mark-taken', methods=['PATCH'])
def mark_task_as_taken(task_id):
    task = UserPurchasedTasks.query.get(task_id)
    if not task:
        return jsonify({"error": "Task not found"}), 404

    task.taken = True
    db.session.commit()
    return jsonify({"message": "Task marked as taken"})






@app.route("/receipt", methods=["POST"])
def add_purchased_job_to_receipt():
    try:
        data = request.get_json()  # Get JSON data from frontend

        # Validate required fields
        if not all(key in data for key in ["title", "description", "cost"]):
            return jsonify({"error": "Missing required fields"}), 400

        # Create a new job entry
        new_receipt = Receipt(
            title=data["title"],
            description=data["description"],
            location=data["location"],
            cost=data["cost"],
        )

        # Add and commit to database
        db.session.add(new_receipt)
        db.session.commit()

        return jsonify({
            "id": new_receipt.id,
            "title": new_receipt.title,
            "description": new_receipt.description,
            "location": new_receipt.location,
            "cost": new_receipt.cost
        }), 201  # 201 Created status

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    with app.app_context():
        db.create_all()  # Create tables if they don't exist
    app.run(debug=True)


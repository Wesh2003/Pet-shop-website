from flask import Flask, jsonify, make_response, request
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import datetime
from models import db, Users, Job, Admin, Groomer

app = Flask(__name__)

# Configure SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pet_store_database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'supersecretkey'  # Change this in production

# Initialize Database
db.init_app(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

@app.route("/")
def home():
    return jsonify({"message": "Welcome to the API!"}), 200

# User Registration
@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
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

# User Login
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    user = Users.query.filter_by(email=data['email']).first()
    if user and bcrypt.check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity=user.id)
        return jsonify({"token": access_token}), 200
    return jsonify({"error": "Invalid credentials"}), 401

#List all available job services
@app.route("/jobs", methods=["GET"])
def get_jobs():
    jobs = Job.query.all()  # This will now work correctly
    jobs_list = [{"id": job.id, "title": job.title, "description": job.description, "cost": job.cost, "date_added": job.date_added} for job in jobs]
    return make_response(jsonify(jobs_list), 200)


# Book a Job (User must be logged in)
@app.route("/book", methods=["POST"])
@jwt_required()
def book_job():
    user_id = get_jwt_identity()
    data = request.get_json()
    job = Job.query.get(data['job_id'])
    if not job:
        return jsonify({"error": "Job not found"}), 404
    return jsonify({"message": "Job booked successfully!", "job": job.title}), 200

# Get Available Groomers
@app.route("/groomers", methods=["GET"])
def get_groomers():
    groomers = Groomer.query.all()
    groomer_list = [{"id": groomer.id, "first_name": groomer.first_name, "last_name": groomer.last_name} for groomer in groomers]
    return jsonify(groomer_list), 200





# Add shopping cart post feature 

# 






if __name__ == "__main__":
    with app.app_context():
        db.create_all()  # Create tables if they don't exist
    app.run(debug=True)

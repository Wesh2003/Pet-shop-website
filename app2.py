# from flask import Flask, make_response, request, jsonify, render_template, session
# from flask_migrate import Migrate

# from flask_restful import Api, Resource
# from werkzeug.exceptions import NotFound
# from models2 import db, Users, Job, Admin, Groomer
# # from auth import Auth
# import os
# # from flask_cors import CORS
# # from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required


# # Initialize Flask app
# app = Flask(__name__)

# # Configure SQLite database
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pet_store_database.db'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# # Initialize Database
# db.init_app(app)

# @app.route("/")
# def home():
#     return jsonify({"message": "Welcome to the API!"}), 200

# @app.route("/jobs" ,methods=["GET"])
# def get_jobs():
#     jobs = Job.query.all()
#     jobs_list = []
#     for job in jobs:
#         job_dict ={
#             "id": job.id,
#             "title":job.title,
#             "description": job.description,
#             "cost": job.cost,
#             "date_added": job.date_added
            
#         }
        
#         jobs_list.append(job_dict)
#     response = make_response(jsonify(jobs_list),200)
#     return response

# if __name__ == "__main__":
#     with app.app_context():
#         db.create_all()  # Create tables if they don't exist
#     app.run(debug=True)
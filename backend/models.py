from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from sqlalchemy import func

db = SQLAlchemy()  # Flask SQLAlchemy instance

class Users(db.Model):  # Use db.Model instead of declarative_base()
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    email = db.Column(db.String(120), unique=True)
    password = db.Column(db.String(255))
    date_added = db.Column(db.DateTime, default=func.current_timestamp())

class Admin(db.Model):
    __tablename__ = 'admins'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    email = db.Column(db.String(120), unique=True)
    password = db.Column(db.String(255))
    date_added = db.Column(db.DateTime, default=func.current_timestamp())

class Groomer(db.Model):
    __tablename__ = 'groomers'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    email = db.Column(db.String(120), unique=True)
    password = db.Column(db.String(255))
    date_added = db.Column(db.DateTime, default=func.current_timestamp())

class Job(db.Model):
    __tablename__ = 'jobs'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255))
    cost = db.Column(db.Integer)
    date_added = db.Column(db.DateTime, default=func.current_timestamp())

class Shopping_Cart(db.Model):
    __tablename__ = 'shopping_carts'
    
    id = db.Column(db.Integer, primary_key=True)
    # title = db.Column(db.String(100), nullable=False)
    # description = db.Column(db.String(255))
    # cost = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Links to Users table
    job_id = db.Column(db.Integer, db.ForeignKey('jobs.id'), nullable=False)  # Links to Jobs table

    user = db.relationship("Users", backref="shopping_cart")  # Define relationship
    job = db.relationship("Job", backref="shopping_carts")  # Define relationship

class Receipt(db.Model):
    __tablename__ = 'receipts'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255))
    cost = db.Column(db.Integer)

class UserPurchasedTasks(db.Model):
    __tablename__ = 'user_purchased_tasks'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255))
    cost = db.Column(db.Integer)
    
class Groomer_Shopping_Cart(db.Model):
    __tablename__ = 'groomer_shopping_carts'
    
    id = db.Column(db.Integer, primary_key=True)

    groomer_id = db.Column(db.Integer, db.ForeignKey('groomers.id'), nullable=False)  # Links to Groomers table
    user_purchased_tasks_id = db.Column(db.Integer, db.ForeignKey('user_purchased_tasks.id'), nullable=False)  # Links to User_Purchased_Tasks table

    groomer = db.relationship("Groomer", backref="groomer_shopping_cart")  # Define relationship
    user_purchased_tasks = db.relationship("UserPurchasedTasks", backref="groomer_shopping_carts")  # Define relationship
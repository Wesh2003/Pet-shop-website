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

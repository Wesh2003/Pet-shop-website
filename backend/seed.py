from faker import Faker
import random
import datetime
from sqlalchemy.orm import sessionmaker
from models import db, Users, Job, Admin, Groomer, Shopping_Cart, Receipt, Groomer_Shopping_Cart

from app import app  # Import the Flask app to get the context

fake = Faker()

with app.app_context():
    db.session.query(Users).delete()
    db.session.query(Job).delete()
    db.session.query(Admin).delete()
    db.session.query(Groomer).delete()

    botw = Users(first_name='Harry', last_name='Potter', email='harry@gmail.com', password='HP3223')
    db.session.add(botw)
    db.session.commit()

    # Seeding users
    for _ in range(10):
        user = Users(
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            email=fake.email(), 
            password=fake.password(), 
            date_added=datetime.datetime.now()
        )
        db.session.add(user)
    
    # Seeding admins
    for _ in range(10):
        admin = Admin(
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            email=fake.email(), 
            password=fake.password(), 
            date_added=datetime.datetime.now()
        )
        db.session.add(admin)
    
    # Seeding groomers
    for _ in range(10):
        groomer = Groomer(
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            email=fake.email(), 
            password=fake.password(), 
            date_added=datetime.datetime.now()
        )
        db.session.add(groomer)

    # Seeding jobs
    job_titles = ['Wash my dog', 'Walk my dog', 'Take my dog to clinic', 'Trim dog claws', 'Feed dog', 'Shop for dog']
    
    for _ in range(10):
        job = Job(
            title=random.choice(job_titles),
            description=fake.sentence(),
            cost=random.randint(500, 3000),
            date_added=datetime.datetime.now()
        )
        db.session.add(job)

    # Commit all
    db.session.commit()

    print("Database seeded successfully!")

# from faker import Faker
# import random, datetime
# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker

# from models import Users, Job, Admin, Groomer

# if __name__ == '__main__':
#     engine = create_engine('sqlite:///pet_store_database.db')
#     Session = sessionmaker(bind=engine)
#     session = Session()

#     session.query(Users).delete()
#     session.query(Job).delete()
#     session.query(Admin).delete()
#     session.query(Groomer).delete()

#     fake = Faker()

#     botw = Users(first_name = 'Harry', last_name = 'Potter', email = 'harry@gmail.com', password = 'HP3223')
#     session.add(botw)
#     session.commit()

#     # -----------------------------------------------------
#     users = []
#     for i in range(10):
#         user = Users(
#             first_name=fake.unique.name(),
#             last_name=fake.unique.name(),
#             email = fake.email(), 
#             password = fake.password(), 
#             date_added= datetime.datetime.now() 
#         )

#         session.add(user)
#         session.commit()
#         users.append(user)

#     # -----------------------------------------------------
#     admins = []
#     for i in range(10):
#         admin = Admin(
#             first_name=fake.unique.name(),
#             last_name=fake.unique.name(),
#             email = fake.email(), 
#             password = fake. password(), 
#             date_added= datetime.datetime.now() 
#         )

#         session.add(admin)
#         session.commit()
#         admins.append(admin)


#     # -----------------------------------------------------
#     groomers = []
#     for i in range(10):
#         groomer = Groomer(
#             first_name=fake.unique.name(),
#             last_name=fake.unique.name(),
#             email = fake.email(), 
#             password = fake. password(), 
#             date_added= datetime.datetime.now() 
#         )

#         session.add(groomer)
#         session.commit()
#         admins.append(groomers)


#     # -----------------------------------------------------
#     job_titles = ['Wash my dog', 'Walk my dog', 'Take my dog to clinic', 'Trimm dog claws', 'Feed dog', 'Shop for dog']
#     jobs = []
#     for i in range(10):
#         job = Job(
#             title=random.choice(job_titles),
#             description=fake.sentence(),
#             cost = random.randint(500, 3000),
#             date_added= datetime.datetime.now()   
#         )

#         # add and commit individually to get IDs back
#         session.add(job)
#         session.commit()
#         jobs.append(job)

    

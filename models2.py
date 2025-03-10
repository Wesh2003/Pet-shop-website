# from sqlalchemy import create_engine, func
# from sqlalchemy import ForeignKey, Table, Column, Integer, String, DateTime, MetaData
# from sqlalchemy.orm import relationship, backref, sessionmaker
# from sqlalchemy.ext.declarative import declarative_base

# engine = create_engine('sqlite:///pet_store_database.db')

# Base = declarative_base()

# class Users(Base):
#     '''a table containing all users of the pet shop'''
#     __tablename__ = 'users'

#     id = Column(Integer(), primary_key=True)
#     first_name = Column(String())
#     last_name = Column(String())
#     email = Column(String())
#     password = Column(String())
#     date_added = Column(DateTime(), default=func.current_date())

#     def __repr__(self):
#         return f'Users(id={self.id}, ' + \
#             f'first name={self.first_name}, ' + \
#             f'last name={self.last_name}, ' + \
#             f'email={self.email}, ' + \
#             f'password={self.password}, ' + \
#             f'date_added={self.date_added})'

# class Admin(Base):
#     '''a table containing all admins of the pet shop'''
#     __tablename__ = 'admins'

#     id = Column(Integer(), primary_key=True)
#     first_name = Column(String())
#     last_name = Column(String())
#     email = Column(String())
#     password = Column(String())
#     date_added = Column(DateTime(), default=func.current_date())

#     def __repr__(self):
#         return f'Admin(id={self.id}, ' + \
#             f'first name={self.first_name}, ' + \
#             f'last name={self.last_name}, ' + \
#             f'email={self.email}, ' + \
#             f'password={self.password}, ' + \
#             f'date_added={self.date_added})'

# class Groomer(Base):
#     '''a table containing all workers of the pet shop'''
#     __tablename__ = 'groomer'

#     id = Column(Integer(), primary_key=True)
#     first_name = Column(String())
#     last_name = Column(String())
#     email = Column(String())
#     password = Column(String())
#     date_added = Column(DateTime(), default=func.current_date())

#     def __repr__(self):
#         return f'Groomer(id={self.id}, ' + \
#             f'first name={self.first_name}, ' + \
#             f'last name={self.last_name}, ' + \
#             f'email={self.email}, ' + \
#             f'password={self.password}, ' + \
#             f'date_added={self.date_added})'

# class Job(Base):
#     '''a table containing all jobs of the pet shop'''
#     __tablename__ = 'jobs'
#     id = Column(Integer(), primary_key=True)
#     title = Column(String())
#     description = Column(String())
#     cost = Column(Integer())
#     date_added = Column(DateTime(), default=func.current_date())

#     def __repr__(self):
#         return f'Job(id={self.id}, ' + \
#             f'first name={self.first_name}, ' + \
#             f'last name={self.last_name}, ' + \
#             f'email={self.email}, ' + \
#             f'password={self.password}, ' + \
#             f'date_added={self.date_added})'






#     Base.metadata.create_all(engine)

#     Session = sessionmaker(bind=engine)
#     session = Session()
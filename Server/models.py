from sqlalchemy_serializer import SerializerMixin   
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import column_property
from datetime import datetime

convention = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}

metadata = MetaData()
db = SQLAlchemy(metadata=metadata)

class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    message = db.Column(db.Text, nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'message': self.message,
            'date': self.date,
        }
    
    def __repr__(self):
        return f'<Contact: {self.name}>'

class Category(db.Model, SerializerMixin):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    toy = db.relationship('Toy', back_populates='category')

    serialize_rules = ('-toys',)

    def __repr__(self):
        return f'<Category: {self.name}>'
    
  
class Toy(db.Model, SerializerMixin):
    __tablename__ = 'toys'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    image = column_property(db.Column(db.String(200), nullable=False))
    age = db.Column(db.Integer, nullable=True)
    price = db.Column(db.Float, nullable=True)
    description = db.Column(db.String, nullable=True)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)

    category = db.relationship('Category', back_populates='toy')

    serialize_rules = ('-category',)

    def __repr__(self):
        return f'<Toy: {self.name}, {self.image}, {self.age}, {self.price}, {self.description}>'
    

# To create table
# flask db init
# flask db migrate -m "Add Contact model"
# flask db upgrade
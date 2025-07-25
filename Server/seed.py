from models import db, Toy, Category
from flask import Flask
from app import app, db, Category, Toy
import json


def seed_toys():
    with open('db.json') as file:
        toys = json.loads(file.read())['toys']
        for toy in toys:
            # Check if toy already exists
            existing_toy = Toy.query.filter_by(name=toy['name']).first()
            if existing_toy:
                print(f"Toy '{toy['name']}' already exists, skipping...")
                continue
                
            print(f"Seeding toy: {toy['name']}")
            category = Category.query.filter_by(name=toy['category_id']).first()
            if not category:
                print(f"Warning: Category '{toy['category_id']}' not found for toy '{toy['name']}'")
                continue
                
            new_toy = Toy (
                name = toy['name'],
                image = toy['image'],
                age = toy['age'],
                price = toy['price'],
                description = toy['description'],
                category_id = category.id
            )
            db.session.add(new_toy)
        db.session.commit()


def seed_categories():
    with open('db.json') as file:
        toys = json.loads(file.read())['toys']  
        categories = set([toy['category_id'] for toy in toys])
        for category in categories:
            # Check if category already exists
            existing_category = Category.query.filter_by(name=category).first()
            if existing_category:
                print(f"Category '{category}' already exists, skipping...")
                continue
                
            print(f"Seeding category: {category}")
            new_category = Category (
                name = category
            )
            db.session.add(new_category)
        db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        print('Seeding Categories...')
        seed_categories()
        print('Seeding toys...')
        seed_toys()
        print('Seeding complete')


# flask db init
# flask db migrate -m "Initial migration"
# flask db upgrade
# export FLASK_APP=app.py


# python seed.py 
# will seed or populate your tables 
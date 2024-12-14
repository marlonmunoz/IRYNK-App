from models import db, Toy, Category
from flask import Flask
from app import app, db, Category, Toy
import json


def seed_toys():
    with open('db.json') as file:
        toys = json.loads(file.read())['toys']
        for toy in toys:
            print(f"Seeding toy: {toy['name']}")
            new_toy = Toy (
                name = toy['name'],
                image = toy['image'],
                age = toy['age'],
                price = toy['price'],
                description = toy['description'],
                category_id = Category.query.filter_by(name=toy['category']).first().id

            )
            db.session.add(new_toy)
        db.session.commit()


def seed_categories():
    with open('db.json') as file:
        toys = json.loads(file.read())['toys']  
        categories = set([toy['category'] for toy in toys])
        for category in categories:
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



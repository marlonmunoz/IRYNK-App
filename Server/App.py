from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate 
from flask_cors import CORS
from models import db,  Toy, Category, Contact
from config import config
import json
import os

app = Flask(__name__)

# Load configuration
config_name = os.getenv('FLASK_ENV', 'development')
app.config.from_object(config[config_name])

db.init_app(app)
migrate = Migrate(app, db)
CORS(app)
# CORS(app, resources={r"/toys/*": {"origins": "*"}})


@app.route('/toys', methods=['GET', 'POST'])
def all_toys():
    if request.method == 'GET':
        toys = Toy.query.all()
        return jsonify([toy.to_dict() for toy in toys]), 200
    elif request.method == 'POST':
        data = request.get_json()

        try:
            new_toy = Toy(
                name = data.get('name'),
                image = data.get('image'),
                age = data.get('age'),
                price = data.get('price'),
                description = data.get('description'),
                category_id = data.get('category_id')
            )
            db.session.add(new_toy)
            db.session.commit()
            return jsonify(new_toy.to_dict()), 201  
        except ValueError as e:
            return jsonify({'error': str(e)}), 400
        

    return new_toy.to_dict(), 201
    
@app.route('/toys/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def toy_by_id(id):
    toy = Toy.query.filter(Toy.id == id).first()

    if not toy:
        return {'error': 'toy not found'}, 400
    
    if request.method == 'GET':
        return jsonify(toy.to_dict()), 200

    elif request.method == 'PATCH':
        data = request.get_json()
        for field in data:
            if hasattr(toy, field):
                try:
                    # Convert data types if necessary
                    if field == 'price':
                        setattr(toy, field, float(data[field]))
                    elif field == 'category_id':
                        setattr(toy, field, int(data[field]) if data[field] is not None else None)
                    else:
                        setattr(toy, field, data[field])
                except ValueError as error:
                    return jsonify({'error': str(error)}), 400
        db.session.commit()
        return jsonify(toy.to_dict()), 200
    
    elif request.method == 'DELETE':
        db.session.delete(toy)
        db.session.commit()

        return {}, 204

# CATEGORIES
@app.route('/categories', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    return jsonify([category.to_dict() for category in categories]), 200

@app.route('/categories/<int:id>/toys', methods=['GET'])
def get_toys_by_category_id(id):
    category = Category.query.get_or_404(id)
    toys = Toy.query.filter_by(category_id=id).all()
    return jsonify({
        'category': category.to_dict(),
        'toys': [toy.to_dict() for toy in toys]
    }), 200

@app.route('/toys/search', methods=['GET'])
def search_toys():
    # Get query parameters
    category_name = request.args.get('category')
    category_id = request.args.get('category_id')
    name = request.args.get('name')
    age = request.args.get('age')
    min_price = request.args.get('min_price')
    max_price = request.args.get('max_price')
    
    # Start with base query
    query = Toy.query
    
    # Filter by category name
    if category_name:
        category = Category.query.filter_by(name=category_name).first()
        if category:
            query = query.filter_by(category_id=category.id)
        else:
            return jsonify([]), 200  # Return empty list if category not found
    
    # Filter by category ID
    if category_id:
        query = query.filter_by(category_id=int(category_id))
    
    # Filter by toy name (partial match)
    if name:
        query = query.filter(Toy.name.ilike(f'%{name}%'))
    
    # Filter by age
    if age:
        query = query.filter(Toy.age.ilike(f'%{age}%'))
    
    # Filter by price range
    if min_price:
        query = query.filter(Toy.price >= float(min_price))
    if max_price:
        query = query.filter(Toy.price <= float(max_price))
    
    # Execute query
    toys = query.all()
    return jsonify([toy.to_dict() for toy in toys]), 200
    
# CONTACT
@app.route('/contacts', methods=['GET'])
def get_contacts():
    contacts = Contact.query.all()
    return jsonify([contact.to_dict() for contact in contacts])

@app.route('/contact', methods=['POST'])
def contact():
    data = request.get_json()
    new_contact = Contact(
        name=data.get('name'),
        email=data.get('email'), 
        message=data.get('message'),
    )
    db.session.add(new_contact)
    db.session.commit()
    return jsonify(new_contact.to_dict()), 201
    # return jsonify({'message': 'Contact information saved successfully!'}), 201

@app.route('/contact/<int:id>', methods=['DELETE'])
def delete_contact(id):
    contact = Contact.query.get_or_404(id)
    db.session.delete(contact)
    db.session.commit()
    return '', 204

    

if __name__ == '__main__':  
    app.run(debug=True, port=5002)



# flask db init
# flask db migrate -m "Initial migration"
# flask db upgrade






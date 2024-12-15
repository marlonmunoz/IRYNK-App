from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate 
from flask_cors import CORS
from models import db,  Toy, Category
import json

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db)
CORS(app)
# CORS(app, resources={r"/toys/*": {"origins": "*"}})


@app.route('/toys', methods=['GET', 'POST'])
def all_toys():
    # t = get_toys()
    if request.method == 'GET':
        toys = Toy.query.all()
        return [toy.to_dict() for toy in toys], 200
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
        except ValueError as error:
            return {'error': str(error)}, 400
        

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

if __name__ == '__main__':  
    app.run(debug=True, port=5001)









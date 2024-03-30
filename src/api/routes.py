"""
This module takes care of starting the API Server, Loading the DB, and Adding the endpoints.
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Recipe
from api.utils import generate_sitemap, APIException
import hashlib
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_cors import CORS 
# from commands import recipe_list

api = Blueprint('api', __name__)

# Initialize Bcrypt here
bcrypt = Bcrypt()

# Allow CORS requests to this API
CORS(api)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def createUser():
    password = request.json.get("password")
    email = request.json.get("email")
    age = request.json.get("age")
    height = request.json.get("height")
    weight = request.json.get("weight")
    activity_level = request.json.get("activity_level")

    user = User.query.filter_by(email=email).first()
    if user != None:
        return jsonify({"msg": "email exists"}), 401
    
    user = User(password=password, email = email, age = age, height= height, weight = weight, activity_level = activity_level)
    db.session.add(user)
    db.session.commit()
    
    response_body = {
        "msg": "User successfully added "
    }

    return jsonify(response_body), 200

@api.route('/private', methods=['GET'])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()    
    user = User.query.get(current_user_id)
    if user is None:
        return jsonify({"msg": "Please login"})
    else:
        return jsonify({"user_id": user.id, "email":user.email}), 200
# end of user related routes


@api.route('/recipes', methods=['GET'])
def get_all_recipes():
    recipes = Recipe.query.all()
    recipes_data = [
        {
            'id': recipe.id,
            'title': recipe.title,
            'subtitle': recipe.subtitle,
            'desc': recipe.desc,
            'img_url': recipe.img_url,
            # Add other fields as needed
        }
        for recipe in recipes
    ]
    return jsonify(recipes_data)

@api.route('/recipes/<int:id>', methods=['GET'])
def recipe_detail(id):
    recipe = Recipe.query.get(id)
    if recipe:
        return jsonify({
            'id': recipe.id,
            'title': recipe.title,
            'subtitle': recipe.subtitle,
            'desc': recipe.desc,
            'img_url': recipe.img_url,
            # Add other fields as needed
        })
    else:
        return jsonify({"error": "Recipe not found"}), 404

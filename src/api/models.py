from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    name = db.Column(db.String(60), nullable=True)
    age = db.Column(db.Integer, nullable=False)
    height = db.Column(db.String(20), nullable=False)
    weight = db.Column(db.Integer, nullable=True)
    activity_level = db.Column(db.String(120), nullable=False)

    def get_favorites(self):
        favorites = Favorites.query.filter_by(uid=self.id)
        favorites = [favorite.serialize() for favorite in favorites]
        return favorites

    def __repr__(self):
        return f'<User {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "age": self.age,
            "height": self.height,
            "weight": self.weight,
            "activity_level": self.activity_level,
            "favorites": self.get_favorites(),
            # do not serialize the password, its a security breach
        }

class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(60), nullable=True)
    subtitle = db.Column(db.String(60), nullable=True)
    desc = db.Column(db.String(60), nullable=True)
    img_url = db.Column(db.String(60), nullable=True)

    # img, title, subtilte, description is what you will need in the recipe class in model.py for now

    # def __repr__(self):
    #     return f'<User {self.id}>'

    # def serialize(self):
    #     return {
    #         "id": self.id,
    #         "title": self.title,
    #         "subtitle": self.subtitle,
    #         "desc": self.desc,
    #         "img_url": self.img_url

            # do not serialize the password, its a security breach
        # }

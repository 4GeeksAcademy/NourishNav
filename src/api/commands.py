
import click
from api.models import db, User, Recipe

"""
In this file, you can add as many commands as you want using the @app.cli.command decorator
Flask commands are usefull to run cronjobs or tasks outside of the API but sill in integration 
with youy database, for example: Import the price of bitcoin every night as 12am
"""
def setup_commands(app):
    
    """ 
    This is an example command "insert-test-users" that you can run from the command line
    by typing: $ flask insert-test-users 5
    Note: 5 is the number of users to add
    """
    @app.cli.command("insert-test-users") # name of our command
    @click.argument("count") # argument of out command
    def insert_test_users(count):
        print("Creating test users")
        for x in range(1, int(count) + 1):
            user = User()
            user.email = "test_user" + str(x) + "@test.com"
            user.password = "123456"
            user.is_active = True
            db.session.add(user)
            db.session.commit()
            print("User: ", user.email, " created.")

        print("All test users created")

    @app.cli.command("insert-test-data")
    def insert_test_data():
        pass

    @app.cli.command("insert-recipes") 
    def insert_recipes():
        recipe_list = [
            {
                "id": "1",
                "title": "Buddha Bowl",
                "img_url": "https://imgur.com/uehhlft",
                "subtitle": "Delicious and Nutritious",
                "desc": "Discover the perfect balance of flavors and nutrients in our Buddha Bowl. Packed with protein, fiber, and essential vitamins.",

            },
            {
                "id": "2",
                "title": "Mediterranean Salad",
                "img_url": "https://imgur.com/nuSR3fB",
                "subtitle": "Fresh and Flavorful",
                "desc": "Indulge in the vibrant tastes of the Mediterranean with our refreshing salad. Bursting with fresh veggies, olives, feta cheese, and a tangy vinaigrette.",

            },
            {
                "id": "3",
                "title": "Chocolate Protein Oats",
                "img_url": "https://imgur.com/E0gnJ26",
                "subtitle": "Energy Booster",
                "desc": "Dive into the creamy delight of Chocolate Protein Overnight Oats. Whole grain oats merge with rich chocolate and a protein boost, creating a decadent yet nutritious start to your day. Sweetened naturally and finished with a hint of sea salt, it's a quick, satisfying fix for your morning cravings.",

            },
            {
                "id": "4",
                "title": "Veggie Flat Wrap",
                "img_url": "https://imgur.com/u6Y2Jw2",
                "subtitle": "Full of Fiber",
                "desc": "Savor the freshness in every bite with our Veggie Wrap, a vibrant medley of crisp vegetables and tangy sauce, all snugly wrapped in a soft, whole-grain tortilla. Perfect for a quick, healthy lunch on the go!",

            },
            {
                "id": "5",
                "title": "Acai Bowl",
                "img_url": "https://imgur.com/Ndqu2Bf",
                "subtitle": "Bliss in a Bowl",
                "desc": "Dive into a refreshing Berry Acai Bowl, where the exotic acai berry meets a colorful array of fresh berries. Topped with crunchy granola and a drizzle of honey, this bowl is a perfect harmony of tart, sweet, and crunchy, making it an irresistible, energizing treat.",

            },
            {
                "id": "6",
                "title": "Berry Nut Oatmeal Delight",
                "img_url": "https://imgur.com/wyEXJhh",
                "subtitle": "A Symphony of Wholesome Goodness",
                "desc": "Start your day with our Berry Nut Oatmeal Delight, where creamy, slow-cooked oats meet the juicy burst of fresh berries and the earthy crunch of toasted nuts. This heartwarming bowl is a testament to simplicity and nutrition, offering a balanced blend of flavors and textures that nourish the soul and energize the body.",

            },
        ]
        for recipe in recipe_list:
            new_recipe = Recipe(
            title = recipe['title'],
            img_url = recipe['img_url'],
            substitle = recipe['subtitle'],
            desc = recipe['desc']
        )
        db.session.add(new_recipe)
        db.session.commit()
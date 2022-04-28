from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from dotenv import load_dotenv
import os
import ast

from mongo_client import mongo_client

load_dotenv(dotenv_path=".env.local")

UNSPLASH_URL = "https://api.unsplash.com/photos/random/"
UNSPLASH_KEY = os.environ.get("UNSPLASH_KEY", None)
FLASK_ENV = os.environ.get("FLASK_ENV")
DEBUG = ast.literal_eval(os.environ.get("DEBUG"))

app = Flask(__name__)
CORS(app=app)

app.config["DEBUG"] = DEBUG
app.config["FLASK_ENV"] = FLASK_ENV

unsplash_gallery = mongo_client.unsplash_gallery
images_collection = unsplash_gallery.images_collection

if not UNSPLASH_KEY:
    raise EnvironmentError("Please create .env.local file and insert UNSPLASH_KEY variable")

@app.get("/new-image")
def new_image():
    args = request.args
    query = args["query"]
    headers = {
        "Accept-Version": "v1",
        "Authorization": f"Client-ID {UNSPLASH_KEY}"
    }
    params = {"query": query}
    response = requests.get(url=UNSPLASH_URL, headers=headers, params=params)
    data = response.json()
    return data, 200

@app.route("/images", methods=["GET", "POST"])
def images():
    if request.method == "GET":
        images = images_collection.find({})
        return jsonify([img for img in images])
    elif request.method == "POST":
        image = request.get_json()
        image["_id"] = image.get("id")
        result = images_collection.insert_one(image)
        inserted_id = result.inserted_id
        return {"insertedId": inserted_id}

@app.route("/delete-image/<image_id>", methods=["DELETE"])
def delete_image(image_id):
    result = images_collection.delete_one({"_id": image_id})
    if not result:
        return {"error": "Image not deleted, please try again"}, 500
    elif result and not result.deleted_count:
        return {"error": "Image not found"}, 404
    else:
        return {"deletedId": image_id}, 200
        


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)
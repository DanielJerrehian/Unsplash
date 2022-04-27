from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv(dotenv_path=".env.local")

MONGO_CLIENT_HOST = os.environ.get("MONGO_CLIENT_HOST")
MONGO_CLIENT_USERNAME = os.environ.get("MONGO_CLIENT_USERNAME")
MONGO_CLIENT_PASSWORD = os.environ.get("MONGO_CLIENT_PASSWORD")
MONGO_CLIENT_PORT = int(os.environ.get("MONGO_CLIENT_PORT"))

mongo_client = MongoClient(
    host = MONGO_CLIENT_HOST,
    username = MONGO_CLIENT_USERNAME,
    password = MONGO_CLIENT_PASSWORD,
    port = MONGO_CLIENT_PORT,
)

def insert_test_document():
    """"Insert sample document to sample collection"""
    db = mongo_client.test
    test_collection = db.test_collection
    test_collection.insert_one({"name": "Daniel", "instructor": False})
        
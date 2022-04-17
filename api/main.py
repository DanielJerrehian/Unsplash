from flask import Flask, request
import requests
from dotenv import load_dotenv
import os

load_dotenv(dotenv_path=".env.local")

app = Flask(__name__)

UNSPLASH_URL = "https://api.unsplash.com/photos/random/"
UNSPLASH_KEY = os.environ.get("UNSPLASH_KEY", None)

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
    # return {
    #     "data": data
    # }, 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)
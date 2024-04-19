from flask import Flask,request
from flask_cors import CORS
from ml_utils import driver

app = Flask(__name__)
CORS(app)
@app.route("/")
def root():
    url  = request.args['url']
    try:
        return driver(url)
    except:
        return {"error": "error"}
    
if __name__== "__main__":
    app.run()
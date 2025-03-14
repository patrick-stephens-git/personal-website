from utils.logging_config import setup_logging
from config import DOC_PATH, VECTOR_STORE_PATH, OPENAI_API_KEY
from flask import Flask, render_template, request, jsonify
from generate_embeddings import create_or_load_vector_store
from generate_response import generate_response
from config import RECAPTCHA_SECRET_KEY
import requests
import json

app = Flask(__name__) # create Flask app
logger = setup_logging() # setup logging
vector_store = create_or_load_vector_store(DOC_PATH, VECTOR_STORE_PATH, OPENAI_API_KEY) # create or load vector store

@app.route("/", methods=["GET"]) # GET requests retrieve data from a server
def home():
    return render_template("index.html") # render the HTML template for Flask app homepage; loads the homepage when user visits "/""

@app.route("/chat", methods=["POST"]) # POST requests submit data to a server
def chat():
    try:
        data = json.loads(request.data) # load JSON data from POST request
        user_prompt = data.get("prompt") # get user_prompt from JSON data
        user_verified = data.get("user_verified", False) # get user_verified from JSON data
        recaptcha_response = data.get("recaptcha_response") # get recaptcha_response from JSON data
        
        # At this point, user is not verified
        if not user_verified: 
            print("User not verified.")
            # check if recaptcha_response is empty
            if not recaptcha_response: # check if recaptcha_response is empty
                return jsonify({"response": "reCAPTCHA verification required."}), 400 # return error message if recaptcha_response is empty
            print("reCAPTCHA verification required.")
            
            # if user_verified is empty; verify reCAPTCHA response
            recaptcha_verify_url = "https://www.google.com/recaptcha/api/siteverify"
            recaptcha_payload = {
                "secret": RECAPTCHA_SECRET_KEY,
                "response": recaptcha_response
            }
            recaptcha_result = requests.post(recaptcha_verify_url, data=recaptcha_payload).json() # send POST request to reCAPTCHA API

            if not recaptcha_result.get("success"): # check if reCAPTCHA verification failed
                return jsonify({"response": "reCAPTCHA verification failed."}), 400 # return error message if reCAPTCHA verification failed
                
        # At this point, user is verified (you might want to store this in a session or database; for added security, consider implementing a session token system)
        if not user_prompt: # check if user_prompt is empty
            return jsonify({"response": "Please enter a message."}) # return error message if user_prompt is empty

        response = generate_response(user_prompt, vector_store)

        logger.info(f"User Prompt: {user_prompt}")
        logger.info(f"API Response: {response}")

        return jsonify({"response": response})
    
    # Handle exceptions
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"response": "An error occurred."}), 500

if __name__ == "__main__":
    app.run(debug=True)
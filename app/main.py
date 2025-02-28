from utils.logging_config import setup_logging
from flask import Flask, render_template, request, jsonify
from generate_embeddings import vector_store
from generate_response import generate_response
from config import RECAPTCHA_SECRET_KEY
import requests
import json

app = Flask(__name__)

###################################
# Define a route for the homepage
###################################
@app.route("/", methods=["GET"])
def home():
    return render_template("index.html")

###################################
# 5. Flask Route for Chat
###################################
@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = json.loads(request.data)
        user_prompt = data.get("prompt") 
        user_verified = data.get("user_verified", False)
        recaptcha_response = data.get("recaptcha_response")
        
         # Check if this is a new user needing verification
        if not user_verified:
            # Validate reCAPTCHA for new users
            if not recaptcha_response:
                return jsonify({"response": "reCAPTCHA verification required."}), 400
                
            # Verify with Google
            recaptcha_verify_url = "https://www.google.com/recaptcha/api/siteverify"
            recaptcha_payload = {
                "secret": RECAPTCHA_SECRET_KEY,
                "response": recaptcha_response
            }
            recaptcha_result = requests.post(recaptcha_verify_url, data=recaptcha_payload).json()

            if not recaptcha_result.get("success"):
                return jsonify({"response": "reCAPTCHA verification failed."}), 400
                
            # At this point, user is verified
            # You might want to store this in a session or database
            # For added security, consider implementing a session token system

        if not user_prompt:
            return jsonify({"response": "Please enter a message."})

        response = generate_response(user_prompt, vector_store)

        print(f"User prompt: {user_prompt}")
        print(f"AI response: {response}")

        return jsonify({"response": response})
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"response": "An error occurred."}), 500

if __name__ == "__main__":
    app.run(debug=True)
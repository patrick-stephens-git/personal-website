from utils.logging_config import setup_logging
from config import DOC_PATH, VECTOR_STORE_PATH, OPENAI_API_KEY
from flask import Flask, render_template, request, jsonify
from generate_embeddings import create_or_load_vector_store
from generate_response import generate_response
from config import RECAPTCHA_SECRET_KEY
from db import get_db_connection
from datetime import datetime
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

        date = datetime.now().date() # detect date in this format: 2025-05-14
        device = request.user_agent.platform or "unknown" # detect device type (desktop, mobile, etc.) for the PostgreSQL database
        user_id = request.remote_addr # sets the user_id to the IP address of the user making the request for the PostgreSQL database

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

        # Log to PostgreSQL database:
        conn = get_db_connection() # establish a database connection
        cur = conn.cursor() # create a cursor object to execute SQL commands; it’s an object that lets you execute SQL commands (queries, updates, etc) on the database.
        cur.execute("""
            INSERT INTO chat_logs (date, user_id, device, prompt, response)
            VALUES (%s, %s, %s, %s, %s);
        """, (date, user_id, device, user_prompt, response)) # prepare and execute the SQL insert statement; the SQL query is an INSERT INTO statement, meaning you’re adding a new row into the chat_logs table in the database. chat_logs is the table where you’re storing user data, like prompts and responses. The columns you're inserting data into are: user_id, prompt, response, and device. The values (%s, %s, %s, %s) are placeholders, and they will be replaced by the values inside the tuple (user_id, user_prompt, response, device).
        conn.commit() # commit the transaction (save the changes). If you don’t call commit(), the new data will not be saved to the database.
        cur.close() # close the cursor to free up resources; Closing the cursor releases any resources (memory) it was using.
        conn.close() # close the connection to the database; This frees up any resources the connection was using.

        return jsonify({"response": response})
    
    # Handle exceptions
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"response": "An error occurred."}), 500

if __name__ == "__main__":
    app.run(debug=True)
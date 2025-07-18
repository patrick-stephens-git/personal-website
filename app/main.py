from utils.logging_config import setup_logging
from config import DOC_PATH, VECTOR_STORE_PATH, OPENAI_API_KEY
from flask import Flask, render_template, request, jsonify
from services.generate_embeddings import create_or_load_vector_store
from services.generate_response import generate_response
from services.recaptcha_service import verify_recaptcha
from db import SessionLocal, init_db
from models import ChatLog
from datetime import datetime
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
            recaptcha_result = verify_recaptcha(recaptcha_response)
            if not recaptcha_result.get("success"): # check if reCAPTCHA verification failed
                return jsonify({"response": "reCAPTCHA verification failed."}), 400 # return error message if reCAPTCHA verification failed
        # At this point, user is verified (you might want to store this in a session or database; for added security, consider implementing a session token system)
        if not user_prompt: # check if user_prompt is empty
            return jsonify({"response": "Please enter a message."}) # return error message if user_prompt is empty

        response = generate_response(user_prompt, vector_store)

        logger.info(f"User Prompt: {user_prompt}")
        logger.info(f"API Response: {response}")

        # Log to PostgreSQL database (fail gracefully if database is unavailable)
        try:
            db = SessionLocal()  # open DB session
            # create a new chat log row
            chat_log = ChatLog(
                date=date,
                user_id=user_id,
                device=device,
                prompt=user_prompt,
                response=response
            ) 
            db.add(chat_log) # stage it
            db.commit() # commit the transaction (save the changes), if you don’t call commit() then the new data will not be saved to the database
        except Exception as db_error:
            logger.error(f"Database logging failed: {db_error}")
        finally:
            try:
                db.close() # only close session if db was successfully created, frees up any resources the session was using
            except:
                pass # db may not have initialized if SessionLocal() failed, avoids crashing if db was never initialized

        return jsonify({"response": response})
    
    # Handle exceptions
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"response": "An error occurred."}), 500

if __name__ == "__main__":
    init_db() # create tables before starting the app (does NOT delete or drop existing tables, it only creates tables that do NOT already exist)
    app.run(debug=True)
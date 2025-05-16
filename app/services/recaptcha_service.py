import requests
from flask import jsonify
from config import RECAPTCHA_SECRET_KEY

def verify_recaptcha(recaptcha_response): # verify Google reCAPTCHA response from frontend form
    if not recaptcha_response: # check if recaptcha_response is empty
        return False, jsonify({"response": "reCAPTCHA verification required."}), 400 # return error message if recaptcha_response is empty

    # if user_verified is empty; verify reCAPTCHA response
    recaptcha_verify_url = "https://www.google.com/recaptcha/api/siteverify"
    recaptcha_payload = {
        "secret": RECAPTCHA_SECRET_KEY,
        "response": recaptcha_response
    }
    recaptcha_result = requests.post(recaptcha_verify_url, data=recaptcha_payload).json() # send POST request to reCAPTCHA API

    if not recaptcha_result.get("success"): # check if reCAPTCHA verification failed
        return False, jsonify({"response": "reCAPTCHA verification failed."}), 400 # return error message if reCAPTCHA verification failed

    return recaptcha_result
from flask import Flask, render_template

app = Flask(__name__)

# Define a route for the homepage
@app.route("/")
def hello_world():
        message = "Hello, World from Flask Template!"
        return render_template("index.html", message=message)

if __name__ == "__main__":
    app.run(debug=True)
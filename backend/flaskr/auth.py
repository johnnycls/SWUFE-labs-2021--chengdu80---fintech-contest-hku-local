import functools

from flask import Blueprint
from flask import flash
from flask import g
from flask import redirect
from flask import render_template
from flask import request
from flask import session
from flask import url_for
from werkzeug.security import check_password_hash
from werkzeug.security import generate_password_hash

from flaskr.db import get_db
from flask import jsonify

import flaskr.model

import json

bp = Blueprint("auth", __name__, url_prefix="/auth")


@bp.route("/register", methods=("GET", "POST"))
def register():
    """Register a new user.

    Validates that the username is not already taken. Hashes the
    password for security.
    """
    error = None
    if request.method == "POST":
        data = request.get_data()
        j_data =  json.loads(data)
        username = j_data["username"]
        password = j_data["password"]
        db = get_db()
        

        if not username:
            error = "Username is required."
        elif not password:
            error = "Password is required."
        elif (
            db.execute("SELECT id FROM user WHERE username = ?", (username,)).fetchone()
            is not None
        ):
            error = f"User {username} is already registered."

        if error is None:
            # the name is available, store it in the database and go to
            # the login page
            db.execute(
                "INSERT INTO user (username, password) VALUES (?, ?)",
                (username, generate_password_hash(password)),
            )
            db.commit()
            return jsonify(
                res= 0,
                msg= "success",
            )

        #flash(error)

    #return render_template("auth/register.html")
    return jsonify(
                res= -1,
                msg= error,
            )


@bp.route("/login", methods=("GET", "POST"))
def login():
    """Log in a registered user by adding the user id to the session."""
    error = None
    if request.method == "POST":
        data = request.get_data()
        j_data =  json.loads(data)
        username = j_data["username"]
        password = j_data["password"]
        db = get_db()
        
        if not username:
            error = "Username is required."
        elif not password:
            error = "Password is required."
        
        user = db.execute(
            "SELECT * FROM user WHERE username = ?", (username,)
        ).fetchone()

        if user is None:
            error = "Incorrect username."
        elif not check_password_hash(user["password"], password):
            error = "Incorrect password."

        if error is None:
            # store the user id in a new session and return to the index
            session.clear()
            session["user_id"] = user["id"]
            #return redirect(url_for("index"))
            return jsonify(
                res= 0,
                msg= "success",
            )

        #flash(error)

    #return render_template("auth/login.html")
    return jsonify(
                res= -1,
                msg= error,
            )


@bp.route("/logout")
def logout():
    """Clear the current session, including the stored user id."""
    session.clear()
    return redirect(url_for("index"))

@bp.route('/home')
def home():
    return render_template('home.html')

@bp.route('/classify',methods=['GET'])
def classify_type():
    sepal_len = request.args.get('slen') # Get parameters for sepal length
    sepal_wid = request.args.get('swid') # Get parameters for sepal width
    petal_len = request.args.get('plen') # Get parameters for petal length
    petal_wid = request.args.get('pwid') # Get parameters for petal width

    # Get the output from the classification model
    variety = flaskr.model.classify(sepal_len, sepal_wid, petal_len, petal_wid)

    # Render the output in new HTML page
    return render_template('out.html', variety=variety)

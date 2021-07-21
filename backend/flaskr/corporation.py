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

bp = Blueprint("corporation", __name__, url_prefix="/corporation")


def login_required(view):
    """View decorator that redirects anonymous users to the login page."""

    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            return redirect(url_for("auth.login"))

        return view(**kwargs)

    return wrapped_view


@bp.before_app_request
def load_logged_in_user():
    """If a user id is stored in the session, load the user object from
    the database into ``g.user``."""
    user_id = session.get("user_id")

    if user_id is None:
        g.user = None
    else:
        g.user = (
            get_db().execute("SELECT * FROM user WHERE id = ?", (user_id,)).fetchone()
        )


@bp.route("/search", methods=("GET", "POST"))
def login():
    try:
        error = None
        if request.method == "POST":
            data = request.get_data()
            j_data =  json.loads(data)
            result = dict()
            entid = j_data["id"]
            db = get_db()
            
            corporation = db.execute(
                "SELECT * FROM corporation WHERE entid = ?", (entid,)
            ).fetchone()

            corporation_years = db.execute(
                "SELECT * FROM tax_year WHERE entid = ?", (entid,)
            ).fetchall()

            corporation_company_ar_assetsinfos = db.execute(
                "SELECT * FROM company_ar_assetsinfo WHERE entid = ?", (entid,)
            ).fetchall()

            if corporation is None:
                error = "Entid is not exist"

            result = dict(corporation)
            result['year'] = []
            result['revenue'] = {}
            result['sales_expense'] = {}
            result['retained_profits'] = {}
            result['gross_profit'] = {}
            for item_year in corporation_years:
                if item_year['year'] != '':
                    result['year'].append(item_year['year'])
                if item_year['revenue'] != '':
                    result['revenue'][item_year['year']] = float(item_year['revenue'])
                if item_year['sales_expense'] != '':
                    result['sales_expense'][item_year['year']] = float(item_year['sales_expense'])
                if item_year['retained_profits'] != '':
                    result['retained_profits'][item_year['year']] = float(item_year['retained_profits'])
                if item_year['gross_profit'] != '':
                    result['gross_profit'][item_year['year']] = float(item_year['gross_profit'])
            result['grossProfitMargin'] = {}
            result['opexRatio'] = {}
            result['netProfitMarginRatio'] = {}
            #print(result['gross_profit'])
            #print(result['revenue'])
            if result['year'][-1] in result['gross_profit'].keys() and result['year'][-1] in result['revenue'].keys():
                result['grossProfitMargin'][result['year'][-1]] = result['gross_profit'][result['year'][-1]] / result['revenue'][result['year'][-1]]
            if result['year'][-1] in result['sales_expense'].keys() and result['year'][-1] in result['revenue'].keys():
                result['opexRatio'][result['year'][-1]] = result['sales_expense'][result['year'][-1]] / result['revenue'][result['year'][-1]]
            if result['year'][-1] in result['retained_profits'].keys() and result['year'][-1] in result['revenue'].keys():
                result['netProfitMarginRatio'][result['year'][-1]] = result['retained_profits'][result['year'][-1]] / result['revenue'][result['year'][-1]]
            
            result['ASSGRO'] = {}
            result['LIAGRO'] = {}
            result['TOTEQU'] = {}
            result['debtEquityRatio'] = {}
            for item_corporation_company_ar_assetsinfo in corporation_company_ar_assetsinfos:
                if item_corporation_company_ar_assetsinfo['ASSGRO'] != '':
                    result['ASSGRO'][item_corporation_company_ar_assetsinfo['ANCHEYEAR_asset']] = float(item_corporation_company_ar_assetsinfo['ASSGRO'])
                if item_corporation_company_ar_assetsinfo['LIAGRO'] != '':
                    result['LIAGRO'][item_corporation_company_ar_assetsinfo['ANCHEYEAR_asset']] = float(item_corporation_company_ar_assetsinfo['LIAGRO'])
                if item_corporation_company_ar_assetsinfo['TOTEQU'] != '':
                    result['TOTEQU'][item_corporation_company_ar_assetsinfo['ANCHEYEAR_asset']] = float(item_corporation_company_ar_assetsinfo['TOTEQU'])
                if item_corporation_company_ar_assetsinfo['ANCHEYEAR_asset'] in result['LIAGRO'].keys() and item_corporation_company_ar_assetsinfo['ANCHEYEAR_asset'] in result['TOTEQU'].keys():
                    result['debtEquityRatio'][item_corporation_company_ar_assetsinfo['ANCHEYEAR_asset']] = result['LIAGRO'][item_corporation_company_ar_assetsinfo['ANCHEYEAR_asset']] / result['TOTEQU'][item_corporation_company_ar_assetsinfo['ANCHEYEAR_asset']]
            
            if error is None:
                # store the user id in a new session and return to the index
                return jsonify(
                    res= 0,
                    data=result,
                )
    except:
        return jsonify(
                res= -1,
                msg= "The format of request is wrong.",
            )
        #flash(error)
    else:
        return jsonify(
                    res= -1,
                    msg= error,
                )

@bp.route("/watch_add", methods=("GET", "POST"))
def watchadd():
    error = None
    if request.method == "POST":
        data = request.get_data()
        j_data = json.loads(data)
        username = j_data["username"]
        companyId = j_data["companyId"]
        db = get_db()
        result = {}
        if not username:
            error = "Username is required."
        elif not companyId:
            error = "companyId is required."
        if (db.execute("SELECT * FROM corporation WHERE entid = ?", (companyId,)).fetchone() is None):
            error = "CompanyId is not exit."
        if error is None:
            db.execute(
                "INSERT INTO userwatch (username, entid) VALUES (?, ?)",
                (username, companyId),
            )
            db.commit()
            result['entid'] = companyId
            return jsonify(
                    res= 0,
                    data= result,
                )
    return jsonify(
                    res= -1,
                    msg= error,
                )

@bp.route("/watch_del", methods=("GET", "POST"))
def watchdel():
    error = None
    if request.method == "POST":
        data = request.get_data()
        j_data = json.loads(data)
        username = j_data["username"]
        companyId = j_data["companyId"]
        db = get_db()
        result = {}
        if not username:
            error = "Username is required."
        elif not companyId:
            error = "companyId is required."
        if (db.execute("SELECT * FROM corporation WHERE entid = ?", (companyId,)).fetchone() is None):
            error = "CompanyId is not exit."
        if error is None:
            db.execute(
                "DELETE FROM userwatch WHERE username = ? AND entid = ?",
                (username, companyId),
            )
            db.commit()
            return jsonify(
                    res= 0,
                    msg= 'success',
                )
    return jsonify(
                    res= -1,
                    msg= error,
                )

@bp.route("/watch_list", methods=("GET", "POST"))
def watchlist():
    error = None
    if request.method == "POST":
        data = request.get_data()
        j_data = json.loads(data)
        username = j_data["username"]
        result = []
        db = get_db()
        if not username:
            error = "Username is required."
        userwatchs = db.execute(
                "SELECT * FROM userwatch WHERE username = ?", (username,)
        ).fetchall()
        for item in userwatchs:
            item_tmp = dict()
            item_tmp['entid'] = item['entid']
            result.append(item_tmp)
        if error is None:
            return jsonify(
                        res= 0,
                        data=result,
                    )
    return jsonify(
                    res= -1,
                    msg= error,
                )

@bp.route("/cluster", methods=("GET", "POST"))
def cluster():
    error = None
    if request.method == "POST":
        data = request.get_data()
        j_data = json.loads(data)
        entid = j_data["id"]
        result = []
        db = get_db()
        if not entid:
            error = "Entid is required."
        cluster_output_id = db.execute(
                "SELECT * FROM cluster_output WHERE entid = ?", (entid,)
        ).fetchone()

        if cluster_output_id is None:
                error = "Entid is not exist"
        
        if cluster_output_id['cluster'] == -1:
            return jsonify(
                        res= 0,
                        data=[],
                    )

        cluster_outputs = db.execute(
                "SELECT * FROM cluster_output WHERE cluster = ?", (cluster_output_id['cluster'],)
        ).fetchall()

        for item in cluster_outputs:
            item_tmp = dict()
            item_tmp['entid'] = item['entid']
            result.append(item_tmp)

        if error is None:
            return jsonify(
                        res= 0,
                        data=result,
                    )

    return jsonify(
                    res= -1,
                    msg= error,
                )
def prob(str1):
    str1 = str1.replace('[','')
    str1 = str1.replace(']','')
    list1 = str1.split()
    for i in range(len(list1)):
        list1[i] = float(list1[i])
    return list1

def lime(str1):
    str1 = str1.replace('[', '')
    str1 = str1.replace(']', '')
    str1 = str1.replace('(', '')
    str1 = str1.replace(')', '')
    str1 = str1.replace('\'', '')
    list1 = str1.split(',')
    dict1 = dict()
    for i in range(0,len(list1), 2):
        dict1[list1[i]] = float(list1[i+1])
    return  dict1

@bp.route("/risk", methods=("GET", "POST"))
def risk():
    error = None
    if request.method == "POST":
        data = request.get_data()
        j_data = json.loads(data)
        entid = j_data["id"]
        result = dict()
        db = get_db()
        if not entid:
            error = "Entid is required."
        risk_item = db.execute(
                "SELECT * FROM final_label_prob_and_explain WHERE entid = ?", (entid,)
        ).fetchone()

        if risk_item is None:
                error = "Entid is not exist"
        result = dict(risk_item) 
        result['Probability'] = prob(result['Probability'])
        result['lime'] = lime(result['lime'])
        
        if error is None:
            return jsonify(
                        res= 0,
                        data=result,
                    )

    return jsonify(
                    res= -1,
                    msg= error,
                )
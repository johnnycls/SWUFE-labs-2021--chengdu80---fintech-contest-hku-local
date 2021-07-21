import sqlite3

import click
from flask import current_app
from flask import g
from flask.cli import with_appcontext

import csv
import logging

def _get_col_datatypes(fin):
    dr = csv.DictReader(fin) # comma is default delimiter
    fieldTypes = {}
    for entry in dr:
        feildslLeft = [f for f in dr.fieldnames if f not in fieldTypes.keys()]
        if not feildslLeft: break # We're done
        for field in feildslLeft:
            data = entry[field]

            # Need data to decide
            if len(data) == 0:
                continue

            if data.isdigit():
                fieldTypes[field] = "INTEGER"
            else:
                fieldTypes[field] = "TEXT"
        # TODO: Currently there's no support for DATE in sqllite

    if len(feildslLeft) > 0:
        raise Exception("Failed to find all the columns data types - Maybe some are empty?")

    return fieldTypes


def escapingGenerator(f):
    for line in f:
        yield line.encode("ascii", "xmlcharrefreplace").decode("ascii")


def csvToDb(csvFile, table_name, outputToFile = False):
    # TODO: implement output to file

    with current_app.open_resource(csvFile,'r') as fin:
        dt = _get_col_datatypes(fin)

        fin.seek(0)

        reader = csv.DictReader(fin)

        # Keep the order of the columns name just as in the CSV
        fields = reader.fieldnames
        cols = []

        # Set field and type
        for f in fields:
            #f = f.replace
            cols.append("%s %s" % (f, dt[f]))

        # Generate create table statement:
        stmt = "CREATE TABLE {0} ({1})".format(table_name, ",".join(cols))

        print(stmt)
        #exit()
        con = get_db()
        cur = con.cursor()
        cur.execute(stmt)

        fin.seek(0)


        reader = csv.reader(escapingGenerator(fin))

        # Generate insert statement:
        stmt = "INSERT INTO {0} VALUES({1});".format(table_name, ','.join('?' * len(cols)))

        cur.executemany(stmt, reader)
        con.commit()

    return con

def get_db():
    """Connect to the application's configured database. The connection
    is unique for each request and will be reused if this is called
    again.
    """
    if "db" not in g:
        g.db = sqlite3.connect(
            current_app.config["DATABASE"], detect_types=sqlite3.PARSE_DECLTYPES
        )
        g.db.row_factory = sqlite3.Row

    return g.db


def close_db(e=None):
    """If this request connected to the database, close the
    connection.
    """
    db = g.pop("db", None)

    if db is not None:
        db.close()


def init_db():
    """Clear existing data and create new tables."""
    db = get_db()

    with current_app.open_resource("schema.sql") as f:
        db.executescript(f.read().decode("utf8"))

    csvToDb("data/total.csv", "corporation")
    csvToDb("data/tax_year.csv", "tax_year")
    csvToDb("data/company_ar_assetsinfo.csv", "company_ar_assetsinfo")
    csvToDb("data/cluster_output.csv", "cluster_output")
    csvToDb("data/final_label_prob_and_explain.csv", "final_label_prob_and_explain")


@click.command("init-db")
@with_appcontext
def init_db_command():
    """Clear existing data and create new tables."""
    init_db()
    click.echo("Initialized the database.")


def init_app(app):
    """Register database functions with the Flask app. This is called by
    the application factory.
    """
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)

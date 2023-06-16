# Flask app goes here
import numpy as np
import pandas as pd
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify
import psycopg2
from pathlib import Path
# Use hidden file to import postgres db pwd
from config import postgres_key
#################################################
# Database Setup
#################################################
engine = create_engine(f"postgresql+psycopg2://postgres:{postgres_key}@localhost/aqi")
conn = engine.connect()

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/names<br/>"
        f"/api/v1.0/passengers"
    )

@app.route("/api/v1.0/read_samples")
def names():
    # Create our session (link) from Python to the DB
    

    """Return a list of all passenger names"""
    # Query all passengers and save them back
    contacts_data = pd.read_sql('SELECT * FROM aqi LIMIT 10', conn)

    # Convert list of tuples into normal list
    # all_names = list(np.ravel(results))
    #flattens tuples into a list of lists
    # can also use list(results)

    return jsonify(contacts_data.to_json())

if __name__ == '__main__':
    app.run(debug=True)

-- Initialize the database.
-- Drop any existing data and create empty tables.

DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS corporation;
DROP TABLE IF EXISTS tax_year;
DROP TABLE IF EXISTS company_ar_assetsinfo;
DROP TABLE IF EXISTS userwatch;
DROP TABLE IF EXISTS cluster_output;
DROP TABLE IF EXISTS final_label_prob_and_explain;

CREATE TABLE user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE post (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  author_id INTEGER NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  FOREIGN KEY (author_id) REFERENCES user (id)
);

CREATE TABLE userwatch(
    username TEXT,
    entid INTEGER,
    UNIQUE(username,entid)
);
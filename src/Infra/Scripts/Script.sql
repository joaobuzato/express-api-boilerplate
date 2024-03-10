DROP DATABASE IF EXISTS example_database;
CREATE DATABASE example_database;

use example_database;

CREATE TABLE example (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

INSERT INTO example (name) VALUES ('John Doe');
INSERT INTO example (name) VALUES ('Jane Doe');
INSERT INTO example (name) VALUES ('Alice');
INSERT INTO example (name) VALUES ('Bob');




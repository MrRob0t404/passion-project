DROP DATABASE IF EXISTS cloudnotes;
CREATE DATABASE cloudnotes;

\c cloudnotes;


DROP TABLE IF EXISTS users;

CREATE TABLE users (
    ID SERIAL PRIMARY KEY,
    fullName VARCHAR,
    username VARCHAR UNIQUE,
    password_digest VARCHAR,
    email VARCHAR
);

INSERT INTO users (username, fullName, password_digest, email)
  VALUES('simongaviria1','Simon Gaviria', '$2a$10$noryJFgByFccCS/F6XILSeqM.3TqBhmRJ0QtAMPHtlzriqk6rsY8S', 'simongaviria1@gmail.com')
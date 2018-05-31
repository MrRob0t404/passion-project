DROP DATABASE IF EXISTS cloudnotes;
CREATE DATABASE cloudnotes;

\c cloudnotes;


DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS notes;

CREATE TABLE users (
    ID SERIAL PRIMARY KEY,
    fullName VARCHAR,
    username VARCHAR UNIQUE,
    password_digest VARCHAR,
    email VARCHAR
);

CREATE TABLE notes (
    ID SERIAL PRIMARY KEY,
    title VARCHAR,
    note VARCHAR,
    user_id INTEGER REFERENCES users(ID)
);

CREATE TABLE TODO (
    ID SERIAL PRIMARY KEY,
    title VARCHAR,
    todo_list VARCHAR,
    user_id INTEGER REFERENCES users(ID)
);

  CREATE TABLE TODO_ITEM (
    ID SERIAL PRIMARY KEY,
    item VARCHAR,
    complete BOOLEAN,
    todo_list_id INTEGER REFERENCES TODO(id)
  ) 

INSERT INTO users (fullName,username, password_digest, email)
  VALUES('Simon Gaviria', 'simongaviria1','$2a$10$noryJFgByFccCS/F6XILSeqM.3TqBhmRJ0QtAMPHtlzriqk6rsY8S', 'simongaviria1@gmail.com'),('sebas g', 'sebas','$2a$10$noryJFgByFccCS/F6XILSeqM.3TqBhmRJ0QtAMPHtlzriqk6rsY8S', 'simongaviria2@gmail.com');


INSERT INTO notes (title, note, user_id)
  VALUES('my first note', 'This is my first note which is not such a long note. This could also possibly be a reminder of what tf is going on', 1), ('my second note', 'gregdavis was here', 1);


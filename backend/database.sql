-- SQL Command Templates
CREATE DATABASE projects;

CREATE TABLE users(
userId serial PRIMARY KEY,
firstName VARCHAR ( 50 ) NOT NULL,
lastName VARCHAR ( 50 ) NOT NULL,
email VARCHAR ( 255 ) UNIQUE NOT NULL,
password VARCHAR ( 50 ) NOT NULL,
isAdmin BOOLEAN NOT NULL DEFAULT 'f'
);

INSERT INTO users (firstName, lastName, email, password)
VALUES ('david', 'hung', 'email@gmail.com' , 'password');

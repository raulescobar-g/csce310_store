-- SQL Command Templates
-- Create Tables
CREATE DATABASE projects;

CREATE TABLE users(
userId serial PRIMARY KEY,
firstName VARCHAR ( 50 ) NOT NULL,
lastName VARCHAR ( 50 ) NOT NULL,
email VARCHAR ( 255 ) UNIQUE NOT NULL,
password VARCHAR ( 50 ) NOT NULL,
isAdmin BOOLEAN NOT NULL DEFAULT 'f'
);

-- Additional Commands
INSERT INTO users (firstName, lastName, email, password)
VALUES ('david', 'hung', 'email@gmail.com' , 'password');

INSERT INTO discountcodes (code, percent)
VALUES ('ABCDEF', '15');

ALTER TABLE discountcodes
RENAME COLUMN promocode TO code;

ALTER TABLE product
ADD Manufacturer varchar(255);
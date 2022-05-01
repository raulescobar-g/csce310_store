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

CREATE TABLE reviews(
reviewId serial PRIMARY KEY,
productId  VARCHAR ( 255 ) NOT NULL,
name VARCHAR ( 50 ) NOT NULL,
rating INT UNIQUE NOT NULL,
review VARCHAR ( 255 ),
date VARCHAR ( 255 ) NOT NULL
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

ALTER TABLE reviews
ADD productId varchar(255);

UPDATE product
SET imagelink = 'https://m.media-amazon.com/images/I/81osvUbHKWL._SL1500_.jpg'
WHERE product_name = 'Wii';

UPDATE reviews
SET imagelink = 'https://m.media-amazon.com/images/I/81osvUbHKWL._SL1500_.jpg'
WHERE product_name = 'Wii';


INSERT INTO product (product_name, product_description, product_price, product_brand, imagelink, manufacturer)
 VALUES ('NutriBullet® 1200-Watt Blender Combo', 'NutriBullet® Blender Combo will take your nutrition extraction to the next level with the versatility of both a multi-serving pitcher and a single serve cup. hree precision speeds, a pulse function and the Extract program offer full control at the press of a button. 1200 Watts of power let you make an endless array of smoothies, soups, sauces, nut butters and beyond', '149.99', 'Bed Bath & Beyond', 'https://b3h2.scene7.com/is/image/BedBathandBeyond/818049021616_imageset?$529$&wid=529&hei=529', 'Unknown')

INSERT INTO reviews (name, rating, review, date, productId)
VALUES ('DAVID HUNG', '1', 'I HATE THIS', 'Sun May 01 2022 13:44:40 GMT-0500 (Central Daylight Time)', '5');
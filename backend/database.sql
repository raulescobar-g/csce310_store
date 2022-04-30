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

INSERT INTO product (product_name, product_description, product_price, product_brand, imagelink, manufacturer)
 VALUES ('Lyndhurst Sofa', 'Create a stylish and elegantly calm environment in your home with the Lynhurst Sofa Collection from Threshold™', '448', 'Target', 'https://target.scene7.com/is/image/Target/GUEST_14d00438-35b1-4365-ab18-15ba6deb2438?wid=199&hei=199&qlt=80&fmt=pjpeg', 'Carousel')
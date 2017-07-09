DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
	item_id INTEGER(11) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price INTEGER(11) NOT NULL,
    stock_quantity INTEGER(11) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES
("Pencil", "Office Supplies", 2, 500),
("Hamster", "Grocery", 15, 200),
("Hat", "Fashion", 27, 400),
("Bananas", "Grocery", 3, 770),
("Shirt", "Fashion", 22, 600),
("Protein Bars", "Grocery", 9, 700),
("Mouse Pad", "Office Supplies", 8, 4300),
("Computer", "Office Supplies", 2500, 200),
("Boots", "Fashion", 50, 350),
("Sword", "Midieval Weapons", 500, 34),
("Trebuchet", "Midieval Weapons", 7200, 50);

SELECT * FROM products;


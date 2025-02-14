#DROP DATABASE SuperPlus;

#CREATE DATABASE SuperPlus;

USE SuperPlus;

CREATE TABLE clients(
	id INT AUTO_INCREMENT,
    dni CHAR(9) UNIQUE NOT NULL,
    `name` VARCHAR(30) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    card_mumber VARCHAR(30) UNIQUE NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE products(
	id INT AUTO_INCREMENT,
    bar_code VARCHAR(50) UNIQUE NOT NULL,
    `name` VARCHAR(30) NOT NULL,
    price VARCHAR (10) NOT NULL, 
    PRIMARY KEY (id)
);

CREATE TABLE sales(
	id INT AUTO_INCREMENT,
    fk_id_clients INT NOT NULL,
    fk_id_products VARCHAR(30) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (fk_id_client) REFERENCES clients (id)
);
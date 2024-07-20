/*DROP DATABASE pizzaria;

-- Création de la base de données pizzaria
CREATE DATABASE IF NOT EXISTS pizzaria;


-- Utilisation de la base de données pizzaria
USE ${DATABASE};
*/

SET FOREIGN_KEY_CHECKS = 0;

-- Supprimer la table User si elle existe
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Admin;
DROP TABLE IF EXISTS Staff;
DROP TABLE IF EXISTS Pizza_Ingredient;
DROP TABLE IF EXISTS Pizza;
DROP TABLE IF EXISTS Ingredient;

SET FOREIGN_KEY_CHECKS = 1;

/*
-------------------------------------------
creation of tables and insertion values
-------------------------------------------
*/

-- Table User
CREATE TABLE IF NOT EXISTS User (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    identifiant VARCHAR(255),
    motDePasseHash VARCHAR(255)
);

-- Table Admin
CREATE TABLE IF NOT EXISTS Admin (
    id INT PRIMARY KEY,
    adresseMail VARCHAR(255) NOT NULL,
    FOREIGN KEY (id) REFERENCES User(id)
);

-- Table Staff
CREATE TABLE IF NOT EXISTS Staff (
    id INT PRIMARY KEY,
    salaryPerMonth DECIMAL(10, 2) NOT NULL,
    workHours INT NOT NULL,
    FOREIGN KEY (id) REFERENCES User(id)
);


-- Table Pizza
CREATE TABLE IF NOT EXISTS Pizza (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

-- Table Ingredient
CREATE TABLE IF NOT EXISTS Ingredient (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE
);

-- Table d'association pour lier les pizzas aux ingrédients
CREATE TABLE IF NOT EXISTS Pizza_Ingredient (
    pizzaId INT,
    ingredientId INT,
    PRIMARY KEY (pizzaId, ingredientId),
    FOREIGN KEY (pizzaId) REFERENCES Pizza(id),
    FOREIGN KEY (ingredientId) REFERENCES Ingredient(id)
);

-- Insertions des valeurs dans les tables

-- Insertion dans la table Pizza
INSERT INTO Pizza (id, name, price) VALUES (1, 'Pizza Margherita', 12.99);
INSERT INTO Pizza (id, name, price) VALUES (2, 'Pizza Pepperoni', 14.99);
INSERT INTO Pizza (id, name, price) VALUES (3, 'Pizza Vegetarian', 13.99);

-- Insertion dans la table Ingredient
INSERT INTO Ingredient (id, name) VALUES (1, 'Tomato');
INSERT INTO Ingredient (id, name) VALUES (2, 'Pepperoni slices');
INSERT INTO Ingredient (id, name) VALUES (3, 'Mozzarella cheese');
INSERT INTO Ingredient (id, name) VALUES (4, 'Tomato sauce');
INSERT INTO Ingredient (id, name) VALUES (5, 'Bell peppers');
INSERT INTO Ingredient (id, name) VALUES (6, 'Onions');
INSERT INTO Ingredient (id, name) VALUES (7, 'Black olives');
INSERT INTO Ingredient (id, name) VALUES (8, 'Mushrooms');


-- Associer des ingrédients aux pizzas dans la table Pizza_Ingredient

-- Margherita (Pizza 1)
INSERT INTO Pizza_Ingredient (pizzaId, ingredientId) VALUES (1, 1); -- Tomato
INSERT INTO Pizza_Ingredient (pizzaId, ingredientId) VALUES (1, 3); -- Mozzarella cheese
INSERT INTO Pizza_Ingredient (pizzaId, ingredientId) VALUES (1, 4); -- Tomato sauce

-- Pepperoni (Pizza 2)
INSERT INTO Pizza_Ingredient (pizzaId, ingredientId) VALUES (2, 1); -- Tomato
INSERT INTO Pizza_Ingredient (pizzaId, ingredientId) VALUES (2, 2); -- Pepperoni slices
INSERT INTO Pizza_Ingredient (pizzaId, ingredientId) VALUES (2, 3); -- Mozzarella cheese
INSERT INTO Pizza_Ingredient (pizzaId, ingredientId) VALUES (2, 4); -- Tomato sauce

-- Vegetarian (Pizza 3)
INSERT INTO Pizza_Ingredient (pizzaId, ingredientId) VALUES (3, 5); -- Bell peppers
INSERT INTO Pizza_Ingredient (pizzaId, ingredientId) VALUES (3, 6); -- Onions
INSERT INTO Pizza_Ingredient (pizzaId, ingredientId) VALUES (3, 7); -- Black olives
INSERT INTO Pizza_Ingredient (pizzaId, ingredientId) VALUES (3, 8); -- Mushrooms
INSERT INTO Pizza_Ingredient (pizzaId, ingredientId) VALUES (3, 4); -- Tomato sauce
INSERT INTO Pizza_Ingredient (pizzaId, ingredientId) VALUES (3, 3); -- Mozzarella cheese

-- Insertion d'utilisateurs

-- Insertion des User
INSERT INTO User (nom, prenom, age, identifiant, motDePasseHash) VALUES ('Doe', 'John', 35, 'johndoe', 'hashedpassword1');
INSERT INTO User (nom, prenom, age, identifiant, motDePasseHash) VALUES ('Johnson', 'Alice', 30, 'alicejohnson', 'hashedpassword3');

-- Insertion d'un Staff
INSERT INTO Staff (id, salaryPerMonth, workHours) VALUES (LAST_INSERT_ID(), 4000, 40);

-- Insertion d'un User qui est Staff
INSERT INTO User (nom, prenom, age, identifiant, motDePasseHash) VALUES ('Smith', 'Emma', 28, 'emmasmith', 'hashedpassword2');
INSERT INTO Staff (id, salaryPerMonth, workHours) VALUES (LAST_INSERT_ID(), 3500, 35);

-- Insertion d'un admin par defaut -- test
INSERT INTO User (nom, prenom, age, identifiant, motDePasseHash) VALUES ('NomAdmin', 'PrenomAdmin', 18, 'adminTest', '$2b$10$kN9LGIV0AwUNyon4M2UNL.yQ2W/Bv6XsH95pWSU9bFKjOUQ7bSazq');
INSERT INTO Admin (id, adresseMail) VALUES (LAST_INSERT_ID(), 'admin.test@example.com');
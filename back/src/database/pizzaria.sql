/*
-- Création de la base de données pizzaria
CREATE DATABASE IF NOT EXISTS pizzaria;

-- Utilisation de la base de données pizzaria
USE pizzaria;

*/


-- Supprimer la table User si elle existe
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Admin;
DROP TABLE IF EXISTS Staff;
DROP TABLE IF EXISTS Pizza_Ingredient;
DROP TABLE IF EXISTS Pizza;
DROP TABLE IF EXISTS Ingredient;


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
    motDePasseHash VARCHAR(255),
    mail VARCHAR(255),
    role ENUM('Staff', 'Admin', 'Client') NOT NULL DEFAULT 'Staff'
);

-- Table Staff
CREATE TABLE IF NOT EXISTS Staff (
    id INT PRIMARY KEY,
    salaryPerMonth DECIMAL(10, 2) NOT NULL,
    workHours INT NOT NULL,
    FOREIGN KEY (id) REFERENCES User(id)
);

-- Table Admin
CREATE TABLE IF NOT EXISTS Admin (
    id INT PRIMARY KEY,
    numTel INT NOT NULL,
    FOREIGN KEY (id) REFERENCES User(id)
);

-- Table Client
CREATE TABLE IF NOT EXISTS Client (
    id INT PRIMARY KEY,
    adresse VARCHAR(255) NOT NULL, -- Adresse du client
    numTel VARCHAR(15) NULL, -- Numéro de téléphone (peut être NULL)
    bankCard VARCHAR(255) NULL, -- Carte bancaire (peut être NULL)
    FOREIGN KEY (id) REFERENCES User(id) -- Clé étrangère vers User
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

/*
-------------------------------------------
Insertion des utilisateurs
-------------------------------------------
*/


-- Ajout des User Admin 

-- Ajout d'un User Admin avec un compte
INSERT INTO User (nom, prenom, age, identifiant, motDePasseHash, mail, role)
VALUES ('Admin', 'Admin', 40, 'admin', '$2b$10$kN9LGIV0AwUNyon4M2UNL.yQ2W/Bv6XsH95pWSU9bFKjOUQ7bSazq', 'admin@example.com', 'Admin'); --test
SET @adminId := LAST_INSERT_ID();
INSERT INTO Admin (id, numTel)
VALUES (@adminId, 1234567890);

-- Ajouts des User Staff

-- insertion d'un User Staff
INSERT INTO User (nom, prenom, age, role) VALUES ('John', 'Doe', 30, 'Staff');
SET @lastUserId := LAST_INSERT_ID();
INSERT INTO Staff (id, salaryPerMonth, workHours) VALUES (@lastUserId, 2500.00, 40);


-- Ajout d'un User Staff sans compte
INSERT INTO User (nom, prenom, age, role)
VALUES ('User1', 'User1', 25, 'Staff');
INSERT INTO Staff (id, salaryPerMonth, workHours)
SELECT id, 2500.00, 40 FROM User WHERE id = LAST_INSERT_ID() AND role = 'Staff';


-- Ajout d'un User Staff sans compte
INSERT INTO User (nom, prenom, age, role)
VALUES ('User2', 'User2', 30, 'Staff');
INSERT INTO Staff (id, salaryPerMonth, workHours)
SELECT id, 2500.00, 40 FROM User WHERE id = LAST_INSERT_ID() AND role = 'Staff';


-- Ajout d'un User Staff avec compte
INSERT INTO User (nom, prenom, age, identifiant, motDePasseHash, mail, role)
VALUES ('User3', 'User3', 20, 'user3', '$2b$10$kN9LGIV0AwUNyon4M2UNL.yQ2W/Bv6XsH95pWSU9bFKjOUQ7bSazq', 'user3@example.com', 'Staff'); --test
INSERT INTO Staff (id, salaryPerMonth, workHours)
SELECT id, 2500.00, 40 FROM User WHERE id = LAST_INSERT_ID() AND role = 'Staff';


-- Ajout d'un User Staff avec compte
INSERT INTO User (nom, prenom, age, identifiant, motDePasseHash, mail, role)
VALUES ('User4', 'User4', 35, 'user4', '$2b$10$kN9LGIV0AwUNyon4M2UNL.yQ2W/Bv6XsH95pWSU9bFKjOUQ7bSazq', 'user4@example.com', 'Staff');
INSERT INTO Staff (id, salaryPerMonth, workHours)
SELECT id, 2500.00, 40 FROM User WHERE id = LAST_INSERT_ID() AND role = 'Staff';


-- Ajout des User Client 

-- Ajout d'un User Client complet (adresse, numTel et bankCard)
INSERT INTO User (nom, prenom, age, identifiant, motDePasseHash, mail, role)
VALUES ('Client1', 'Client1', 30, 'client1', '$2b$10$kN9LGIV0AwUNyon4M2UNL.yQ2W/Bv6XsH95pWSU9bFKjOUQ7bSazq', 'client1@example.com', 'Client');
SET @clientId := LAST_INSERT_ID();
INSERT INTO Client (id, adresse, numTel, bankCard)
VALUES (@clientId, '123 rue de la banque', '1234567890', '1234567890123456');

-- Ajout d'un User Client complet (adresse, numTel et bankCard)
INSERT INTO User (nom, prenom, age, identifiant, motDePasseHash, mail, role)
VALUES ('Client2', 'Client2', 35, 'client2', '$2b$10$kN9LGIV0AwUNyon4M2UNL.yQ2W/Bv6XsH95pWSU9bFKjOUQ7bSazq', 'client2@example.com', 'Client');
SET @client2Id := LAST_INSERT_ID();
INSERT INTO Client (id, adresse, numTel, bankCard)
VALUES (@client2Id, '456 avenue du crédit', '0987654321', '6543210987654321');

-- Ajout d'un User Client avec seulement l'adresse
INSERT INTO User (nom, prenom, age, identifiant, motDePasseHash, mail, role)
VALUES ('Client3', 'Client3', 40, 'client3', '$2b$10$kN9LGIV0AwUNyon4M2UNL.yQ2W/Bv6XsH95pWSU9bFKjOUQ7bSazq', 'client3@example.com', 'Client');
SET @client3Id := LAST_INSERT_ID();
INSERT INTO Client (id, adresse)
VALUES (@client3Id, '789 boulevard du prêt');


/*
-------------------------------------------
Insertion des autres données
-------------------------------------------
*/


-- Insertion dans la table Ingredient
INSERT INTO `ingredient` (`id`, `name`) VALUES
(9, 'Ananas'),
(16, 'artichauts'),
(19, 'Barbecue sauce'),
(13, 'Basilic'),
(5, 'Bell peppers'),
(7, 'Black olives'),
(14, 'Chorizo'),
(18, 'Ciboulette'),
(12, 'Jambon'),
(23, 'Lardons'),
(11, 'Merguez'),
(15, 'Miel'),
(3, 'Mozzarella cheese'),
(8, 'Mushrooms'),
(6, 'Onions'),
(2, 'Pepperoni slices'),
(25, 'Piments'),
(22, 'Pomme de terre'),
(24, 'Poulet kebab'),
(20, 'Poulet rôti'),
(26, 'Samuraï sauce'),
(21, 'Saucisse'),
(17, 'Saumon fumé'),
(27, 'thon'),
(1, 'Tomato'),
(4, 'Tomato sauce'),
(10, 'Viande Hachée');

-- Insertion dans la table Pizza
INSERT INTO `pizza` (`id`, `name`, `price`) VALUES
(1, 'Margherita', 12.99),
(2, 'Pepperoni', 14.99),
(3, 'Vegetarian', 13.99),
(4, 'Cheese Pizza', 10.99),
(11, 'Pizza Royale', 10.59),
(12, 'Pizza Hawaïenne', 10.59),
(13, 'Pizza 4 saisons', 10.59),
(14, 'Pizza Salami', 10.59),
(15, 'Pizza chèvre miel', 10.59),
(16, 'Pizza au thon', 10.59),
(17, 'Pizza Chorizo', 10.59),
(18, 'Pizza Saumon Fumé', 10.59);

-- insert into pizza_ingredient
INSERT INTO `pizza_ingredient` (`pizzaId`, `ingredientId`) VALUES
(1, 1),
(1, 3),
(1, 4),
(2, 1),
(2, 2),
(2, 3),
(2, 4),
(3, 3),
(3, 4),
(3, 5),
(3, 6),
(3, 7),
(3, 8);
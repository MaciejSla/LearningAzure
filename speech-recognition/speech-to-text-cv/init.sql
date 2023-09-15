-- Create the database
CREATE DATABASE IF NOT EXISTS testdb;
USE testdb;
SET NAMES 'utf8mb4';

-- Create table
DROP TABLE IF EXISTS `employees`;

CREATE TABLE `employees` (
  `PersonID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `surname` varchar(50) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `mail` varchar(100) DEFAULT NULL,
  `phone` varchar(9) DEFAULT NULL,
  `job` varchar(80) DEFAULT NULL,
  `education` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`PersonID`)
);

CREATE TABLE `languages` (
  `LangID` int NOT NULL AUTO_INCREMENT,
  `PersonID` int,
  `language` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`LangID`),
  FOREIGN KEY (`PersonID`) REFERENCES employees(`PersonID`)
);

CREATE TABLE `interests` (
  `InterestID` int NOT NULL AUTO_INCREMENT,
  `PersonID` int,
  `interest` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`InterestID`),
  FOREIGN KEY (`PersonID`) REFERENCES employees(`PersonID`)
);

INSERT INTO employees VALUES 
  (1, 'Stefan', 'Woźniak', 73, 'steve.wozniak@gmail.com', '123456789', 'wynalazca', 'UC Berkely College of Engineering'),
  (2, 'Mariusz', 'Pudzianowski', 66, 'm.pudzian@poczta.onet.pl', '987654321', 'strongman', 'Społeczna Wyższa Szkoła Przedsiębiorczości i Zarządzania w Łodzi');

INSERT INTO languages VALUES 
  (1, 1, 'angielski'),
  (2, 1, 'niemiecki'),
  (3, 2, 'polski');

INSERT INTO interests VALUES (1, 1, 'programowanie');
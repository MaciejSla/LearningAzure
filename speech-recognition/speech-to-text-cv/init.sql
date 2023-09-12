-- Create the database
CREATE DATABASE IF NOT EXISTS testdb;
USE testdb;

-- Create table
DROP TABLE IF EXISTS `employees`;

CREATE TABLE `employees` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `surname` varchar(20) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `mail` varchar(20) DEFAULT NULL,
  `phone` varchar(9) DEFAULT NULL,
  `job` varchar(50) DEFAULT NULL,
  `education` varchar(30) DEFAULT NULL,
  `known_languages` varchar(20) DEFAULT NULL,
  `interests` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

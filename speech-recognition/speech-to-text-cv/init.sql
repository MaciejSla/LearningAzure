-- Create the database
CREATE DATABASE IF NOT EXISTS testdb;
USE testdb;
SET NAMES 'utf8mb4';

-- CreateTable
CREATE TABLE `employees` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `surname` VARCHAR(191) NOT NULL,
    `age` INTEGER NOT NULL,
    `mail` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(9) NOT NULL,
    `job` VARCHAR(191) NOT NULL,
    `education` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `employees_mail_key`(`mail`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `languages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `interests` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `languages` ADD CONSTRAINT `languages_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `employees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `interests` ADD CONSTRAINT `interests_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `employees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;


INSERT INTO employees VALUES 
  (1, 'Stefan', 'Woźniak', 73, 'steve.wozniak@gmail.com', '123456789', 'wynalazca', 'UC Berkely College of Engineering'),
  (2, 'Mariusz', 'Pudzianowski', 66, 'm.pudzian@poczta.onet.pl', '987654321', 'strongman', 'Społeczna Wyższa Szkoła Przedsiębiorczości i Zarządzania w Łodzi');

INSERT INTO languages VALUES 
  (1, 'angielski', 1),
  (2, 'niemiecki', 1),
  (3, 'polski', 2);

INSERT INTO interests VALUES (1, 'programowanie', 1);
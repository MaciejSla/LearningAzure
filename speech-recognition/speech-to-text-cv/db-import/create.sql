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

-- CreateTable
CREATE TABLE `users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(200) NULL,
    `lastname` VARCHAR(200) NULL,
    `email` VARCHAR(200) NOT NULL,
    `password` VARCHAR(200) NOT NULL,
    `role` ENUM('Super_Admin', 'Admin', 'user', 'subscriber') NOT NULL DEFAULT 'user',
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL,
    `adminId` INTEGER NULL,
    `subscriberId` INTEGER NULL,
    `accountStatus` INTEGER NOT NULL DEFAULT 1234567890,

    UNIQUE INDEX `email_unique`(`email`),
    UNIQUE INDEX `users_adminId_key`(`adminId`),
    UNIQUE INDEX `users_subscriberId_key`(`subscriberId`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subscribers` (
    `subscriberId` INTEGER NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(200) NULL,
    `lastname` VARCHAR(200) NULL,
    `email` VARCHAR(200) NOT NULL,
    `role` ENUM('Super_Admin', 'Admin', 'user', 'subscriber') NOT NULL DEFAULT 'subscriber',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `unique_mail`(`email`),
    PRIMARY KEY (`subscriberId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admin` (
    `adminId` INTEGER NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(200) NULL,
    `lastname` VARCHAR(200) NULL,
    `email` VARCHAR(200) NOT NULL,
    `role` ENUM('Super_Admin', 'Admin', 'user', 'subscriber') NOT NULL DEFAULT 'Admin',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `unique_mail`(`email`),
    PRIMARY KEY (`adminId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_subscriberId_fkey` FOREIGN KEY (`subscriberId`) REFERENCES `subscribers`(`subscriberId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `admin`(`adminId`) ON DELETE SET NULL ON UPDATE CASCADE;

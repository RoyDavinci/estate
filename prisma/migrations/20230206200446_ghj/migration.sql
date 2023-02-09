/*
  Warnings:

  - A unique constraint covering the columns `[agentId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `agentId` INTEGER NULL;

-- CreateTable
CREATE TABLE `agents` (
    `agentId` INTEGER NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(200) NULL,
    `lastname` VARCHAR(200) NULL,
    `email` VARCHAR(200) NOT NULL,
    `role` ENUM('Super_Admin', 'Admin', 'user', 'subscriber') NOT NULL DEFAULT 'Admin',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `unique_mail`(`email`),
    PRIMARY KEY (`agentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `users_agentId_key` ON `users`(`agentId`);

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_agentId_fkey` FOREIGN KEY (`agentId`) REFERENCES `agents`(`agentId`) ON DELETE SET NULL ON UPDATE CASCADE;

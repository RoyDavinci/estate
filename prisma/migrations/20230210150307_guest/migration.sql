-- AlterTable
ALTER TABLE `orders` ADD COLUMN `guestId` INTEGER NULL;

-- CreateTable
CREATE TABLE `guest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `mobile` VARCHAR(191) NULL,

    UNIQUE INDEX `guest_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_guestId_fkey` FOREIGN KEY (`guestId`) REFERENCES `guest`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

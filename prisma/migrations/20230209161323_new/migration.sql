-- CreateTable
CREATE TABLE `products` (
    `productId` INTEGER NOT NULL AUTO_INCREMENT,
    `productName` VARCHAR(200) NOT NULL,
    `location` VARCHAR(200) NOT NULL,
    `adminId` INTEGER NULL,
    `agentId` INTEGER NULL,
    `price` DECIMAL(10, 5) NOT NULL,
    `description` VARCHAR(225) NULL,
    `video` TEXT NULL,
    `title` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`productId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `imageUrl` (
    `url` VARCHAR(191) NOT NULL,
    `productId` INTEGER NOT NULL,

    INDEX `imageUrl_productId_idx`(`productId`),
    PRIMARY KEY (`url`, `productId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `admin`(`adminId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_agentId_fkey` FOREIGN KEY (`agentId`) REFERENCES `agents`(`agentId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `imageUrl` ADD CONSTRAINT `imageUrl_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`productId`) ON DELETE CASCADE ON UPDATE CASCADE;

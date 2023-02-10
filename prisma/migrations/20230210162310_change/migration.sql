/*
  Warnings:

  - You are about to drop the column `payment_type` on the `transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `payment_type`;

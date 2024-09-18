/*
  Warnings:

  - You are about to drop the column `refresh_token_expires_in` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `googleId` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `accounts` DROP COLUMN `refresh_token_expires_in`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `googleId`,
    ADD COLUMN `providerAccountId` VARCHAR(191) NULL;

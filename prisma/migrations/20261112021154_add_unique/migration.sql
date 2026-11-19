/*
  Warnings:

  - You are about to drop the column `isStaff` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[storeId,userId]` on the table `Staff` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "isStaff";

-- CreateIndex
CREATE UNIQUE INDEX "Staff_storeId_userId_key" ON "Staff"("storeId", "userId");

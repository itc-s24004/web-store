/*
  Warnings:

  - A unique constraint covering the columns `[productGroupId,productId]` on the table `ProductGroupItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProductGroupItem_productGroupId_productId_key" ON "ProductGroupItem"("productGroupId", "productId");

/*
  Warnings:

  - You are about to drop the column `groupId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `labelId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `showStockDetail` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `tutorialId` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the `Label` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LabelLangMap` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tutorial` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TutorialPage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TutorialPageLangMap` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id,storeId]` on the table `ProductGroup` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "LabelLangMap" DROP CONSTRAINT "LabelLangMap_labelId_fkey";

-- DropForeignKey
ALTER TABLE "LabelLangMap" DROP CONSTRAINT "LabelLangMap_langId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_labelId_fkey";

-- DropForeignKey
ALTER TABLE "Store" DROP CONSTRAINT "Store_tutorialId_fkey";

-- DropForeignKey
ALTER TABLE "TutorialPage" DROP CONSTRAINT "TutorialPage_imgId_fkey";

-- DropForeignKey
ALTER TABLE "TutorialPage" DROP CONSTRAINT "TutorialPage_tutorialId_fkey";

-- DropForeignKey
ALTER TABLE "TutorialPageLangMap" DROP CONSTRAINT "TutorialPageLangMap_langId_fkey";

-- DropForeignKey
ALTER TABLE "TutorialPageLangMap" DROP CONSTRAINT "TutorialPageLangMap_tutorialPageId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "groupId",
DROP COLUMN "labelId",
DROP COLUMN "showStockDetail",
ADD COLUMN     "isStockAccurate" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Store" DROP COLUMN "tutorialId";

-- DropTable
DROP TABLE "Label";

-- DropTable
DROP TABLE "LabelLangMap";

-- DropTable
DROP TABLE "Tutorial";

-- DropTable
DROP TABLE "TutorialPage";

-- DropTable
DROP TABLE "TutorialPageLangMap";

-- CreateTable
CREATE TABLE "ProductGroupItem" (
    "id" TEXT NOT NULL,
    "productGroupId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "ProductGroupItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomPage" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CustomPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomPageComponent" (
    "id" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "title" TEXT,
    "body" TEXT,
    "customPageId" TEXT,
    "imgId" TEXT,
    "productGroupId" TEXT,
    "productId" TEXT,

    CONSTRAINT "CustomPageComponent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomPageComponentLangMap" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "body" TEXT,
    "componentId" TEXT NOT NULL,
    "langId" TEXT NOT NULL,

    CONSTRAINT "CustomPageComponentLangMap_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CustomPageComponentLangMap_componentId_langId_key" ON "CustomPageComponentLangMap"("componentId", "langId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductGroup_id_storeId_key" ON "ProductGroup"("id", "storeId");

-- AddForeignKey
ALTER TABLE "ProductGroupItem" ADD CONSTRAINT "ProductGroupItem_productGroupId_fkey" FOREIGN KEY ("productGroupId") REFERENCES "ProductGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductGroupItem" ADD CONSTRAINT "ProductGroupItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomPage" ADD CONSTRAINT "CustomPage_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomPageComponent" ADD CONSTRAINT "CustomPageComponent_customPageId_fkey" FOREIGN KEY ("customPageId") REFERENCES "CustomPage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomPageComponent" ADD CONSTRAINT "CustomPageComponent_imgId_fkey" FOREIGN KEY ("imgId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomPageComponent" ADD CONSTRAINT "CustomPageComponent_productGroupId_fkey" FOREIGN KEY ("productGroupId") REFERENCES "ProductGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomPageComponent" ADD CONSTRAINT "CustomPageComponent_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomPageComponentLangMap" ADD CONSTRAINT "CustomPageComponentLangMap_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "CustomPageComponent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomPageComponentLangMap" ADD CONSTRAINT "CustomPageComponentLangMap_langId_fkey" FOREIGN KEY ("langId") REFERENCES "Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;

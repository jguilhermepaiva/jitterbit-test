/*
  Warnings:

  - The primary key for the `Items` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Items` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Items" DROP CONSTRAINT "Items_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Items_pkey" PRIMARY KEY ("orderId", "productid");

/*
  Warnings:

  - You are about to drop the column `stripeCustomerID` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "image" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "stripeCustomerID",
ADD COLUMN     "stripeCustomerId" TEXT;

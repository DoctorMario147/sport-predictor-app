/*
  Warnings:

  - Added the required column `externalId` to the `Fixture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `matchDay` to the `Fixture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Fixture" ADD COLUMN     "externalId" INTEGER NOT NULL,
ADD COLUMN     "matchDay" INTEGER NOT NULL;

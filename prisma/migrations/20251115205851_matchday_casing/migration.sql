/*
  Warnings:

  - You are about to drop the column `matchDay` on the `Fixture` table. All the data in the column will be lost.
  - Added the required column `matchday` to the `Fixture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Fixture" DROP COLUMN "matchDay",
ADD COLUMN     "matchday" INTEGER NOT NULL;

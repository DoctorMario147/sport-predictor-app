/*
  Warnings:

  - You are about to drop the column `externalId` on the `Fixture` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Fixture" DROP COLUMN "externalId",
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Fixture_id_seq";

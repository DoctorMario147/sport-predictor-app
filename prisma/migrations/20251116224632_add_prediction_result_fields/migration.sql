/*
  Warnings:

  - You are about to drop the column `matchId` on the `FixturePrediction` table. All the data in the column will be lost.
  - Added the required column `fixtureId` to the `FixturePrediction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FixturePrediction" DROP CONSTRAINT "FixturePrediction_matchId_fkey";

-- AlterTable
ALTER TABLE "FixturePrediction" DROP COLUMN "matchId",
ADD COLUMN     "correctResult" BOOLEAN,
ADD COLUMN     "correctScore" BOOLEAN,
ADD COLUMN     "fixtureId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "FixturePrediction" ADD CONSTRAINT "FixturePrediction_fixtureId_fkey" FOREIGN KEY ("fixtureId") REFERENCES "Fixture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - A unique constraint covering the columns `[userId,fixtureId]` on the table `FixturePrediction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FixturePrediction_userId_fixtureId_key" ON "FixturePrediction"("userId", "fixtureId");

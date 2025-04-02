/*
  Warnings:

  - You are about to drop the column `points` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "points";

-- CreateTable
CREATE TABLE "Stamp" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Stamp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserStamp" (
    "userId" INTEGER NOT NULL,
    "stampId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserStamp_pkey" PRIMARY KEY ("userId","stampId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Stamp_code_key" ON "Stamp"("code");

-- AddForeignKey
ALTER TABLE "UserStamp" ADD CONSTRAINT "UserStamp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserStamp" ADD CONSTRAINT "UserStamp_stampId_fkey" FOREIGN KEY ("stampId") REFERENCES "Stamp"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

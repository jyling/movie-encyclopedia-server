/*
  Warnings:

  - Added the required column `releasedDate` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "releasedDate" TIMESTAMP(3) NOT NULL;

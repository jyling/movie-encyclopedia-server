/*
  Warnings:

  - Added the required column `movie_id` to the `MovieCharacter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MovieCharacter" ADD COLUMN     "movie_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "MovieCharacter" ADD FOREIGN KEY ("movie_id") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

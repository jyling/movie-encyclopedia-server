-- CreateTable
CREATE TABLE "MovieDirector" (
    "id" SERIAL NOT NULL,
    "people_id" INTEGER NOT NULL,
    "movie_id" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovieWriter" (
    "id" SERIAL NOT NULL,
    "people_id" INTEGER NOT NULL,
    "movie_id" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "People" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(32) NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MovieDirector" ADD FOREIGN KEY ("people_id") REFERENCES "People"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieDirector" ADD FOREIGN KEY ("movie_id") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieWriter" ADD FOREIGN KEY ("people_id") REFERENCES "People"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieWriter" ADD FOREIGN KEY ("movie_id") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

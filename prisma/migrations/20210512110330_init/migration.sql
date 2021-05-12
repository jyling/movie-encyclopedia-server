-- CreateTable
CREATE TABLE "Movie" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(32) NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "MovieCharacter" (
    "id" SERIAL NOT NULL,
    "character_id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(32) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Movie.id_unique" ON "Movie"("id");

-- CreateIndex
CREATE UNIQUE INDEX "MovieCharacter.id_unique" ON "MovieCharacter"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Character.id_unique" ON "Character"("id");

-- AddForeignKey
ALTER TABLE "MovieCharacter" ADD FOREIGN KEY ("character_id") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

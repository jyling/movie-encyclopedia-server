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
ALTER TABLE "Movie" ADD PRIMARY KEY ("id");
ALTER TABLE "Character" ADD PRIMARY KEY ("id");
ALTER TABLE "MovieCharacter" ADD PRIMARY KEY ("id");



-- AddForeignKey
ALTER TABLE "MovieCharacter" ADD FOREIGN KEY ("character_id") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

import {MigrationInterface, QueryRunner} from "typeorm";

export class movieImageRename1620744680254 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameTable("MovieImage", "movieImage")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameTable("movieImage", "MovieImage")
    }

}

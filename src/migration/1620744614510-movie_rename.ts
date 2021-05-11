import {MigrationInterface, QueryRunner} from "typeorm";

export class movieRename1620744614510 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameTable("Movie", "movie")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameTable("movie", "Movie")
    }

}

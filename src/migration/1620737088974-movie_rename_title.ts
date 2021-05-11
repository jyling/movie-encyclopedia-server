import {MigrationInterface, QueryRunner} from "typeorm";

export class movieRenameTitle1620737088974 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn("Movie", "title", "name")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn("Movie", "name", "title")
    }

}

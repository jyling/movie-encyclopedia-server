import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createGenreTable1620789360464 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "genre",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    default: "uuid_generate_v4()",
                    isPrimary: true
                },
                {
                    name: "name",
                    type: "varchar"
                },
                {
                    name: "description",
                    type: "text"
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("genre")
    }

}

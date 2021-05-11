import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class movieTable1620736262079 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: "Movie",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    default: "uuid_generate_v4()",
                    isPrimary: true
                },
                {
                    name: "title",
                    type: "varchar",
                },
                {
                  name: 'released_date',
                  type: 'timestamptz',
                },
                {
                    name: "description",
                    type: "text"
                },
                {
                    name: "created_at",
                    type: "timestamptz",
                    default: "now()"
                },
                {
                    name: "updated_at",
                    type: "timestamptz",
                    default: "now()"
                } 
            ]
        }))
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("Movie", true, true)
    }

}

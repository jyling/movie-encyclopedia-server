import {MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey} from "typeorm";

export class createMovieWriterTable1620793754636 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            "name": "movieWriter",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    default: "uuid_generate_v4()",
                    isPrimary: true
                },
            ]
        }))

        await queryRunner.addColumn("movieWriter", new TableColumn({
            name: "peopleId",
            type: "uuid"
        }));

        await queryRunner.createForeignKey("movieWriter", new TableForeignKey({
            columnNames: ["peopleId"],
            referencedColumnNames: ["id"],
            referencedTableName: "people",
            onDelete: "CASCADE"
        }));


        await queryRunner.addColumn("movieWriter", new TableColumn({
            name: "movieId",
            type: "uuid"
        }));

        await queryRunner.createForeignKey("movieWriter", new TableForeignKey({
            columnNames: ["movieId"],
            referencedColumnNames: ["id"],
            referencedTableName: "movie",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("movieWriter","peopleId")
        await queryRunner.dropForeignKey("movieWriter","movieId")
        await queryRunner.dropTable("movieWriter")
    }

}

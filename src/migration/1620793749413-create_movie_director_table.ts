import {MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey} from "typeorm";

export class createMovieDirectorTable1620793749413 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            "name": "movieDirector",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    default: "uuid_generate_v4()",
                    isPrimary: true
                },
            ]
        }))

        await queryRunner.addColumn("movieDirector", new TableColumn({
            name: "peopleId",
            type: "uuid"
        }));

        await queryRunner.createForeignKey("movieDirector", new TableForeignKey({
            columnNames: ["peopleId"],
            referencedColumnNames: ["id"],
            referencedTableName: "people",
            onDelete: "CASCADE"
        }));


        await queryRunner.addColumn("movieDirector", new TableColumn({
            name: "movieId",
            type: "uuid"
        }));

        await queryRunner.createForeignKey("movieDirector", new TableForeignKey({
            columnNames: ["movieId"],
            referencedColumnNames: ["id"],
            referencedTableName: "movie",
            onDelete: "CASCADE"
        }));


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("movieDirector","peopleId")
        await queryRunner.dropForeignKey("movieDirector","movieId")
        await queryRunner.dropTable("movieDirector")
    }

}

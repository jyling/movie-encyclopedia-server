import {MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey} from "typeorm";

export class movieImageTable1620736601302 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "MovieImage",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true
                },
                {
                    name: "image_url",
                    type: "varchar",
                },
                 
            ]
        }))

        await queryRunner.addColumn("MovieImage", new TableColumn({
            name: "movie_id",
            type: "uuid"
        }));

        await queryRunner.createForeignKey("MovieImage", new TableForeignKey({
            columnNames: ["movie_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "Movie",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("MovieImage", true, true)
    }

}

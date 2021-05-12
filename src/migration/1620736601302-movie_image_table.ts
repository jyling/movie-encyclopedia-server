import {MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey} from "typeorm";

export class movieImageTable1620736601302 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "movie_image",
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

        await queryRunner.addColumn("movie_image", new TableColumn({
            name: "movieId",
            type: "uuid"
        }));

        await queryRunner.createForeignKey("movie_image", new TableForeignKey({
            columnNames: ["movieId"],
            referencedColumnNames: ["id"],
            referencedTableName: "Movie",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("movie_image", true, true)
    }

}

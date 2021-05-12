import {MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey} from "typeorm";

export class createMovieGenreTable1620789367333 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            "name": "movieGenre",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    default: "uuid_generate_v4()",
                    isPrimary: true
                },
            ]
        }))

        await queryRunner.addColumn("movieGenre", new TableColumn({
            name: "movieId",
            type: "uuid"
        }));

        await queryRunner.createForeignKey("movieGenre", new TableForeignKey({
            columnNames: ["movieId"],
            referencedColumnNames: ["id"],
            referencedTableName: "movie",
            onDelete: "CASCADE"
        }));

        await queryRunner.addColumn("movieGenre", new TableColumn({
            name: "genreId",
            type: "uuid"
        }));

        await queryRunner.createForeignKey("movieGenre", new TableForeignKey({
            columnNames: ["genreId"],
            referencedColumnNames: ["id"],
            referencedTableName: "genre",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("movieGenre","movieId")
        await queryRunner.dropForeignKey("movieGenre","genreId")
        await queryRunner.dropTable("movieGenre")
    }

}

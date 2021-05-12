import {MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey} from "typeorm";

export class createmovieCharacterTable1620788445955 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "movieCharacter",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    default: "uuid_generate_v4()",
                    isPrimary: true
                },
            ]
        }))

        await queryRunner.addColumn("movieCharacter", new TableColumn({
            name: "movieId",
            type: "uuid"
        }));

        await queryRunner.createForeignKey("movieCharacter", new TableForeignKey({
            columnNames: ["movieId"],
            referencedColumnNames: ["id"],
            referencedTableName: "movie",
            onDelete: "CASCADE"
        }));

        await queryRunner.addColumn("movieCharacter", new TableColumn({
            name: "characterId",
            type: "uuid"
        }));

        await queryRunner.createForeignKey("movieCharacter", new TableForeignKey({
            columnNames: ["characterId"],
            referencedColumnNames: ["id"],
            referencedTableName: "character",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("movieCharacter", "characterId")
        await queryRunner.dropForeignKey("movieCharacter", "movieId")

        await queryRunner.dropTable("movieCharacter")
    }

}

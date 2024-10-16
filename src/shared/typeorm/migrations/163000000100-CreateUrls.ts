import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUrls1693428432404 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "urls",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "user_id",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "originalUrl",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "shortUrl",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "clicks",
            type: "int",
            isNullable: true,
            default: 0,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
            isNullable: true,
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
            isNullable: true,
          },
          {
            name: "deleted_at",
            type: "timestamp",
            default: "now()",
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: "FKUrlUser",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["user_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("urls");
  }
}

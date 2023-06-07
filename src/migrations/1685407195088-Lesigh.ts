import {MigrationInterface, QueryRunner} from "typeorm";

export class Lesigh1685407195088 implements MigrationInterface {
    name = 'Lesigh1685407195088'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_f71b41f0813239c09793b56b5d8"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "chatidId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "chatidId" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_f71b41f0813239c09793b56b5d8" FOREIGN KEY ("chatidId") REFERENCES "chats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

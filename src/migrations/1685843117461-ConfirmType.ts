import {MigrationInterface, QueryRunner} from "typeorm";

export class ConfirmType1685843117461 implements MigrationInterface {
    name = 'ConfirmType1685843117461'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ads" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "ads" ADD "type" text array NOT NULL DEFAULT '{}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ads" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "ads" ADD "type" text NOT NULL`);
    }

}

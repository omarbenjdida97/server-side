import {MigrationInterface, QueryRunner} from "typeorm";

export class Locationd1685896359412 implements MigrationInterface {
    name = 'Locationd1685896359412'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ads" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "ads" ADD "latitude" numeric(6,2) DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "ads" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "ads" ADD "longitude" numeric(6,2) DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ads" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "ads" ADD "longitude" integer DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "ads" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "ads" ADD "latitude" integer DEFAULT '0'`);
    }

}

import {MigrationInterface, QueryRunner} from "typeorm";

export class Locationdd1685896530410 implements MigrationInterface {
    name = 'Locationdd1685896530410'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ads" ALTER COLUMN "latitude" TYPE numeric(12,10)`);
        await queryRunner.query(`ALTER TABLE "ads" ALTER COLUMN "longitude" TYPE numeric(12,10)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ads" ALTER COLUMN "longitude" TYPE numeric(6,2)`);
        await queryRunner.query(`ALTER TABLE "ads" ALTER COLUMN "latitude" TYPE numeric(6,2)`);
    }

}

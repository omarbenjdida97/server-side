import {MigrationInterface, QueryRunner} from "typeorm";

export class Chatto1686038257274 implements MigrationInterface {
    name = 'Chatto1686038257274'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ads" ALTER COLUMN "latitude" TYPE numeric(6,4)`);
        await queryRunner.query(`ALTER TABLE "ads" ALTER COLUMN "longitude" TYPE numeric(6,4)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ads" ALTER COLUMN "longitude" TYPE numeric(12,10)`);
        await queryRunner.query(`ALTER TABLE "ads" ALTER COLUMN "latitude" TYPE numeric(12,10)`);
    }

}

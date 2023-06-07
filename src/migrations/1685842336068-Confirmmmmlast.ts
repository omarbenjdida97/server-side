import {MigrationInterface, QueryRunner} from "typeorm";

export class Confirmmmmlast1685842336068 implements MigrationInterface {
    name = 'Confirmmmmlast1685842336068'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ads" ALTER COLUMN "createdAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ads" ALTER COLUMN "updatedAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ads" ALTER COLUMN "reccCount" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ads" ALTER COLUMN "studentNumber" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ads" ALTER COLUMN "studentNumber" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ads" ALTER COLUMN "reccCount" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ads" ALTER COLUMN "updatedAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ads" ALTER COLUMN "createdAt" SET NOT NULL`);
    }

}

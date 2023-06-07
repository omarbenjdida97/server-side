import {MigrationInterface, QueryRunner} from "typeorm";

export class Confirmm1685541062925 implements MigrationInterface {
    name = 'Confirmm1685541062925'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "isEmailConfirmed" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isEmailConfirmed"`);
    }

}

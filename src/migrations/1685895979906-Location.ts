import {MigrationInterface, QueryRunner} from "typeorm";

export class Location1685895979906 implements MigrationInterface {
    name = 'Location1685895979906'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ads" ADD "latitude" integer DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "ads" ADD "longitude" integer DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ads" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "ads" DROP COLUMN "latitude"`);
    }

}

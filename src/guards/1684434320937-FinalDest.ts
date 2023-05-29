import {MigrationInterface, QueryRunner} from "typeorm";

export class FinalDest1684434320937 implements MigrationInterface {
    name = 'FinalDest1684434320937'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ads" ALTER COLUMN "slug" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "ads" ALTER COLUMN "subject" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "ads" ALTER COLUMN "title" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "ads" ALTER COLUMN "type" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "ads" ALTER COLUMN "profilePicture" SET DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ads" ALTER COLUMN "profilePicture" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "ads" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "ads" ALTER COLUMN "title" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "ads" ALTER COLUMN "subject" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "ads" ALTER COLUMN "slug" DROP DEFAULT`);
    }

}

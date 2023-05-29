import {MigrationInterface, QueryRunner} from "typeorm";

export class FinalDest1684434397267 implements MigrationInterface {
    name = 'FinalDest1684434397267'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "bio" character varying NOT NULL DEFAULT '', "image" character varying NOT NULL DEFAULT '', "password" character varying NOT NULL, "phoneNumber" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ads" ("id" SERIAL NOT NULL, "slug" character varying NOT NULL DEFAULT '', "subject" character varying NOT NULL DEFAULT '', "title" character varying NOT NULL DEFAULT '', "type" character varying NOT NULL DEFAULT '', "hourlyRate" integer NOT NULL DEFAULT '0', "description" character varying NOT NULL DEFAULT '', "location" character varying NOT NULL DEFAULT '', "profilePicture" character varying NOT NULL DEFAULT '', "lessonType" character varying NOT NULL DEFAULT '', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "tagList" text NOT NULL, "reccCount" integer NOT NULL DEFAULT '0', "studentNumber" integer NOT NULL DEFAULT '0', "authorId" integer, CONSTRAINT "PK_a7af7d1998037a97076f758fc23" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tags" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_favorites_ads" ("usersId" integer NOT NULL, "adsId" integer NOT NULL, CONSTRAINT "PK_6b30abe785ef027b7c7fe4796fe" PRIMARY KEY ("usersId", "adsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5db1aec3e235f08703c9b285a9" ON "users_favorites_ads" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7c2184a3d15bb3eb4f52011c08" ON "users_favorites_ads" ("adsId") `);
        await queryRunner.query(`ALTER TABLE "ads" ADD CONSTRAINT "FK_6bf34f1ecd33b27b78d372bbea1" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_favorites_ads" ADD CONSTRAINT "FK_5db1aec3e235f08703c9b285a92" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_favorites_ads" ADD CONSTRAINT "FK_7c2184a3d15bb3eb4f52011c086" FOREIGN KEY ("adsId") REFERENCES "ads"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_favorites_ads" DROP CONSTRAINT "FK_7c2184a3d15bb3eb4f52011c086"`);
        await queryRunner.query(`ALTER TABLE "users_favorites_ads" DROP CONSTRAINT "FK_5db1aec3e235f08703c9b285a92"`);
        await queryRunner.query(`ALTER TABLE "ads" DROP CONSTRAINT "FK_6bf34f1ecd33b27b78d372bbea1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7c2184a3d15bb3eb4f52011c08"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5db1aec3e235f08703c9b285a9"`);
        await queryRunner.query(`DROP TABLE "users_favorites_ads"`);
        await queryRunner.query(`DROP TABLE "tags"`);
        await queryRunner.query(`DROP TABLE "ads"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}

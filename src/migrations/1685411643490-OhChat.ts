import {MigrationInterface, QueryRunner} from "typeorm";

export class OhChat1685411643490 implements MigrationInterface {
    name = 'OhChat1685411643490'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "chats" ("id" SERIAL NOT NULL, "senderId" integer NOT NULL, "receiverId" integer NOT NULL, "message" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0117647b3c4a4e5ff198aeb6206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "chats" ADD CONSTRAINT "FK_d697f19c9c7778ed773b449ce70" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chats" ADD CONSTRAINT "FK_c8562e07e5260b76b37e25126c6" FOREIGN KEY ("receiverId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chats" DROP CONSTRAINT "FK_c8562e07e5260b76b37e25126c6"`);
        await queryRunner.query(`ALTER TABLE "chats" DROP CONSTRAINT "FK_d697f19c9c7778ed773b449ce70"`);
        await queryRunner.query(`DROP TABLE "chats"`);
    }

}

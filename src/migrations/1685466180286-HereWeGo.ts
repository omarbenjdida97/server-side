import {MigrationInterface, QueryRunner} from "typeorm";

export class HereWeGo1685466180286 implements MigrationInterface {
    name = 'HereWeGo1685466180286'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "connected_user_entity" ("id" SERIAL NOT NULL, "socketId" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_a903379d19b275c008fa625f0fa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "message_entity" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "roomId" integer, CONSTRAINT "PK_45bb3707fbb99a73e831fee41e0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "room_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fc9fe8e7b09bbbeea55ba770e1a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "joined_room_entity" ("id" SERIAL NOT NULL, "socketId" character varying NOT NULL, "userId" integer, "roomId" integer, CONSTRAINT "PK_f6b907c2a92c9283d62a386a7a1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "room_entity_users_users" ("roomEntityId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_efa5cfaf82da6d03ba0ac2e8f9c" PRIMARY KEY ("roomEntityId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_56a6b54a3856c725dc86e5e0ff" ON "room_entity_users_users" ("roomEntityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_beb4343cccaece5bf1c5db6655" ON "room_entity_users_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "connected_user_entity" ADD CONSTRAINT "FK_a2cac4ca8aafbecb41901b07edb" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message_entity" ADD CONSTRAINT "FK_577902780af0407f6dc26aef28b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message_entity" ADD CONSTRAINT "FK_de6dd7c5c37f0d852b6ba9d98bd" FOREIGN KEY ("roomId") REFERENCES "room_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "joined_room_entity" ADD CONSTRAINT "FK_5b50b132bef2e7c0316eb51ae24" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "joined_room_entity" ADD CONSTRAINT "FK_6b9c0d66794a55af236aa5d857a" FOREIGN KEY ("roomId") REFERENCES "room_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room_entity_users_users" ADD CONSTRAINT "FK_56a6b54a3856c725dc86e5e0ffb" FOREIGN KEY ("roomEntityId") REFERENCES "room_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "room_entity_users_users" ADD CONSTRAINT "FK_beb4343cccaece5bf1c5db66555" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room_entity_users_users" DROP CONSTRAINT "FK_beb4343cccaece5bf1c5db66555"`);
        await queryRunner.query(`ALTER TABLE "room_entity_users_users" DROP CONSTRAINT "FK_56a6b54a3856c725dc86e5e0ffb"`);
        await queryRunner.query(`ALTER TABLE "joined_room_entity" DROP CONSTRAINT "FK_6b9c0d66794a55af236aa5d857a"`);
        await queryRunner.query(`ALTER TABLE "joined_room_entity" DROP CONSTRAINT "FK_5b50b132bef2e7c0316eb51ae24"`);
        await queryRunner.query(`ALTER TABLE "message_entity" DROP CONSTRAINT "FK_de6dd7c5c37f0d852b6ba9d98bd"`);
        await queryRunner.query(`ALTER TABLE "message_entity" DROP CONSTRAINT "FK_577902780af0407f6dc26aef28b"`);
        await queryRunner.query(`ALTER TABLE "connected_user_entity" DROP CONSTRAINT "FK_a2cac4ca8aafbecb41901b07edb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_beb4343cccaece5bf1c5db6655"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_56a6b54a3856c725dc86e5e0ff"`);
        await queryRunner.query(`DROP TABLE "room_entity_users_users"`);
        await queryRunner.query(`DROP TABLE "joined_room_entity"`);
        await queryRunner.query(`DROP TABLE "room_entity"`);
        await queryRunner.query(`DROP TABLE "message_entity"`);
        await queryRunner.query(`DROP TABLE "connected_user_entity"`);
    }

}

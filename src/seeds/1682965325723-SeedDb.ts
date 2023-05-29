import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDb1682965325723 implements MigrationInterface {
  name = 'SeedDb1682965325723';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO tags (name) VALUES ('math'), ('science'), ('english'), ('history'), ('geography'), ('art'), ('music'), ('computer science'), ('online'), ('facetoface')`,
    );
    await queryRunner.query(
      `INSERT INTO users (username, email, password) VALUES ('admin', 'admin@gmail.com', '$2b$10$JdqO9QIuBJvLZGXH6i.VQ.Qd6TErQpxYb20gvbbres3nHlW/yYzz6')`,
    );

    await queryRunner.query(
      `INSERT INTO ads (slug, subject, title, type, "hourlyRate", description, location, "profilePicture", "lessonType", "tagList", "reccCount", "studentNumber", "authorId") VALUES ('math-tutor', 'math', 'math instructor', 'online', 15, 'math teacher for hire', 'sousse', 'image', 'type', 'math, online', 0, 0, 1), ('english-tutor', 'math', 'math instructor', 'online', 15, 'english teacher for hire', 'sousse', 'image', 'type', 'english, online', 0, 0, 1)`,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {}
}

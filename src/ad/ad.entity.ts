import { UserEntity } from '@app/user/entities/user.entity';
import { Comment } from '@app/ad/comment.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeUpdate,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
@Entity({ name: 'ads' })
export class AdEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  slug: string;

  @Column({ default: '' })
  subject: string;

  @Column({ default: '' })
  title: string;

  @Column('text', { array: true, default: '{}' })
  type: string[];

  @Column({ default: 0 })
  hourlyRate: number;

  @Column({ default: '' })
  description: string;

  @Column({ default: '' })
  location: string;

  @Column({ default: '' })
  aboutAuthor: string;

  @Column('decimal', { precision: 6, scale: 4, default: 0.0, nullable: true })
  latitude: number;

  @Column('decimal', { precision: 6, scale: 4, default: 0.0, nullable: true })
  longitude: number;

  @Column('simple-array')
  requiredSkills: string[];

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  updatedAt: Date;

  @Column('text', { array: true, default: '{}' })
  tagList: string[];

  @Column({ default: 0, nullable: true })
  reccCount: number;

  @Column({ default: 0, nullable: true })
  studentNumber: number;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }
  @ManyToOne(() => UserEntity, (user) => user.ads, { eager: true })
  author: UserEntity;

  @OneToMany(() => Comment, (comment) => comment.ad, { eager: true })
  @JoinColumn()
  comments: Comment[];
}

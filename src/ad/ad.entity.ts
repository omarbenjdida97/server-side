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

  @Column('simple-array')
  type: string[];

  @Column({ default: 0 })
  hourlyRate: number;

  @Column({ default: '' })
  description: string;

  @Column({ default: '' })
  location: string;

  @Column({ default: '' })
  aboutAuthor: string;

  @Column('simple-array')
  requiredSkills: string[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column('text', { array: true, default: '{}' })
  tagList: string[];

  @Column({ default: 0 })
  reccCount: number;

  @Column({ default: 0 })
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

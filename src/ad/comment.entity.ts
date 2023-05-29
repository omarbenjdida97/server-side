import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { AdEntity } from './ad.entity';
import { UserEntity } from '@app/user/entities/user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @ManyToOne(() => AdEntity, (ad) => ad.comments)
  ad: AdEntity;

  @ManyToOne(() => UserEntity, (user) => user.comments)
  author: UserEntity;
}

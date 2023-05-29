import { Module } from '@nestjs/common';
import { AdController } from '@app/ad/ad.controller';
import { AdService } from '@app/ad/ad.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdEntity } from './ad.entity';
import { UserEntity } from '@app/user/entities/user.entity';
import { Comment } from './comment.entity';
import { DefaultAdminModule, DefaultAdminSite } from 'nestjs-admin';
import { AdAdmin } from './ad.admin';
@Module({
  imports: [
    TypeOrmModule.forFeature([AdEntity, UserEntity, Comment]),
    DefaultAdminModule,
  ],
  controllers: [AdController],
  providers: [AdService],
  exports: [TypeOrmModule],
})
export class AdModule {
  constructor(private readonly adminSite: DefaultAdminSite) {
    adminSite.register('ADs', AdAdmin);
  }
}

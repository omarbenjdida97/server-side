import { Module } from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import { UserController } from '@app/user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@app/user/entities/user.entity';
import { AuthGuard } from '@app/guards/auth.guard';
import { DefaultAdminModule, DefaultAdminSite } from 'nestjs-admin';
import { UserAdmin } from './user.admin';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), DefaultAdminModule],
  controllers: [UserController],
  providers: [UserService, AuthGuard],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {
  constructor(private readonly adminSite: DefaultAdminSite) {
    // Register the User entity under the "User" section
    adminSite.register('User', UserAdmin);
  }
}

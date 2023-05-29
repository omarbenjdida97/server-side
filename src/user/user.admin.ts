import { AdminEntity } from 'nestjs-admin';
import { UserEntity } from './entities/user.entity';

export class UserAdmin extends AdminEntity {
  entity = UserEntity;
  listDisplay = ['id', 'username'];
  searchFields = ['username'];
}

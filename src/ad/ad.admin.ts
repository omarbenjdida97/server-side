import { AdminEntity } from 'nestjs-admin';
import { AdEntity } from './ad.entity';

export class AdAdmin extends AdminEntity {
  entity = AdEntity;
  listDisplay = ['id', 'title', 'slug'];
  searchFields = ['slug', 'title'];
}

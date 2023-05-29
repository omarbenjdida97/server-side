import { AdEntity } from '../ad.entity';

export type AdType = Omit<AdEntity, 'updateTimestamp'>;

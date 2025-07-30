import { PickType } from '@nestjs/swagger';
import { GymEntity } from '../entities/gym.entity';

export class CreateGymDto extends PickType(GymEntity, [
  'address',
  'legalDocsUrl',
  'legalEntityName',
  'name',
]) {}

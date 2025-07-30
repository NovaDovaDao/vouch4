import { PickType } from '@nestjs/swagger';
import { TenancyEntity } from '../entities/tenancy.entity';

export class CreateTenancyDto extends PickType(TenancyEntity, [
  'contactEmail',
  'legalName',
  'name',
]) {}

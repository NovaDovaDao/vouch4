import { PartialType } from '@nestjs/swagger';
import { TenancyEntity } from '../entities/tenancy.entity';

export class UpdateTenancyDto extends PartialType(TenancyEntity) {}

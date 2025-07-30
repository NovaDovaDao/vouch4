import { IsDate, IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';
import { Tenancy } from '../../../generated/prisma';

export class TenancyEntity implements Tenancy {
  @IsString()
  name: string;

  @IsUUID()
  id: string;

  @IsString()
  @IsOptional()
  legalName: string | null;

  @IsEmail()
  contactEmail: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  @IsUUID()
  @IsOptional()
  tenancyOwnerUserId: string | null;
}

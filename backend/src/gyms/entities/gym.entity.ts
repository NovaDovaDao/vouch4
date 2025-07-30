import {
  IsDate,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
} from 'class-validator';
import { Gym } from '../../../generated/prisma';

export type Location = {
  latitude: number;
  longitude: number;
};

export type GymAddress = {
  street1?: string;
  street2?: string;
  street3?: string;
  city?: string;
  state?: string;
  province?: string;
  country?: string;
  zip?: string;
  location?: Location;
};

export class GymEntity implements Gym {
  @IsUUID()
  tenancyId: string;

  @IsUUID()
  id: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  legalEntityName: string | null;

  @IsUrl()
  @IsOptional()
  legalDocsUrl: string | null;

  @IsObject()
  @IsOptional()
  address: GymAddress;
}

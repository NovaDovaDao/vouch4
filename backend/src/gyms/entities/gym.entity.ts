import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Gym } from '../../../generated/prisma';

export type Location = {
  latitude: number;
  longitude: number;
};

class LocationDto implements Location {
  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;
}

export type Address = {
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

class AddressDto implements Address {
  @ApiPropertyOptional({ type: 'string' })
  street1?: string;

  @ApiPropertyOptional({ type: 'string' })
  street2?: string;

  @ApiPropertyOptional({ type: 'string' })
  street3?: string;

  @ApiPropertyOptional({ type: 'string' })
  city?: string;

  @ApiPropertyOptional({ type: 'string' })
  state?: string;

  @ApiPropertyOptional({ type: 'string' })
  province?: string;

  @ApiPropertyOptional({ type: 'string' })
  country?: string;

  @ApiPropertyOptional({ type: 'string' })
  zip?: string;

  @ApiPropertyOptional({
    type: LocationDto,
  })
  location?: Location;
}

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

  @ApiPropertyOptional({
    type: AddressDto,
  })
  address: Address;
}

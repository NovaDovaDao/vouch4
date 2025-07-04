import { IsDate, IsInt, IsOptional, IsString, IsUUID } from 'class-validator';
import { Class } from '../../../generated/prisma';

export class ClassDto implements Class {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string | null;

  @IsDate()
  scheduleDateTime: Date;

  @IsInt()
  capacity: number;

  @IsUUID()
  gymId: string;

  @IsUUID()
  instructorId: string | null;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}

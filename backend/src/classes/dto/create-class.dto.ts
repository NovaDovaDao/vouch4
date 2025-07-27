import { IsDate, IsInt, IsOptional, IsString, IsUUID } from 'class-validator';
import { Class } from '../../../generated/prisma';

export class CreateClassDto
  implements Omit<Class, 'id' | 'createdAt' | 'updatedAt'>
{
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
  @IsOptional()
  instructorId: string | null;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, IsInt } from 'class-validator';

export class ErrorDto {
  @IsString()
  @ApiProperty({ example: 'Bad Request' })
  error: string;

  @IsArray()
  @ApiProperty({ example: 'Woopsies' })
  message: string[];

  @IsInt()
  @ApiProperty({ example: 400 })
  status: number;
}

export class UnauthorizedDto {
  @IsString()
  @ApiProperty({ example: 'Unauthorized' })
  message: string;

  @IsInt()
  @ApiProperty({ example: 401 })
  statusCode: number;
}

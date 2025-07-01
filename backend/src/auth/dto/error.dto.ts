import { IsArray, IsString, IsInt } from 'class-validator';

export class ErrorDto {
  @IsString()
  error: string;

  @IsArray()
  message: string[];

  @IsInt()
  status: number;
}

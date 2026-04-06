import { IsDateString, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  title?: string;

  @IsOptional()
  @IsDateString()
  startUtc?: string;

  @IsOptional()
  @IsDateString()
  endUtc?: string;
}

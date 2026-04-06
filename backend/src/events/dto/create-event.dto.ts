import { IsDateString, IsString, MinLength } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @MinLength(1)
  title!: string;

  @IsDateString()
  startUtc!: string;

  @IsDateString()
  endUtc!: string;
}

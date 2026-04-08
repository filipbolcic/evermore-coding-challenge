import { IsDateString, IsOptional, IsString, Matches, MinLength } from 'class-validator';
import {
  UTC_ISO_DATETIME_MESSAGE,
  UTC_ISO_DATETIME_REGEX,
} from './date-time.constants';

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  title?: string;

  @IsOptional()
  @IsDateString()
  @Matches(UTC_ISO_DATETIME_REGEX, {
    message: `startUtc ${UTC_ISO_DATETIME_MESSAGE}`,
  })
  startUtc?: string;

  @IsOptional()
  @IsDateString()
  @Matches(UTC_ISO_DATETIME_REGEX, {
    message: `endUtc ${UTC_ISO_DATETIME_MESSAGE}`,
  })
  endUtc?: string;
}

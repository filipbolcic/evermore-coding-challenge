import { IsDateString, IsString, Matches, MinLength } from 'class-validator';
import {
  UTC_ISO_DATETIME_MESSAGE,
  UTC_ISO_DATETIME_REGEX,
} from './date-time.constants';

export class CreateEventDto {
  @IsString()
  @MinLength(1)
  title!: string;

  @IsDateString()
  @Matches(UTC_ISO_DATETIME_REGEX, {
    message: `startUtc ${UTC_ISO_DATETIME_MESSAGE}`,
  })
  startUtc!: string;

  @IsDateString()
  @Matches(UTC_ISO_DATETIME_REGEX, {
    message: `endUtc ${UTC_ISO_DATETIME_MESSAGE}`,
  })
  endUtc!: string;
}

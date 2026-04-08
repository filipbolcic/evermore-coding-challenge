import { IsDateString, IsString, Matches, MinLength } from 'class-validator';
import {
  TIMEZONE_AWARE_ISO_DATETIME_MESSAGE,
  TIMEZONE_AWARE_ISO_DATETIME_REGEX,
} from './date-time.constants';

export class CreateEventDto {
  @IsString()
  @MinLength(1)
  title!: string;

  @IsDateString()
  @Matches(TIMEZONE_AWARE_ISO_DATETIME_REGEX, {
    message: `startUtc ${TIMEZONE_AWARE_ISO_DATETIME_MESSAGE}`,
  })
  startUtc!: string;

  @IsDateString()
  @Matches(TIMEZONE_AWARE_ISO_DATETIME_REGEX, {
    message: `endUtc ${TIMEZONE_AWARE_ISO_DATETIME_MESSAGE}`,
  })
  endUtc!: string;
}

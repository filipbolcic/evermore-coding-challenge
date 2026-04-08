import { UTCDate } from '@date-fns/utc';
import { BadRequestException } from '@nestjs/common';
import { isValid, parseISO } from 'date-fns';
import { UTC_ISO_DATETIME_REGEX } from './dto/date-time.constants';

type EventDateField = 'startUtc' | 'endUtc';

export function parseEventDateTime(input: string, fieldName: EventDateField) {
  if (!UTC_ISO_DATETIME_REGEX.test(input)) {
    throw new BadRequestException(`${fieldName} must be a valid UTC datetime`);
  }

  const parsedDate = parseISO(input);
  if (!isValid(parsedDate)) {
    throw new BadRequestException(`${fieldName} must be a valid UTC datetime`);
  }

  parsedDate.setUTCSeconds(0, 0);

  return new UTCDate(parsedDate.getTime());
}

export function toUtcDate(input: Date) {
  if (Number.isNaN(input.getTime())) {
    throw new BadRequestException('Encountered an invalid persisted datetime');
  }

  return new UTCDate(input.getTime());
}

import { BadRequestException } from '@nestjs/common';

export function parseEventDateTime(input: string, fieldName: 'startUtc' | 'endUtc') {
  const parsedDate = new Date(input);

  if (Number.isNaN(parsedDate.getTime())) {
    throw new BadRequestException(`${fieldName} must be a valid datetime`);
  }

  return parsedDate;
}

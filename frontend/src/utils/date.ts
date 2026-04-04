import { formatISO } from 'date-fns';

export function dateFormat(date: number | string | Date) {
  return formatISO(date, { representation: 'date' });
}

export function getBrowserTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

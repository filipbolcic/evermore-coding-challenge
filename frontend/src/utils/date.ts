import { format, formatISO } from 'date-fns';

export function dateFormat(date: number | string | Date) {
  return formatISO(date, { representation: 'date' });
}

export function timeFormat(date: number | string | Date) {
  return format(date, 'HH:mm');
}

export function getBrowserTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

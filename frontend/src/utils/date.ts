import { format, formatISO } from 'date-fns';

export const UTC_TIMEZONE = 'UTC';

export function dateFormat(date: number | string | Date) {
  return formatISO(date, { representation: 'date' });
}

export function timeFormat(date: number | string | Date) {
  return format(date, 'HH:mm');
}

export function getBrowserTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function getLocalWallClockDate(date: Date) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds()
  );
}

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

export function getLocalWallClockDate(dateSegment: Date, timeSegment = dateSegment) {
  return new Date(
    dateSegment.getFullYear(),
    dateSegment.getMonth(),
    dateSegment.getDate(),
    timeSegment.getHours(),
    timeSegment.getMinutes(),
    timeSegment.getSeconds(),
    timeSegment.getMilliseconds()
  );
}

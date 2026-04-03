import { formatInTimeZone, toZonedTime, fromZonedTime } from 'date-fns-tz';

/**
 * Convert a UTC Date to a specific timezone
 */
export function convertUtcToTz(utc: Date, tz: string): Date {
  return toZonedTime(utc, tz);
}

/**
 * Convert a local Date in a specific timezone to UTC
 */
export function convertTzToUtc(local: Date, tz: string): Date {
  return fromZonedTime(local, tz);
}

/**
 * Get the browser's current timezone
 */
export function getBrowserTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

/**
 * Format a UTC date for display in a specific timezone
 */
export function formatUtcInTimezone(utc: Date, tz: string, formatStr: string = 'yyyy-MM-dd HH:mm'): string {
  return formatInTimeZone(utc, tz, formatStr);
}
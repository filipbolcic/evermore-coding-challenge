/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Convert a UTC Date to a specific timezone
 */
export function convertUtcToTz(utc: Date, tz: string): Date {
  // return toZonedTime(utc, tz);
  throw new Error('not implemented');
}

/**
 * Convert a local Date in a specific timezone to UTC
 */
export function convertTzToUtc(local: Date, tz: string): Date {
  // return fromZonedTime(local, tz);
  throw new Error('not implemented');
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
export function formatUtcInTimezone(
  utc: Date,
  tz: string,
  formatStr: string = 'yyyy-MM-dd HH:mm'
): string {
  // return formatInTimeZone(utc, tz, formatStr);
  throw new Error('not implemented');
}

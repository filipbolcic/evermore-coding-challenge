import { TZDate } from '@date-fns/tz';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { Event } from '../../../../api/events/types';
import { getLocalWallClockDate, UTC_TIMEZONE } from '../../../../utils/date';
import { editEventFormSchema } from './schema';

export interface EditEventFormValues {
  title: string;
  startDate: Date;
  startTime: Date;
  endDate: Date;
  endTime: Date;
  timezone: string;
}

export function useEditEventForm(values: EditEventFormValues) {
  return useForm<EditEventFormValues>({
    resolver: zodResolver(editEventFormSchema),
    defaultValues: values,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });
}

export function getEditEventValuesFromEvent(event: Event, timezone: string) {
  const eventStartInTimezone = TZDate.tz(timezone, event.startUtc);
  const eventEndInTimezone = TZDate.tz(timezone, event.endUtc);

  const startDate = getLocalWallClockDate(eventStartInTimezone);
  const endDate = getLocalWallClockDate(eventEndInTimezone);

  return {
    title: event.title,
    startDate,
    startTime: startDate,
    endDate,
    endTime: endDate,
    timezone,
  };
}

/**
 * Converts local date and time segments to a UTC ISO string.
 *
 * MUI date/time controls handle dates in local timezone, and the date-fns adapter is not fully supported.
 * This function converts the local datetime to its corresponding UTC value through the following steps:
 * 1. Gets the local "wall clock" time for each segment
 * 2. Sets it to the specified timezone datetime (treating user-selected values as set in that timezone)
 * 3. Converts to the corresponding UTC value
 *
 * @param {Date} dateSegment - The date segment containing year, month, and date values in local timezone
 * @param {Date} timeSegment - The time segment containing hours and minutes values in local timezone
 * @param {string} timezone - The IANA timezone string (e.g., 'America/New_York', 'UTC') to interpret the segments
 * @returns {string} The converted datetime as an ISO 8601 string in UTC timezone
 *
 * @see https://mui.com/x/react-date-pickers/timezone
 *
 * @example
 * const dateSegment = new Date(2024, 0, 15); // January 15, 2024
 * const timeSegment = new Date(0, 0, 0, 14, 30); // 14:30
 * const result = convertLocalToUtcDate(dateSegment, timeSegment, 'America/New_York'); // "2024-01-15T19:30:00.000Z"
 */
export function convertLocalToUtcDate(dateSegment: Date, timeSegment: Date, timezone: string) {
  // MUI date/time controls handle dates in local timezone -> date-fns adapter is not fully supported (https://mui.com/x/react-date-pickers/timezone)
  // local datetime is calculated to corresponding UTC:
  //  1. get local "wall clock" time for each segment
  //  2. set it to TZ datetime
  //     (this treats the user-selected values as set in timezone)
  //  3. convert to corresponding UTC value

  const tzDateTime = TZDate.tz(timezone);

  tzDateTime.setFullYear(dateSegment.getFullYear(), dateSegment.getMonth(), dateSegment.getDate());
  tzDateTime.setHours(timeSegment.getHours(), timeSegment.getMinutes(), 0, 0);

  const utcDateTime = tzDateTime.withTimeZone(UTC_TIMEZONE);
  return utcDateTime.toISOString();
}

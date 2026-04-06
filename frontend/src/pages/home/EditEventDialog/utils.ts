import { TZDate } from '@date-fns/tz';
import { addHours } from 'date-fns';
import { useForm } from 'react-hook-form';
import type { Event } from '../../../api/events/types';
import { getLocalWallClockDate } from '../../../utils/date';

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
    defaultValues: values,
  });
}

export function getEditEventBaseValues(startDate: Date, timezone: string) {
  const endDate = addHours(startDate, 1);

  return {
    title: '',
    startDate,
    startTime: startDate,
    endDate,
    endTime: endDate,
    timezone,
  };
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

export function getTzDate(timezone: string, dateSegment: Date, timeSegment: Date) {
  const tzDateTime = TZDate.tz(timezone);

  tzDateTime.setFullYear(dateSegment.getFullYear(), dateSegment.getMonth(), dateSegment.getDate());
  tzDateTime.setHours(timeSegment.getHours(), timeSegment.getMinutes());

  return tzDateTime;
}

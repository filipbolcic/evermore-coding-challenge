import { TZDate } from '@date-fns/tz';
import { zodResolver } from '@hookform/resolvers/zod';
import { addHours } from 'date-fns';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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

function isValidDate(value: unknown): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime());
}

function getLocalDateTime(dateSegment: Date, timeSegment: Date) {
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

const requiredDateField = (message: string) => z.custom<Date>(isValidDate, { message });

const editEventFormSchema = z
  .object({
    title: z.string().trim().min(1, 'Title is required'),
    startDate: requiredDateField('Start date is required'),
    startTime: requiredDateField('Start time is required'),
    endDate: requiredDateField('End date is required'),
    endTime: requiredDateField('End time is required'),
    timezone: z.string().trim().min(1, 'Timezone is required'),
  })
  .superRefine(({ startDate, startTime, endDate, endTime }, context) => {
    const startDateTime = getLocalDateTime(startDate, startTime);
    const endDateTime = getLocalDateTime(endDate, endTime);

    if (endDateTime <= startDateTime) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'End date and time must be after the start date and time',
        path: ['endDate'],
      });
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'End date and time must be after the start date and time',
        path: ['endTime'],
      });
    }
  });

export function useEditEventForm(values: EditEventFormValues) {
  return useForm<EditEventFormValues>({
    resolver: zodResolver(editEventFormSchema),
    defaultValues: values,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
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
  tzDateTime.setHours(timeSegment.getHours(), timeSegment.getMinutes(), 0, 0);

  return tzDateTime;
}

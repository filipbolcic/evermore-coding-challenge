import { z } from 'zod';
import { getLocalWallClockDate } from '../../../../utils/date';

function isValidDate(value: unknown): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime());
}

const requiredDateField = (message: string) => z.custom<Date>(isValidDate, { message });

export const editEventFormSchema = z
  .object({
    title: z.string().trim().min(1, 'Title is required'),
    startDate: requiredDateField('Start date is required'),
    startTime: requiredDateField('Start time is required'),
    endDate: requiredDateField('End date is required'),
    endTime: requiredDateField('End time is required'),
    timezone: z.string().trim().min(1, 'Timezone is required'),
  })
  .superRefine(({ startDate, startTime, endDate, endTime }, context) => {
    const startDateTime = getLocalWallClockDate(startDate, startTime);
    const endDateTime = getLocalWallClockDate(endDate, endTime);

    if (endDateTime <= startDateTime) {
      context.addIssue({
        code: 'custom',
        message: 'End date and time must be after the start date and time',
        path: ['endDate'],
      });
      context.addIssue({
        code: 'custom',
        message: 'End date and time must be after the start date and time',
        path: ['endTime'],
      });
    }
  });

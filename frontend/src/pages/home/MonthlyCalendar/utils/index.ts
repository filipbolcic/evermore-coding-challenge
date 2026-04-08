import { tz } from '@date-fns/tz';
import { eachDayOfInterval, endOfMonth, endOfWeek, startOfMonth, startOfWeek } from 'date-fns';
import type { Event } from '../../../../api/events/types';
import { dateFormat } from '../../../../utils/date';
import { getDailyEventSegments, type CalendarEventSegment } from '../../utils';

export interface MonthlyEventSegment extends CalendarEventSegment {
  sourceEvent: Event;
}

export function getEventsForDay(day: Date, timezone: string, events: Event[]) {
  const dailySegments = getDailyEventSegments(events, dateFormat(day), timezone);

  return dailySegments
    .map((segment) => ({
      ...segment,
      sourceEvent: events.find((event) => event.id === segment.id)!,
    }))
    .sort((a, b) => {
      if (a.hourStart !== b.hourStart) {
        return a.hourStart - b.hourStart;
      }

      return a.sourceEvent.startUtc.localeCompare(b.sourceEvent.startUtc);
    });
}

export function getMonthlyCalendarDays(date: string, timezone: string) {
  const monthStart = startOfMonth(date, { in: tz(timezone) });
  const monthEnd = endOfMonth(date, { in: tz(timezone) });

  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  return calendarDays;
}

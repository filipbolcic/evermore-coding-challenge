import { tz, TZDateMini } from '@date-fns/tz';
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  isSameDay,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import type { Event } from '../../../../api/events/types';

export function getEventsForDay(day: Date, timezone: string, events: Event[]) {
  const todayEvents = events.filter((e) => {
    const eventDate = new TZDateMini(e.startUtc, timezone);
    return isSameDay(eventDate, day);
  });

  return todayEvents.sort(
    (a, b) => new Date(a.startUtc).getTime() - new Date(b.startUtc).getTime()
  );
}

export function getMonthlyCalendarDays(date: string, timezone: string) {
  const monthStart = startOfMonth(date, { in: tz(timezone) });
  const monthEnd = endOfMonth(date, { in: tz(timezone) });

  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  return calendarDays;
}

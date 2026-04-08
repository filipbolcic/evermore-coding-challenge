import { tz } from '@date-fns/tz';
import { eachDayOfInterval, endOfMonth, endOfWeek, startOfMonth, startOfWeek } from 'date-fns';

export function getMonthlyCalendarDays(date: string, timezone: string) {
  const monthStart = startOfMonth(date, { in: tz(timezone) });
  const monthEnd = endOfMonth(date, { in: tz(timezone) });

  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  return calendarDays;
}

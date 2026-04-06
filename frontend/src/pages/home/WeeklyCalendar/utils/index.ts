import { tz } from '@date-fns/tz';
import { add, startOfWeek } from 'date-fns';
import { dateFormat, UTC_TIMEZONE } from '../../../../utils/date';
import { MIN_COL_WIDTH, WEEK_DAYS_COUNT } from './const';

export function getWeekDays(date: string) {
  const weekStart = startOfWeek(date, { weekStartsOn: 1, in: tz(UTC_TIMEZONE) });
  const weekDays = Array.from({ length: WEEK_DAYS_COUNT }, (_, index) =>
    add(weekStart, { days: index })
  );

  return weekDays;
}

export function getGridColumns(weekDates: Date[]) {
  return (
    '[hour-label] auto ' +
    weekDates
      .map((date) => `[date-${dateFormat(date)}] minmax(${MIN_COL_WIDTH}px, 1fr)`)
      .join(' ') +
    ' [date-end]'
  );
}

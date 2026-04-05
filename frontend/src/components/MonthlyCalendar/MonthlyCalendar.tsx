import { tz, TZDateMini } from '@date-fns/tz';
import { Box, Typography } from '@mui/material';
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { useCalendarStore } from '../../stores/calendarStore';
import type { MockEvent } from '../../types/date';
import { DayCell } from './DayCell';

export function MonthlyCalendar() {
  const { selectedDate, selectedTimezone } = useCalendarStore();

  const monthStart = startOfMonth(selectedDate, { in: tz(selectedTimezone) });
  const monthEnd = endOfMonth(selectedDate, { in: tz(selectedTimezone) });

  const { events: calendarEvents } = useCalendarStore();

  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const weekDayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const minColumnWidth = 180;
  const minCalendarWidth = weekDayLabels.length * minColumnWidth;

  return (
    <Box sx={{ overflowX: 'auto', width: '100%' }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `repeat(7, minmax(${minColumnWidth}px, 1fr))`,
          gap: 1,
          minWidth: minCalendarWidth,
          width: `max(100%, ${minCalendarWidth}px)`,
        }}
      >
        {weekDayLabels.map((day) => (
          <Box key={day} sx={{ p: 1, textAlign: 'center' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
              {day}
            </Typography>
          </Box>
        ))}

        {calendarDays.map((day, index) => {
          const events = getEventsForDay(day, selectedTimezone, calendarEvents);
          const isInCurrentMonth = isSameMonth(day, selectedDate);
          const isCurrentDay = isToday(day);

          return (
            <DayCell
              key={index}
              day={day}
              events={events}
              isInCurrentMonth={isInCurrentMonth}
              isCurrentDay={isCurrentDay}
            />
          );
        })}
      </Box>
    </Box>
  );
}

function getEventsForDay(day: Date, timezone: string, events: MockEvent[]) {
  const todayEvents = events.filter((e) => {
    const eventDate = new TZDateMini(e.startUtc, timezone);
    return isSameDay(eventDate, day);
  });

  return todayEvents.sort(
    (a, b) => new Date(a.startUtc).getTime() - new Date(b.startUtc).getTime()
  );
}

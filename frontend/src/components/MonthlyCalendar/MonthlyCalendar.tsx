import { tz, TZDateMini } from '@date-fns/tz';
import { Box, Stack, Typography } from '@mui/material';
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
  return (
    <Stack spacing={1}>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1 }}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <Box key={day} sx={{ p: 1, textAlign: 'center', fontWeight: 'bold' }}>
            <Typography variant="subtitle2">{day}</Typography>
          </Box>
        ))}
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1 }}>
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
    </Stack>
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

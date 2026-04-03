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
import { convertUtcToTz } from '../../utils/date';
import { MOCK_EVENTS } from '../../utils/mockData';
import { DayCell } from './DayCell';

export function MonthlyCalendar() {
  const { currentDate, selectedTimezone } = useCalendarStore();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const getEventsForDay = (day: Date) => {
    const todayEvents = MOCK_EVENTS.filter((event) => {
      const eventDate = convertUtcToTz(new Date(event.startUtc), selectedTimezone);
      return isSameDay(eventDate, day);
    });

    return todayEvents.sort(
      (a, b) => new Date(a.startUtc).getTime() - new Date(b.startUtc).getTime()
    );
  };

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
          const events = getEventsForDay(day);
          const isInCurrentMonth = isSameMonth(day, currentDate);
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

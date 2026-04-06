import { Box, Typography } from '@mui/material';
import { isSameMonth, isToday } from 'date-fns';
import { useEvents } from '../../../hooks/api/events';
import { useCalendarStore } from '../../../stores/calendar';
import { DayCell } from './DayCell';
import { getEventsForDay, getMonthlyCalendarDays } from './utils';
import { MIN_CALENDAR_WIDTH, MIN_COL_WIDTH, WEEK_DAY_LABELS } from './utils/const';

export function MonthlyCalendar() {
  const { selectedDate, selectedTimezone } = useCalendarStore();
  const { data } = useEvents();

  const calendarDays = getMonthlyCalendarDays(selectedDate, selectedTimezone);
  const events = data ?? [];
  return (
    <Box sx={{ overflowX: 'auto', width: '100%' }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `repeat(7, minmax(${MIN_COL_WIDTH}px, 1fr))`,
          gap: 1,
          minWidth: MIN_CALENDAR_WIDTH,
          width: `max(100%, ${MIN_CALENDAR_WIDTH}px)`,
        }}
      >
        {WEEK_DAY_LABELS.map((day) => (
          <Box key={day} sx={{ p: 1, textAlign: 'center' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
              {day}
            </Typography>
          </Box>
        ))}

        {calendarDays.map((day, index) => {
          const dayEvents = getEventsForDay(day, selectedTimezone, events);
          const isInCurrentMonth = isSameMonth(day, selectedDate);
          const isCurrentDay = isToday(day);

          return (
            <DayCell
              key={index}
              day={day}
              events={dayEvents}
              isInCurrentMonth={isInCurrentMonth}
              isCurrentDay={isCurrentDay}
            />
          );
        })}
      </Box>
    </Box>
  );
}

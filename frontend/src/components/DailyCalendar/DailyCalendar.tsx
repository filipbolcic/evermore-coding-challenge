import { TZDateMini } from '@date-fns/tz';
import { Paper, Stack, Typography } from '@mui/material';
import { format } from 'date-fns';
import { useCalendarStore } from '../../stores/calendarStore';
import { dateFormat } from '../../utils/date';
import { MOCK_EVENTS } from '../../utils/mockData';
import { HourSlot } from './HourSlot';

export function DailyCalendar() {
  const { selectedDate, selectedTimezone } = useCalendarStore();

  const now = TZDateMini.tz(selectedTimezone);
  const currentHour = now.getHours();

  const isToday = dateFormat(now) === selectedDate;

  const dayEvents = MOCK_EVENTS.filter((e) => {
    const tzStartDate = new TZDateMini(e.startUtc, selectedTimezone);
    return dateFormat(tzStartDate) === selectedDate;
  });

  return (
    <Stack spacing={0}>
      <Paper sx={{ p: 2, backgroundColor: 'background.default' }}>
        <Typography variant="h5">
          {format(selectedDate, 'EEEE, MMMM d, yyyy')}
          {isToday && (
            <Typography component="span" sx={{ ml: 1, color: 'primary.main', fontWeight: 'bold' }}>
              (Today)
            </Typography>
          )}
        </Typography>
      </Paper>

      {Array.from({ length: 24 }).map((_, hour) => (
        <HourSlot
          key={hour}
          hour={hour}
          events={dayEvents}
          isCurrentHour={isToday && hour === currentHour}
        />
      ))}
    </Stack>
  );
}

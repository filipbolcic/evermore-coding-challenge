import { Paper, Stack, Typography } from '@mui/material';
import { format, isSameDay } from 'date-fns';
import type { MockEvent } from '../../utils/mockData';
import { HourSlot } from './HourSlot';

interface DailyCalendarProps {
  events: MockEvent[];
  date: Date;
}

export function DailyCalendar({ events, date }: DailyCalendarProps) {
  const now = new Date();
  const isToday = isSameDay(date, now);
  const currentHour = now.getHours();

  const dayEvents = events.filter((event) => isSameDay(new Date(event.startUtc), date));

  return (
    <Stack spacing={0}>
      <Paper sx={{ p: 2, backgroundColor: 'background.default' }}>
        <Typography variant="h5">
          {format(date, 'EEEE, MMMM d, yyyy')}
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

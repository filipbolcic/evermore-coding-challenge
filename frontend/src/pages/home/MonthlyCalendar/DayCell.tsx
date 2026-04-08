import { Paper, Stack, Typography } from '@mui/material';
import { format } from 'date-fns';
import type { CalendarEventSegment } from '../utils';
import { EventCard } from './EventCard';

interface DayCellProps {
  day: Date;
  events: CalendarEventSegment[];
  isInCurrentMonth: boolean;
  isCurrentDay: boolean;
}

export function DayCell({ day, events, isInCurrentMonth, isCurrentDay }: DayCellProps) {
  return (
    <Paper
      sx={{
        p: 1,
        minHeight: 100,
        opacity: isInCurrentMonth ? 1 : 0.5,
        backgroundColor: isCurrentDay ? 'primary.light' : 'background.paper',
        border: isCurrentDay ? '2px solid' : '1px solid',
        borderColor: isCurrentDay ? 'primary.main' : 'divider',
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontWeight: isCurrentDay ? 'bold' : 'normal',
          color: isCurrentDay ? 'primary.contrastText' : 'text.primary',
        }}
      >
        {format(day, 'd')}
      </Typography>

      <Stack gap={0.25} sx={{ mt: 0.5, maxHeight: 120, overflowY: 'auto' }}>
        {events.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </Stack>
    </Paper>
  );
}

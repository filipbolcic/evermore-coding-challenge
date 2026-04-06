import { Paper, Stack, Typography } from '@mui/material';
import { format } from 'date-fns';
import type { MockEvent } from '../../../types/date';
import { MonthlyEventItem } from './MonthlyEventItem';

interface DayCellProps {
  day: Date;
  events: MockEvent[];
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

      <Stack spacing={0.25} sx={{ mt: 0.5, maxHeight: 120, overflowY: 'auto' }}>
        {events.map((event) => (
          <MonthlyEventItem key={event.id} event={event} />
        ))}
      </Stack>
    </Paper>
  );
}

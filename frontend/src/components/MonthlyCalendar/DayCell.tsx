import { Paper, Stack, Typography } from '@mui/material';
import { format } from 'date-fns';
import type { MockEvent } from '../../utils/mockData';

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

      <Stack spacing={0.25} sx={{ mt: 0.5 }}>
        {events.slice(0, 3).map((event) => (
          <Typography
            key={event.id}
            variant="caption"
            sx={{
              backgroundColor: 'secondary.light',
              color: 'secondary.contrastText',
              px: 0.5,
              py: 0.25,
              borderRadius: 0.5,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {event.title}
          </Typography>
        ))}
        {events.length > 3 && (
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            +{events.length - 3} more
          </Typography>
        )}
      </Stack>
    </Paper>
  );
}

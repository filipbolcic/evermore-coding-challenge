import { Paper, Stack, Typography } from '@mui/material';
import { format } from 'date-fns';
import type { MockEvent } from '../../utils/mockData';

const HOUR_LABELS = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

interface HourSlotProps {
  hour: number;
  events: MockEvent[];
  isCurrentHour: boolean;
}

export function HourSlot({ hour, events, isCurrentHour }: HourSlotProps) {
  const hourEvents = events.filter((e) => {
    const startTime = new Date(e.startUtc).getHours();
    return startTime === hour;
  });

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        minHeight: 80,
        p: 1,
        backgroundColor: isCurrentHour ? 'primary.lighter' : 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Typography
        variant="caption"
        sx={{
          minWidth: 40,
          fontWeight: isCurrentHour ? 'bold' : 'normal',
          color: isCurrentHour ? 'primary.main' : 'text.secondary',
        }}
      >
        {HOUR_LABELS[hour]}
      </Typography>

      <Stack spacing={0.5} sx={{ flex: 1 }}>
        {hourEvents.map((event) => (
          <Paper
            key={event.id}
            sx={{
              p: 0.75,
              backgroundColor: 'info.light',
              color: 'info.contrastText',
              borderRadius: 1,
            }}
          >
            <Typography variant="caption" sx={{ fontWeight: 500 }}>
              {event.title}
            </Typography>
            <Typography variant="caption" display="block">
              {format(new Date(event.startUtc), 'HH:mm')} -{' '}
              {format(new Date(event.endUtc), 'HH:mm')}
            </Typography>
          </Paper>
        ))}
      </Stack>
    </Stack>
  );
}

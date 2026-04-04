import { tz, TZDateMini } from '@date-fns/tz';
import { Paper, Stack, Typography } from '@mui/material';
import { format } from 'date-fns';
import { useCalendarStore } from '../../stores/calendarStore';
import type { MockEvent } from '../../utils/mockData';

const HOUR_LABELS = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

interface HourSlotProps {
  hour: number;
  events: MockEvent[];
  isCurrentHour: boolean;
}

export function HourSlot({ hour, events, isCurrentHour }: HourSlotProps) {
  const { selectedTimezone } = useCalendarStore();

  const hourEvents = events.filter((e) => {
    const startTime = new TZDateMini(e.startUtc, selectedTimezone).getHours();
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
              {format(event.startUtc, 'HH:mm', { in: tz(selectedTimezone) })} -{' '}
              {format(event.endUtc, 'HH:mm', { in: tz(selectedTimezone) })}
            </Typography>
          </Paper>
        ))}
      </Stack>
    </Stack>
  );
}

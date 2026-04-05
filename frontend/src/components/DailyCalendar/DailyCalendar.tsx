import { TZDateMini } from '@date-fns/tz';
import { Box, Stack, Typography } from '@mui/material';
import { format } from 'date-fns';
import { useCalendarStore } from '../../stores/calendarStore';
import { dateFormat } from '../../utils/date';
import { getDailyEventSegments } from '../utils';
import { HOUR_GRID_ROWS, HOUR_LIST } from '../utils/const';
import { EventCell } from './EventCell';
import { HourLabelCell } from './HourLabelCell';

export function DailyCalendar() {
  const { selectedDate, selectedTimezone } = useCalendarStore();

  const now = TZDateMini.tz(selectedTimezone);
  const currentHour = now.getHours();
  const isToday = dateFormat(now) === selectedDate;
  const { events } = useCalendarStore();
  const dayEvents = getDailyEventSegments(events, selectedDate, selectedTimezone);

  return (
    <Stack spacing={0}>
      <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
        <Typography variant="h5">
          {format(selectedDate, 'EEEE, MMMM d, yyyy')}
          {isToday && (
            <Typography component="span" sx={{ ml: 1, color: 'primary.main', fontWeight: 'bold' }}>
              (Today)
            </Typography>
          )}
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '[hour-label] 72px [events] minmax(0, 1fr) [events-end]',
          gridTemplateRows: HOUR_GRID_ROWS,
          borderColor: 'divider',
          borderRadius: 1,
          overflow: 'hidden',
        }}
      >
        {HOUR_LIST.map((_, hour) => (
          <HourLabelCell
            key={`hour-${hour}`}
            hour={hour}
            isCurrentHour={isToday && currentHour === hour}
            isLastHour={hour === 23}
          />
        ))}

        {HOUR_LIST.map((_, hour) => (
          <Box
            key={`slot-${hour}`}
            sx={{
              gridColumn: 'events',
              gridRow: `hour-${hour}`,
              borderBottom: hour !== 23 ? '1px solid' : undefined,
              borderColor: 'inherit',
              backgroundColor: 'background.paper',
            }}
          />
        ))}

        {dayEvents.map((event) => (
          <Box
            key={`event-${event.id}`}
            sx={{
              gridColumn: 'events',
              gridRow: `hour-${event.hourStart} / hour-${event.hourEnd}`,
            }}
          >
            <EventCell {...event} />
          </Box>
        ))}
      </Box>
    </Stack>
  );
}

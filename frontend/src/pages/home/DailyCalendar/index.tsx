import { TZDateMini } from '@date-fns/tz';
import { Box, Stack, Typography } from '@mui/material';
import { format } from 'date-fns';
import { useEvents } from '../../../hooks/api/events';
import { useCalendarStore } from '../../../stores/calendar';
import { dateFormat } from '../../../utils/date';
import { getDailyEventSegments } from '../utils';
import { HOUR_GRID_ROWS, HOUR_LIST, HOUR_ROW_HEIGHT } from '../utils/const';
import { EventCell } from './EventCell';
import { HourLabelCell } from './HourLabelCell';

const MIN_EVENTS_COL_WIDTH = 200;
const MIN_GRID_WIDTH = HOUR_ROW_HEIGHT + MIN_EVENTS_COL_WIDTH;

export function DailyCalendar() {
  const { selectedDate, selectedTimezone } = useCalendarStore();
  const { data } = useEvents();

  const now = TZDateMini.tz(selectedTimezone);
  const currentHour = now.getHours();
  const isToday = dateFormat(now) === selectedDate;

  const events = data ?? [];
  const dayEvents = getDailyEventSegments(events, selectedDate, selectedTimezone);

  return (
    <Stack spacing={0}>
      <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
        <Typography sx={{ fontSize: { xs: '1.6rem', sm: '1.9rem' }, fontWeight: 500 }}>
          {format(selectedDate, 'EEEE, MMMM d, yyyy')}
          {isToday && (
            <Typography component="span" sx={{ ml: 1, color: 'primary.main', fontWeight: 'bold' }}>
              (Today)
            </Typography>
          )}
        </Typography>
      </Box>

      <Box sx={{ width: '100%', overflowX: 'auto' }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: `[hour-label] 72px [events] minmax(${MIN_EVENTS_COL_WIDTH}px, 1fr) [events-end]`,
            gridTemplateRows: HOUR_GRID_ROWS,
            borderColor: 'divider',
            borderRadius: 1,
            overflow: 'hidden',
            minWidth: MIN_GRID_WIDTH,
            width: `max(100%, ${MIN_GRID_WIDTH}px)`,
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

          <Box
            sx={{
              gridColumn: 'events',
              gridRow: 'hour-0 / hour-24',
              position: 'relative',
              pointerEvents: 'none',
            }}
          >
            {dayEvents.map((event) => (
              <Box
                key={`event-${event.id}`}
                sx={{
                  position: 'absolute',
                  insetInline: 0,
                  top: `${(event.segmentMinuteStart / 60) * HOUR_ROW_HEIGHT}px`,
                  height: `${Math.max(
                    ((event.segmentMinuteEnd - event.segmentMinuteStart) / 60) * HOUR_ROW_HEIGHT,
                    24
                  )}px`,
                  pointerEvents: 'auto',
                }}
              >
                <EventCell {...event} />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Stack>
  );
}

import { tz, TZDateMini } from '@date-fns/tz';
import { Box, Stack } from '@mui/material';
import { add, isSameDay, startOfWeek } from 'date-fns';
import { useCalendarStore } from '../../../stores/calendarStore';
import { dateFormat } from '../../../utils/date';
import { EventCell } from '../DailyCalendar/EventCell';
import { HourLabelCell } from '../DailyCalendar/HourLabelCell';
import { getWeeklyEventSegments } from '../utils';
import { HOUR_GRID_ROWS, HOUR_LIST } from '../utils/const';
import { DateLabelCell } from './DateLabelCell';

export function WeeklyCalendar() {
  const { selectedDate, selectedTimezone } = useCalendarStore();

  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1, in: tz('UTC') });
  const weekDays = Array.from({ length: 7 }, (_, index) => add(weekStart, { days: index }));
  const minDayColumnWidth = 130;
  const minGridWidth = 72 + weekDays.length * minDayColumnWidth;

  const weeklyGridColumns =
    '[hour-label] auto ' +
    weekDays
      .map((date) => `[date-${dateFormat(date)}] minmax(${minDayColumnWidth}px, 1fr)`)
      .join(' ') +
    ' [date-end]';

  const todayInTimezone = TZDateMini.tz(selectedTimezone);
  const currentHour = todayInTimezone.getHours();

  const { events } = useCalendarStore();
  const eventSegments = getWeeklyEventSegments(events, weekDays, selectedTimezone);

  return (
    <Stack spacing={1}>
      <Box sx={{ width: '100%', overflowX: 'auto' }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: weeklyGridColumns,
            gridTemplateRows: '[week-label] auto ' + HOUR_GRID_ROWS,
            borderColor: 'divider',
            minWidth: minGridWidth,
            width: `max(100%, ${minGridWidth}px)`,
          }}
        >
          <Box borderBottom="1px solid" borderRight="1px solid" borderColor="inherit" />
          {weekDays.map((date, i, arr) => (
            <DateLabelCell
              key={`date-${date.toISOString()}`}
              date={date}
              isToday={isSameDay(date, todayInTimezone)}
              isLast={i === arr.length - 1}
            />
          ))}

          {HOUR_LIST.map((_, hour) => (
            <HourLabelCell
              key={`hour-${hour}`}
              hour={hour}
              isCurrentHour={hour === currentHour}
              isLastHour={hour === 23}
            />
          ))}

          {Array.from({ length: weekDays.length * HOUR_LIST.length }).map((_, i) => (
            <Box
              key={`slot-${i}`}
              sx={{
                gridColumn: `date-${dateFormat(weekDays[i % weekDays.length])}`,
                gridRow: `hour-${Math.floor(i / weekDays.length)} / hour-${Math.floor(i / weekDays.length) + 1}`,
                borderBottom:
                  Math.floor(i / weekDays.length) < HOUR_LIST.length - 1 ? '1px solid' : undefined,
                borderRight: (i + 1) % weekDays.length ? '1px solid' : undefined,
                borderColor: 'inherit',
                backgroundColor: 'background.paper',
              }}
            />
          ))}

          {eventSegments.map((event) => (
            <Box
              key={`event-${event.date}-${event.id}`}
              sx={{
                gridRow: `hour-${event.hourStart} / hour-${event.hourEnd}`,
                gridColumn: `date-${event.date}`,
              }}
            >
              <EventCell {...event} />
            </Box>
          ))}
        </Box>
      </Box>
    </Stack>
  );
}

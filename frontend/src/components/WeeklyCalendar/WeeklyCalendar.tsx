import { tz, TZDateMini } from '@date-fns/tz';
import { Box, Stack } from '@mui/material';
import { add, isSameDay, startOfWeek } from 'date-fns';
import { useCalendarStore } from '../../stores/calendarStore';
import { dateFormat } from '../../utils/date';
import { EventCell } from '../DailyCalendar/EventCell';
import { HourLabelCell } from '../DailyCalendar/HourLabelCell';
import { getWeeklyEventSegments } from '../utils';
import { HOUR_GRID_ROWS, HOUR_LIST } from '../utils/const';
import { DateLabelCell } from './DateLabelCell';

export function WeeklyCalendar() {
  const { selectedDate, selectedTimezone } = useCalendarStore();

  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1, in: tz('UTC') });
  const weekDays = Array.from({ length: 7 }, (_, index) => add(weekStart, { days: index }));

  const weeklyGridColumns =
    '[hour-label] 72px ' +
    weekDays.map((date) => `[date-${dateFormat(date)}] minmax(0, 1fr)`).join(' ') +
    ' [date-end]';

  const todayInTimezone = TZDateMini.tz(selectedTimezone);
  const currentHour = todayInTimezone.getHours();

  const { events } = useCalendarStore();
  const eventSegments = getWeeklyEventSegments(events, weekDays, selectedTimezone);

  return (
    <Stack spacing={1}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: weeklyGridColumns,
          gridTemplateRows: '[week-label] 96px ' + HOUR_GRID_ROWS,
          borderColor: 'divider',
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
    </Stack>
  );
}

import { tz, TZDateMini } from '@date-fns/tz';
import { Box, Paper, Stack, Typography } from '@mui/material';
import { add, format, isSameDay, startOfWeek } from 'date-fns';
import { useCalendarStore } from '../../stores/calendarStore';
import { MOCK_EVENTS } from '../../utils/mockData';

const HOUR_LABELS = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

export function WeeklyCalendar() {
  const { selectedDate, selectedTimezone } = useCalendarStore();

  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 0, in: tz(selectedTimezone) });
  const weekDays = Array.from({ length: 7 }, (_, index) => add(weekStart, { days: index }));

  const todayInTimezone = TZDateMini.tz(selectedTimezone);
  const currentHour = todayInTimezone.getHours();

  const getEventsForDayHour = (day: Date, hour: number) => {
    return MOCK_EVENTS.filter((event) => {
      const eventStart = new TZDateMini(event.startUtc, selectedTimezone);
      const eventEnd = new TZDateMini(event.endUtc, selectedTimezone);

      if (!isSameDay(eventStart, day)) {
        return false;
      }

      const startsInHour = eventStart.getHours() === hour;
      const spansHour = eventStart.getHours() < hour && eventEnd.getHours() > hour;

      return startsInHour || spansHour;
    });
  };

  return (
    <Stack spacing={0}>
      {/* Day headers */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '72px repeat(7, minmax(0, 1fr))', gap: 1 }}>
        <Box />
        {weekDays.map((day) => (
          <Paper key={day.toISOString()} sx={{ p: 2, backgroundColor: 'background.default' }}>
            <Typography variant="h6">
              {format(day, 'EEE, MMM d')}
              {isSameDay(day, todayInTimezone) && (
                <Typography
                  component="span"
                  sx={{ ml: 1, color: 'primary.main', fontWeight: 'bold' }}
                >
                  (Today)
                </Typography>
              )}
            </Typography>
          </Paper>
        ))}
      </Box>

      {/* Hour rows */}
      {Array.from({ length: 24 }).map((_, hour) => (
        <Box
          key={hour}
          sx={{ display: 'grid', gridTemplateColumns: '72px repeat(7, minmax(0, 1fr))', gap: 1 }}
        >
          {/* Hour label */}
          <Paper
            sx={{
              p: 1,
              backgroundColor: 'background.paper',
              borderBottom: '1px solid',
              borderColor: 'divider',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontWeight:
                  weekDays.some((d) => isSameDay(d, todayInTimezone)) && hour === currentHour
                    ? 'bold'
                    : 'normal',
                color:
                  weekDays.some((d) => isSameDay(d, todayInTimezone)) && hour === currentHour
                    ? 'primary.main'
                    : 'text.secondary',
              }}
            >
              {HOUR_LABELS[hour]}
            </Typography>
          </Paper>

          {/* Day cells */}
          {weekDays.map((day) => {
            const events = getEventsForDayHour(day, hour);
            const isCurrentHour = isSameDay(day, todayInTimezone) && hour === currentHour;

            return (
              <Paper
                key={`${day.toISOString()}-${hour}`}
                sx={{
                  minHeight: 80,
                  p: 1,
                  backgroundColor: isCurrentHour ? 'primary.lighter' : 'background.paper',
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Stack spacing={0.5}>
                  {events.map((event) => (
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
              </Paper>
            );
          })}
        </Box>
      ))}
    </Stack>
  );
}

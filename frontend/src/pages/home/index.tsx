import { alpha, Box, Stack, Typography } from '@mui/material';
import { useEvents } from '../../hooks/api/events';
import { useCalendarStore } from '../../stores/calendar';
import { CalendarHeader } from './CalendarHeader';
import { DailyCalendar } from './DailyCalendar';
import { MonthlyCalendar } from './MonthlyCalendar';
import { WeeklyCalendar } from './WeeklyCalendar';

export function HomePage() {
  const { viewType } = useCalendarStore();
  const { isLoading } = useEvents();

  return (
    <Stack spacing={2}>
      <Typography variant="h4">Calendar</Typography>
      <CalendarHeader />
      <Box sx={{ position: 'relative', isolation: 'isolate' }}>
        {viewType === 'monthly' && <MonthlyCalendar />}
        {viewType === 'weekly' && <WeeklyCalendar />}
        {viewType === 'daily' && <DailyCalendar />}
        {isLoading && (
          <Box
            aria-hidden
            sx={{
              position: 'absolute',
              inset: 0,
              borderRadius: 2,
              overflow: 'hidden',
              pointerEvents: 'none',
              backgroundColor: (theme) => alpha(theme.palette.background.paper, 0.18),
              backdropFilter: 'blur(1px)',
              '&::before': {
                content: '""',
                position: 'absolute',
                inset: 0,
                background: (theme) =>
                  `linear-gradient(110deg, ${alpha(theme.palette.common.white, 0)} 15%, ${alpha(
                    theme.palette.common.white,
                    0.5
                  )} 50%, ${alpha(theme.palette.common.white, 0)} 85%)`,
                transform: 'translateX(-100%)',
                animation: 'calendar-shimmer 1.6s ease-in-out infinite',
              },
              '@keyframes calendar-shimmer': {
                '100%': {
                  transform: 'translateX(100%)',
                },
              },
            }}
          />
        )}
      </Box>
    </Stack>
  );
}

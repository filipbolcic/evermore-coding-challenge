import { Box, Stack, Typography } from '@mui/material';
import { useEvents } from '../../hooks/api/events';
import { useCalendarStore } from '../../stores/calendar';
import { CalendarHeader } from './CalendarHeader';
import { DailyCalendar } from './DailyCalendar';
import { LoadingOverlay } from './LoadingOverlay';
import { MonthlyCalendar } from './MonthlyCalendar';
import { WeeklyCalendar } from './WeeklyCalendar';

export function HomePage() {
  const { viewType } = useCalendarStore();
  const { isLoading } = useEvents();

  return (
    <Stack gap={2}>
      <Typography variant="h4">Calendar</Typography>
      <CalendarHeader />
      <Box sx={{ position: 'relative', isolation: 'isolate' }}>
        {viewType === 'monthly' && <MonthlyCalendar />}
        {viewType === 'weekly' && <WeeklyCalendar />}
        {viewType === 'daily' && <DailyCalendar />}
        {isLoading && <LoadingOverlay />}
      </Box>
    </Stack>
  );
}

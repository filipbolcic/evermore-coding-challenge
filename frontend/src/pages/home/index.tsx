import { Stack, Typography } from '@mui/material';
import { useCalendarStore } from '../../stores/calendar';
import { CalendarHeader } from './CalendarHeader';
import { DailyCalendar } from './DailyCalendar';
import { MonthlyCalendar } from './MonthlyCalendar';
import { WeeklyCalendar } from './WeeklyCalendar';

export function HomePage() {
  const { viewType } = useCalendarStore();

  return (
    <Stack spacing={2}>
      <Typography variant="h4">Calendar</Typography>
      <CalendarHeader />
      {viewType === 'monthly' && <MonthlyCalendar />}
      {viewType === 'weekly' && <WeeklyCalendar />}
      {viewType === 'daily' && <DailyCalendar />}
    </Stack>
  );
}

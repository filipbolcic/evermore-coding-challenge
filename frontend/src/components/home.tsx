import { Stack, Typography } from '@mui/material';
import { useCalendarStore } from '../stores/calendarStore';
import { CalendarHeader } from './CalendarHeader';
import { DailyCalendar } from './DailyCalendar';
import { MonthlyCalendar } from './MonthlyCalendar';

export function HomeComponent() {
  const { viewType } = useCalendarStore();

  return (
    <Stack spacing={2}>
      <Typography variant="h4">Calendar</Typography>
      <CalendarHeader />
      {viewType === 'monthly' && <MonthlyCalendar />}
      {viewType === 'weekly' && <Typography>Weekly view coming soon...</Typography>}
      {viewType === 'daily' && <DailyCalendar />}
    </Stack>
  );
}

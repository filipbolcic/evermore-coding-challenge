import { Chip, Paper, Stack, Typography } from '@mui/material';
import { format } from 'date-fns';
import { useCalendarStore } from '../stores/calendarStore';
import { MOCK_EVENTS } from '../utils/mockData';
import { CalendarHeader } from './CalendarHeader';
import { DailyCalendar } from './DailyCalendar';
import { MonthlyCalendar } from './MonthlyCalendar';

export function HomeComponent() {
  const { viewType, currentDate, selectedTimezone } = useCalendarStore();

  return (
    <Paper sx={{ p: 4 }}>
      <Stack spacing={2}>
        <Typography variant="h4">Calendar Prototype</Typography>

        <CalendarHeader />

        <Stack spacing={2}>
          {viewType === 'monthly' && <MonthlyCalendar />}
          {viewType === 'weekly' && <Typography>Weekly view coming soon...</Typography>}
          {viewType === 'daily' && <DailyCalendar events={MOCK_EVENTS} date={currentDate} />}
        </Stack>

        <Stack spacing={1}>
          <Typography variant="h6">Current State:</Typography>
          <Typography>
            View Type: <Chip label={viewType} />
          </Typography>
          <Typography>Current Date: {format(currentDate, 'PPP')}</Typography>
          <Typography>Timezone: {selectedTimezone}</Typography>
        </Stack>

        <Typography>
          This is testing the calendar components. Switch between views and navigate dates!
        </Typography>
      </Stack>
    </Paper>
  );
}

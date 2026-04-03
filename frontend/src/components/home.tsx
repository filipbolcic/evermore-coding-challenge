import { Chip, Paper, Stack, Typography } from '@mui/material';
import { useCalendarStore } from '../stores/calendarStore';
import { CalendarHeader } from './CalendarHeader';
import { MonthlyCalendar } from './MonthlyCalendar';

export function HomeComponent() {
  const { viewType, currentDate, selectedTimezone } = useCalendarStore();

  return (
    <Paper sx={{ p: 4 }}>
      <Stack gap={2}>
        <Typography variant="h4" gutterBottom>
          Calendar Prototype
        </Typography>

        <CalendarHeader />

        {/* todo use stack instead of margins */}
        <Stack gap={2}>
          {viewType === 'monthly' && <MonthlyCalendar />}
          {viewType === 'weekly' && <Typography>Weekly view coming soon...</Typography>}
          {viewType === 'daily' && <Typography>Daily view coming soon...</Typography>}
        </Stack>

        <Stack>
          <Typography variant="h6">Current State:</Typography>
          <Typography>
            View Type: <Chip label={viewType} />
          </Typography>
          <Typography>Current Date: {currentDate.toDateString()}</Typography>
          <Typography>Timezone: {selectedTimezone}</Typography>
        </Stack>

        <Typography>
          This is testing the calendar components. Switch between views and navigate dates!
        </Typography>
      </Stack>
    </Paper>
  );
}

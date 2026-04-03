import { Autocomplete, Button, Stack, TextField, Typography } from '@mui/material';
import { format } from 'date-fns';
import { useCalendarStore } from '../stores/calendarStore';

const COMMON_TIMEZONES = [
  'UTC',
  'America/New_York',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Paris',
  'Asia/Tokyo',
  'Asia/Kolkata',
  'Australia/Sydney',
];

export function CalendarHeader() {
  const {
    viewType,
    currentDate,
    selectedTimezone,
    setViewType,
    goToPrevious,
    goToNext,
    goToToday,
    setSelectedTimezone,
  } = useCalendarStore();

  const formatCurrentDate = () => {
    const dateFormat = viewType === 'daily' ? 'MMMM d, yyyy' : 'MMMM yyyy';
    return format(currentDate, dateFormat);
  };

  return (
    <Stack
      spacing={2}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      flexWrap="wrap"
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <Button variant="outlined" size="small" onClick={goToPrevious}>
          ‹
        </Button>
        <Button variant="outlined" size="small" onClick={goToToday}>
          Today
        </Button>
        <Button variant="outlined" size="small" onClick={goToNext}>
          ›
        </Button>
      </Stack>

      <Typography variant="h5" sx={{ minWidth: 200 }}>
        {formatCurrentDate()}
      </Typography>

      <Stack direction="row" spacing={1}>
        <Button
          variant={viewType === 'monthly' ? 'contained' : 'outlined'}
          size="small"
          onClick={() => setViewType('monthly')}
        >
          Month
        </Button>
        <Button
          variant={viewType === 'weekly' ? 'contained' : 'outlined'}
          size="small"
          onClick={() => setViewType('weekly')}
        >
          Week
        </Button>
        <Button
          variant={viewType === 'daily' ? 'contained' : 'outlined'}
          size="small"
          onClick={() => setViewType('daily')}
        >
          Day
        </Button>
      </Stack>

      <Autocomplete
        value={selectedTimezone}
        onChange={(_, newValue) => newValue && setSelectedTimezone(newValue)}
        options={COMMON_TIMEZONES}
        renderInput={(params) => (
          <TextField {...params} label="Timezone" size="small" sx={{ minWidth: 200 }} />
        )}
        size="small"
      />
    </Stack>
  );
}

import { Autocomplete, Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useCalendarStore } from '../stores/calendarStore';

//todo testing purposes, use TZ library
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
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      ...(viewType === 'daily' && { day: 'numeric' }),
    };
    return currentDate.toLocaleDateString('en-US', options);
  };

  return (
    <Stack
      gap={2}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      flexWrap={'wrap'}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Button variant="outlined" size="small" onClick={goToPrevious}>
          ‹
        </Button>
        <Button variant="outlined" size="small" onClick={goToToday}>
          Today
        </Button>
        <Button variant="outlined" size="small" onClick={goToNext}>
          ›
        </Button>
      </Box>

      <Typography variant="h5" sx={{ minWidth: 200 }}>
        {formatCurrentDate()}
      </Typography>

      <Box sx={{ display: 'flex', gap: 1 }}>
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
      </Box>

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

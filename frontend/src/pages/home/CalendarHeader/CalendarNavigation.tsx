import { tz } from '@date-fns/tz';
import { Button, Stack } from '@mui/material';
import { isToday } from 'date-fns';
import { useCalendarStore } from '../../../stores/calendar';

export const CalendarNavigation = () => {
  const { selectedDate, selectedTimezone, goToPrevious, goToNext, goToToday } = useCalendarStore();

  const isSelectedDateToday = isToday(selectedDate, { in: tz(selectedTimezone) });
  return (
    <Stack direction="row" gap={1} alignItems="center" flexWrap="wrap">
      <Button variant="outlined" size="small" onClick={goToPrevious}>
        ‹
      </Button>
      <Button
        variant={isSelectedDateToday ? 'contained' : 'outlined'}
        size="small"
        onClick={goToToday}
      >
        Today
      </Button>
      <Button variant="outlined" size="small" onClick={goToNext}>
        ›
      </Button>
    </Stack>
  );
};

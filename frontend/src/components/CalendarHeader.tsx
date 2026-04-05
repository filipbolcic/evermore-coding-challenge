import { Button, Stack, Typography } from '@mui/material';
import { format, roundToNearestHours } from 'date-fns';
import { useState } from 'react';
import { useCalendarStore } from '../stores/calendarStore';
import { AddEventDialog } from './AddEventDialog';
import { TimezoneSelect } from './TimezoneSelect';

export function CalendarHeader() {
  const {
    viewType,
    selectedDate,
    selectedTimezone,
    setViewType,
    goToPrevious,
    goToNext,
    goToToday,
    setSelectedTimezone,
    addEvent,
  } = useCalendarStore();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const dateFormat = viewType === 'daily' ? 'MMMM d, yyyy' : 'MMMM yyyy';
  const formattedDate = format(selectedDate, dateFormat);

  return (
    <>
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

        <Typography variant="h5" sx={{ minWidth: 220 }}>
          {formattedDate}
        </Typography>

        <Stack direction="row" spacing={4} alignItems="center">
          <Stack direction="row" spacing={1} alignItems="center">
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
          <Button variant="contained" size="small" onClick={() => setIsDialogOpen(true)}>
            Add event
          </Button>
        </Stack>

        <TimezoneSelect timezone={selectedTimezone} onSelectTimezone={setSelectedTimezone} />
      </Stack>

      <AddEventDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={addEvent}
        startDate={roundToNearestHours(new Date())}
        timezone={selectedTimezone}
      />
    </>
  );
}

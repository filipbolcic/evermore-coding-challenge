import { Box, Button, Stack, Typography } from '@mui/material';
import { format, roundToNearestHours } from 'date-fns';
import { useState } from 'react';
import { TimezoneSelect } from '../../components/TimezoneSelect';
import { useCalendarStore } from '../../stores/calendarStore';
import { EditEventDialog } from './EditEventDialog';
import { getEditEventBaseValues } from './EditEventDialog/utils';

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
  } = useCalendarStore();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const dateFormat = viewType === 'daily' ? 'MMMM d, yyyy' : 'MMMM yyyy';
  const formattedDate = format(selectedDate, dateFormat);

  return (
    <>
      <Stack spacing={2}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          alignItems={{ xs: 'stretch', md: 'center' }}
          justifyContent="space-between"
        >
          <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
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

          <Typography variant="h5" sx={{ minWidth: 220, textAlign: { xs: 'left', md: 'center' } }}>
            {formattedDate}
          </Typography>
        </Stack>

        <Stack
          direction={{ xs: 'column', lg: 'row' }}
          spacing={2}
          alignItems={{ xs: 'stretch', lg: 'center' }}
          justifyContent="space-between"
        >
          <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
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

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            alignItems={{ xs: 'stretch', sm: 'center' }}
            sx={{ width: { xs: '100%', lg: 'auto' }, ml: { lg: 'auto' } }}
          >
            <Button variant="contained" size="small" onClick={() => setIsDialogOpen(true)}>
              Add event
            </Button>
            <Box
              sx={{
                minWidth: { xs: '100%', sm: 240 },
                width: { xs: '100%', sm: 300 },
                '& .MuiAutocomplete-root': { width: '100%' },
              }}
            >
              <TimezoneSelect timezone={selectedTimezone} onSelectTimezone={setSelectedTimezone} />
            </Box>
          </Stack>
        </Stack>
      </Stack>

      {isDialogOpen && (
        <EditEventDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSubmit={console.log}
          values={getEditEventBaseValues(roundToNearestHours(new Date()), selectedTimezone)}
        />
      )}
    </>
  );
}

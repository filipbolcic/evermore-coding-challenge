import { Box, Button, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { format, roundToNearestHours } from 'date-fns';
import { useState } from 'react';
import { TimezoneSelect } from '../../components/TimezoneSelect';
import { useToast } from '../../components/Toast';
import { useCreateEvent } from '../../hooks/api/events';
import { useCalendarStore, type CalendarViewType } from '../../stores/calendar';
import { EditEventDialog } from './EditEventDialog';
import { getEditEventBaseValues } from './EditEventDialog/utils';

const CALENDAR_VIEW_OPTIONS: { value: CalendarViewType; label: string }[] = [
  { value: 'monthly', label: 'Month' },
  { value: 'weekly', label: 'Week' },
  { value: 'daily', label: 'Day' },
];

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

  const { mutate: createEvent } = useCreateEvent();
  const { showToast, toast } = useToast();

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
          <Box sx={{ minWidth: { xs: '100%', sm: 180 }, width: { xs: '100%', sm: 200 } }}>
            <TextField
              select
              fullWidth
              label="Calendar type"
              size="small"
              value={viewType}
              onChange={(event) => setViewType(event.target.value as CalendarViewType)}
            >
              {CALENDAR_VIEW_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>

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
          onSubmit={(e) =>
            createEvent(e, {
              onSuccess: () => {
                showToast(`Successfully created event ${e.title}.`, 'success');
                setIsDialogOpen(false);
              },
              onError: () => showToast(`Error while creating event`, 'error'),
            })
          }
          values={getEditEventBaseValues(roundToNearestHours(new Date()), selectedTimezone)}
        />
      )}

      {toast}
    </>
  );
}

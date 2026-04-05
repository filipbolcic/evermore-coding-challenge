import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import type { MockEvent } from '../../types/date';
import { UTC_TIMEZONE } from '../../utils/date';
import { TimezoneSelect } from '../TimezoneSelect';
import {
  getAddEventBaseValues,
  getTzDate,
  useEditEventForm,
  type EditEventFormValues,
} from './utils';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (event: MockEvent) => void;
  startDate: Date;
  timezone: string;
}

export function AddEventDialog({ open, onClose, onSubmit, startDate, timezone }: Props) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useEditEventForm(startDate, timezone);

  useEffect(() => {
    reset(getAddEventBaseValues(new Date(startDate), timezone));
  }, [reset, startDate, timezone]);

  function handleFormSubmit({
    startDate,
    startTime,
    endDate,
    endTime,
    title,
    timezone,
  }: EditEventFormValues) {
    const tzStartDateTime = getTzDate(timezone, startDate, startTime);
    const tzEndDateTime = getTzDate(timezone, endDate, endTime);

    const startUtc = tzStartDateTime.withTimeZone(UTC_TIMEZONE);
    const endUtc = tzEndDateTime.withTimeZone(UTC_TIMEZONE);

    onSubmit({
      id: crypto.randomUUID(),
      title,
      startUtc: startUtc.toISOString(),
      endUtc: endUtc.toISOString(),
    });
    handleClose();
  }

  function handleClose() {
    reset();
    onClose();
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <DialogTitle>Add event</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Title"
                    size="small"
                    fullWidth
                    error={Boolean(errors.title)}
                    helperText={errors.title?.message}
                  />
                )}
              />

              <Stack direction="row" spacing={1}>
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="Start date"
                      slotProps={{
                        textField: {
                          size: 'small',
                          fullWidth: true,
                          error: Boolean(errors.startDate),
                          helperText: errors.startDate?.message,
                        },
                      }}
                    />
                  )}
                />
                <Controller
                  name="startTime"
                  control={control}
                  render={({ field }) => (
                    <TimePicker
                      {...field}
                      label="Start time"
                      slotProps={{
                        textField: {
                          size: 'small',
                          fullWidth: true,
                          error: Boolean(errors.startTime),
                          helperText: errors.startTime?.message,
                        },
                      }}
                    />
                  )}
                />
              </Stack>

              <Stack direction="row" spacing={1}>
                <Controller
                  name="endDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="End date"
                      slotProps={{
                        textField: {
                          size: 'small',
                          fullWidth: true,
                          error: Boolean(errors.endDate),
                          helperText: errors.endDate?.message,
                        },
                      }}
                    />
                  )}
                />
                <Controller
                  name="endTime"
                  control={control}
                  render={({ field }) => (
                    <TimePicker
                      {...field}
                      label="End time"
                      slotProps={{
                        textField: {
                          size: 'small',
                          fullWidth: true,
                          error: Boolean(errors.endTime),
                          helperText: errors.endTime?.message,
                        },
                      }}
                    />
                  )}
                />
              </Stack>

              <Controller
                name="timezone"
                control={control}
                render={({ field }) => (
                  <TimezoneSelect timezone={field.value} onSelectTimezone={field.onChange} />
                )}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} type="button">
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </LocalizationProvider>
  );
}

import { TZDateMini } from '@date-fns/tz';
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Controller, useForm } from 'react-hook-form';
import type { MockEvent } from '../utils/mockData';

const COMMON_TIMEZONES = [
  'UTC',
  'America/New_York',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Zagreb',
  'Asia/Tokyo',
  'Asia/Kolkata',
  'Australia/Sydney',
];

interface AddEventFormValues {
  title: string;
  startDateTime: Date;
  endDateTime: Date;
  timezone: string;
}

interface AddEventDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (event: MockEvent) => void;
  selectedDate: string;
  selectedTimezone: string;
}

export function AddEventDialog({
  open,
  onClose,
  onSubmit,
  selectedDate,
  selectedTimezone,
}: AddEventDialogProps) {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<AddEventFormValues>({
    defaultValues: {
      title: '',
      startDateTime: new Date(`${selectedDate}T09:00`),
      endDateTime: new Date(`${selectedDate}T10:00`),
      timezone: selectedTimezone,
    },
  });

  function handleFormSubmit(values: AddEventFormValues) {
    const startUtc = new TZDateMini(values.startDateTime, values.timezone).toISOString();
    const endUtc = new TZDateMini(values.endDateTime, values.timezone).toISOString();

    onSubmit({
      id: crypto.randomUUID(),
      title: values.title,
      startUtc,
      endUtc,
    });

    onClose();
  }

  function handleClose() {
    reset();
    onClose();
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Add event</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Controller
              name="title"
              control={control}
              rules={{ required: 'Title is required' }}
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

            <Controller
              name="startDateTime"
              control={control}
              rules={{ required: 'Start date and time is required' }}
              render={({ field }) => (
                <DateTimePicker
                  {...field}
                  label="Start date and time"
                  slotProps={{
                    textField: {
                      size: 'small',
                      fullWidth: true,
                      error: Boolean(errors.startDateTime),
                      helperText: errors.startDateTime?.message,
                    },
                  }}
                />
              )}
            />

            <Controller
              name="endDateTime"
              control={control}
              rules={{
                required: 'End date and time is required',
                validate: (value) =>
                  value > watch('startDateTime') || 'End date and time must be after start',
              }}
              render={({ field }) => (
                <DateTimePicker
                  {...field}
                  label="End date and time"
                  slotProps={{
                    textField: {
                      size: 'small',
                      fullWidth: true,
                      error: Boolean(errors.endDateTime),
                      helperText: errors.endDateTime?.message,
                    },
                  }}
                />
              )}
            />

            <Controller
              name="timezone"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  options={COMMON_TIMEZONES}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Event timezone"
                      size="small"
                      error={Boolean(errors.timezone)}
                      helperText={errors.timezone?.message}
                    />
                  )}
                  size="small"
                  onChange={(_, newValue) => field.onChange(newValue)}
                  value={field.value}
                />
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit(handleFormSubmit)}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}

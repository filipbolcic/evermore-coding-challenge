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
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { ConfirmDialog } from '../../../components/ConfirmDialog';
import { TimezoneSelect } from '../../../components/TimezoneSelect';
import type { MockEvent } from '../../../types/date';
import { UTC_TIMEZONE } from '../../../utils/date';
import { getTzDate, useEditEventForm, type EditEventFormValues } from './utils';

interface Props {
  isOpen: boolean;
  values: EditEventFormValues;
  eventId?: string;
  onSubmit: (event: MockEvent) => void;
  onDelete?: () => void;
  onClose: () => void;
}

export function EditEventDialog({ isOpen, values, eventId, onClose, onSubmit, onDelete }: Props) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useEditEventForm(values);
  const currentTitle = watch('title');
  const canDelete = Boolean(eventId && onDelete);

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
      id: eventId ?? crypto.randomUUID(),
      title,
      startUtc: startUtc.toISOString(),
      endUtc: endUtc.toISOString(),
    });
    handleClose();
  }

  function handleClose() {
    setIsDeleteDialogOpen(false);
    reset();
    onClose();
  }

  function handleDeleteConfirm() {
    if (!onDelete) {
      return;
    }

    onDelete();
    handleClose();
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="sm">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <DialogTitle>{eventId ? 'Edit event' : 'Add event'}</DialogTitle>
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

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
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

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
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
                  <Stack sx={{ width: '100%', '& .MuiAutocomplete-root': { width: '100%' } }}>
                    <TimezoneSelect timezone={field.value} onSelectTimezone={field.onChange} />
                  </Stack>
                )}
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ flexWrap: 'wrap', gap: 1 }}>
            {canDelete && (
              <Button
                color="error"
                onClick={() => setIsDeleteDialogOpen(true)}
                type="button"
                sx={{ mr: 'auto' }}
              >
                Delete
              </Button>
            )}
            <Button onClick={handleClose} type="button">
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        title="Delete event?"
        confirmLabel="Delete"
        message={`Are you sure you want to delete "${currentTitle}"?`}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </LocalizationProvider>
  );
}

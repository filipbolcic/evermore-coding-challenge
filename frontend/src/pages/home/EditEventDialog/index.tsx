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
import type { UpdateEventValues } from '../../../api/events/types';
import { ConfirmDialog } from '../../../components/ConfirmDialog';
import { TimezoneSelect } from '../../../components/TimezoneSelect';
import { UTC_TIMEZONE } from '../../../utils/date';
import { getTzDate, useEditEventForm, type EditEventFormValues } from './utils';

interface Props {
  isOpen: boolean;
  values: EditEventFormValues;
  isEditMode?: boolean;
  onSubmit: (event: UpdateEventValues) => void;
  onDelete?: () => void;
  onClose: () => void;
}

export function EditEventDialog({
  isOpen,
  values,
  isEditMode,
  onClose,
  onSubmit,
  onDelete,
}: Props) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useEditEventForm(values);

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

    onSubmit({ title, startUtc: startUtc.toISOString(), endUtc: endUtc.toISOString() });
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <DialogTitle>{isEditMode ? 'Edit event' : 'Add event'}</DialogTitle>
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
                    required
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
                          required: true,
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
                          required: true,
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
                          required: true,
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
                          required: true,
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
                    <TimezoneSelect
                      timezone={field.value}
                      onSelectTimezone={field.onChange}
                      onBlur={field.onBlur}
                      required
                      error={Boolean(errors.timezone)}
                      helperText={errors.timezone?.message}
                    />
                  </Stack>
                )}
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ flexWrap: 'wrap', gap: 1 }}>
            {onDelete && (
              <Button
                color="error"
                onClick={() => setIsDeleteDialogOpen(true)}
                type="button"
                sx={{ mr: 'auto' }}
              >
                Delete
              </Button>
            )}
            <Button onClick={onClose} type="button">
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
        message={`Are you sure you want to delete this event?`}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={() => onDelete?.()}
      />
    </LocalizationProvider>
  );
}

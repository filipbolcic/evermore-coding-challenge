import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { TZDateMini } from '@date-fns/tz';
import { useState } from 'react';
import { useCalendarStore } from '../../stores/calendarStore';
import type { MockEvent } from '../../types/date';
import { timeFormat } from '../../utils/date';
import { ConfirmDialog } from '../ConfirmDialog';
import { EditEventDialog } from '../EditEventDialog';
import { getEditEventValuesFromEvent } from '../EditEventDialog/utils';

interface Props {
  event: MockEvent;
}

export function MonthlyEventItem({ event }: Props) {
  const { selectedTimezone, updateEvent, deleteEvent } = useCalendarStore();

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const values = getEditEventValuesFromEvent(event, selectedTimezone);
  const startTime = timeFormat(new TZDateMini(event.startUtc, selectedTimezone));

  return (
    <>
      <Box
        sx={{
          backgroundColor: 'secondary.light',
          color: 'secondary.contrastText',
          px: 0.5,
          py: 0.25,
          borderRadius: 0.5,
        }}
      >
        <Stack direction="row" spacing={0.25} alignItems="center">
          <Typography
            variant="caption"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              flex: 1,
              minWidth: 0,
            }}
          >
            {startTime} {event.title}
          </Typography>
          <Stack direction="row" spacing={0.25}>
            <IconButton
              size="small"
              aria-label="Edit event"
              onClick={() => setIsEditDialogOpen(true)}
              sx={{
                color: 'inherit',
                p: 0.2,
                '& svg': { fontSize: 14 },
              }}
            >
              <EditRoundedIcon />
            </IconButton>
            <IconButton
              size="small"
              aria-label="Delete event"
              onClick={() => setIsDeleteDialogOpen(true)}
              sx={{
                color: 'inherit',
                p: 0.2,
                '& svg': { fontSize: 14 },
              }}
            >
              <DeleteRoundedIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Box>

      {isEditDialogOpen && (
        <EditEventDialog
          isOpen={isEditDialogOpen}
          eventId={event.id}
          values={values}
          onClose={() => setIsEditDialogOpen(false)}
          onSubmit={updateEvent}
        />
      )}

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        title="Delete event?"
        confirmLabel="Delete"
        message={`Are you sure you want to delete "${event.title}"?`}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={() => deleteEvent(event.id)}
      />
    </>
  );
}

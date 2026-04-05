import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useCalendarStore } from '../../stores/calendarStore';
import { ConfirmDialog } from '../ConfirmDialog';
import { EditEventDialog } from '../EditEventDialog';
import { getEditEventValuesFromEvent } from '../EditEventDialog/utils';
import { type CalendarEventSegment } from '../utils';

type Props = CalendarEventSegment;

export const EventCell = ({ id, title, startTime, endTime }: Props) => {
  const { events, selectedTimezone, updateEvent, deleteEvent } = useCalendarStore();

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const sourceEvent = events.find((event) => event.id === id)!;
  const values = getEditEventValuesFromEvent(sourceEvent, selectedTimezone);

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          height: 'fill-available',
          flexGrow: 1,
          m: 0.5,
          px: 1,
          py: 0.75,
          backgroundColor: 'info.light',
          color: 'info.contrastText',
          borderRadius: 1,
          boxShadow: 1,
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5,
          ':hover': { zIndex: 10, boxShadow: 3 },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={0.5}>
          <Typography variant="caption" sx={{ fontWeight: 600, flex: 1, minWidth: 0 }}>
            {title}
          </Typography>
          <Stack direction="row" spacing={0.25}>
            <IconButton
              size="small"
              aria-label="Edit event"
              onClick={() => setIsEditDialogOpen(true)}
              sx={{
                color: 'inherit',
                p: 0.4,
                backgroundColor: 'rgba(255, 255, 255, 0.22)',
                ':hover': { backgroundColor: 'rgba(255, 255, 255, 0.36)' },
                '& svg': { fontSize: 18 },
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
                p: 0.4,
                backgroundColor: 'rgba(255, 255, 255, 0.22)',
                ':hover': { backgroundColor: 'rgba(255, 255, 255, 0.36)' },
                '& svg': { fontSize: 18 },
              }}
            >
              <DeleteRoundedIcon />
            </IconButton>
          </Stack>
        </Stack>
        <Typography variant="caption" display="block">
          {startTime} – {endTime}
        </Typography>
      </Box>
      {isEditDialogOpen && (
        <EditEventDialog
          isOpen={isEditDialogOpen}
          eventId={sourceEvent?.id}
          values={values}
          onClose={() => setIsEditDialogOpen(false)}
          onSubmit={updateEvent}
        />
      )}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        title="Delete event?"
        confirmLabel="Delete"
        message={`Are you sure you want to delete "${title}"?`}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={() => deleteEvent(id)}
      />
    </>
  );
};

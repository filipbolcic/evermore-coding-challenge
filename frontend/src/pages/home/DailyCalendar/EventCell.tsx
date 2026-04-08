import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import type { Event } from '../../../api/events/types';
import { useToast } from '../../../components/Toast';
import { useDeleteEvent, useUpdateEvent } from '../../../hooks/api/events';
import { useCalendarStore } from '../../../stores/calendar';
import { EditEventDialog } from '../EditEventDialog';
import { getEditEventValuesFromEvent } from '../EditEventDialog/utils';
import { type CalendarEventSegment } from '../utils';

type Props = CalendarEventSegment & { events: Event[] };

export const EventCell = ({ id, title, startTime, endTime, events }: Props) => {
  const { selectedTimezone } = useCalendarStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { mutate: deleteEvent } = useDeleteEvent();
  const { mutate: updateEvent } = useUpdateEvent();
  const { showSuccessToast, showErrorToast } = useToast();

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
          cursor: 'pointer',
          ':hover': { zIndex: 10, boxShadow: 3 },
        }}
        onClick={() => setIsDialogOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            setIsDialogOpen(true);
          }
        }}
      >
        <Typography variant="caption" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        <Typography variant="caption" display="block">
          {startTime} – {endTime}
        </Typography>
      </Box>
      {isDialogOpen && (
        <EditEventDialog
          isOpen={isDialogOpen}
          isEditMode
          values={values}
          onClose={() => setIsDialogOpen(false)}
          onSubmit={(e) =>
            updateEvent(
              { id, ...e },
              {
                onSuccess: () => {
                  showSuccessToast(`Event successfully updated.`);
                  setIsDialogOpen(false);
                },
                onError: () => showErrorToast(`Error while updating event`),
              }
            )
          }
          onDelete={() =>
            deleteEvent(id, {
              onSuccess: () => {
                showSuccessToast(`Event successfully deleted.`);
                setIsDialogOpen(false);
              },
              onError: () => showErrorToast(`Error while deleting event`),
            })
          }
        />
      )}
    </>
  );
};

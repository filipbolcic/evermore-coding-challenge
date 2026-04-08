import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { useToast } from '../../../components/Toast';
import { useDeleteEvent, useUpdateEvent } from '../../../hooks/api/events';
import { useCalendarStore } from '../../../stores/calendar';
import { EditEventDialog } from '../EditEventDialog';
import { getEditEventValuesFromEvent } from '../EditEventDialog/utils';
import type { MonthlyEventSegment } from './utils';

interface Props {
  event: MonthlyEventSegment;
}

export function EventCard({ event }: Props) {
  const { selectedTimezone } = useCalendarStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { mutate: updateEvent, isPending: isUpdatingEvent } = useUpdateEvent();
  const { mutate: deleteEvent, isPending: isDeletingEvent } = useDeleteEvent();
  const { showSuccessToast, showErrorToast } = useToast();

  const values = getEditEventValuesFromEvent(event.sourceEvent, selectedTimezone);

  return (
    <>
      <Box
        sx={{
          backgroundColor: 'secondary.light',
          color: 'secondary.contrastText',
          px: 0.5,
          py: 0.25,
          borderRadius: 0.5,
          cursor: 'pointer',
        }}
        onClick={() => setIsDialogOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(keyboardEvent) => {
          if (keyboardEvent.key === 'Enter' || keyboardEvent.key === ' ') {
            keyboardEvent.preventDefault();
            setIsDialogOpen(true);
          }
        }}
      >
        <Typography
          variant="caption"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            display: 'block',
          }}
        >
          {event.startTime} {event.title}
        </Typography>
      </Box>

      {isDialogOpen && (
        <EditEventDialog
          isOpen={isDialogOpen}
          isEditMode
          values={values}
          isSubmitting={isUpdatingEvent || isDeletingEvent}
          onClose={() => setIsDialogOpen(false)}
          onSubmit={(e) =>
            updateEvent(
              { id: event.sourceEvent.id, ...e },
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
            deleteEvent(event.sourceEvent.id, {
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
}

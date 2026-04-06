import { TZDateMini } from '@date-fns/tz';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import type { Event } from '../../../api/events/types';
import { useToast } from '../../../components/Toast';
import { useDeleteEvent, useUpdateEvent } from '../../../hooks/api/events';
import { useCalendarStore } from '../../../stores/calendar';
import { timeFormat } from '../../../utils/date';
import { EditEventDialog } from '../EditEventDialog';
import { getEditEventValuesFromEvent } from '../EditEventDialog/utils';

interface Props {
  event: Event;
}

export function EventCard({ event }: Props) {
  const { selectedTimezone } = useCalendarStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { mutate: updateEvent } = useUpdateEvent();
  const { mutate: deleteEvent } = useDeleteEvent();
  const { showToast, toast } = useToast();

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
          {startTime} {event.title}
        </Typography>
      </Box>

      {isDialogOpen && (
        <EditEventDialog
          isOpen={isDialogOpen}
          values={values}
          onClose={() => setIsDialogOpen(false)}
          onSubmit={(e) =>
            updateEvent(
              { id: event.id, ...e },
              {
                onSuccess: () => {
                  showToast(`Event successfully updated.`, 'success');
                  setIsDialogOpen(false);
                },
                onError: () => showToast(`Error while updating event`, 'error'),
              }
            )
          }
          onDelete={() =>
            deleteEvent(event.id, {
              onSuccess: () => {
                showToast(`Event successfully deleted.`, 'success');
                setIsDialogOpen(false);
              },
              onError: () => showToast(`Error while deleting event`, 'error'),
            })
          }
        />
      )}
      {toast}
    </>
  );
}

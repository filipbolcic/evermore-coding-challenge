import { TZDateMini } from '@date-fns/tz';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import type { Event } from '../../../api/events/types';
import { useCalendarStore } from '../../../stores/calendarStore';
import { timeFormat } from '../../../utils/date';
import { EditEventDialog } from '../EditEventDialog';
import { getEditEventValuesFromEvent } from '../EditEventDialog/utils';

interface Props {
  event: Event;
}

export function EventCard({ event }: Props) {
  const { selectedTimezone } = useCalendarStore();

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

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
        onClick={() => setIsEditDialogOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(keyboardEvent) => {
          if (keyboardEvent.key === 'Enter' || keyboardEvent.key === ' ') {
            keyboardEvent.preventDefault();
            setIsEditDialogOpen(true);
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

      {isEditDialogOpen && (
        <EditEventDialog
          isOpen={isEditDialogOpen}
          eventId={event.id}
          values={values}
          onClose={() => setIsEditDialogOpen(false)}
          onSubmit={console.log}
          onDelete={console.log}
        />
      )}
    </>
  );
}

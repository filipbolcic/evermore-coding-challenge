import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { useCalendarStore } from '../../stores/calendarStore';
import { EditEventDialog } from '../EditEventDialog';
import { getEditEventValuesFromEvent } from '../EditEventDialog/utils';
import { type CalendarEventSegment } from '../utils';

type Props = CalendarEventSegment;

export const EventCell = ({ id, title, startTime, endTime }: Props) => {
  const { events, selectedTimezone, updateEvent, deleteEvent } = useCalendarStore();

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

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
        onClick={() => setIsEditDialogOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            setIsEditDialogOpen(true);
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
      {isEditDialogOpen && (
        <EditEventDialog
          isOpen={isEditDialogOpen}
          eventId={sourceEvent?.id}
          values={values}
          onClose={() => setIsEditDialogOpen(false)}
          onSubmit={updateEvent}
          onDelete={() => deleteEvent(sourceEvent.id)}
        />
      )}
    </>
  );
};

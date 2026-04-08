import { Button } from '@mui/material';
import { addHours, roundToNearestHours } from 'date-fns';
import { useState } from 'react';
import { useToast } from '../../../components/Toast';
import { useCreateEvent } from '../../../hooks/api/events';
import { useCalendarStore } from '../../../stores/calendar';
import { EditEventDialog } from '../EditEventDialog/EditEventDialog';

export const AddEventButton = () => {
  const { selectedTimezone } = useCalendarStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { mutate: createEvent, isPending: isCreatingEvent } = useCreateEvent();
  const { showSuccessToast, showErrorToast } = useToast();

  return (
    <>
      <Button variant="contained" size="small" fullWidth onClick={() => setIsDialogOpen(true)}>
        Add event
      </Button>
      {isDialogOpen && (
        <EditEventDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          isSubmitting={isCreatingEvent}
          onSubmit={(e) =>
            createEvent(e, {
              onSuccess: () => {
                showSuccessToast(`Successfully created event ${e.title}.`);
                setIsDialogOpen(false);
              },
              onError: () => showErrorToast(`Error while creating event`),
            })
          }
          values={getEditEventBaseValues(selectedTimezone)}
        />
      )}
    </>
  );
};

function getEditEventBaseValues(timezone: string) {
  const startDate = roundToNearestHours(new Date());
  const endDate = addHours(startDate, 1);

  return {
    title: '',
    startDate,
    startTime: startDate,
    endDate,
    endTime: endDate,
    timezone,
  };
}

import { Box, Stack } from '@mui/material';
import { TimezoneSelect } from '../../../components/TimezoneSelect';
import { useCalendarStore } from '../../../stores/calendar';
import { AddEventButton } from './AddEventButton';
import { CalendarNavigation } from './CalendarNavigation';
import { ViewTypeSelect } from './ViewTypeSelect';

export function CalendarHeader() {
  const { selectedTimezone, setSelectedTimezone } = useCalendarStore();

  return (
    <>
      <Stack gap={3}>
        <Stack gap={2} direction="row" justifyContent={'space-between'}>
          <CalendarNavigation />

          <Box display={['none', 'block']} width="auto">
            <AddEventButton />
          </Box>
        </Stack>

        <Stack direction={['column', 'row']} gap={2}>
          <Box width={['100%', '50%']}>
            <ViewTypeSelect />
          </Box>
          <Box width={['100%', '50%']}>
            <TimezoneSelect timezone={selectedTimezone} onSelectTimezone={setSelectedTimezone} />
          </Box>
        </Stack>

        <Box display={['block', 'none']}>
          <AddEventButton />
        </Box>
      </Stack>
    </>
  );
}

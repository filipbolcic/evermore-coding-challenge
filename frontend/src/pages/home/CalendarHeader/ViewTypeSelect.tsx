import { MenuItem, TextField } from '@mui/material';
import { useCalendarStore, type CalendarViewType } from '../../../stores/calendar';

const CALENDAR_VIEW_OPTIONS: { value: CalendarViewType; label: string }[] = [
  { value: 'monthly', label: 'Month' },
  { value: 'weekly', label: 'Week' },
  { value: 'daily', label: 'Day' },
];

export const ViewTypeSelect = () => {
  const { viewType, setViewType } = useCalendarStore();

  return (
    <TextField
      select
      fullWidth
      label="Calendar type"
      size="small"
      value={viewType}
      onChange={(event) => setViewType(event.target.value as CalendarViewType)}
    >
      {CALENDAR_VIEW_OPTIONS.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

import { Autocomplete, TextField } from '@mui/material';
import { UTC_TIMEZONE } from '../utils/date';

const COMMON_TIMEZONES = [
  UTC_TIMEZONE,
  'America/New_York',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Zagreb',
  'Asia/Tokyo',
  'Asia/Kolkata',
  'Australia/Sydney',
];

interface Props {
  timezone: string;
  onSelectTimezone: (t: string) => void;
}

export const TimezoneSelect = ({ timezone, onSelectTimezone }: Props) => {
  return (
    <Autocomplete
      value={timezone}
      onChange={(_, newValue) => newValue && onSelectTimezone(newValue)}
      options={COMMON_TIMEZONES}
      renderInput={(params) => (
        <TextField {...params} label="Timezone" size="small" sx={{ minWidth: 200 }} />
      )}
      size="small"
    />
  );
};

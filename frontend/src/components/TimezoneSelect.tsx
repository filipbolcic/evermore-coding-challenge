import { Autocomplete, TextField } from '@mui/material';
import { UTC_TIMEZONE } from '../utils/date';

const FALLBACK_TIMEZONES = [
  UTC_TIMEZONE,
  'Africa/Cairo',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'America/New_York',
  'America/Sao_Paulo',
  'Asia/Dubai',
  'Asia/Hong_Kong',
  'Asia/Kolkata',
  'Asia/Singapore',
  'Asia/Tokyo',
  'Australia/Sydney',
  'Europe/Berlin',
  'Europe/London',
  'Europe/Paris',
  'Europe/Zagreb',
  'Pacific/Auckland',
];

function getTimezoneOptions() {
  const timezones = Intl.supportedValuesOf('timeZone') ?? FALLBACK_TIMEZONES;
  return [UTC_TIMEZONE, ...timezones.filter((timezone) => timezone !== UTC_TIMEZONE)];
}

const TIMEZONE_OPTIONS = getTimezoneOptions();

interface Props {
  timezone: string;
  onSelectTimezone: (t: string) => void;
  onBlur?: () => void;
  required?: boolean;
  error?: boolean;
  helperText?: string;
}

export const TimezoneSelect = ({
  timezone,
  onSelectTimezone,
  onBlur,
  required = false,
  error = false,
  helperText,
}: Props) => {
  return (
    <Autocomplete
      value={timezone}
      onChange={(_, newValue) => newValue && onSelectTimezone(newValue)}
      onBlur={onBlur}
      options={TIMEZONE_OPTIONS}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Timezone"
          size="small"
          required={required}
          error={error}
          helperText={helperText}
          sx={{ minWidth: 200 }}
        />
      )}
      size="small"
    />
  );
};

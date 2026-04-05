import { Box, Typography } from '@mui/material';
import { type CalendarEventSegment } from '../utils';

type Props = CalendarEventSegment;

export const EventCell = ({ title, startTime, endTime }: Props) => {
  return (
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
        ':hover': { zIndex: 10, boxShadow: 3 },
      }}
    >
      <Typography variant="caption" sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
      <Typography variant="caption" display="block">
        {startTime} – {endTime}
      </Typography>
    </Box>
  );
};

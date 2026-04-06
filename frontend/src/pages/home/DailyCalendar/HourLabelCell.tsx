import { Box, Typography } from '@mui/material';
import { HOUR_LABELS } from '../utils/const';

interface Props {
  hour: number;
  isCurrentHour: boolean;
  isLastHour: boolean;
}

export const HourLabelCell = ({ hour, isCurrentHour, isLastHour }: Props) => {
  return (
    <Box
      sx={{
        gridColumn: 'hour-label',
        gridRow: `hour-${hour}`,
        px: 1,
        display: 'flex',
        alignItems: 'center',
        borderBottom: !isLastHour ? '1px solid' : undefined,
        borderRight: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: '0.8rem', sm: '0.9rem' },
          lineHeight: 1.1,
          fontWeight: isCurrentHour ? 'bold' : 'normal',
          color: isCurrentHour ? 'primary.main' : 'text.secondary',
        }}
      >
        {HOUR_LABELS[hour]}
      </Typography>
    </Box>
  );
};

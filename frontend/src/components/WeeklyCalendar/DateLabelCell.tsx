import { Box, Typography } from '@mui/material';
import { format } from 'date-fns';
import { dateFormat } from '../../utils/date';

interface Props {
  date: Date;
  isToday: boolean;
  isLast: boolean;
}

export const DateLabelCell = ({ date, isToday, isLast }: Props) => {
  return (
    <Box
      sx={{
        gridColumn: `date-${dateFormat(date)}`,
        p: 2,
        borderBottom: '1px solid',
        borderRight: !isLast ? '1px solid' : undefined,
        borderColor: 'inherit',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: isToday ? 'primary.main' : undefined,
          fontWeight: isToday ? 'bold' : undefined,
        }}
      >
        {format(date, 'EEE, MMM d')}
      </Typography>
    </Box>
  );
};

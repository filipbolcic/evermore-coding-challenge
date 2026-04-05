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
        px: { xs: 1, sm: 1.5, md: 2 },
        py: { xs: 0.75, sm: 1, md: 1.25 },
        borderBottom: '1px solid',
        borderRight: !isLast ? '1px solid' : undefined,
        borderColor: 'inherit',
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: '0.8rem', sm: '0.95rem', md: '1.05rem' },
          lineHeight: 1.2,
          color: isToday ? 'primary.main' : undefined,
          fontWeight: isToday ? 'bold' : undefined,
        }}
      >
        {format(date, 'EEE, MMM d')}
      </Typography>
    </Box>
  );
};

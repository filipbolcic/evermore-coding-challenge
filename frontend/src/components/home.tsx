import { Typography, Paper } from '@mui/material';

export function HomeComponent() {
  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to the Evermore Coding-Challenge!
      </Typography>
      <Typography>
        This is the starting point of your coding challenge. Feel free to adjust the technologies
        and architecture, the goal of this template is to provide you a starting point for the
        solution.
      </Typography>
    </Paper>
  );
}

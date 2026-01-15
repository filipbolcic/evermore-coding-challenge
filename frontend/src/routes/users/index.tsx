import { createFileRoute } from '@tanstack/react-router';
import { Typography, List, ListItem, ListItemText, Paper } from '@mui/material';

// This is an example routing file that can be removed
export const Route = createFileRoute('/users/')({
  component: UsersListComponent,
});

function UsersListComponent() {
  const users = [
    { id: '1', name: 'Alice Johnson' },
    { id: '2', name: 'Bob Smith' },
    { id: '3', name: 'Charlie Brown' },
  ];

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        User List
      </Typography>

      <List>
        {users.map((user) => (
          <ListItem key={user.id} disablePadding>
            <ListItemText primary={user.name} secondary={`ID: ${user.id}`} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

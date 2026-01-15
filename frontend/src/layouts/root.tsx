import { Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';

export function RootLayout() {
  return (
    <>
      {/* GLOBAL NAVIGATION */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ mr: 4 }}>
            Challenge App
          </Typography>

          <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
            <Button
              color="inherit"
              component={Link}
              to="/"
              activeProps={{ style: { fontWeight: 'bold', textDecoration: 'underline' } }}
            >
              Home
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/users"
              activeProps={{ style: { fontWeight: 'bold', textDecoration: 'underline' } }}
            >
              Users
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* PAGE CONTENT */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Outlet />
      </Container>

      {/* DEVTOOLS (Only shows in dev mode) */}
      <TanStackRouterDevtools />
    </>
  );
}

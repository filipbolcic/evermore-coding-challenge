import CloseIcon from '@mui/icons-material/Close';
import { Alert, IconButton, Snackbar } from '@mui/material';
import { type SyntheticEvent } from 'react';

export type Variant = 'success' | 'error' | 'info';

interface Props {
  isOpen: boolean;
  message: string;
  variant: Variant;
  onClose: () => void;
}

export const Toast = ({ isOpen, message, variant, onClose }: Props) => {
  const handleClose = (_event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    onClose();
  };

  return (
    <Snackbar
      open={isOpen}
      onClose={handleClose}
      autoHideDuration={4000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert
        severity={variant}
        variant="filled"
        onClose={handleClose}
        action={
          <IconButton aria-label="Close toast" color="inherit" size="small" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

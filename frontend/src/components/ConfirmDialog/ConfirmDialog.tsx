import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';

interface Props {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
}

export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onClose,
}: Props) {
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography variant="body2">{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} type="button">
          {cancelLabel}
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            onConfirm();
            onClose();
          }}
          type="button"
        >
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

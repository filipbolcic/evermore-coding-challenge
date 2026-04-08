/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from 'react';
import { Toast, type Variant } from './Toast';

interface ToastContextValue {
  showToast: (message: string, variant?: Variant) => void;
  showSuccessToast: (message: string) => void;
  showErrorToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState<Variant>('info');

  const showToast = (nextMessage: string, nextVariant: Variant = 'info') => {
    setMessage(nextMessage);
    setVariant(nextVariant);
  };

  return (
    <ToastContext.Provider
      value={{
        showToast,
        showSuccessToast: (m) => showToast(m, 'success'),
        showErrorToast: (m) => showToast(m, 'error'),
      }}
    >
      {children}
      <Toast
        isOpen={!!message}
        message={message}
        variant={variant}
        onClose={() => setMessage('')}
      />
    </ToastContext.Provider>
  );
};

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
}

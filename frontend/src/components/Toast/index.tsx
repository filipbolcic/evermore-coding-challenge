import { useState } from 'react';
import type { Variant } from './Toast';
import { Toast } from './Toast';

export function useToast() {
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState<Variant>('info');

  return {
    showToast: (message: string, variant?: Variant) => {
      setMessage(message);
      setVariant(variant ?? 'info');
    },
    toast: (
      <Toast
        isOpen={!!message}
        message={message}
        variant={variant}
        onClose={() => setMessage('')}
      />
    ),
  };
}

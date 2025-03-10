import { useState, useCallback } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

/**
 * Hook personalizado para gerenciar notificações toast
 * @returns Objeto com funções e estado para controlar toasts
 */
export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  /**
   * Exibe uma nova notificação toast
   * @param message Mensagem a ser exibida
   * @param type Tipo de toast (success, error, warning, info)
   * @param duration Duração em ms (padrão: 3000ms)
   */
  const showToast = useCallback((message: string, type: ToastType = 'info', duration = 3000) => {
    const id = Math.random().toString(36).substring(2, 9);
    
    // Adiciona o novo toast à lista
    setToasts(prevToasts => [...prevToasts, { id, message, type }]);
    
    // Remove o toast após a duração especificada
    setTimeout(() => {
      setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
    }, duration);
    
    return id;
  }, []);

  /**
   * Remove um toast específico pelo ID
   * @param id ID do toast a ser removido
   */
  const removeToast = useCallback((id: string) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  }, []);

  return {
    toasts,
    showToast,
    removeToast
  };
};
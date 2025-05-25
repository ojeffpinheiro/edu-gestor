import { useState } from 'react';

export const useNotification = () => {
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  const show = (message: string, type: string) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  return { notification, show };
};
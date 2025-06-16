import { useState } from 'react';
import { CalendarEvent } from '../utils/types/CalendarEvent';

export const useNotification = () => {
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  const show = (message: string, type: string) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  return { notification, show };
};

class NotificationService {
  private static notificationPermission: NotificationPermission = 'default';

  static async initialize() {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      this.notificationPermission = await Notification.requestPermission();
    }
  }

  static scheduleReminder(event: CalendarEvent) {
    if (this.notificationPermission !== 'granted') return;

    const eventDate = new Date(event.start);
    const now = new Date();
    const timeDiff = eventDate.getTime() - now.getTime();

    // Notificar 1 hora antes do evento
    if (timeDiff > 0) {
      setTimeout(() => {
        new Notification(`Lembrete: ${event.title}`, {
          body: `Evento começará em breve (${event.type})`,
          icon: '/notification-icon.png'
        });
      }, timeDiff - 3600000); // 1 hora antes
    }

    // Configurar para eventos recorrentes
    if (event.recurrence) {
      // Implementar lógica para repetições
    }
  }

  static showInstantNotification(title: string, options?: NotificationOptions) {
    if (this.notificationPermission === 'granted') {
      new Notification(title, options);
    }
  }
}

// Inicializar quando o app carregar
if (typeof window !== 'undefined') {
  NotificationService.initialize();
}

export default NotificationService;
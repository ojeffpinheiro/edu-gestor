import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CloseButton } from '../../styles/buttons';

// Interface para as props do componente
interface NotificationsProps {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number; // Duração em ms (0 para não fechar automaticamente)
  onClose?: () => void;
}

// Styled components específicos para o componente de Notification
const NotificationContainer = styled.div<{ type: 'success' | 'error' | 'info' | 'warning' }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-md) var(--space-lg);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  margin-bottom: var(--space-md);
  animation: slideIn var(--transition-normal);
  position: relative;
  
  ${({ type }) => {
    switch (type) {
      case 'success':
        return `
          background-color: var(--color-success);
          color: white;
        `;
      case 'error':
        return `
          background-color: var(--color-error);
          color: white;
        `;
      case 'warning':
        return `
          background-color: var(--color-warning);
          color: white;
        `;
      case 'info':
        return `
          background-color: var(--color-info);
          color: white;
        `;
      default:
        return '';
    }
  }}
  
  @keyframes slideIn {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(-20px);
      opacity: 0;
    }
  }
  
  &.exiting {
    animation: slideOut var(--transition-normal) forwards;
  }
`;

const NotificationContent = styled.div`
  flex: 1;
`;

const NotificationMessage = styled.p`
  margin: 0;
  font-size: var(--font-size-md);
`;

const NotificationIcon = styled.div`
  margin-right: var(--space-md);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NotificationCloseButton = styled(CloseButton)`
  color: white;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

// Componente de Notificação
export const Notifications: React.FC<NotificationsProps> = ({
  message,
  type,
  duration = 5000, // 5 segundos por padrão
  onClose
}) => {
  const [isExiting, setIsExiting] = useState(false);
  
  // Função para fechar a notificação com animação
  const closeNotification = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose && onClose();
    }, 300); // Tempo para a animação de saída completar
  };
  
  // Configura o temporizador para fechar automaticamente
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (duration > 0) {
      timer = setTimeout(() => {
        closeNotification();
      }, duration);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [duration]);
  
  // Renderiza o ícone apropriado baseado no tipo
  const renderIcon = () => {
    switch (type) {
      case 'success':
        return <span>✓</span>;
      case 'error':
        return <span>✕</span>;
      case 'warning':
        return <span>⚠</span>;
      case 'info':
        return <span>ℹ</span>;
      default:
        return null;
    }
  };
  
  return (
    <NotificationContainer 
      type={type} 
      className={isExiting ? 'exiting' : ''}
      role="alert"
    >
      <NotificationIcon>
        {renderIcon()}
      </NotificationIcon>
      <NotificationContent>
        <NotificationMessage>{message}</NotificationMessage>
      </NotificationContent>
      <NotificationCloseButton onClick={closeNotification} aria-label="Fechar notificação" />
    </NotificationContainer>
  );
};

// Componente para gerenciar múltiplas notificações
interface NotificationsStackProps {
  notifications: Array<{
    id: string;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
  }>;
  onClose: (id: string) => void;
}

const NotificationsStackContainer = styled.div`
  position: fixed;
  top: var(--space-lg);
  right: var(--space-lg);
  width: 320px;
  max-width: calc(100vw - var(--space-lg) * 2);
  z-index: var(--z-index-tooltip);
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
`;

export const NotificationsStack: React.FC<NotificationsStackProps> = ({
  notifications,
  onClose
}) => {
  if (notifications.length === 0) return null;
  
  return (
    <NotificationsStackContainer>
      {notifications.map((notification) => (
        <Notifications
          key={notification.id}
          message={notification.message}
          type={notification.type}
          onClose={() => onClose(notification.id)}
        />
      ))}
    </NotificationsStackContainer>
  );
};

// Hook para usar o sistema de notificações em qualquer componente
export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Array<{
    id: string;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    duration?: number;
  }>>([]);
  
  const addNotification = (
    message: string, 
    type: 'success' | 'error' | 'info' | 'warning' = 'info',
    duration: number = 5000
  ) => {
    const id = `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setNotifications(prev => [...prev, { id, message, type, duration }]);
    return id;
  };
  
  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };
  
  const clearAllNotifications = () => {
    setNotifications([]);
  };
  
  // Funções de conveniência para diferentes tipos de notificações
  const success = (message: string, duration?: number) => 
    addNotification(message, 'success', duration);
  
  const error = (message: string, duration?: number) => 
    addNotification(message, 'error', duration);
  
  const warning = (message: string, duration?: number) => 
    addNotification(message, 'warning', duration);
  
  const info = (message: string, duration?: number) => 
    addNotification(message, 'info', duration);
  
  return {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications,
    success,
    error,
    warning,
    info
  };
};

export default Notifications;
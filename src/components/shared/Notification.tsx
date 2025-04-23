// components/shared/Notification.tsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaTimes } from 'react-icons/fa';

interface NotificationProps {
  message: string;
  type: string; // 'success' | 'error' | 'info' | 'warning'
  duration?: number;
  onClose?: () => void;
}

const NotificationWrapper = styled.div<{ type: string; visible: boolean }>`
  position: fixed;
  bottom: 20px;
  right: 20px;
  min-width: 300px;
  padding: 15px 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  transform: translateY(${props => (props.visible ? '0' : '100%')});
  opacity: ${props => (props.visible ? '1' : '0')};
  transition: transform 0.3s ease, opacity 0.3s ease;
  
  background-color: ${props => {
    switch (props.type) {
      case 'success':
        return '#4caf50';
      case 'error':
        return '#f44336';
      case 'warning':
        return '#ff9800';
      case 'info':
      default:
        return '#2196f3';
    }
  }};
  color: white;
`;

const NotificationContent = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const IconWrapper = styled.div`
  margin-right: 12px;
  display: flex;
  align-items: center;
`;

const MessageText = styled.p`
  margin: 0;
  flex: 1;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  opacity: 0.8;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 1;
  }
`;

const Notification: React.FC<NotificationProps> = ({ 
  message, 
  type = 'info', 
  duration = 5000, 
  onClose 
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      
      // Pequeno atraso para permitir a animação de saída
      setTimeout(() => {
        if (onClose) onClose();
      }, 300);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration, onClose]);

  const handleClose = () => {
    setVisible(false);
    
    // Pequeno atraso para permitir a animação de saída
    setTimeout(() => {
      if (onClose) onClose();
    }, 300);
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheckCircle size={20} />;
      case 'error':
        return <FaExclamationTriangle size={20} />;
      case 'warning':
        return <FaExclamationTriangle size={20} />;
      case 'info':
      default:
        return <FaInfoCircle size={20} />;
    }
  };

  return (
    <NotificationWrapper type={type} visible={visible}>
      <NotificationContent>
        <IconWrapper>
          {getIcon()}
        </IconWrapper>
        <MessageText>{message}</MessageText>
      </NotificationContent>
      <CloseButton onClick={handleClose} aria-label="Fechar notificação">
        <FaTimes />
      </CloseButton>
    </NotificationWrapper>
  );
};

export default Notification;
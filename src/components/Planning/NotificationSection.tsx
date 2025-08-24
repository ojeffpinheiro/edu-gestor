/**
 * components/NotificationSection.tsx
 * Componente de seção de notificações refatorado
 */
import React, { memo } from 'react';
import { NotificationItem, NotificationList, SectionCard, SectionHeader, EmptyStateMessage } from './styles';
import { FaBell } from 'react-icons/fa';
import { Notification } from '../../types/ui/planningDashboard';
import { formatDate } from '../../utils/dateFormatter';

interface NotificationSectionProps {
  notifications: Notification[];
  maxHeight?: string;
  title?: string;
}

/**
 * Componente para exibir uma seção de notificações
 * 
 * @param notifications - Lista de notificações a serem exibidas
 * @param maxHeight - Altura máxima opcional para a lista (padrão: 300px)
 * @param title - Título personalizado para a seção (padrão: "Notificações")
 */
export const NotificationSection: React.FC<NotificationSectionProps> = memo(({
  notifications,
  maxHeight,
  title = "Notificações"
}) => {
  const hasNotifications = notifications && notifications.length > 0;

  return (
    <SectionCard data-testid="notification-section">
      <SectionHeader>
        <h2 className="text-xl font-semibold flex items-center">
          <FaBell className="mr-2" aria-hidden="true" /> {title}
        </h2>
        {hasNotifications && (
          <span className="text-sm text-gray-500">
            {notifications.length} {notifications.length === 1 ? 'notificação' : 'notificações'}
          </span>
        )}
      </SectionHeader>

      {/* Lista com altura máxima customizável */}
      <NotificationList style={{ maxHeight: maxHeight || undefined }}>
        {hasNotifications ? (
          notifications.map(notification => (
            <NotificationItem 
              key={notification.id}
              tabIndex={0} // Permite foco para acessibilidade
              role="article"
              aria-label={`Notificação: ${notification.mensagem}`}
            >
              <div>
                <span className="text-sm font-medium">
                  {notification.mensagem}
                </span>
                <span className="text-xs text-gray-500 ml-2">
                  {formatDate(notification.data)}
                </span>
              </div>
            </NotificationItem>
          ))
        ) : (
          <EmptyStateMessage>
            Nenhuma notificação no momento
          </EmptyStateMessage>
        )}
      </NotificationList>
    </SectionCard>
  );
});
import React from 'react'
import { NotificationItem, NotificationList, SectionCard, SectionHeader } from './styles';
import { FaBell } from 'react-icons/fa';
import { formatDate } from '../../utils/dateFormatter';


interface Notification {
    id: number;
    mensagem: string;
    data: string;
  }

export const NotificationSection: React.FC<{ notifications: Notification[] }> = ({ notifications }) => (
    <SectionCard>
      <SectionHeader>
        <h2 className="text-xl font-semibold flex items-center">
          <FaBell className="mr-2" /> Notificações
        </h2>
      </SectionHeader>
      <NotificationList>
        {notifications.length > 0 ? (
          notifications.map(notification => (
            <NotificationItem key={notification.id}>
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
          <div className="p-2 text-center text-gray-500">Nenhuma notificação no momento</div>
        )}
      </NotificationList>
    </SectionCard>
  );
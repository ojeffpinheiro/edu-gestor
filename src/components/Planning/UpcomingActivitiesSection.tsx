/**
 * components/UpcomingActivitiesSection.tsx
 * Componente de seção de atividades refatorado
 */
import React, { memo } from 'react';
import { FaCalendarAlt } from "react-icons/fa";
import { NotificationItem, NotificationList, SectionCard, SectionHeader, EmptyStateMessage } from "./styles";
import { Activity } from '../../utils/types/planningDashboard';
import { formatDate } from '../../utils/dateFormatter';

interface UpcomingActivitiesSectionProps {
  activities: Activity[];
  maxHeight?: string;
  title?: string;
  onActivityClick?: (activity: Activity) => void;
}

/**
 * Componente para exibir uma seção de atividades próximas
 * 
 * @param activities - Lista de atividades a serem exibidas
 * @param maxHeight - Altura máxima opcional para a lista (padrão: 300px)
 * @param title - Título personalizado para a seção (padrão: "Próximas Atividades")
 * @param onActivityClick - Função de callback para clique em uma atividade
 */
export const UpcomingActivitiesSection: React.FC<UpcomingActivitiesSectionProps> = memo(({
  activities,
  maxHeight,
  title = "Próximas Atividades",
  onActivityClick
}) => {
  const hasActivities = activities && activities.length > 0;

  // Handler para clique com verificação de callback
  const handleActivityClick = (activity: Activity) => {
    if (onActivityClick) {
      onActivityClick(activity);
    }
  };

  return (
    <SectionCard data-testid="activities-section">
      <SectionHeader>
        <h2 className="text-xl font-semibold flex items-center">
          <FaCalendarAlt className="mr-2" aria-hidden="true" /> {title}
        </h2>
        {hasActivities && (
          <span className="text-sm text-gray-500">
            {activities.length} {activities.length === 1 ? 'atividade' : 'atividades'}
          </span>
        )}
      </SectionHeader>

      {/* Lista com altura máxima customizável */}
      <NotificationList style={{ maxHeight: maxHeight || undefined }}>
        {hasActivities ? (
          activities.map(activity => (
            <NotificationItem 
              key={activity.id}
              onClick={() => handleActivityClick(activity)}
              tabIndex={0} // Permite foco para acessibilidade
              role="button"
              aria-label={`Atividade: ${activity.titulo} em ${formatDate(activity.data)} às ${activity.horario}`}
              style={{ cursor: onActivityClick ? 'pointer' : 'default' }}
            >
              <div>
                <span className="text-sm font-medium">
                  {activity.titulo}
                </span>
                <span className="text-xs text-gray-500 ml-2">
                  {formatDate(activity.data)} - {activity.horario}
                </span>
              </div>
            </NotificationItem>
          ))
        ) : (
          <EmptyStateMessage>
            Nenhuma atividade programada
          </EmptyStateMessage>
        )}
      </NotificationList>
    </SectionCard>
  );
});

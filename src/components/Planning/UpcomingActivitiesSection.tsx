import React from 'react'

import { FaCalendarAlt } from "react-icons/fa";
import { NotificationItem, NotificationList, SectionCard, SectionHeader } from "./styles";
import { formatDate } from '../../utils/dateFormatter';


interface Activity {
    id: number;
    titulo: string;
    data: string;
    horario: string;
}

export const UpcomingActivitiesSection: React.FC<{ activities: Activity[] }> = ({ activities }) => (
    <SectionCard>
        <SectionHeader>
            <h2 className="text-xl font-semibold flex items-center">
                <FaCalendarAlt className="mr-2" /> Próximas Atividades
            </h2>
        </SectionHeader>
        <NotificationList>
            {activities.length > 0 ? (
                activities.map(activity => (
                    <NotificationItem key={activity.id}>
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
                <div className="p-2 text-center text-gray-500">Nenhuma atividade programada</div>
            )}
        </NotificationList>
    </SectionCard>
);
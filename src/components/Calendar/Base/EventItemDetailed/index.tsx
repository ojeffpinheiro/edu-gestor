import React from 'react';
import {
  FaChalkboardTeacher,
  FaUsers,
  FaBell,
  FaCalendarAlt,
  FaUser,
  FaSchool,
  FaMapMarkerAlt,
  FaUserGraduate,
  FaClock
} from 'react-icons/fa';

import { CalendarEvent } from '../../../../utils/types/CalendarEvent';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { constants, eventTypeColors } from '../../../../utils/consts';

import {
  DayDivider,
  DayTitle,
  EventContainer,
  TimeRow,
  EventTime,
  EventTitle,
  DetailsRow,
  DetailItem,
  ParticipantsContainer,
  ParticipantBadge
} from './styles';

interface EventItemDetailedProps {
  event: CalendarEvent;
  onClick?: (e: React.MouseEvent) => void;
  showDate?: boolean;
}

const EventItemDetailed: React.FC<EventItemDetailedProps> = ({ event, onClick, showDate }) => {
  // Obter configuração do tipo de evento
  const eventTypeConfig = eventTypeColors.find(etc => etc.type === event.type);

  // Formatar data no padrão brasileiro: "Sex, 15 Dez 2023"
  const formatBrazilianDate = (date: Date | string) => {
    return format(typeof date === 'string' ? parseISO(date) : date, "EEE, dd MMM yyyy", {
      locale: ptBR
    });
  };

  // Ícone baseado no tipo de evento
  const getEventIcon = () => {
    switch (event.type) {
      case 'class': return <FaChalkboardTeacher size={14} />;
      case 'assessment': return <FaUserGraduate size={14} />;
      case 'meeting': return <FaUsers size={14} />;
      case 'holiday': return <FaCalendarAlt size={14} />;
      case 'personal': return <FaUser size={14} />;
      case 'deadline': return <FaBell size={14} />;
      default: return <FaCalendarAlt size={14} />;
    }
  };

  // Formatar horário do evento
  const formatEventTime = () => {
    if (event.isAllDay) return 'Dia inteiro';
    return `${format(new Date(event.start), 'HH:mm')} - ${format(new Date(event.end), 'HH:mm')}`;
  };

  return (
    <EventContainer
      eventType={event.type}
      eventColor={event.color}
      onClick={onClick}
    >
      <TimeRow>
        <EventTime>
          <FaClock size={12} />
          {formatEventTime()}
        </EventTime>
        <EventTitle>
          {getEventIcon()}
          {event.title}
        </EventTitle>
      </TimeRow>

      <DetailsRow>
        {event.location && (
          <DetailItem>
            <FaMapMarkerAlt size={12} />
            <span>{event.location}</span>
          </DetailItem>
        )}

        {(event.classId || event.schoolId) && (
          <DetailItem>
            <FaSchool size={12} />
            <span>
              {event.classId && `${event.classId}`}
              {event.classId && event.schoolId && ' • '}
              {event.schoolId && `${event.schoolId}`}
            </span>
          </DetailItem>
        )}
      </DetailsRow>

      {event.participants && event.participants.length > 0 && (
        <DetailItem style={{ marginTop: constants.spacing.xs }}>
          <FaUsers size={12} />
          <ParticipantsContainer>
            {event.participants.slice(0, 3).map((participant, index) => (
              <ParticipantBadge
                key={index}
                isTeacher={participant.toLowerCase().includes('prof')}
              >
                {participant.split(' ')[0]}
              </ParticipantBadge>
            ))}
          </ParticipantsContainer>
        </DetailItem>
      )}
    </EventContainer>
  );
};

export default EventItemDetailed;
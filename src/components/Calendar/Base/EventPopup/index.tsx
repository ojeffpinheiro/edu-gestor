import React from 'react';
import {
  FaEdit,
  FaCopy,
  FaTrash,
  FaTimes,
  FaMapMarkerAlt,
  FaUsers,
  FaBell,
  FaCalendarAlt,
  FaClock,
  FaSyncAlt,
  FaPaperclip,
  FaSchool,
  FaChalkboardTeacher,
  FaUser,
  FaAlignLeft
} from 'react-icons/fa';
import { CalendarEvent, EventType } from '../../../../utils/types/CalendarEvent';
import { format, isSameDay, isSameMonth } from 'date-fns';
import {
  EventPopupContainer,
  EventPopupHeader,
  EventPopupTitle,
  EventPopupActions,
  EventPopupActionButton,
  EventPopupContent,
  EventDetailRow,
  EventDetailIcon,
  EventDetailValue,
  EventParticipants,
  ParticipantTag,
} from './styles';
import { Grid2Columns } from '../../../../styles/modals';
import { Flex } from '../../../../styles/layoutUtils';
import { ptBR } from 'date-fns/locale';

interface EventPopupProps {
  event: CalendarEvent;
  onEdit: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onClose: () => void;
  style?: React.CSSProperties;
}

const EventPopup: React.FC<EventPopupProps> = ({
  event,
  onEdit,
  onDuplicate,
  onDelete,
  onClose,
}) => {
  const getTypeIcon = (type: EventType) => {
    switch (type) {
      case 'class': return <FaChalkboardTeacher />;
      case 'meeting': return <FaUsers />;
      case 'deadline': return <FaBell />;
      case 'holiday': return <FaCalendarAlt />;
      case 'personal': return <FaUser />;
      default: return <FaCalendarAlt />;
    }
  };

  const formatDateRange = (start: Date | string, end: Date | string, isAllDay?: boolean) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    // Se o evento for o dia inteiro
    if (isAllDay) {
      if (isSameDay(startDate, endDate)) {
        // Para um único dia, mostra o dia da semana e o dia do mês
        return format(startDate, 'eeee, d MMMM', { locale: ptBR });
      }
      return `${format(startDate, 'd MMMM yyyy', { locale: ptBR })} - ${format(endDate, 'd MMMM yyyy', { locale: ptBR })}`;
    }

    // Se o evento for no mesmo dia
    if (isSameDay(startDate, endDate)) {
      // Exibe o dia da semana e a data (sem o horário)
      return format(startDate, 'eeee, d MMMM', { locale: ptBR });
    }

    // Se o evento ocorre em dias consecutivos no mesmo mês
    if (isSameMonth(startDate, endDate)) {
      return `${format(startDate, 'd')} - ${format(endDate, 'd MMMM yyyy', { locale: ptBR })}`;
    }

    // Caso o evento aconteça em meses diferentes
    return `${format(startDate, 'd MMMM')} - ${format(endDate, 'd MMMM yyyy', { locale: ptBR })}`;
  };


  const formatRecurrence = () => {
    if (!event.recurrence) return 'Não recorrente';

    const { frequency, interval, endDate, occurrences } = event.recurrence;
    const freqMap = {
      daily: 'Diário',
      weekly: 'Semanal',
      monthly: 'Mensal',
      yearly: 'Anual'
    };

    let text = `${freqMap[frequency]} a cada ${interval} ${interval === 1 ?
      frequency.slice(0, -2) : frequency.slice(0, -2) + 's'}`;

    if (endDate) {
      text += ` até ${format(new Date(endDate), 'PPP')}`;
    } else if (occurrences) {
      text += ` por ${occurrences} ocorrências`;
    }

    return text;
  };

  const formatReminders = () => {
    if (!event.reminders || event.reminders.length === 0) return 'Nenhum lembrete';

    return event.reminders.map(reminder => {
      const unitMap = {
        minutes: 'minutos',
        hours: 'horas',
        days: 'dias'
      };
      return `${reminder.time} ${unitMap[reminder.unit]} antes`;
    }).join(', ');
  };

  return (
    <EventPopupContainer>
      <EventPopupHeader>
        <EventPopupActions>
          <EventPopupActionButton onClick={onEdit} title="Editar">
            <FaEdit />
          </EventPopupActionButton>
          <EventPopupActionButton onClick={onDuplicate} title="Duplicar">
            <FaCopy />
          </EventPopupActionButton>
          <EventPopupActionButton onClick={onDelete} title="Excluir">
            <FaTrash />
          </EventPopupActionButton>
          <EventPopupActionButton onClick={onClose} title="Fechar">
            <FaTimes />
          </EventPopupActionButton>
        </EventPopupActions>
      </EventPopupHeader>

      <EventPopupContent>
        <EventPopupTitle eventType={event.type} eventColor={event.color}>
          <Flex direction='row' gap='md' >
            {getTypeIcon(event.type)} {event.title}
          </Flex>
        </EventPopupTitle>

        {/* Dias do evento */}
        <EventDetailRow>
          <EventDetailIcon><FaClock /></EventDetailIcon>
          <EventDetailValue>
            {formatDateRange(event.start, event.end, event.isAllDay)}
            {event.isAllDay && ' (Dia inteiro)'}
          </EventDetailValue>
        </EventDetailRow>

        {/* Escola e Turma */}
        <Grid2Columns style={{ gap: '2rem' }}>
          {event.schoolId && (
            <EventDetailRow>
              <EventDetailIcon><FaSchool /></EventDetailIcon>
              <EventDetailValue>{event.schoolId}</EventDetailValue>
            </EventDetailRow>
          )}

          {event.classId && (
            <EventDetailRow>
              <EventDetailIcon><FaChalkboardTeacher /></EventDetailIcon>
              <EventDetailValue>{event.classId}</EventDetailValue>
            </EventDetailRow>
          )}
        </Grid2Columns>

        {/* Lembrete Recorrencia */}
        <EventDetailRow style={{ gap: '2rem' }} >
          <Flex direction='row' gap='md'>
            <EventDetailIcon><FaBell /></EventDetailIcon>
            <EventDetailValue>{formatReminders()}</EventDetailValue>
          </Flex>

          <Flex direction='row' gap='md'>
            <EventDetailIcon><FaSyncAlt /></EventDetailIcon>
            <EventDetailValue>{formatRecurrence()}</EventDetailValue>
          </Flex>
        </EventDetailRow>

        {/* Descrição */}
        {event.description && (
          <EventDetailRow>
            <EventDetailIcon><FaAlignLeft /></EventDetailIcon>
            <EventDetailValue>{event.description}</EventDetailValue>
          </EventDetailRow>
        )}

        {/* Anexos */}
        {event.attachments && event.attachments.length > 0 && (
          <EventDetailRow>
            <EventDetailIcon><FaPaperclip /></EventDetailIcon>
            {event.attachments.map(attachment => (
              <div key={attachment}>
                <a href={attachment} target="_blank" rel="noopener noreferrer">
                  {attachment.split('/').pop()}
                </a>
              </div>
            ))}
          </EventDetailRow>
        )}

        {/* Localização */}
        {event.location && (
          <EventDetailRow>
            <EventDetailIcon><FaMapMarkerAlt /></EventDetailIcon>
            <EventDetailValue>{event.location}</EventDetailValue>
          </EventDetailRow>
        )}

        {/* Participantes */}
        {event.participants && event.participants.length > 0 && (
          <EventDetailRow>
            <EventDetailIcon><FaUsers /></EventDetailIcon>
            <EventParticipants>
              {event.participants.map(participant => (
                <ParticipantTag key={participant}>{participant}</ParticipantTag>
              ))}
            </EventParticipants>
          </EventDetailRow>
        )}
      </EventPopupContent>
    </EventPopupContainer>
  );
};

export default EventPopup;
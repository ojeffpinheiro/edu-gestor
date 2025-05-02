import React from 'react';
import styled from 'styled-components';
import EventForm from './EventForm';
import { CalendarEvent } from '../../utils/types/CalendarEvent';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ModalTitle = styled.h3`
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

interface EventModalProps {
  event?: CalendarEvent;
  onSave: (event: CalendarEvent) => void;
  onClose: () => void;
  onDelete?: (eventId: string) => void;
}

const EventModal: React.FC<EventModalProps> = ({ event, onSave, onClose, onDelete }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{event ? 'Editar Evento' : 'Criar Evento'}</ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <EventForm 
          event={event} 
          onSave={onSave} 
          onCancel={onClose} 
        />
        {event && onDelete && (
          <button 
            onClick={() => onDelete(event.id)}
            style={{ 
              marginTop: '1rem', 
              background: '#ff4d4f', 
              color: 'white' 
            }}
          >
            Excluir Evento
          </button>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default EventModal;
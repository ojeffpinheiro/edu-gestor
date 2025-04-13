import React, { useState } from 'react';
import styled from 'styled-components';

import { CalendarEvent } from '../../utils/types/CalendarEvent';
import { FaPlus } from 'react-icons/fa';
import EventList from '../../components/Events/EventList';
import EventCreation from '../../components/Events/EventCreation';
import { generateMockEvents } from '../../hooks/useCalendar';
import { AddButton, ComponentWrapper, Modal, SectionTitle } from '../../styles/eventsStyles';
import { ModalContent } from '../../styles/modals';

// Styled components para a página de teste
const TestPageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: var(--font-family);
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  color: var(--color-primary);
  margin: 0;
`;

const TestPage: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>(generateMockEvents());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Partial<CalendarEvent> | null>(null);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  
  // Manipulador para abrir modal de criação de evento
  const handleAddEvent = () => {
    setCurrentEvent({
      start: new Date(),
      end: new Date(new Date().getTime() + 60 * 60 * 1000) // 1 hora depois
    });
    setModalMode('create');
    setIsModalOpen(true);
  };
  
  // Manipulador para visualizar evento
  const handleViewEvent = (event: CalendarEvent) => {
    setCurrentEvent(event);
    setModalMode('view');
    setIsModalOpen(true);
  };
  
  // Manipulador para editar evento
  const handleEditEvent = (event: CalendarEvent) => {
    setCurrentEvent(event);
    setModalMode('edit');
    setIsModalOpen(true);
  };
  
  // Manipulador para salvar evento (criar ou editar)
  const handleSaveEvent = (eventData: Partial<CalendarEvent>) => {
    if (modalMode === 'create') {
      // Gerar ID único para novo evento
      const newEvent = {
        ...eventData,
        id: `event${Date.now()}`
      } as CalendarEvent;
      
      setEvents([...events, newEvent]);
    } else if (modalMode === 'edit' && eventData.id) {
      // Atualizar evento existente
      setEvents(events.map(event => 
        event.id === eventData.id ? { ...event, ...eventData } : event
      ));
    }
    
    setIsModalOpen(false);
  };
  
  // Manipulador para excluir evento
  const handleDeleteEvent = () => {
    if (currentEvent && currentEvent.id) {
      setEvents(events.filter(event => event.id !== currentEvent.id));
      setIsModalOpen(false);
    }
  };
  
  // Manipulador para fechar modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <TestPageContainer>
      <PageHeader>
        <PageTitle>Teste de Componentes de Calendário</PageTitle>
        <AddButton onClick={handleAddEvent}>
          <FaPlus /> Adicionar Evento
        </AddButton>
      </PageHeader>
      
      <SectionTitle>Lista de Eventos</SectionTitle>
      <ComponentWrapper>
        <p>Este componente exibe uma lista de eventos com opções de filtragem e busca.</p>
        <EventList 
          events={events} 
          onViewEvent={handleViewEvent}
          onEditEvent={handleEditEvent}
        />
      </ComponentWrapper>
      
      {isModalOpen && (
        <Modal>
          <ModalContent>
            {modalMode === 'view' ? (
              // No modo de visualização, podemos reutilizar o EventCreation com props para torná-lo somente leitura
              // ou implementar um componente de EventView específico
              <div>
                <EventCreation
                  initialData={currentEvent || undefined}
                  onSubmit={() => {}}
                  onCancel={handleCloseModal}
                />
                <div style={{ textAlign: 'right', marginTop: '1rem' }}>
                  <button 
                    onClick={() => {
                      setModalMode('edit');
                    }}
                    style={{ 
                      marginRight: '0.5rem',
                      padding: '0.5rem 1rem',
                      backgroundColor: 'var(--color-primary)',
                      color: 'white',
                      border: 'none',
                      borderRadius: 'var(--border-radius-sm)',
                      cursor: 'pointer'
                    }}
                  >
                    Editar
                  </button>
                </div>
              </div>
            ) : (
              <EventCreation
                initialData={currentEvent || undefined}
                startDate={currentEvent?.start instanceof Date ? currentEvent.start : undefined}
                endDate={currentEvent?.end instanceof Date ? currentEvent.end : undefined}
                onSubmit={handleSaveEvent}
                onCancel={handleCloseModal}
                onDelete={modalMode === 'edit' ? handleDeleteEvent : undefined}
              />
            )}
          </ModalContent>
        </Modal>
      )}
    </TestPageContainer>
  );
};

export default TestPage;
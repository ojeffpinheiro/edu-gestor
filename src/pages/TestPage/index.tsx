import React, { useState } from 'react';
import styled from 'styled-components';

import { CalendarEvent } from '../../utils/types/CalendarEvent';
import { FaPlus } from 'react-icons/fa';
import EventList from '../../components/Events/EventList';
import EventCreation from '../../components/Events/EventCreation';

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

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: var(--color-primary);
  color: var(--color-text-on-primary);
  border: none;
  border-radius: var(--border-radius-md);
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    background-color: var(--color-primary-hover);
  }
`;

const SectionTitle = styled.h2`
  margin-bottom: 1.5rem;
  color: var(--color-primary);
  border-bottom: 2px solid var(--color-border);
  padding-bottom: 0.5rem;
`;

const ComponentWrapper = styled.div`
  margin-bottom: 3rem;
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius-md);
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Modal = styled.div`
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
  background-color: var(--color-background);
  border-radius: var(--border-radius-md);
  padding: 2rem;
  width: 90%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
`;

// Dados mockados para eventos
const generateMockEvents = (): CalendarEvent[] => {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const nextWeek = new Date(now);
  nextWeek.setDate(nextWeek.getDate() + 7);
  const lastWeek = new Date(now);
  lastWeek.setDate(lastWeek.getDate() - 7);

  return [
    {
      id: "event1",
      title: "Reunião de Planejamento",
      description: "Discussão sobre os próximos projetos e distribuição de tarefas para o trimestre.",
      start: yesterday,
      end: yesterday,
      type: "meeting",
      isAllDay: false,
      location: "Sala de Conferências A"
    },
    {
      id: "event2",
      title: "Aula de Matemática",
      description: "Introdução às funções quadráticas e suas aplicações.",
      start: now,
      end: new Date(now.getTime() + 2 * 60 * 60 * 1000), // 2 horas depois
      type: "class",
      isAllDay: false,
      location: "Sala 305"
    },
    {
      id: "event3",
      title: "Entrega de Relatório",
      description: "Prazo final para entrega do relatório trimestral.",
      start: tomorrow,
      end: tomorrow,
      type: "deadline",
      isAllDay: true,
      location: ""
    },
    {
      id: "event4",
      title: "Feriado Municipal",
      description: "Aniversário da cidade.",
      start: nextWeek,
      end: nextWeek,
      type: "holiday",
      isAllDay: true,
      location: ""
    },
    {
      id: "event5",
      title: "Workshop de Design",
      description: "Introdução às ferramentas de design UI/UX e práticas modernas.",
      start: lastWeek,
      end: lastWeek,
      type: "other",
      isAllDay: false,
      location: "Laboratório de Design"
    }
  ];
};

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
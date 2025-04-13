import React, { useEffect, useRef, useState } from 'react';
import { FaClipboardList, FaChartBar, FaUsers, FaUserEdit, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { CalendarEvent } from '../../../utils/types/CalendarEvent';
import { generateMockEvents } from '../../../hooks/useCalendar';

import { Container, Title, CardsContainer, Card, Header, AddButton } from './styles';
import { ComponentWrapper, HeaderEvent, SectionTitle } from '../../../styles/eventsStyles';
import EventList from '../../../components/Events/EventList';
import EventCreation from '../../../components/Events/EventCreation';
import { ModalContainer, ModalContent } from '../../../styles/modals';

const TeamPage: React.FC = () => {
  const navigate = useNavigate();

  const modalRef = useRef<HTMLDivElement>(null);

  const [events, setEvents] = useState<CalendarEvent[]>(generateMockEvents());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Partial<CalendarEvent> | null>(null);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');

  const handleTeamMnagement = () => {
    navigate('/team-management');
  };

  const handleDailyReport = () => {
    navigate('daily-report');
  }

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

  useEffect(() => {
      const handleOutsideClick = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
          handleCloseModal();
        }
      };
      document.addEventListener("mousedown", handleOutsideClick);
      return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, [isModalOpen]);

  return (
    <Container>
      <Header>
        <Title>Gestão da Turma</Title>
      </Header>

      <CardsContainer>
        <Card onClick={handleDailyReport}>
          <FaClipboardList size={40} />
          <span>Realizar Chamada</span>
        </Card>
        <Card>
          <FaChartBar size={40} />
          <span>Acompanhar Notas</span>
        </Card>
        <Card>
          <FaUsers size={40} />
          <span>Comportamento da Turma</span>
        </Card>
        <Card onClick={handleTeamMnagement}>
          <FaUserEdit size={40} />
          <span>Gerenciar Alunos</span>
        </Card>
      </CardsContainer>

      <HeaderEvent>
      <SectionTitle>Lista de Eventos</SectionTitle>
      <AddButton onClick={handleAddEvent}>
          <FaPlus />Adicionar Evento
        </AddButton>
      </HeaderEvent>

      <ComponentWrapper>
        <p>Este componente exibe uma lista de eventos com opções de filtragem e busca.</p>
        <EventList
          events={events}
          onViewEvent={handleViewEvent}
          onEditEvent={handleEditEvent}
        />
      </ComponentWrapper>

      {isModalOpen && (
        <ModalContainer role='dialog' aria-modal >
          <ModalContent ref={modalRef}>
            {modalMode === 'view' ? (
              // No modo de visualização, podemos reutilizar o EventCreation com props para torná-lo somente leitura
              // ou implementar um componente de EventView específico
              <div>
                <EventCreation
                  initialData={currentEvent || undefined}
                  onSubmit={() => { }}
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
        </ModalContainer>
      )}
    </Container>
  );
};

export default TeamPage;

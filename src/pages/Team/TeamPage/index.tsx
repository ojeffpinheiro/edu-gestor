import React, { useState } from 'react';
import { FaClipboardList, FaChartBar, FaUsers, FaUserEdit, FaPlus, FaFilter } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { CalendarEvent } from '../../../utils/types/CalendarEvent';
import { generateMockEvents } from '../../../hooks/useCalendar';


import EventCreation from '../../../components/Events/EventCreation';
import { Container } from '../../../styles/layoutUtils';
import {
  ActionButton,
  CalendarContainer,
  CalendarViewToggle,
  CardsContainer,
  EventFilters,
  EventsHeader,
  FilterButton,
  Header,
  QuickCard,
  QuickCardHeader,
  ViewToggleButton
} from './styles';
import { Calendar } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pt-br';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { momentLocalizer, Views } from 'react-big-calendar';
import Notification from '../../../components/shared/Notification';
import { SectionTitle } from '../../../styles/eventsStyles';

// Configure moment locale
moment.locale('pt-br');
const localizer = momentLocalizer(moment);

/**
 * TeamPage - Componente principal para gestão da turma
 * 
 * Oferece funcionalidades como:
 * - Acesso rápido a ferramentas de gestão através de cards
 * - Visualização de calendário em diferentes formatos (diário, semanal, mensal)
 * - Gerenciamento de eventos da turma
 * - Filtros para atividades
 */
const TeamPage: React.FC = () => {
  const navigate = useNavigate();

  // Estados
  const [events, setEvents] = useState<CalendarEvent[]>(generateMockEvents());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Partial<CalendarEvent> | null>(null);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [calendarView, setCalendarView] = useState<string>(Views.MONTH);
  const [date, setDate] = useState<Date>(new Date());
  const [filters, setFilters] = useState({
    showMeetings: true,
    showDeadlines: true,
    showHolidays: true,
    showPersonal: true
  });
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  const showNotification = (message: string, type: string) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  // Navegação
  const handleTeamManagement = () => {
    navigate('/team-management');
  };

  const handleDailyReport = () => {
    navigate('daily-report');
  };

  const handleGradeTracking = () => {
    showNotification('Funcionalidade em desenvolvimento', 'info');
  };

  const handleBehaviorTracking = () => {
    showNotification('Funcionalidade em desenvolvimento', 'info');
  };

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

  // Manipulador para salvar evento (criar ou editar)
  const handleSaveEvent = (eventData: Partial<CalendarEvent>) => {
    if (modalMode === 'create') {
      // Gerar ID único para novo evento
      const newEvent = {
        ...eventData,
        id: `event${Date.now()}`
      } as CalendarEvent;

      setEvents([...events, newEvent]);
      showNotification('Evento criado com sucesso!', 'success');
    } else if (modalMode === 'edit' && eventData.id) {
      // Atualizar evento existente
      setEvents(events.map(event =>
        event.id === eventData.id ? { ...event, ...eventData } : event
      ));
      showNotification('Evento atualizado com sucesso!', 'success');
    }

    setIsModalOpen(false);
  };

  // Manipulador para excluir evento
  const handleDeleteEvent = () => {
    if (currentEvent && currentEvent.id) {
      setEvents(events.filter(event => event.id !== currentEvent.id));
      setIsModalOpen(false);
      showNotification('Evento excluído com sucesso!', 'success');
    }
  };

  // Manipulador para fechar modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Manipulador para seleção de slot no calendário
  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    setCurrentEvent({
      start,
      end
    });
    setModalMode('create');
    setIsModalOpen(true);
  };

  // Manipulador para navegação no calendário
  const handleNavigate = (newDate: Date) => {
    setDate(newDate);
  };

  // Manipulador para mudança de visão no calendário
  const handleViewChange = (newView: string) => {
    setCalendarView(newView);
    showNotification(`Visualização alterada para ${newView}`, 'info');
  };

  // Manipulador para alternar filtros
  const toggleFilter = (filterName: keyof typeof filters) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
    showNotification(`Filtro ${filterName} ${!filters[filterName] ? 'ativado' : 'desativado'}`, 'info');
  };

  // Eventos filtrados com base nos filtros atuais
  const filteredEvents = events.filter(event => {
    if (event.type === 'meeting' && !filters.showMeetings) return false;
    if (event.type === 'deadline' && !filters.showDeadlines) return false;
    if (event.type === 'holiday' && !filters.showHolidays) return false;
    if (event.type === 'personal' && !filters.showPersonal) return false;
    return true;
  });

  // Estilo personalizado para eventos no calendário
  const eventPropGetter = (event: CalendarEvent) => {
    let backgroundColor = '#3788d8';
    let borderColor = '#2c6aa8';

    switch (event.type) {
      case 'meeting':
        backgroundColor = '#4CAF50';
        borderColor = '#388E3C';
        break;
      case 'deadline':
        backgroundColor = '#F44336';
        borderColor = '#D32F2F';
        break;
      case 'holiday':
        backgroundColor = '#FF9800';
        borderColor = '#F57C00';
        break;
      case 'personal':
        backgroundColor = '#9C27B0';
        borderColor = '#7B1FA2';
        break;
    }

    return {
      style: {
        backgroundColor,
        borderColor,
        color: '#fff'
      }
    };
  };

  return (
    <Container>
      <Header>
        <h1>Gestão da Turma</h1>
      </Header>

      {/* Cards de acesso rápido */}
      <CardsContainer>
        <QuickCard
          onClick={handleDailyReport}
          color="#15803d">
          <QuickCardHeader>
            <FaClipboardList size={28} />
            <h3>Realizar Chamada</h3>
          </QuickCardHeader>
          <p>Registre a presença dos alunos em sala de aula</p>
        </QuickCard>

        <QuickCard
          onClick={handleGradeTracking}
          color="#1e40af">
          <QuickCardHeader>
            <FaChartBar size={28} />
            <h3>Acompanhar Notas</h3>
          </QuickCardHeader>
          <p>Visualize e registre as avaliações dos alunos</p>
        </QuickCard>

        <QuickCard
          onClick={handleBehaviorTracking}
          color="#ea580c">
          <QuickCardHeader>
            <FaUsers size={28} />
            <h3>Comportamento da Turma</h3>
          </QuickCardHeader>
          <p>Acompanhe e registre observações sobre a turma</p>
        </QuickCard>

        <QuickCard
          onClick={handleTeamManagement}
          color="#7e22ce">
          <QuickCardHeader>
            <FaUserEdit size={28} />
            <h3>Gerenciar Alunos</h3>
          </QuickCardHeader>
          <p>Adicione, edite ou remova alunos da turma</p>
        </QuickCard>
      </CardsContainer>

      {/* Seção de Calendário e Eventos */}
      <EventsHeader>
        <SectionTitle>Calendário de Eventos</SectionTitle>
        <div>
          <ActionButton onClick={handleAddEvent}>
            <FaPlus />
            Adicionar Evento
          </ActionButton>
        </div>
      </EventsHeader>

      {/* Controles de visualização do calendário */}
      <CalendarViewToggle>
        <ViewToggleButton
          active={calendarView === Views.DAY}
          onClick={() => handleViewChange(Views.DAY)}>
          Diário
        </ViewToggleButton>
        <ViewToggleButton
          active={calendarView === Views.WEEK}
          onClick={() => handleViewChange(Views.WEEK)}>
          Semanal
        </ViewToggleButton>
        <ViewToggleButton
          active={calendarView === Views.MONTH}
          onClick={() => handleViewChange(Views.MONTH)}>
          Mensal
        </ViewToggleButton>
      </CalendarViewToggle>

      {/* Filtros de eventos */}
      <EventFilters>
        <FilterButton
          active={filters.showMeetings}
          color="#4CAF50"
          onClick={() => toggleFilter('showMeetings')}>
          <FaFilter /> Reuniões
        </FilterButton>
        <FilterButton
          active={filters.showDeadlines}
          color="#F44336"
          onClick={() => toggleFilter('showDeadlines')}>
          <FaFilter /> Prazos
        </FilterButton>
        <FilterButton
          active={filters.showHolidays}
          color="#FF9800"
          onClick={() => toggleFilter('showHolidays')}>
          <FaFilter /> Feriados
        </FilterButton>
        <FilterButton
          active={filters.showPersonal}
          color="#9C27B0"
          onClick={() => toggleFilter('showPersonal')}>
          <FaFilter /> Pessoal
        </FilterButton>
      </EventFilters>

      {/* Calendário */}
      <CalendarContainer>
        <Calendar
          localizer={localizer}
          events={filteredEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600, marginBottom: '2rem' }}
          view={calendarView as any}
          date={date}
          onView={handleViewChange as any}
          onNavigate={handleNavigate}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleViewEvent as any}
          selectable
          popup
          eventPropGetter={eventPropGetter as any}
          messages={{
            day: 'Dia',
            week: 'Semana',
            month: 'Mês',
            previous: 'Anterior',
            next: 'Próximo',
            today: 'Hoje',
            agenda: 'Agenda',
            showMore: (total) => `+ ${total} mais`,
          }}
          components={{
            month: {
              dateHeader: ({ date, label }: { date: Date; label: string }) => {
                const isWeekend = [0, 6].includes(date.getDay());
                return (
                  <span style={{ color: isWeekend ? '#f44336' : 'inherit' }}>
                    {label}
                  </span>
                );
              }
            }
          }}
        />
      </CalendarContainer>

      {/* Modal de evento */}
      {isModalOpen && (
        <>
          {modalMode === 'view' ? (
            <div>
              <EventCreation
                initialData={currentEvent || undefined}
                onSubmit={() => { }}
                onCancel={handleCloseModal}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button
                  onClick={() => setModalMode('edit')}
                  style={{
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
                <button
                  onClick={handleCloseModal}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#ccc',
                    border: 'none',
                    borderRadius: 'var(--border-radius-sm)',
                    cursor: 'pointer'
                  }}
                >
                  Fechar
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
        </>
      )}

      {/* Notificações de feedback */}
      {notification.show && (
        <Notification
          message={notification.message}
          type={notification.type}
        />
      )}
    </Container>
  );
};

export default TeamPage;
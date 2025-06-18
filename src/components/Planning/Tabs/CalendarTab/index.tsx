// src/components/Planning/Tabs/CalendarTab/index.tsx
import React, { useState } from 'react';
import { FaPlus, FaBell, FaCalendarAlt, FaTimes } from 'react-icons/fa';
import { CalendarEvent, EventType } from '../../../../utils/types/CalendarEvent';
import { 
  Container, 
  CalendarHeader, 
  CalendarGrid, 
  EventForm,
  AddButton,
  Modal,
  ModalContent,
  CloseButton,
  DayEventsModal,
  DayEventItem
} from './styles';
import { useCalendar } from '../../../../contexts/CalendarContext';

const CalendarTab: React.FC = () => {
  const { 
    state: { events, dayEvents },
    addEvent,
    handleDayClick
  } = useCalendar();
  
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: '',
    end: '',
    type: 'class' as EventType,
    reminder: false,
    recurrenceEnd: '',
    recurrence: {
      frequency: 'daily' as const,
      interval: 1,
      endDate: ''
    },
    reminders: [],
  });
  
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleAddEvent = () => {
  const eventPayload: CalendarEvent = {
    id: Date.now().toString(),
    title: newEvent.title,
    type: newEvent.type,
    start: newEvent.start,
    end: newEvent.end,
    ...(newEvent.recurrence && {
      recurrence: {
        frequency: newEvent.recurrence.frequency,
        interval: 1,
        endDate: newEvent.recurrenceEnd || undefined
      }
    }),
    ...(newEvent.reminder && {
      reminders: newEvent.reminder
        ? [{ time: 10, unit: 'minutes' }] // Make sure this matches your CalendarEvent type
        : undefined
    })
  };

  addEvent(eventPayload);
  resetEventForm();
  setShowModal(false);
};

  const resetEventForm = () => {
    setNewEvent({
      title: '',
      start: '',
      end: '',
      type: 'class',
      reminder: false,
      recurrence: {
        frequency: 'daily',
        interval: 1,
        endDate: ''
      },
      recurrenceEnd: '',
      reminders: []
    });
  };

  const handleDaySelection = (day: number) => {
    const date = new Date();
    date.setDate(day);
    setSelectedDate(date);
    handleDayClick(day);
  };

  return (
    <Container>
      <CalendarHeader>
        <h1>
          <FaCalendarAlt /> Calendário Acadêmico
        </h1>
        <p>Organize suas atividades acadêmicas</p>
      </CalendarHeader>

      <CalendarGrid>
        {/* Seção do Calendário */}
        <div className="calendar-view">
          <div className="weekdays">
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
              <div key={day} className="weekday">{day}</div>
            ))}
          </div>
          
          <div className="days-grid">
            {Array.from({ length: 35 }, (_, i) => {
              const day = i - 3;
              const isCurrentMonth = day >= 0 && day < 30;
              const hasEvent = events.some(ev => {
                const evDay = new Date(ev.start).getDate();
                return evDay === day + 1 && isCurrentMonth;
              });

              return (
                <div 
                  key={i} 
                  className={`day-cell ${isCurrentMonth ? 'current-month' : ''} ${hasEvent ? 'has-event' : ''}`}
                  onClick={() => isCurrentMonth && handleDaySelection(day + 1)}
                >
                  {isCurrentMonth && (
                    <>
                      <span className="day-number">{day + 1}</span>
                      {hasEvent && (
                        <div className="event-indicators">
                          {events
                            .filter(ev => new Date(ev.start).getDate() === day + 1)
                            .slice(0, 3)
                            .map(ev => (
                              <span 
                                key={ev.id} 
                                className={`event-indicator ${ev.type.toLowerCase()}`}
                                title={ev.title}
                              >
                                {ev.title.substring(0, 1)}
                              </span>
                            ))}
                          {events.filter(ev => new Date(ev.start).getDate() === day + 1).length > 3 && (
                            <span className="event-indicator more" title="Mais eventos">
                              +{events.filter(ev => new Date(ev.start).getDate() === day + 1).length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Seção de Eventos Próximos */}
        <div className="events-sidebar">
          <div className="upcoming-events">
            <h3>
              <FaBell /> Próximos Eventos
            </h3>
            <div className="events-list">
              {events
                .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
                .slice(0, 5)
                .map(event => (
                  <div key={event.id} className="event-item">
                    <div className="event-date">
                      {new Date(event.start).toLocaleDateString('pt-BR', { 
                        day: '2-digit', 
                        month: '2-digit', 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                    <div className="event-title">{event.title}</div>
                    <div className={`event-type ${event.type.toLowerCase()}`}>
                      {event.type}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <AddButton onClick={() => setShowModal(true)}>
            <FaPlus /> Adicionar Evento
          </AddButton>
        </div>
      </CalendarGrid>

      {/* Modal de Adição de Evento */}
      {showModal && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={() => setShowModal(false)}>
              <FaTimes />
            </CloseButton>
            <h2>Adicionar Novo Evento</h2>
            <EventForm>
              <div className="form-group">
                <label>Título</label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={e => setNewEvent({...newEvent, title: e.target.value})}
                  placeholder="Nome do evento"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Data Início</label>
                  <input
                    type="datetime-local"
                    value={newEvent.start}
                    onChange={e => setNewEvent({...newEvent, start: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Data Fim</label>
                  <input
                    type="datetime-local"
                    value={newEvent.end}
                    onChange={e => setNewEvent({...newEvent, end: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Tipo de Evento</label>
                <select
                  value={newEvent.type}
                  onChange={e => setNewEvent({...newEvent, type: e.target.value as EventType})}
                >
                  <option value="class">Aula</option>
                  <option value="holiday">Feriado</option>
                  <option value="meeting">Reunião</option>
                  <option value="reminder">Lembrete</option>
                </select>
              </div>

              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  id="reminder"
                  checked={newEvent.reminder}
                  onChange={e => setNewEvent({...newEvent, reminder: e.target.checked})}
                />
                <label htmlFor="reminder">Adicionar lembrete</label>
              </div>

              <AddButton onClick={handleAddEvent}>
                <FaPlus /> Adicionar Evento
              </AddButton>
            </EventForm>
          </ModalContent>
        </Modal>
      )}

      {/* Modal de Eventos do Dia */}
      {selectedDate && (
        <DayEventsModal>
          <ModalContent>
            <CloseButton onClick={() => setSelectedDate(null)}>
              <FaTimes />
            </CloseButton>
            <h2>
              Eventos em {selectedDate.toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                day: '2-digit', 
                month: 'long' 
              })}
            </h2>
            
            {dayEvents.length > 0 ? (
              <div className="events-list">
                {dayEvents.map(event => (
                  <DayEventItem key={event.id} className={event.type.toLowerCase()}>
                    <div className="event-time">
                      {new Date(event.start).toLocaleTimeString('pt-BR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                      {event.end && (
                        <>
                          {' - '}
                          {new Date(event.end).toLocaleTimeString('pt-BR', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </>
                      )}
                    </div>
                    <div className="event-title">{event.title}</div>
                    <div className="event-type">{event.type}</div>
                    {event.reminders && (
                      <div className="event-reminder">
                        Lembrete: {event.reminders[0].time} {event.reminders[0].unit} antes
                      </div>
                    )}
                  </DayEventItem>
                ))}
              </div>
            ) : (
              <p>Nenhum evento agendado para este dia.</p>
            )}
            
            <AddButton onClick={() => {
              setSelectedDate(null);
              setShowModal(true);
              setNewEvent(prev => ({
                ...prev,
                start: selectedDate.toISOString().slice(0, 16),
                end: selectedDate.toISOString().slice(0, 16)
              }));
            }}>
              <FaPlus /> Adicionar Evento
            </AddButton>
          </ModalContent>
        </DayEventsModal>
      )}
    </Container>
  );
};

export default CalendarTab;
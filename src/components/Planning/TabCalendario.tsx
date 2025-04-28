import React, { useState } from 'react';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  padding: 1rem;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const CalendarSection = styled.div`
  width: 100%;
  background-color: white;
  padding: 1rem;
  border-radius: 0.375rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  
  @media (min-width: 768px) {
    width: 66.666667%;
  }
`;

const EventsSection = styled.div`
  width: 100%;
  background-color: white;
  padding: 1rem;
  border-radius: 0.375rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  
  @media (min-width: 768px) {
    width: 33.333333%;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
`;

const WeekdaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.25rem;
  margin-bottom: 0.5rem;
`;

const WeekdayCell = styled.div`
  text-align: center;
  font-weight: 500;
  font-size: 0.875rem;
  padding: 0.25rem 0;
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.25rem;
`;

const DayCell = styled.div<{ isCurrentMonth?: boolean; hasEvent?: boolean }>`
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  padding: 0.5rem;
  min-height: 3.5rem;
  background-color: ${props => props.isCurrentMonth ? 'white' : '#f3f4f6'};
  color: ${props => props.isCurrentMonth ? 'inherit' : '#9ca3af'};
  ${props => props.hasEvent && 'ring: 1px #60a5fa;'}
`;

const DayNumber = styled.div`
  text-align: right;
  font-size: 0.875rem;
`;

const EventIndicator = styled.div<{ type: string }>`
  font-size: 0.75rem;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 0.25rem;
  
  background-color: ${props => {
    switch (props.type) {
      case 'Feriado': return '#fee2e2';
      case 'Prazo': return '#ffedd5';
      default: return '#dbeafe';
    }
  }};
  
  color: ${props => {
    switch (props.type) {
      case 'Feriado': return '#b91c1c';
      case 'Prazo': return '#c2410c';
      default: return '#1d4ed8';
    }
  }};
`;

const EventsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const EventItem = styled.div`
  border-left: 4px solid #3b82f6;
  padding-left: 0.75rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
`;

const EventTitle = styled.div`
  font-weight: 500;
`;

const EventDate = styled.div`
  font-size: 0.875rem;
  color: #4b5563;
`;

const EventTagContainer = styled.div`
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;

const EventTag = styled.div<{ type: string }>`
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  
  background-color: ${props => {
    switch (props.type) {
      case 'Feriado': return '#fee2e2';
      case 'Prazo': return '#ffedd5';
      default: return '#dbeafe';
    }
  }};
  
  color: ${props => {
    switch (props.type) {
      case 'Feriado': return '#b91c1c';
      case 'Prazo': return '#c2410c';
      default: return '#1d4ed8';
    }
  }};
`;

const FormSection = styled.div`
  border-top: 1px solid #e5e7eb;
  padding-top: 0.75rem;
`;

const FormTitle = styled.h4`
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const FormFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
`;

const Button = styled.button`
  width: 100%;
  background-color: #2563eb;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  &:hover {
    background-color: #1d4ed8;
  }
`;

const TabCalendario = () => {
  const [events, setEvents] = useState([
    { id: 1, title: 'Início das Aulas', date: '2025-04-15', type: 'Evento' },
    { id: 2, title: 'Prazo de Matrícula', date: '2025-04-10', type: 'Prazo' },
    { id: 3, title: 'Feriado Nacional', date: '2025-04-21', type: 'Feriado' },
    { id: 4, title: 'Reunião de Colegiado', date: '2025-04-23', type: 'Reunião' }
  ]);
  
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    type: 'Evento'
  });
  
  const adicionarEvento = () => {
    if (newEvent.title && newEvent.date) {
      setEvents([
        ...events,
        {
          id: events.length + 1,
          ...newEvent
        }
      ]);
      
      setNewEvent({
        title: '',
        date: '',
        type: 'Evento'
      });
    }
  };

  return (
    <Container>
      <Title>Calendário Acadêmico</Title>
      
      <FlexContainer>
        <CalendarSection>
          <SectionTitle>Eventos do Calendário</SectionTitle>
          
          <WeekdaysGrid>
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(dia => (
              <WeekdayCell key={dia}>{dia}</WeekdayCell>
            ))}
          </WeekdaysGrid>
          
          <DaysGrid>
            {Array.from({ length: 35 }, (_, i) => {
              const day = i - 3; // Ajustando para começar em uma segunda
              const isCurrentMonth = day >= 0 && day < 30;
              const hasEvent = events.some(ev => {
                const evDay = new Date(ev.date).getDate();
                return evDay === day + 1 && isCurrentMonth;
              });
              
              return (
                <DayCell 
                  key={i} 
                  isCurrentMonth={isCurrentMonth}
                  hasEvent={hasEvent}
                >
                  {isCurrentMonth && (
                    <>
                      <DayNumber>{day + 1}</DayNumber>
                      {hasEvent && (
                        <div>
                          {events
                            .filter(ev => new Date(ev.date).getDate() === day + 1)
                            .map(ev => (
                              <EventIndicator 
                                key={ev.id} 
                                type={ev.type}
                              >
                                {ev.type}
                              </EventIndicator>
                            ))}
                        </div>
                      )}
                    </>
                  )}
                </DayCell>
              );
            })}
          </DaysGrid>
        </CalendarSection>
        
        <EventsSection>
          <SectionTitle>Próximos Eventos</SectionTitle>
          
          <EventsList>
            {events
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .map(event => (
                <EventItem key={event.id}>
                  <EventTitle>{event.title}</EventTitle>
                  <EventDate>
                    {new Date(event.date).toLocaleDateString('pt-BR')}
                  </EventDate>
                  <EventTagContainer>
                    <EventTag type={event.type}>
                      {event.type}
                    </EventTag>
                  </EventTagContainer>
                </EventItem>
              ))}
          </EventsList>
          
          <FormSection>
            <FormTitle>Adicionar Evento</FormTitle>
            <FormFields>
              <div>
                <Input 
                  type="text" 
                  placeholder="Título do evento"
                  value={newEvent.title}
                  onChange={e => setNewEvent({...newEvent, title: e.target.value})}
                />
              </div>
              <div>
                <Input 
                  type="date" 
                  value={newEvent.date}
                  onChange={e => setNewEvent({...newEvent, date: e.target.value})}
                />
              </div>
              <div>
                <Select 
                  value={newEvent.type}
                  onChange={e => setNewEvent({...newEvent, type: e.target.value})}
                >
                  <option value="Evento">Evento</option>
                  <option value="Prazo">Prazo</option>
                  <option value="Reunião">Reunião</option>
                  <option value="Feriado">Feriado</option>
                </Select>
              </div>
              <Button onClick={adicionarEvento}>
                Adicionar
              </Button>
            </FormFields>
          </FormSection>
        </EventsSection>
      </FlexContainer>
    </Container>
  );
};

export default TabCalendario;
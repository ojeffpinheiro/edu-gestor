import React, { useState } from 'react';

import { Container, Flex } from '../../../../styles/layoutUtils';
import { Title } from '../../../../styles/typography';
import { SectionTitle } from '../../../../styles/baseComponents';
import { FormSection, FormSectionTitle } from '../../../../styles/formControls';
import { Input, Select } from '../../../../styles/inputs';
import { Button } from '../../../../styles/buttons';

import { CalendarSection, DayCell, DayNumber, DaysGrid, EventDate, EventIndicator, EventItem, EventsList, EventsSection, EventTag, EventTagContainer, EventTitle, FormFields, WeekdayCell, WeekdaysGrid } from './styles';
/**
 * Componente de Calendário Acadêmico
 * @module CalendarTab
 * @description Exibe um calendário interativo com eventos e permite adição de novos
 * @returns {JSX.Element} A interface do calendário e gerenciamento de eventos
 */
const CalendarTab = () => {
  /**
   * Estado dos eventos do calendário
   * @type {Array<Event>}
   */
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
  
  /**
   * Adiciona um novo evento ao calendário
   * @function adicionarEvento
   * @returns {void}
   */
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

      <Flex>
        <CalendarSection>
          <SectionTitle>Eventos do Calendário</SectionTitle>

          <WeekdaysGrid>
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(dia => (
              <WeekdayCell key={dia}>{dia}</WeekdayCell>
            ))}
          </WeekdaysGrid>

          <DaysGrid>
            {/** Geração da grade do calendário */}
            {Array.from({ length: 35 }, (_, i) => {
              const day = i - 3; // Ajuste para começar em uma segunda-feira
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
            <FormSectionTitle>Adicionar Evento</FormSectionTitle>
            <FormFields>
              <div>
                <Input
                  type="text"
                  placeholder="Título do evento"
                  value={newEvent.title}
                  onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                />
              </div>
              <div>
                <Input
                  type="date"
                  value={newEvent.date}
                  onChange={e => setNewEvent({ ...newEvent, date: e.target.value })}
                />
              </div>
              <div>
                <Select
                  value={newEvent.type}
                  onChange={e => setNewEvent({ ...newEvent, type: e.target.value })}
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
      </Flex>
    </Container>
  );
};

export default CalendarTab;
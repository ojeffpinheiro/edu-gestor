import React, { useContext, useState } from 'react';

import { Container, Flex } from '../../../../styles/layoutUtils';
import { Title } from '../../../../styles/typography';
import { SectionTitle } from '../../../../styles/baseComponents';
import { FormSection, FormSectionTitle } from '../../../../styles/formControls';
import { Input, Select } from '../../../../styles/inputs';
import { Button } from '../../../../styles/buttons';

import { CalendarSection, DayCell, DayNumber, DaysGrid, EventDate, EventIndicator, EventItem, EventsList, EventsSection, EventTag, EventTagContainer, EventTitle, FormFields, WeekdayCell, WeekdaysGrid } from './styles';
import PlanningContext from '../../../../contexts/PlanningContext';
import { validateForm } from '../../../../utils/validationPlanning';

const CalendarTab = () => {
  const { state, dispatch } = useContext(PlanningContext);
  const { events } = state;
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    type: 'Evento'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const adicionarEvento = () => {
    const validationRules = {
      title: { required: true, minLength: 3 },
      date: { required: true },
      type: { required: true }
    };

    const { isValid, errors } = validateForm(newEvent, validationRules);
    setErrors(errors);

    if (!isValid) return;

    dispatch({
      type: 'ADD_EVENT',
      payload: {
        id: Date.now(),
        ...newEvent
      }
    });

    setNewEvent({
      title: '',
      date: '',
      type: 'Evento'
    });
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
import React, { useState } from 'react';
import {
  format,
  eachMonthOfInterval,
  startOfYear,
  endOfYear,
  isSameDay,
  getDaysInMonth,
  startOfMonth,
  addDays
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useCalendar } from '../../../../contexts/CalendarContext';
import { ErrorBoundary } from '../../../shared/ErrorBoundary';
import CalendarBase from '../../Base/CalendarBase';
import { FaTimes, FaFilter, FaEdit, FaTrash, FaCopy, FaCheck, FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { constants, EventTypeConfig } from '../../../../utils/consts';
import { CalendarEvent, EventType } from '../../../../utils/types/CalendarEvent';

import {
  DayCell,
  MonthsGrid,
  MonthContainer,
  MonthHeader,
  DaysGrid,
  WeekdayHeader,
  WeekdayCell,
  PopupContainer,
  EventItem,
  PopupHeader,
  PopupTitle,
  CloseButton,
  FiltersContainer,
  FilterButton,
  ActiveFiltersBadge,
  EventActions,
  ActionButton,
  FilterCategory,
  CategoryHeader,
  CategoryToggle,
  FilterGrid,
  FilterSectionHeader,
  FilterSection,
  FilterContent,
  DateRangeContainer,
  FilterList,
  FilterItem
} from './styles';
import { Checkbox } from '@mui/material';
import { SearchInput } from '../../../../styles/formControls';

const weekdays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

interface AnnualViewProps {
  eventTypes: EventTypeConfig[];
}

export interface FilterOptions {
  types: Record<EventType, boolean>;
  schools: Record<string, boolean>;
  locations: Record<string, boolean>;
  timeRange: {
    start: Date | null;
    end: Date | null;
  };
}

export interface EventCategory {
  id: string;
  name: string;
  types: EventTypeConfig[];
}

export interface CollapsedSectionsState {
  types: boolean;
  schools: boolean;
  locations: boolean;
  timeRange: boolean;
  allFilters: boolean;
  [key: `category_${string}`]: boolean;
}

const AnnualView: React.FC<AnnualViewProps> = ({ eventTypes }) => {
  const { currentDate, filterEvents, onSelectEvent, onPrevYear, onToday, onNextYear } = useCalendar();
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});
  const [schoolSearchTerm, setSchoolSearchTerm] = useState('');
  const [locationSearchTerm, setLocationSearchTerm] = useState('');

  // Get unique schools from events
  const allSchools = Array.from(new Set(filterEvents({}).map(event => event.schoolId).filter(Boolean)));
  const filteredSchools = allSchools.filter((school): school is string =>
    typeof school === 'string' && school.toLowerCase().includes(schoolSearchTerm.toLowerCase())
  );

  // Get unique locations from events
  const allLocations = Array.from(new Set(filterEvents({}).map(event => event.location).filter(Boolean)));
  const filteredLocations = allLocations.filter((location): location is string =>
    typeof location === 'string' && location.toLowerCase().includes(locationSearchTerm.toLowerCase())
  );

  // Estado inicial com todos os filtros ativos
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({
    types: eventTypes.reduce((acc, type) => ({ ...acc, [type.type]: true }), {} as Record<EventType, boolean>),
    schools: {},
    locations: {},
    timeRange: { start: null, end: null }
  });

  const [collapsedSections, setCollapsedSections] = useState<CollapsedSectionsState>({
    types: false,
    schools: false,
    locations: false,
    timeRange: false,
    allFilters: false
  });

  const eventCategories: EventCategory[] = [
    {
      id: 'academic',
      name: 'Acadêmicos',
      types: eventTypes.filter(type =>
        ['class', 'asynchronous_class', 'saturday_class', 'assessment',
          'results_delivery', 'external_assessment'].includes(type.type)
      )
    },
    {
      id: 'administrative',
      name: 'Administrativos',
      types: eventTypes.filter(type =>
        ['meeting', 'training', 'participatory_council', 'deadline'].includes(type.type)
      )
    },
    {
      id: 'personal',
      name: 'Pessoais',
      types: eventTypes.filter(type =>
        ['personal', 'holiday', 'break'].includes(type.type)
      )
    },
    {
      id: 'others',
      name: 'Outros Eventos',
      types: eventTypes.filter(type =>
        !['class', 'asynchronous_class', 'saturday_class', 'assessment',
          'results_delivery', 'external_assessment', 'meeting', 'training',
          'participatory_council', 'deadline', 'personal', 'holiday', 'break'].includes(type.type))
    }
  ];

  const countActiveFilters = () => {
    return Object.values(activeFilters).filter(Boolean).length;
  };

  const today = new Date();

  const months = eachMonthOfInterval({
    start: startOfYear(currentDate),
    end: endOfYear(currentDate)
  });

  const toggleFilter = (type: EventType) => {
    setActiveFilters(prev => ({
      ...prev,
      types: {
        ...prev.types,
        [type]: !prev.types[type]
      }
    }));
  };

  const getDayEvents = (day: Date) => {
    return filteredEvents.filter(event =>
      isSameDay(new Date(event.start), day)
    );
  };

  const getMainEventColor = (events: any[]) => {
    if (events.length === 0) return undefined;
    const eventType = eventTypes.find(et => et.type === events[0].type);
    return eventType?.color;
  };

  // Contador de filtros ativos por categoria
  const countActiveFiltersInCategory = (category: EventCategory) => {
    return category.types.filter(type => activeFilters.types[type.type]).length;
  };

  // Alternar todos os filtros
  const toggleAllFilters = (activate: boolean) => {
    const newFilters = { ...activeFilters };
    Object.keys(newFilters.types).forEach(key => {
      newFilters.types[key as EventType] = activate;
    });
    setActiveFilters(newFilters);
  };

  // Alternar todos os filtros de uma categoria
  const toggleCategoryFilters = (category: EventCategory, activate: boolean) => {
    const newFilters = { ...activeFilters };
    category.types.forEach(type => {
      newFilters.types[type.type] = activate;
    });
    setActiveFilters(newFilters);
  };

  const toggleAllTypeFilters = (activate: boolean) => {
    setActiveFilters(prev => ({
      ...prev,
      types: Object.keys(prev.types).reduce((acc, key) => ({
        ...acc,
        [key]: activate
      }), {} as Record<EventType, boolean>)
    }));
  };

  const toggleSchoolFilter = (school: string) => {
    setActiveFilters(prev => ({
      ...prev,
      schools: {
        ...prev.schools,
        [school]: !prev.schools[school]
      }
    }));
  };

  const toggleLocationFilter = (location: string) => {
    setActiveFilters(prev => ({
      ...prev,
      locations: {
        ...prev.locations,
        [location]: !prev.locations[location]
      }
    }));
  };

  const handleDateChange = (date: Date | null, field: 'start' | 'end') => {
    setActiveFilters(prev => ({
      ...prev,
      timeRange: {
        ...prev.timeRange,
        [field]: date
      }
    }));
  };

  // Função para filtrar eventos
  const getFilteredEvents = () => {
    return filterEvents({}).filter(event => {
      // Filtro por tipo
      if (!activeFilters.types[event.type]) return false;

      // Filtro por escola
      if (event.schoolId && activeFilters.schools[event.schoolId] === false) return false;

      // Filtro por localização
      if (event.location && activeFilters.locations[event.location] === false) return false;

      // Filtro por período
      const eventDate = new Date(event.start);
      if (activeFilters.timeRange.start && eventDate < activeFilters.timeRange.start) return false;
      if (activeFilters.timeRange.end && eventDate > activeFilters.timeRange.end) return false;

      return true;
    });
  };

  const handleEditEvent = (event: CalendarEvent) => {
    onSelectEvent(event);
    setSelectedDay(null);
  };

  const handleDuplicateEvent = (event: CalendarEvent) => {
    console.log('Duplicar evento:', event);
    // Implemente a lógica de duplicação aqui
    setSelectedDay(null);
  };

  const handleDeleteEvent = (event: CalendarEvent) => {
    console.log('Excluir evento:', event);
    // Implemente a lógica de exclusão aqui
    setSelectedDay(null);
  };

  const filteredEvents = getFilteredEvents();

  const renderFilters = () => (
    <FiltersContainer>
      <FilterSectionHeader
        onClick={() => setCollapsedSections(prev => ({
          ...prev,
          allFilters: !prev.allFilters
        }))}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: constants.spacing.sm }}>
          <FaFilter />
          <span>Filtros Avançados</span>
          <ActiveFiltersBadge>
            {Object.values(activeFilters.types).filter(Boolean).length}/{eventTypes.length} tipos
          </ActiveFiltersBadge>
        </div>
        <FaAngleDown
          style={{
            transform: collapsedSections.allFilters ? 'rotate(0deg)' : 'rotate(180deg)',
            transition: 'transform 0.2s'
          }}
        />
      </FilterSectionHeader>

      {!collapsedSections.allFilters && (
        <>
          {/* Filtro por Tipo */}
          <FilterSection>
            <FilterSectionHeader
              onClick={() => setCollapsedSections(prev => ({
                ...prev,
                types: !prev.types
              }))}
            >
              <span>Tipo de Evento</span>
              <FaAngleUp
                style={{
                  transform: collapsedSections.types ? 'rotate(0deg)' : 'rotate(180deg)',
                  transition: 'transform 0.2s'
                }}
              />
            </FilterSectionHeader>

            {!collapsedSections.types && (
              <FilterContent>
                <div style={{ display: 'flex', gap: constants.spacing.sm, marginBottom: constants.spacing.sm }}>
                  <ActionButton
                    onClick={() => toggleAllTypeFilters(true)}
                  >
                    <FaCheck /> Todos Tipos
                  </ActionButton>
                  <ActionButton
                    onClick={() => toggleAllTypeFilters(false)}
                  >
                    <FaTimes /> Nenhum Tipo
                  </ActionButton>
                </div>

                <FilterGrid>
                  {eventCategories.map(category => (
                    <FilterCategory key={category.id}>
                      <CategoryHeader
                        onClick={() => setCollapsedSections(prev => ({
                          ...prev,
                          [`category_${category.id}`]: !prev[`category_${category.id}`]
                        }))}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: constants.spacing.sm }}>
                          <span>{category.name}</span>
                          <small style={{ color: constants.colors.text.secondary }}>
                            ({countActiveFiltersInCategory(category)}/{category.types.length})
                          </small>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: constants.spacing.sm }}>
                          <CategoryToggle
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleCategoryFilters(category, true);
                            }}
                          >
                            <FaCheck size={10} />
                          </CategoryToggle>
                          <CategoryToggle
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleCategoryFilters(category, false);
                            }}
                          >
                            <FaTimes size={10} />
                          </CategoryToggle>
                          <FaAngleDown
                            size={12}
                            style={{
                              transform: collapsedSections[`category_${category.id}`] ? 'rotate(0deg)' : 'rotate(90deg)',
                              transition: 'transform 0.2s'
                            }}
                          />
                        </div>
                      </CategoryHeader>

                      {!collapsedSections[`category_${category.id}`] && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(11vw, 1fr))', gap: constants.spacing.sm, marginTop: constants.spacing.sm }}>
                          {category.types.map(({ type, color, name }) => (
                            <FilterButton
                              key={type}
                              color={color}
                              isActive={activeFilters.types[type]}
                              onClick={() => toggleFilter(type)}
                            >
                              {name}
                            </FilterButton>
                          ))}
                        </div>
                      )}
                    </FilterCategory>
                  ))}
                </FilterGrid>
              </FilterContent>
            )}
          </FilterSection>

          {/* Filtro por Escola */}
          <FilterSection>
            <FilterSectionHeader
              onClick={() => setCollapsedSections(prev => ({
                ...prev,
                schools: !prev.schools
              }))}
            >
              <span>Escola</span>
              <FaAngleUp
                style={{
                  transform: collapsedSections.schools ? 'rotate(0deg)' : 'rotate(180deg)',
                  transition: 'transform 0.2s'
                }}
              />
            </FilterSectionHeader>

            {!collapsedSections.schools && (
              <FilterContent>
                <SearchInput
                  placeholder="Buscar escola..."
                  onChange={(e) => setSchoolSearchTerm(e.target.value)}
                />
                <FilterList>
                  {filteredSchools.map(school => (
                    <FilterItem key={school}>
                      <Checkbox
                        checked={!!activeFilters.schools[school]}
                        onChange={() => toggleSchoolFilter(school)}
                      />
                      <span>{school}</span>
                    </FilterItem>
                  ))}
                </FilterList>
              </FilterContent>
            )}
          </FilterSection>

          {/* Filtro por Localização */}
          <FilterSection>
            <FilterSectionHeader
              onClick={() => setCollapsedSections(prev => ({
                ...prev,
                locations: !prev.locations
              }))}
            >
              <span>Localização</span>
              <FaAngleUp
                style={{
                  transform: collapsedSections.locations ? 'rotate(0deg)' : 'rotate(180deg)',
                  transition: 'transform 0.2s'
                }}
              />
            </FilterSectionHeader>

            {!collapsedSections.locations && (
              <FilterContent>
                <SearchInput
                  placeholder="Buscar local..."
                  onChange={(e) => setLocationSearchTerm(e.target.value)}
                />
                <FilterList>
                  {filteredLocations.map(location => (
                    <FilterItem key={location}>
                      <Checkbox
                        checked={!!activeFilters.locations[location]}
                        onChange={() => toggleLocationFilter(location)}
                      />
                      <span>{location}</span>
                    </FilterItem>
                  ))}
                </FilterList>
              </FilterContent>
            )}
          </FilterSection>

          {/* Filtro por Período */}
          <FilterSection>
            <FilterSectionHeader
              onClick={() => setCollapsedSections(prev => ({
                ...prev,
                timeRange: !prev.timeRange
              }))}
            >
              <span>Período</span>
              <FaAngleUp
                style={{
                  transform: collapsedSections.timeRange ? 'rotate(0deg)' : 'rotate(180deg)',
                  transition: 'transform 0.2s'
                }}
              />
            </FilterSectionHeader>

            {!collapsedSections.timeRange && (
              <FilterContent>
                <DateRangeContainer>
                  <DatePicker
                    selected={activeFilters.timeRange.start}
                    onChange={(date) => handleDateChange(date, 'start')}
                    selectsStart
                    startDate={activeFilters.timeRange.start}
                    endDate={activeFilters.timeRange.end}
                    placeholderText="Data inicial"
                  />
                  <span>até</span>
                  <DatePicker
                    selected={activeFilters.timeRange.end}
                    onChange={(date) => handleDateChange(date, 'end')}
                    selectsEnd
                    startDate={activeFilters.timeRange.start}
                    endDate={activeFilters.timeRange.end}
                    minDate={activeFilters.timeRange.start || undefined}
                    placeholderText="Data final"
                  />
                </DateRangeContainer>
              </FilterContent>
            )}
          </FilterSection>
        </>
      )}
    </FiltersContainer>
  );

  const renderMonth = (month: Date) => {
    const monthStart = startOfMonth(month);
    const daysInMonth = getDaysInMonth(month);
    const startDay = monthStart.getDay();

    const days = [];

    // Dias vazios no início do mês
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} />);
    }

    // Dias do mês
    for (let i = 1; i <= daysInMonth; i++) {
      const day = addDays(monthStart, i - 1);
      const dayEvents = getDayEvents(day);
      const eventColor = getMainEventColor(dayEvents);
      const isToday = isSameDay(day, today);

      days.push(
        <DayCell
          key={day.toString()}
          hasEvents={dayEvents.length > 0}
          isCurrentMonth={true}
          isToday={isToday}
          eventColor={eventColor}
          onClick={() => setSelectedDay(day)}
        >
          {i}
        </DayCell>
      );
    }

    return days;
  };

  return (
    <ErrorBoundary fallback={
      <div className="annual-view-error">
        <h3>Erro ao carregar visualização anual</h3>
        <p>Por favor, recarregue a página ou tente novamente mais tarde.</p>
      </div>
    }>
      <CalendarBase
        title={format(currentDate, "yyyy", { locale: ptBR })}
        onPrev={onPrevYear}
        onNext={onNextYear}
        onToday={onToday}
      >
        {renderFilters()}

        <MonthsGrid>
          {months.map(month => (
            <MonthContainer key={month.toString()}>
              <MonthHeader>
                {format(month, "MMMM", { locale: ptBR })}
              </MonthHeader>

              <WeekdayHeader>
                {weekdays.map((day, index) => (
                  <WeekdayCell key={index}>{day}</WeekdayCell>
                ))}
              </WeekdayHeader>

              <DaysGrid>
                {renderMonth(month)}
              </DaysGrid>
            </MonthContainer>
          ))}
        </MonthsGrid>

        {selectedDay && (
          <PopupContainer visible={!!selectedDay}>
            <PopupHeader>
              <PopupTitle>
                {format(selectedDay, 'PPPP', { locale: ptBR })}
              </PopupTitle>
              <CloseButton onClick={() => setSelectedDay(null)}>
                <FaTimes />
              </CloseButton>
            </PopupHeader>

            {getDayEvents(selectedDay).length > 0 ? (
              getDayEvents(selectedDay).map(event => {
                const eventType = eventTypes.find(c => c.type === event.type);
                const eventColor = eventType?.color || constants.colors.primary;

                return (
                  <EventItem
                    key={event.id}
                    style={{
                      borderLeft: `4px solid ${eventColor}`
                    }}
                  >
                    <EventActions>
                      <ActionButton
                        onClick={() => handleEditEvent(event)}
                        color={eventColor}
                      >
                        <FaEdit size={12} />
                      </ActionButton>
                      <ActionButton
                        onClick={() => handleDuplicateEvent(event)}
                        color={constants.colors.status.info}
                      >
                        <FaCopy size={12} />
                      </ActionButton>
                      <ActionButton
                        onClick={() => handleDeleteEvent(event)}
                        color={constants.colors.status.error}
                      >
                        <FaTrash size={12} />
                      </ActionButton>
                    </EventActions>
                    <div style={{ fontWeight: 'bold' }}>{event.title}</div>
                    {!event.isAllDay && (
                      <div>
                        {format(new Date(event.start), 'HH:mm')} - {format(new Date(event.end), 'HH:mm')}
                      </div>
                    )}
                    {event.location && <div>Local: {event.location}</div>}
                  </EventItem>
                );
              })
            ) : (
              <p>Nenhum evento neste dia</p>
            )}
          </PopupContainer>
        )}
      </CalendarBase>
    </ErrorBoundary>
  );
};

export default AnnualView;
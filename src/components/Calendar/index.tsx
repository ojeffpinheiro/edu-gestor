import React, { useState, useEffect } from 'react';

import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday
} from 'date-fns';

import { ptBR } from 'date-fns/locale';

import {
  CalendarContainer,
  CalendarHeader,
  MonthDisplay,
  NavigationButtons,
  NavButton,
  WeekdaysRow,
  WeekdayLabel,
  DaysGrid,
  DayCell,
  DayCellContent,
  EventIndicator,
  CalendarFooter,
  TodayButton
} from './styles';

interface Event {
  date: Date;
  title: string;
}
interface Props {
  onSelectDate?: (date: Date) => void;
  initialSelectedDate?: Date;
  events?: Event[];
  minSelectableDate?: Date;
  maxSelectableDate?: Date;
  className?: string;
}

const Calendar: React.FC<Props> = ({
  onSelectDate,
  initialSelectedDate,
  events = [],
  minSelectableDate,
  maxSelectableDate,
  className
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(initialSelectedDate || new Date());

  useEffect(() => {
    if (initialSelectedDate) {
      setSelectedDate(initialSelectedDate);
      setCurrentMonth(initialSelectedDate);
    }
  }, [initialSelectedDate]);

  const handleDateClick = (day: Date) => {
    if (!isDateDisabled(day) && isSameMonth(day, currentMonth)) {
      setSelectedDate(day);
      onSelectDate?.(day);
    }
  };

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    setSelectedDate(today);
    onSelectDate?.(today);
  };

  const hasEvent = (day: Date) => events.some(event => isSameDay(event.date, day));

  const isDateDisabled = (day: Date) =>
    (minSelectableDate && day < minSelectableDate) ||
    (maxSelectableDate && day > maxSelectableDate);

  const renderHeader = () => (
    <CalendarHeader>
      <MonthDisplay>{format(currentMonth, 'MMMM yyyy', { locale: ptBR })}</MonthDisplay>
      <NavigationButtons>
        <NavButton onClick={prevMonth} aria-label="Mês anterior">&lt;</NavButton>
        <NavButton onClick={nextMonth} aria-label="Próximo mês">&gt;</NavButton>
      </NavigationButtons>
    </CalendarHeader>
  );

  const renderWeekDays = () => (
    <WeekdaysRow>
      {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map(day => (
        <WeekdayLabel key={day}>{day}</WeekdayLabel>
      ))}
    </WeekdaysRow>
  );

  const renderDays = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const days = eachDayOfInterval({ start: startDate, end: endDate });

    return (
      <DaysGrid>
        {days.map(day => {
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isSelected = isSameDay(day, selectedDate);
          const dayHasEvent = hasEvent(day);
          const disabled = isDateDisabled(day);

          return (
            <DayCell
              key={day.toString()}
              isToday={isToday(day)}
              isSelected={isSelected}
              isOutsideMonth={!isCurrentMonth}
              disabled={disabled || !isCurrentMonth}
              onClick={() => handleDateClick(day)}
              aria-label={format(day, 'PPP', { locale: ptBR })}
              aria-selected={isSelected}
            >
              <DayCellContent>
                {format(day, 'd')}
                {dayHasEvent && <EventIndicator />}
              </DayCellContent>
            </DayCell>
          );
        })}
      </DaysGrid>
    );
  };

  const renderFooter = () => (
    <CalendarFooter>
      <TodayButton onClick={goToToday}>Hoje</TodayButton>
    </CalendarFooter>
  );

  return (
    <CalendarContainer className={className}>
      {renderHeader()}
      {renderWeekDays()}
      {renderDays()}
      {renderFooter()}
    </CalendarContainer>
  );
};

export default Calendar;

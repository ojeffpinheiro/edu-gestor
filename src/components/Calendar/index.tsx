import React, { useState, useEffect } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, isToday } from 'date-fns';
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

interface CalendarEvent {
  date: Date;
  title: string;
}

interface CalendarProps {
  onDateSelect?: (date: Date) => void;
  selectedDate?: Date;
  events?: CalendarEvent[];
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}

const Calendar: React.FC<CalendarProps> = ({
  onDateSelect,
  selectedDate,
  events = [],
  minDate,
  maxDate,
  className
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(selectedDate || new Date());

  useEffect(() => {
    if (selectedDate) {
      setCurrentDate(selectedDate);
      setCurrentMonth(selectedDate);
    }
  }, [selectedDate]);

  const onDateClick = (day: Date) => {
    setCurrentDate(day);
    if (onDateSelect) {
      onDateSelect(day);
    }
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    setCurrentDate(today);
    if (onDateSelect) {
      onDateSelect(today);
    }
  };

  const hasEvent = (day: Date) => {
    return events.some(event => isSameDay(event.date, day));
  };

  const isDisabled = (day: Date) => {
    if (minDate && day < minDate) return true;
    if (maxDate && day > maxDate) return true;
    return false;
  };

  const renderHeader = () => {
    return (
      <CalendarHeader>
        <MonthDisplay>
          {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
        </MonthDisplay>
        <NavigationButtons>
          <NavButton onClick={prevMonth} type="button" aria-label="Mês anterior">
            &lt;
          </NavButton>
          <NavButton onClick={nextMonth} type="button" aria-label="Próximo mês">
            &gt;
          </NavButton>
        </NavigationButtons>
      </CalendarHeader>
    );
  };

  const renderDays = () => {
    const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    
    return (
      <WeekdaysRow>
        {weekDays.map(day => (
          <WeekdayLabel key={day}>{day}</WeekdayLabel>
        ))}
      </WeekdaysRow>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateRange = eachDayOfInterval({
      start: startDate,
      end: endDate
    });

    return (
      <DaysGrid>
        {dateRange.map(day => {
          const formattedDate = format(day, 'd');
          const isCurrentMonth = isSameMonth(day, monthStart);
          const isSelectedDay = isSameDay(day, currentDate);
          const dayHasEvent = hasEvent(day);
          const disabled = isDisabled(day);

          return (
            <DayCell
              key={day.toString()}
              isToday={isToday(day)}
              isSelected={isSelectedDay}
              isOutsideMonth={!isCurrentMonth}
              onClick={() => !disabled && isCurrentMonth && onDateClick(day)}
              disabled={disabled || !isCurrentMonth}
              aria-label={format(day, 'PPP', { locale: ptBR })}
              aria-selected={isSelectedDay}
            >
              <DayCellContent>
                {formattedDate}
                {dayHasEvent && <EventIndicator />}
              </DayCellContent>
            </DayCell>
          );
        })}
      </DaysGrid>
    );
  };

  const renderFooter = () => {
    return (
      <CalendarFooter>
        <TodayButton onClick={goToToday} type="button">
          Hoje
        </TodayButton>
      </CalendarFooter>
    );
  };

  return (
    <CalendarContainer className={className}>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      {renderFooter()}
    </CalendarContainer>
  );
};

export default Calendar;
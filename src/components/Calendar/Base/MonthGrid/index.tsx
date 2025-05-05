import React from 'react'
import { addDays, format, getDaysInMonth, isSameDay, startOfMonth } from "date-fns";
import { EventTypeConfig } from "../../../../utils/consts";
import { CalendarEvent } from "../../../../utils/types/CalendarEvent";

import { DayCell, DaysGrid, MonthContainer, MonthHeader, WeekdayCell, WeekdayHeader } from '../../Views/AnnualView/styles';
import { ptBR } from 'date-fns/locale';

const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

// components/MonthGrid.tsx
interface MonthComponentProps {
    month: Date;
    onDayClick: (day: Date) => void;
    getDayEvents: (day: Date) => CalendarEvent[];
    eventTypes: EventTypeConfig[];
}

// Função auxiliar movida para fora do componente
function getMainEventColor(events: CalendarEvent[], eventTypes: EventTypeConfig[]) {
    if (events.length === 0) return undefined;
    const eventType = eventTypes.find(et => et.type === events[0].type);
    return eventType?.color;
}

const MonthGrid: React.FC<MonthComponentProps> = ({ month, onDayClick, getDayEvents, eventTypes }) => {
    const monthStart = startOfMonth(month);
    const daysInMonth = getDaysInMonth(month);
    const startDay = monthStart.getDay();
    const today = new Date();

    const days = [];

    // Dias vazios no início do mês
    for (let i = 0; i < startDay; i++) {
        days.push(<div key={`empty-${i}`} />);
    }

    // Dias do mês
    for (let i = 1; i <= daysInMonth; i++) {
        const day = addDays(monthStart, i - 1);
        const dayEvents = getDayEvents(day);
        const eventColor = getMainEventColor(dayEvents, eventTypes);
        const isToday = isSameDay(day, today);

        days.push(
            <DayCell
                key={day.toString()}
                hasEvents={dayEvents.length > 0}
                isCurrentMonth={true}
                isToday={isToday}
                eventColor={eventColor}
                onClick={() => onDayClick(day)}
            />
        );
    }

    return (
        <MonthContainer>
            <MonthHeader>
                {format(month, "MMMM", { locale: ptBR })}
            </MonthHeader>

            <WeekdayHeader>
                {weekdays.map((day, index) => (
                    <WeekdayCell key={index}>{day}</WeekdayCell>
                ))}
            </WeekdayHeader>

            <DaysGrid>
                {days}
            </DaysGrid>
        </MonthContainer>
    );
};

export default MonthGrid;
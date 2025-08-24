// utils/calendarUtils.ts
import {
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    startOfWeek,
    endOfWeek,
    isSameDay
  } from 'date-fns';
import { CalendarEvent } from '../types/academic/CalendarEvent';
  
  export const getDaysInMonthGrid = (date: Date) => {
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(date);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    return eachDayOfInterval({ start: startDate, end: endDate });
  };
  
  export const getDayEvents = (day: Date, events: CalendarEvent[]) => {
    return events.filter(event => isSameDay(new Date(event.start), day));
  };
  
  export const groupEventsByType = (events: CalendarEvent[]) => {
    return {
      allDay: events.filter(event => event.isAllDay),
      timed: events.filter(event => !event.isAllDay)
    };
  };
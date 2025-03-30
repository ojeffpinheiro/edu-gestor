import { useState, useEffect } from 'react';
import { CalendarEvent } from '../utils/types/CalendarEvent';
import { v4 as uuidv4 } from 'uuid';

// In a real application, this would come from an API
const MOCK_EVENTS: CalendarEvent[] = [
  {
    id: '1',
    title: 'Matemática - 9º ano',
    description: 'Aula sobre equações do segundo grau',
    start: new Date(new Date().setHours(10, 0, 0, 0)),
    end: new Date(new Date().setHours(11, 30, 0, 0)),
    type: 'class',
    location: 'Sala 101'
  },
  {
    id: '2',
    title: 'Reunião de pais',
    description: 'Reunião trimestral com os pais dos alunos',
    start: new Date(new Date().setHours(14, 0, 0, 0)),
    end: new Date(new Date().setHours(16, 0, 0, 0)),
    type: 'meeting',
    location: 'Auditório'
  },
  {
    id: '3',
    title: 'Entrega de projetos',
    description: 'Prazo final para entrega dos projetos de ciências',
    start: new Date(new Date().setDate(new Date().getDate() + 3)),
    end: new Date(new Date().setDate(new Date().getDate() + 3)),
    type: 'deadline',
    isAllDay: true
  }
];

interface UpdateEventParams {
  id: string;
  data: Partial<CalendarEvent>;
}

export const useCalendar = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [filter, setFilter] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        // Simulate API call with timeout
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // In a real app, this would be an API call
        setEvents(MOCK_EVENTS);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch events'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = filter
    ? events.filter(event => event.type === filter)
    : events;

  const createEvent = async (eventData: Partial<CalendarEvent>) => {
    try {
      const newEvent: CalendarEvent = {
        id: uuidv4(),
        title: eventData.title || 'Untitled Event',
        description: eventData.description || '',
        start: eventData.start || new Date(),
        end: eventData.end || new Date(),
        type: eventData.type || 'other',
        location: eventData.location,
        isAllDay: eventData.isAllDay || false
      };

      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setEvents(prevEvents => [...prevEvents, newEvent]);
      return newEvent;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create event'));
      throw err;
    }
  };

  const updateEvent = async ({ id, data }: UpdateEventParams) => {
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setEvents(prevEvents => 
        prevEvents.map(event => 
          event.id === id ? { ...event, ...data } : event
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update event'));
      throw err;
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setEvents(prevEvents => prevEvents.filter(event => event.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete event'));
      throw err;
    }
  };

  const filterByType = (type: string | null) => {
    setFilter(type);
  };

  return {
    events: filteredEvents,
    isLoading,
    error,
    createEvent,
    updateEvent,
    deleteEvent,
    filterByType
  };
};
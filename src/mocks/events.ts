import { CalendarEvent } from "../utils/types/CalendarEvent";

// In a real application, this would come from an API
export const MOCK_EVENTS: CalendarEvent[] = [
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
import { CalendarEvent, SchoolCalendar } from "../utils/types/CalendarEvent";

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

export const calendarEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Reunião de Planejamento Pedagógico',
    description: 'Reunião mensal com professores para definir o plano pedagógico.',
    start: '2025-05-05T09:00:00',
    end: '2025-05-05T11:00:00',
    type: 'meeting',
    location: 'Sala de Reuniões 1',
    participants: ['professor1', 'professor2', 'coord1'],
    color: '#3366CC',
    reminders: [{ time: 30, unit: 'minutes' }],
    schoolId: 'school-01'
  },
  {
    id: '2',
    title: 'Prova de Matemática - 8º Ano',
    description: 'Avaliação trimestral de Matemática.',
    start: '2025-05-10T08:00:00',
    end: '2025-05-10T10:00:00',
    type: 'asynchronous_class',
    location: 'Sala 204',
    classId: 'class-8A',
    gradeId: 'grade-8',
    color: '#FF9933',
    reminders: [{ time: 1, unit: 'days' }],
    attachments: ['https://link-para-avaliacao.com/prova8ano.pdf']
  },
  {
    id: '3',
    title: 'Feriado Escolar - Dia do Trabalhador',
    start: '2025-05-01',
    end: '2025-05-01',
    type: 'holiday',
    isAllDay: true,
    color: '#FF3333',
    schoolId: 'school-01'
  },
  {
    id: '4',
    title: 'Oficina de Robótica',
    description: 'Atividade extracurricular sobre robótica com os alunos do 9º ano.',
    start: '2025-05-15T14:00:00',
    end: '2025-05-15T16:30:00',
    type: 'assessment',
    location: 'Laboratório de Ciências',
    participants: ['aluno1', 'aluno2', 'prof-robotica'],
    classId: 'class-9B',
    gradeId: 'grade-9',
    reminders: [{ time: 2, unit: 'hours' }],
    color: '#00CC99'
  },
  {
    id: '5',
    title: 'Aula de Revisão de Português',
    start: '2025-05-07T10:00:00',
    end: '2025-05-07T11:30:00',
    type: 'class',
    recurrence: {
      frequency: 'weekly',
      interval: 1,
      endDate: '2025-06-30'
    },
    participants: ['aluno3', 'aluno4', 'prof-portugues'],
    classId: 'class-7A',
    gradeId: 'grade-7',
    color: '#9933FF',
    reminders: [{ time: 15, unit: 'minutes' }]
  }
];

export const schoolCalendar: SchoolCalendar = {
  academicYear: {
    start: new Date('2025-02-05'),
    end: new Date('2025-12-20'),
  },
  periods: [
    {
      id: 'period-1',
      name: '1º Bimestre',
      start: new Date('2025-02-05'),
      end: new Date('2025-04-15'),
      type: 'bimester',
    },
    {
      id: 'period-2',
      name: '2º Bimestre',
      start: new Date('2025-04-16'),
      end: new Date('2025-06-30'),
      type: 'bimester',
    },
    {
      id: 'period-3',
      name: '3º Bimestre',
      start: new Date('2025-08-01'),
      end: new Date('2025-10-10'),
      type: 'bimester',
    },
    {
      id: 'period-4',
      name: '4º Bimestre',
      start: new Date('2025-10-11'),
      end: new Date('2025-12-20'),
      type: 'bimester',
    },
  ],
  events: calendarEvents,
};
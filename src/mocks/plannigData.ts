import { CalendarEvent } from "../types/academic/CalendarEvent";
import { LessonPlan } from "../types/academic/DidacticSequence";
import { GradeSettings, Holiday, LearningObjective, Lesson, LessonPlanTemplate, NonSchoolDay, Session, Task, Team } from "../types/academic/Planning";

const mockTasks: Task[] = [
  { id: 1, text: "Preparar material didático", completed: false },
  { id: 2, text: "Corrigir provas", completed: true },
];

// Lesson
const mockLessons: Lesson[] = [
  {
    id: 1,
    team: "Turma A",
    day: "Segunda",
    timeSlot: "08:00 - 09:00",
    discipline: "Matemática",
    shift: 'Manhã',
    order: 1,
  },
  {
    id: 2,
    team: "Turma B",
    day: "Quarta",
    timeSlot: "10:00 - 11:00",
    discipline: "História",
    shift: 'Tarde',
  },
];

// Team
const mockTeams: Team[] = [
  {
    id: 1,
    name: 'Equipe Alpha',
    session: Session.MORNING,
    numStudent: 25,
    gradeLevel: '8º ano',
    specificRequirements: 'Necessita apoio com inclusão digital',
    studentList: 'João, Maria, Lucas, Ana, Pedro, ...',
    schedule: [
      {
        id: 101,
        team: 'Equipe Alpha',
        day: 'Segunda',
        timeSlot: '08:00 - 09:30',
        discipline: 'Matemática',
        shift: Session.MORNING,
        room: 'Sala 101',
        classGroup: '8A',
        order: 1
      },
      {
        id: 102,
        team: 'Equipe Alpha',
        day: 'Quarta',
        timeSlot: '10:00 - 11:30',
        discipline: 'Ciências',
        shift: Session.MORNING,
        room: 'Sala 102',
        classGroup: '8A',
        order: 2
      }
    ],
    learningObjectives: [
      {
        id: 201,
        description: 'Compreender frações e porcentagens',
        completed: false
      },
      {
        id: 202,
        description: 'Aplicar o método científico em experimentos',
        completed: true
      }
    ]
  },
  {
    id: 2,
    name: 'Equipe Beta',
    session: Session.AFTERNOON,
    numStudent: 30,
    gradeLevel: '9º ano',
    specificRequirements: 'Necessita suporte psicológico',
    studentList: 'Carlos, Bruna, Rafael, Larissa, Tiago, ...',
    schedule: [
      {
        id: 103,
        team: 'Equipe Beta',
        day: 'Terça',
        timeSlot: '14:00 - 15:30',
        discipline: 'História',
        shift: Session.AFTERNOON,
        room: 'Sala 201',
        classGroup: '9B',
        order: 1
      },
      {
        id: 104,
        team: 'Equipe Beta',
        day: 'Quinta',
        timeSlot: '15:45 - 17:15',
        discipline: 'Geografia',
        shift: Session.AFTERNOON,
        room: 'Sala 202',
        classGroup: '9B',
        order: 2
      }
    ],
    learningObjectives: [
      {
        id: 203,
        description: 'Entender os eventos da Segunda Guerra Mundial',
        completed: true
      },
      {
        id: 204,
        description: 'Analisar mapas políticos e físicos',
        completed: false
      }
    ]
  }
];

// NonSchoolDay
const mockNonSchoolDays: NonSchoolDay[] = [
  {
    id: 1,
    description: "Reunião Pedagógica",
    date: "2025-08-15",
    affectsAllTeams: false,
    affectedTeams: [1],
  },
  {
    id: 2,
    description: "Capacitação de professores",
    date: "2025-09-10",
    affectsAllTeams: true,
  },
];

// Holiday (extends Event)
const mockHolidays: Holiday[] = [
  {
    id: 1,
    title: "Dia da Independência",
    date: new Date("2025-09-07"),
    description: "Feriado nacional",
    type: "event",
    recurring: true,
    recurrencePattern: "anual",
  },
  {
    id: 2,
    title: "Natal",
    date: new Date("2025-12-25"),
    description: "Feriado religioso",
    type: "event",
    recurring: true,
  },
];


// GradeSettings
const mockGradeSettings: GradeSettings[] = [
  {
    id: "grade-5",
    gradeLevel: "5º ano",
    curriculum: "BNCC",
    specificRequirements: "Atenção especial em matemática e português",
  },
];

// LessonPlanTemplate
const mockLessonPlanTemplates: LessonPlanTemplate[] = [
  {
    id: "template-1",
    name: "Plano de Matemática - Básico",
    template: {
      // Exemplo parcial
      objectives: ["Introduzir frações"],
    },
    applicableGrades: ["5º ano", "6º ano"],
  },
];

// LearningObjective
const mockLearningObjectives: LearningObjective[] = [
  { id: 1, description: "Resolver problemas com frações", completed: false },
  { id: 2, description: "Interpretar gráficos", completed: true },
];

const mockCalendarEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Aula de Matemática",
    description: "Revisão de frações e decimais",
    start: new Date("2025-06-17T08:00:00"),
    end: new Date("2025-06-17T09:30:00"),
    type: "class",
    location: "Sala 5",
    classId: "turmaA",
    gradeId: "5ano",
    color: "#4CAF50",
  },
  {
    id: "2",
    title: "Prova de Ciências",
    start: new Date("2025-06-20T10:00:00"),
    end: new Date("2025-06-20T11:00:00"),
    type: "assessment",
    isAllDay: false,
    reminders: [{ time: 1, unit: "days" }],
    schoolId: "escola123",
    classId: "turmaB",
    color: "#FF9800",
  },
  {
    id: "3",
    title: "Feriado - Independência do Brasil",
    description: "Dia da Independência",
    start: new Date("2025-09-07"),
    end: new Date("2025-09-07"),
    type: "holiday",
    isAllDay: true,
    color: "#2196F3",
  },
  {
    id: "4",
    title: "Intervalo",
    start: new Date("2025-06-18T10:00:00"),
    end: new Date("2025-06-18T10:20:00"),
    type: "break",
    color: "#9E9E9E",
  },
  {
    id: "5",
    title: "Reunião de Pais",
    description: "Apresentação dos resultados do 1º bimestre",
    start: new Date("2025-07-01T19:00:00"),
    end: new Date("2025-07-01T20:30:00"),
    type: "meeting",
    participants: ["pais", "professores"],
    location: "Auditório Principal",
    color: "#3F51B5",
  },
  {
    id: "6",
    title: "Capacitação Docente",
    start: "2025-08-10T08:00:00",
    end: "2025-08-10T12:00:00",
    type: "training",
    participants: ["professores"],
    recurrence: {
      frequency: "monthly",
      interval: 1,
      endDate: "2025-12-10",
    },
    color: "#009688",
  },
  {
    id: "7",
    title: "Semana Temática - Meio Ambiente",
    start: new Date("2025-10-21"),
    end: new Date("2025-10-25"),
    type: "thematic_week",
    isAllDay: true,
    color: "#8BC34A",
  },
  {
    id: "8",
    title: "Conselho Participativo Escolar",
    start: new Date("2025-06-28T18:00:00"),
    end: new Date("2025-06-28T20:00:00"),
    type: "participatory_council",
    location: "Sala de Reuniões",
    participants: ["gestão", "representantes"],
    color: "#673AB7",
  },
  {
    id: "9",
    title: "Prazo final para entrega de atividades",
    start: "2025-06-30",
    end: "2025-06-30",
    type: "deadline",
    isAllDay: true,
    reminders: [{ time: 2, unit: "days" }],
    color: "#F44336",
  },
  {
    id: "10",
    title: "Aula aos sábados - Reforço",
    start: new Date("2025-07-12T09:00:00"),
    end: new Date("2025-07-12T11:00:00"),
    type: "saturday_class",
    color: "#795548",
  },
];

const mockLessonPlans: LessonPlan[] = [
  {
    id: "lp-001",
    sequenceId: "seq-001",
    title: "Frações na prática",
    description: "Plano de aula para introdução e prática de frações com atividades cotidianas.",
    duration: 50,
    discipline: "Matemática",
    applicationWeek: "2025-W22",
    status: "Planejada",
    classGroup: "Turma A - 5º ano",
    type: "Aula",
    objectives: [
      "Compreender o conceito de fração",
      "Relacionar frações com situações do cotidiano"
    ],
    skills: ["EF05MA07", "EF05MA08"],
    bnccCodes: ["EF05MA07", "EF05MA08"],
    developedSkills: [
      "Identificar frações em contextos reais",
      "Resolver problemas com frações"
    ],
    learningObjectives: [
      "Entender o significado de metade, terço e quarto",
      "Aplicar frações em medidas culinárias"
    ],
    methodologies: [
      "Aprendizagem ativa",
      "Resolução de problemas",
      "Discussões em grupo"
    ],
    knowledgeObjects: [
      {
        title: "Frações",
        subtitles: ["Metade", "Terço", "Quarto"]
      }
    ],
    necessaryResources: [
      "Quadro branco",
      "Material concreto (medidores de cozinha)",
      "Folhas de atividade"
    ],
    contentExplanation: "Serão apresentados exemplos práticos de frações utilizando alimentos e utensílios domésticos.",
    solvedExercises: [
      {
        statement: "Se João comeu 1/2 de uma pizza e Maria 1/4, quem comeu mais?",
        solution: "João comeu mais, pois 1/2 > 1/4."
      }
    ],
    evaluation: {
      type: "Formativa",
      criteria: ["Participação nas atividades", "Resolução correta de exercícios"],
      weight: 1,
      registrationText: "Registro da participação e desempenho durante a aula.",
      exercises: ["Identificar frações em imagens", "Resolver problemas simples"]
    },
    createdAt: "2025-06-01T10:00:00.000Z",
    updatedAt: "2025-06-10T08:30:00.000Z"
  },
  {
    id: "lp-002",
    sequenceId: "seq-002",
    title: "O corpo humano: sistema digestório",
    description: "Exploração do sistema digestivo humano com uso de vídeos e esquemas.",
    duration: 60,
    discipline: "Ciências",
    applicationWeek: "2025-W23",
    status: "Aplicada",
    classGroup: "Turma B - 6º ano",
    type: "Aula",
    objectives: [
      "Identificar os órgãos do sistema digestório",
      "Compreender o processo de digestão dos alimentos"
    ],
    skills: ["EF06CI02"],
    bnccCodes: ["EF06CI02"],
    developedSkills: ["Reconhecer funções dos órgãos do sistema digestório"],
    learningObjectives: [
      "Localizar e nomear os principais órgãos do sistema digestivo",
      "Entender o caminho dos alimentos no corpo"
    ],
    methodologies: [
      "Aula expositiva com vídeo",
      "Análise de esquema corporal",
      "Discussão em grupo"
    ],
    knowledgeObjects: [
      {
        title: "Sistema Digestório",
        subtitles: ["Boca", "Esôfago", "Estômago", "Intestinos"]
      }
    ],
    necessaryResources: [
      "Computador com projetor",
      "Vídeo educativo",
      "Cartazes e esquemas anatômicos"
    ],
    contentExplanation: "Apresentação dos órgãos e suas funções, seguida de atividades com esquemas ilustrativos.",
    solvedExercises: [
      {
        statement: "Qual a função do estômago na digestão?",
        solution: "Realizar a digestão química e mecânica dos alimentos."
      }
    ],
    evaluation: {
      type: "Somativa",
      criteria: ["Compreensão do conteúdo", "Participação em aula"],
      weight: 2,
      registrationText: "Avaliação com base na participação e respostas às perguntas em grupo."
    },
    createdAt: "2025-06-05T09:00:00.000Z",
    updatedAt: "2025-06-12T15:15:00.000Z"
  }
];


export { 
  mockGradeSettings, mockHolidays, mockLessonPlanTemplates, 
  mockLearningObjectives, mockTasks, mockLessons,
  mockNonSchoolDays, mockTeams, mockCalendarEvents,
  mockLessonPlans
};
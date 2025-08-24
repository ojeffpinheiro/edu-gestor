import { Event } from "../types/shared/Event";
import { ClassSummaryType, SubjectSummaryType } from "../types/ui/planningDashboard";

const planejamentoPorSerie = [
    { serie: '6º ano', completo: 85, parcial: 10, pendente: 5 },
    { serie: '7º ano', completo: 90, parcial: 5, pendente: 5 },
    { serie: '8º ano', completo: 80, parcial: 15, pendente: 5 },
    { serie: '9º ano', completo: 95, parcial: 5, pendente: 0 }
];
const planejamentoPorTurma = [
    { turma: '101', completo: 100, pendente: 0 },
    { turma: '301', completo: 100, pendente: 0 },
    { turma: '202', completo: 85, pendente: 15 },
    { turma: '203', completo: 50, pendente: 50 },
    { turma: '204', completo: 10, pendente: 90 }
];

const notificacoes = [
    {
        id: 1,
        tipo: 'prazo',
        mensagem: 'Entrega de notas do 1º bimestre até 15/04',
        data: '2025-04-15'
    },
    {
        id: 2,
        tipo: 'lembrete',
        mensagem: 'Reunião pedagógica amanhã às 14h',
        data: '2025-03-25'
    },
    {
        id: 3,
        tipo: 'evento',
        mensagem: 'Feira de ciências em 10 dias',
        data: '2025-04-03'
    }
];

const proximasAtividades = [
    {
        id: 1,
        titulo: 'Avaliação de Matemática - 9º ano A',
        data: '2025-03-26',
        horario: '10:00'
    },
    {
        id: 2,
        titulo: 'Entrega de trabalho - 8º ano B',
        data: '2025-03-28',
        horario: '08:00'
    },
    {
        id: 3,
        titulo: 'Aula prática de Ciências - 7º ano C',
        data: '2025-03-31',
        horario: '13:30'
    }
];

const resumoPorDisciplina: SubjectSummaryType[] = [
    {
        "subject": "Matemática",
        "classesTaught": 25,
        "classesPlanned": 30,
        "evaluations": 3,
        "progress": "83%"
    },
    {
        "subject": "História",
        "classesTaught": 18,
        "classesPlanned": 25,
        "evaluations": 2,
        "progress": "72%"
    },
    {
        "subject": "Biologia",
        "classesTaught": 20,
        "classesPlanned": 20,
        "evaluations": 4,
        "progress": "100%"
    },
    {
        "subject": "Física",
        "classesTaught": 12,
        "classesPlanned": 20,
        "evaluations": 1,
        "progress": "60%"
    },
    {
        "subject": "Português",
        "classesTaught": 28,
        "classesPlanned": 30,
        "evaluations": 3,
        "progress": "93%"
    }
];

const resumoPorTurma: ClassSummaryType[] = [
    {
      "className": "Turma A - 1º Ano",
      "students": 30,
      "averageAttendance": "85%",
      "averagePerformance": "78%",
      "pendingEvaluations": 2
    },
    {
      "className": "Turma B - 2º Ano",
      "students": 28,
      "averageAttendance": "90%",
      "averagePerformance": "82%",
      "pendingEvaluations": 1
    },
    {
      "className": "Turma C - 3º Ano",
      "students": 32,
      "averageAttendance": "76%",
      "averagePerformance": "69%",
      "pendingEvaluations": 4
    },
    {
      "className": "Turma D - 1º Ano",
      "students": 27,
      "averageAttendance": "92%",
      "averagePerformance": "88%",
      "pendingEvaluations": 0
    },
    {
      "className": "Turma E - 2º Ano",
      "students": 25,
      "averageAttendance": "81%",
      "averagePerformance": "73%",
      "pendingEvaluations": 3
    }  
];

const eventInital: Event[] = [
    {
        id: 1,
        title: 'Prova Bimestral',
        date: new Date(),
        type: 'assessment',
        description: 'Avaliação de conteúdos do bimestre'
    },
    {
        id: 2,
        title: 'Entrega de Trabalho',
        date: new Date(),
        type: 'activity',
        description: 'Entrega do trabalho em grupo sobre o tema estudado'
    },
    {
        id: 3,
        title: 'Feira de Ciências',
        date: new Date(),
        type: 'event',
        description: 'Apresentação dos projetos na feira de ciências'
    }
]

export {
    resumoPorTurma,
    notificacoes,
    planejamentoPorSerie,
    planejamentoPorTurma,
    proximasAtividades,
    resumoPorDisciplina,
    eventInital
}
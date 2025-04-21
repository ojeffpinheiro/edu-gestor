import { Event } from "../utils/types/Event";

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

const resumoPorDisciplina = [
    { Disciplina: 'Matemática', Turmas: 5, Aulas: 20, Planejadas: 18, Pendentes: 2 },
    { Disciplina: 'Português', Turmas: 4, Aulas: 16, Planejadas: 16, Pendentes: 0 },
    { Disciplina: 'Ciências', Turmas: 3, Aulas: 12, Planejadas: 10, Pendentes: 2 }
];

const resumoPorTurma = [
    { turma: '9º ano A', disciplinas: 8, aulas: 32, planejadas: 30, pendentes: 2 },
    { turma: '8º ano B', disciplinas: 8, aulas: 32, planejadas: 29, pendentes: 3 },
    { turma: '7º ano C', disciplinas: 8, aulas: 32, planejadas: 28, pendentes: 4 }
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
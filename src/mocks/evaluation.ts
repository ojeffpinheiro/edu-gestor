import { Evaluation } from "../utils/types/AssessmentEvaluation";
import { EvaluationCriteria, EvaluationCriterion } from "../utils/types/RubricCriteria";

export const evaluationCriteria: EvaluationCriteria[] = [
    { id: "1", name: "Participação", description: "Envolvimento ativo nas atividades", weight: 30 },
    { id: "2", name: "Conhecimento Técnico", description: "Domínio do conteúdo apresentado", weight: 40 },
    { id: "3", name: "Entrega de Atividades", description: "Conclusão das tarefas no prazo", weight: 30 }
]

export const initialEvaluationCriteria: EvaluationCriterion[] = [
    {
        id: "1",
        name: "Organização das Ideias",
        weight: 2,
        comment: "",
        isExpanded: false,
        options: [
            { id: "1-1", description: "Completo. O orador transmite claramente a ideia principal e fornece detalhes que são relevantes e interessantes." },
            { id: "1-2", description: "Geralmente completo. O orador transmite a ideia principal, mas não fornece detalhes relevantes adequados para apoiá-la." },
            { id: "1-3", description: "Um tanto incompleto. A ideia principal não é clara. Muitos detalhes são irrelevantes." },
            { id: "1-4", description: "Incompleto. A ideia principal não é clara. Os detalhes são inexistentes ou aleatórios e irrelevantes." }
        ]
    },
    {
        id: "2",
        name: "Compreensibilidade",
        weight: 2,
        comment: "",
        isExpanded: false,
        options: [
            { id: "2-1", description: "Compreensível. O orador usa linguagem apropriada para transmitir a ideia principal deste item claramente." },
            { id: "2-2", description: "Geralmente compreensível. A mensagem não é clara em alguns lugares. A linguagem usada é inadequada para tornar a mensagem totalmente clara." },
            { id: "2-3", description: "Um tanto incompreensível. A mensagem só poderia ser entendida por um falante nativo simpático. A linguagem usada é frequentemente inapropriada ou distorcida pela interferência do inglês." },
            { id: "2-4", description: "Incompreensível. A mensagem não pode ser entendida." }
        ]
    },
    {
        id: "3",
        name: "Fluência",
        weight: 2,
        comment: "",
        isExpanded: false,
        options: [
            { id: "3-1", description: "O aluno fala muito claramente, sem hesitação. A pronúncia e a entonação soam naturais." },
            { id: "3-2", description: "O aluno fala com alguma hesitação. Problemas com pronúncia e entonação não impedem a comunicação." },
            { id: "3-3", description: "O aluno hesita frequentemente. Problemas com pronúncia e entonação distorcem o significado e inibem a comunicação em alguns casos." },
            { id: "3-4", description: "Hesitações frequentes e problemas extremos com a pronúncia causam interrupções na comunicação." }
        ]
    },
    {
        id: "4",
        name: "Precisão",
        weight: 2,
        comment: "",
        isExpanded: false,
        options: [
            { id: "4-1", description: "Funções, gramática e vocabulário são usados corretamente." },
            { id: "4-2", description: "Pequenos problemas de uso não distorcem o significado nem inibem a comunicação." },
            { id: "4-3", description: "Problemas no uso distorcem significativamente o significado e inibem a comunicação em alguns casos." },
            { id: "4-4", description: "Problemas no uso distorcem completamente o significado e inibem as comunicações." }
        ]
    },
    {
        id: "5",
        name: "Esforço",
        weight: 2,
        comment: "",
        isExpanded: false,
        options: [
            { id: "5-1", description: "Excede os requisitos mínimos da tarefa e fornece evidências de contribuição ponderada." },
            { id: "5-2", description: "Atende aos requisitos mínimos da tarefa e fornece evidências de contribuição ponderada." },
            { id: "5-3", description: "Atende aos requisitos mínimos da tarefa, mas não demonstra evidências de contribuição ponderada." },
            { id: "5-4", description: "Não cumpre os requisitos mínimos da tarefa nem fornece evidências de contribuição ponderada." }
        ]
    }
]

export const mockEvaluations: Evaluation[] = [
    {
        id: 2,
        name: 'Avaliação do 2º Trimestre',
        trimester: 2,
        passingGrade: 6,
        formula: 'standard',
        parts: [
            { id: 'p1', name: 'Teórico', weight: 50, maxScore: 10 },
            { id: 'p2', name: 'Prático', weight: 50, maxScore: 10 }
        ],
        tools: [
            { id: 't1', name: 'Prova escrita', partId: 'p1', weight: 30, maxScore: 10 },
            { id: 't2', name: 'Redação', partId: 'p1', weight: 20, maxScore: 10 },
            { id: 't3', name: 'Experimento', partId: 'p2', weight: 35, maxScore: 10 },
            { id: 't4', name: 'Seminário', partId: 'p2', weight: 15, maxScore: 10 }
        ],
        school: '9 de Out',
        series: 'Ensino Médio 1 ano',
        class: 'A',
        objective: 'Avaliar conhecimentos do segundo trimestre',
        contents: 'Leis de Newton, Trabalho e Energia, Quantidade de Movimento',
        evaluationCriteria: 'Correção conceitual, clareza na resolução dos problemas, participação nas atividades práticas.',
        subject: 'Física',
        record: 'Notas registradas no sistema acadêmico',
        applicationDate: new Date('2025-06-30'),
        type: 'Avaliação trimestral',
        status: 'PLANEJADA',
        resources: [
            { id: 1, name: 'Calculadora científica', quantity: 10 },
            { id: 2, name: 'Kit de experimento de forças', quantity: 5 }
        ]
    },
    {
        id: 3,
        name: 'Avaliação do 3º Trimestre',
        trimester: 3,
        passingGrade: 6,
        formula: 'standard',
        parts: [
            { id: 'p1', name: 'Teórico', weight: 40, maxScore: 10 },
            { id: 'p2', name: 'Prático', weight: 60, maxScore: 10 }
        ],
        tools: [
            { id: 't1', name: 'Teste objetivo', partId: 'p1', weight: 20, maxScore: 10 },
            { id: 't2', name: 'Estudo de caso', partId: 'p1', weight: 20, maxScore: 10 },
            { id: 't3', name: 'Projeto interdisciplinar', partId: 'p2', weight: 40, maxScore: 10 },
            { id: 't4', name: 'Apresentação oral', partId: 'p2', weight: 20, maxScore: 10 }
        ],
        school: '9 de Out',
        series: 'Ensino Médio 1 ano',
        class: 'A',
        objective: 'Avaliar conhecimentos do terceiro trimestre',
        contents: 'Ondulatória, Termodinâmica, Óptica',
        evaluationCriteria: 'Demonstração do entendimento dos conceitos, aplicação em situações reais, organização e argumentação nas respostas.',
        subject: 'Física',
        record: 'Notas registradas no diário do professor',
        applicationDate: new Date('2025-09-30'),
        type: 'Avaliação trimestral',
        status: 'PLANEJADA',
        resources: [
            { id: 3, name: 'Laser para experimentos', quantity: 2 },
            { id: 4, name: 'Kit de lentes e espelhos', quantity: 4 }
        ]
    },
    {
        id: 4,
        name: 'Avaliação Final',
        trimester: 4,
        passingGrade: 6,
        formula: 'standard',
        parts: [
            { id: 'p1', name: 'Prova Integrada', weight: 70, maxScore: 10 },
            { id: 'p2', name: 'Projeto Final', weight: 30, maxScore: 10 }
        ],
        tools: [
            { id: 't1', name: 'Prova dissertativa', partId: 'p1', weight: 50, maxScore: 10 },
            { id: 't2', name: 'Análise de problemas', partId: 'p1', weight: 20, maxScore: 10 },
            { id: 't3', name: 'Trabalho de conclusão', partId: 'p2', weight: 30, maxScore: 10 }
        ],
        school: '9 de Out',
        series: 'Ensino Médio 1 ano',
        class: 'A',
        objective: 'Avaliação final abrangendo todo o conteúdo do ano',
        contents: 'Revisão geral: Mecânica, Termodinâmica, Ondas e Óptica',
        evaluationCriteria: 'Capacidade de síntese, domínio dos conteúdos ao longo do ano, criatividade e inovação no projeto final.',
        subject: 'Física',
        record: 'Notas finais inseridas no boletim',
        applicationDate: new Date('2025-12-15'),
        type: 'Avaliação final',
        status: 'PLANEJADA',
        resources: [
            { id: 5, name: 'Cronômetro digital', quantity: 3 },
            { id: 6, name: 'Dinamômetros', quantity: 5 }
        ]
    }, {
        id: 5,
        name: 'Avaliação do 1º Trimestre',
        trimester: 1,
        passingGrade: 6,
        formula: 'standard',
        parts: [
            { id: 'p1', name: 'Teórico', weight: 60, maxScore: 10 },
            { id: 'p2', name: 'Prático', weight: 40, maxScore: 10 }
        ],
        tools: [
            { id: 't1', name: 'Prova escrita', partId: 'p1', weight: 40, maxScore: 10 },
            { id: 't2', name: 'Trabalho em grupo', partId: 'p1', weight: 20, maxScore: 10 },
            { id: 't3', name: 'Experiência de laboratório', partId: 'p2', weight: 25, maxScore: 10 },
            { id: 't4', name: 'Apresentação de resultados', partId: 'p2', weight: 15, maxScore: 10 }
        ],
        school: '9 de Out',
        series: 'Ensino Médio 2 ano',
        class: 'B',
        objective: 'Avaliar os conceitos básicos da Cinemática',
        contents: 'Movimento retilíneo uniforme, Movimento uniformemente variado, Gráficos do movimento',
        evaluationCriteria: 'Capacidade de interpretação de gráficos, aplicação das equações do movimento e justificativa das respostas.',
        subject: 'Física',
        record: 'Notas registradas no diário eletrônico',
        applicationDate: new Date('2025-03-25'),
        type: 'Avaliação trimestral',
        status: 'PLANEJADA',
        resources: [
            { id: 7, name: 'Cronômetro', quantity: 6 },
            { id: 8, name: 'Carrinhos de experimento', quantity: 4 }
        ]
    },
    {
        id: 6,
        name: 'Avaliação do 2º Trimestre',
        trimester: 2,
        passingGrade: 6,
        formula: 'standard',
        parts: [
            { id: 'p1', name: 'Teórico', weight: 55, maxScore: 10 },
            { id: 'p2', name: 'Prático', weight: 45, maxScore: 10 }
        ],
        tools: [
            { id: 't1', name: 'Prova objetiva', partId: 'p1', weight: 35, maxScore: 10 },
            { id: 't2', name: 'Análise de gráficos', partId: 'p1', weight: 20, maxScore: 10 },
            { id: 't3', name: 'Experimento sobre forças', partId: 'p2', weight: 30, maxScore: 10 },
            { id: 't4', name: 'Relatório técnico', partId: 'p2', weight: 15, maxScore: 10 }
        ],
        school: '9 de Out',
        series: 'Ensino Médio 2 ano',
        class: 'B',
        objective: 'Avaliar os conceitos de Dinâmica e Forças',
        contents: 'Leis de Newton, Forças de atrito, Trabalho e Energia',
        evaluationCriteria: 'Aplicação correta das leis de Newton, interpretação de situações-problema e análise de forças em gráficos.',
        subject: 'Física',
        record: 'Notas registradas na planilha acadêmica',
        applicationDate: new Date('2025-06-28'),
        type: 'Avaliação trimestral',
        status: 'PLANEJADA',
        resources: [
            { id: 9, name: 'Dinamômetro', quantity: 5 },
            { id: 10, name: 'Blocos de atrito', quantity: 4 }
        ]
    },
    {
        id: 7,
        name: 'Avaliação do 3º Trimestre',
        trimester: 3,
        passingGrade: 6,
        formula: 'standard',
        parts: [
            { id: 'p1', name: 'Teórico', weight: 50, maxScore: 10 },
            { id: 'p2', name: 'Prático', weight: 50, maxScore: 10 }
        ],
        tools: [
            { id: 't1', name: 'Questões discursivas', partId: 'p1', weight: 30, maxScore: 10 },
            { id: 't2', name: 'Simulação computacional', partId: 'p1', weight: 20, maxScore: 10 },
            { id: 't3', name: 'Projeto experimental', partId: 'p2', weight: 35, maxScore: 10 },
            { id: 't4', name: 'Discussão em grupo', partId: 'p2', weight: 15, maxScore: 10 }
        ],
        school: '9 de Out',
        series: 'Ensino Médio 2 ano',
        class: 'B',
        objective: 'Avaliar os conceitos de eletricidade e circuitos',
        contents: 'Corrente elétrica, Lei de Ohm, Circuitos elétricos',
        evaluationCriteria: 'Resolução de problemas elétricos, organização na elaboração dos circuitos e clareza na argumentação.',
        subject: 'Física',
        record: 'Notas adicionadas ao sistema escolar',
        applicationDate: new Date('2025-09-27'),
        type: 'Avaliação trimestral',
        status: 'PLANEJADA',
        resources: [
            { id: 11, name: 'Multímetros', quantity: 3 },
            { id: 12, name: 'Fontes de tensão', quantity: 2 },
            { id: 13, name: 'Resistores diversos', quantity: 10 }
        ]
    },
    {
        id: 8,
        name: 'Avaliação Final',
        trimester: 4,
        passingGrade: 6,
        formula: 'standard',
        parts: [
            { id: 'p1', name: 'Prova Integrada', weight: 70, maxScore: 10 },
            { id: 'p2', name: 'Projeto Final', weight: 30, maxScore: 10 }
        ],
        tools: [
            { id: 't1', name: 'Prova dissertativa', partId: 'p1', weight: 50, maxScore: 10 },
            { id: 't2', name: 'Análise de experimentos', partId: 'p1', weight: 20, maxScore: 10 },
            { id: 't3', name: 'Apresentação de trabalho', partId: 'p2', weight: 30, maxScore: 10 }
        ],
        school: '9 de Out',
        series: 'Ensino Médio 2 ano',
        class: 'B',
        objective: 'Avaliação final abrangendo todos os conceitos do ano',
        contents: 'Mecânica, Eletricidade, Termodinâmica',
        evaluationCriteria: 'Síntese e integração dos conteúdos, inovação nas soluções e justificativas adequadas.',
        subject: 'Física',
        record: 'Notas finais enviadas para o boletim escolar',
        applicationDate: new Date('2025-12-10'),
        type: 'Avaliação final',
        status: 'PLANEJADA',
        resources: [
            { id: 14, name: 'Kit de circuitos elétricos', quantity: 5 },
            { id: 15, name: 'Software de simulação', quantity: 1 }
        ]
    }
];
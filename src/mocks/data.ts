import { ClassPerformance, EnhancedExamResult, EvaluationRubric, ExamSummary, StudentResult } from "../utils/types/Assessment";
import { Question } from "../utils/types/Question";

export const mockEvaluationRubrics: EvaluationRubric[] = [
  {
    id: "rubric001",
    title: "Redação - ENEM",
    description: "Rubrica oficial baseada nas cinco competências da redação do ENEM.",
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-05-15"),
    criteria: [
      {
        id: "crit1",
        description: "Domínio da norma padrão da língua portuguesa",
        weight: 0.2,
        skillCategory: "Linguagem",
        levels: [
          {
            score: 0,
            description: "Texto com grave comprometimento da norma padrão.",
            examples: ["Erros recorrentes de ortografia", "Ininteligibilidade"],
          },
          {
            score: 100,
            description: "Domínio pleno da norma padrão.",
            examples: ["Uso correto de tempos verbais", "Ortografia impecável"],
          },
        ],
      },
      {
        id: "crit2",
        description: "Compreensão da proposta e desenvolvimento do tema",
        weight: 0.2,
        skillCategory: "Compreensão textual",
        levels: [
          {
            score: 0,
            description: "Fuga total do tema proposto.",
            examples: ["Texto fora do contexto solicitado"],
          },
          {
            score: 100,
            description: "Compreensão completa e desenvolvimento adequado.",
            examples: ["Argumentos alinhados ao tema", "Tese clara"],
          },
        ],
      },
    ],
  },
  {
    id: "rubric002",
    title: "Apresentação Oral - Projeto de Ciências",
    description: "Critérios para avaliar apresentações em grupo sobre projetos científicos.",
    createdAt: new Date("2025-02-20"),
    updatedAt: new Date("2025-05-10"),
    criteria: [
      {
        id: "crit3",
        description: "Clareza na comunicação",
        weight: 0.3,
        skillCategory: "Comunicação oral",
        levels: [
          {
            score: 0,
            description: "Dificuldade de expressão, fala incoerente.",
            examples: ["Fala inaudível", "Uso excessivo de muletas linguísticas"],
          },
          {
            score: 5,
            description: "Clareza e coerência ao apresentar ideias.",
            examples: ["Tom de voz adequado", "Ideias bem conectadas"],
          },
        ],
      },
      {
        id: "crit4",
        description: "Domínio do conteúdo apresentado",
        weight: 0.4,
        skillCategory: "Conhecimento científico",
        levels: [
          {
            score: 0,
            description: "Desconhecimento do tema.",
            examples: ["Respostas incorretas", "Leitura do conteúdo sem entendimento"],
          },
          {
            score: 5,
            description: "Domínio claro e aprofundado do conteúdo.",
            examples: ["Explicações espontâneas e corretas", "Exemplos relevantes"],
          },
        ],
      },
    ],
  },
  {
    id: "rubric003",
    title: "Trabalho de Filosofia - Análise Crítica",
    createdAt: new Date("2025-03-10"),
    updatedAt: new Date("2025-05-01"),
    criteria: [
      {
        id: "crit5",
        description: "Capacidade argumentativa",
        weight: 0.5,
        skillCategory: "Pensamento crítico",
        levels: [
          {
            score: 1,
            description: "Argumentação vaga e sem fundamentação.",
            examples: ["Frases genéricas", "Ausência de contra-argumentos"],
          },
          {
            score: 5,
            description: "Argumentação lógica, fundamentada e bem estruturada.",
            examples: ["Uso de autores filosóficos", "Raciocínio encadeado"],
          },
        ],
      },
      {
        id: "crit6",
        description: "Organização das ideias",
        weight: 0.3,
        skillCategory: "Organização textual",
        levels: [
          {
            score: 1,
            description: "Ideias desconexas, sem estrutura lógica.",
            examples: ["Saltos de lógica", "Parágrafos sem coesão"],
          },
          {
            score: 5,
            description: "Sequência lógica e clara entre os argumentos.",
            examples: ["Introdução, desenvolvimento e conclusão bem definidos"],
          },
        ],
      },
    ],
  },
];

// Mock de questões
export const mockQuestions: Question[] = [
  {
    id: '1',
    contentId: 'content-001',
    statement: 'Qual é a capital da França?',
    questionType: 'multiple_choice',
    difficultyLevel: 'easy',
    discipline: 'Geografia',
    alternatives: [
      { id: 'a1', text: 'Londres', isCorrect: false },
      { id: 'a2', text: 'Paris', isCorrect: true },
      { id: 'a3', text: 'Berlim', isCorrect: false },
      { id: 'a4', text: 'Madri', isCorrect: false },
    ],
    explanation: 'Paris é a capital da França.',
    createdAt: '2025-05-01T10:00:00Z',
    updatedAt: '2025-05-01T12:00:00Z',
    status: 'active',
    imageUrl: 'https://example.com/paris.jpg',
    tags: ['geografia', 'capitais'],
    source: 'Enciclopédia Escolar',
    accessDate: '2025-04-30',
    optionsLayout: 'one-column',
  },
  {
    id: '2',
    contentId: 'content-002',
    statement: 'A água ferve a 100 graus Celsius ao nível do mar.',
    questionType: 'true_false',
    difficultyLevel: 'easy',
    discipline: 'Ciências',
    alternatives: [
      { id: 'a1', text: 'Verdadeiro', isCorrect: true },
      { id: 'a2', text: 'Falso', isCorrect: false },
    ],
    explanation: 'A 100°C, a água entra em ebulição ao nível do mar.',
    createdAt: '2025-05-10T09:00:00Z',
    updatedAt: '2025-05-10T10:00:00Z',
    status: 'active',
    tags: ['ciência', 'física'],
    optionsLayout: 'two-columns',
  },
  {
    id: '3',
    contentId: 'content-003',
    statement: 'Descreva o impacto da Revolução Francesa na sociedade moderna.',
    questionType: 'essay',
    difficultyLevel: 'hard',
    discipline: 'História',
    alternatives: [],
    explanation: 'Resposta discursiva esperada baseada em conceitos históricos.',
    createdAt: '2025-04-20T14:00:00Z',
    updatedAt: '2025-04-21T08:30:00Z',
    status: 'draft',
    tags: ['história', 'revolução'],
    source: 'Livro de História Moderna',
    accessDate: '2025-03-15',
  },
  {
    id: '4',
    contentId: 'content-004',
    statement: 'A fórmula da água é ____.',
    questionType: 'fill_in_the_blank',
    difficultyLevel: 'medium',
    discipline: 'Química',
    alternatives: [],
    correctAnswer: 'H2O',
    explanation: 'H2O é a fórmula da água, composta por dois átomos de hidrogênio e um de oxigênio.',
    createdAt: '2025-05-05T16:00:00Z',
    updatedAt: '2025-05-06T10:00:00Z',
    status: 'active',
    tags: ['química', 'fórmulas'],
    optionsLayout: 'one-column',
  },
  {
    id: '5',
    contentId: 'content-005',
    statement: 'Qual desses animais é um mamífero?',
    questionType: 'multiple_choice',
    difficultyLevel: 'medium',
    discipline: 'Biologia',
    alternatives: [
      { id: 'a1', text: 'Tubarão', isCorrect: false },
      { id: 'a2', text: 'Golfinho', isCorrect: true },
      { id: 'a3', text: 'Pinguim', isCorrect: false },
      { id: 'a4', text: 'Polvo', isCorrect: false },
    ],
    explanation: 'Golfinhos são mamíferos aquáticos, ao contrário dos demais listados.',
    createdAt: '2025-05-15T08:00:00Z',
    updatedAt: '2025-05-15T08:30:00Z',
    status: 'active',
    tags: ['biologia', 'animais'],
    optionsLayout: 'two-columns',
  },
  {
    id: '6',
    contentId: 'content-006',
    statement: 'A soma dos ângulos internos de um triângulo é igual a 180 graus.',
    questionType: 'true_false',
    difficultyLevel: 'easy',
    discipline: 'Matemática',
    alternatives: [
      { id: 'a1', text: 'Verdadeiro', isCorrect: true },
      { id: 'a2', text: 'Falso', isCorrect: false },
    ],
    explanation: 'Em qualquer triângulo, a soma dos ângulos internos é sempre 180 graus.',
    createdAt: '2025-05-16T10:10:00Z',
    updatedAt: '2025-05-16T11:00:00Z',
    status: 'active',
    tags: ['matemática', 'geometria'],
    optionsLayout: 'one-column',
  },
  {
    id: '7',
    contentId: 'content-007',
    statement: 'Explique como ocorre a fotossíntese nas plantas.',
    questionType: 'essay',
    difficultyLevel: 'medium',
    discipline: 'Biologia',
    alternatives: [],
    explanation: 'A fotossíntese é o processo pelo qual as plantas convertem luz solar em energia química.',
    createdAt: '2025-04-10T07:00:00Z',
    updatedAt: '2025-04-11T09:00:00Z',
    status: 'draft',
    tags: ['biologia', 'fotossíntese'],
    source: 'Manual do Ensino Médio',
    accessDate: '2025-03-20',
  },
  {
    id: '8',
    contentId: 'content-008',
    statement: 'O elemento químico representado pelo símbolo "Na" é o ____.',
    questionType: 'fill_in_the_blank',
    difficultyLevel: 'medium',
    discipline: 'Química',
    alternatives: [],
    correctAnswer: 'Sódio',
    explanation: 'Na é o símbolo do elemento químico sódio.',
    createdAt: '2025-05-17T13:00:00Z',
    updatedAt: '2025-05-18T08:00:00Z',
    status: 'active',
    tags: ['química', 'elementos'],
    optionsLayout: 'one-column',
  },
  {
    id: '9',
    contentId: 'content-009',
    statement: 'Marque a alternativa que completa corretamente a frase: "O sol nasce no ____".',
    questionType: 'multiple_choice',
    difficultyLevel: 'easy',
    discipline: 'Geografia',
    alternatives: [
      { id: 'a1', text: 'Sul', isCorrect: false },
      { id: 'a2', text: 'Oeste', isCorrect: false },
      { id: 'a3', text: 'Leste', isCorrect: true },
      { id: 'a4', text: 'Norte', isCorrect: false },
    ],
    explanation: 'O sol nasce no leste e se põe no oeste.',
    createdAt: '2025-05-18T10:00:00Z',
    updatedAt: '2025-05-18T10:15:00Z',
    status: 'active',
    imageUrl: 'https://example.com/sunrise.jpg',
    tags: ['geografia', 'orientação'],
    optionsLayout: 'two-columns',
  },
  {
    id: '10',
    contentId: 'content-010',
    statement: 'Resolva a equação: 2x + 3 = 7. O valor de x é ____.',
    questionType: 'fill_in_the_blank',
    difficultyLevel: 'medium',
    discipline: 'Matemática',
    alternatives: [],
    correctAnswer: '2',
    explanation: 'Subtraindo 3 de ambos os lados e dividindo por 2, temos x = 2.',
    createdAt: '2025-05-19T08:00:00Z',
    updatedAt: '2025-05-19T08:30:00Z',
    status: 'active',
    tags: ['matemática', 'álgebra'],
    optionsLayout: 'one-column',
  },
  {
    id: '11',
    contentId: 'content-011',
    statement: 'A Segunda Guerra Mundial terminou em 1945.',
    questionType: 'true_false',
    difficultyLevel: 'easy',
    discipline: 'História',
    alternatives: [
      { id: 'a1', text: 'Verdadeiro', isCorrect: true },
      { id: 'a2', text: 'Falso', isCorrect: false },
    ],
    explanation: 'A Segunda Guerra Mundial terminou oficialmente em setembro de 1945.',
    createdAt: '2025-05-20T09:15:00Z',
    updatedAt: '2025-05-20T09:30:00Z',
    status: 'active',
    tags: ['história', 'guerras'],
    source: 'Enciclopédia Britannica',
    accessDate: '2025-04-10',
  },
  {
    id: '12',
    contentId: 'content-012',
    statement: 'Explique a diferença entre um vírus e uma bactéria.',
    questionType: 'essay',
    difficultyLevel: 'hard',
    discipline: 'Biologia',
    alternatives: [],
    explanation: 'Resposta esperada: vírus não possuem metabolismo próprio e dependem de células hospedeiras.',
    createdAt: '2025-05-15T11:00:00Z',
    updatedAt: '2025-05-16T10:00:00Z',
    status: 'draft',
    tags: ['biologia', 'microbiologia'],
    optionsLayout: 'one-column',
  },
  {
    id: '13',
    contentId: 'content-013',
    statement: 'Qual destas palavras é um advérbio?',
    questionType: 'multiple_choice',
    difficultyLevel: 'medium',
    discipline: 'Português',
    alternatives: [
      { id: 'a1', text: 'Feliz', isCorrect: false },
      { id: 'a2', text: 'Rapidamente', isCorrect: true },
      { id: 'a3', text: 'Cadeira', isCorrect: false },
      { id: 'a4', text: 'Andando', isCorrect: false },
    ],
    explanation: 'Advérbios geralmente modificam verbos, e "rapidamente" é um exemplo clássico.',
    createdAt: '2025-05-21T07:45:00Z',
    updatedAt: '2025-05-21T08:00:00Z',
    status: 'active',
    tags: ['português', 'gramática'],
    optionsLayout: 'two-columns',
  },
  {
    id: '14',
    contentId: 'content-014',
    statement: 'Complete a frase: "O livro está ____ da mesa."',
    questionType: 'fill_in_the_blank',
    difficultyLevel: 'easy',
    discipline: 'Português',
    alternatives: [],
    correctAnswer: 'em cima',
    explanation: 'A resposta correta é uma locução adverbial de lugar: "em cima".',
    createdAt: '2025-05-19T14:30:00Z',
    updatedAt: '2025-05-20T08:00:00Z',
    status: 'active',
    tags: ['português', 'preposições'],
  },
  {
    id: '15',
    contentId: 'content-015',
    statement: 'Qual a fórmula da área de um triângulo?',
    questionType: 'multiple_choice',
    difficultyLevel: 'medium',
    discipline: 'Matemática',
    alternatives: [
      { id: 'a1', text: 'base + altura', isCorrect: false },
      { id: 'a2', text: '(base × altura) ÷ 2', isCorrect: true },
      { id: 'a3', text: 'lado × lado', isCorrect: false },
      { id: 'a4', text: 'π × raio²', isCorrect: false },
    ],
    explanation: 'A área de um triângulo é dada por (base × altura) ÷ 2.',
    createdAt: '2025-05-20T12:00:00Z',
    updatedAt: '2025-05-20T12:30:00Z',
    status: 'active',
    tags: ['matemática', 'geometria'],
    optionsLayout: 'one-column',
  },
  {
    id: '16',
    contentId: 'content-016',
    statement: 'O que representa a sigla ONU?',
    questionType: 'multiple_choice',
    difficultyLevel: 'easy',
    discipline: 'Atualidades',
    alternatives: [
      { id: 'a1', text: 'Organização das Nações Unidas', isCorrect: true },
      { id: 'a2', text: 'Organização Nacional Urbana', isCorrect: false },
      { id: 'a3', text: 'Ordem Nacional Unificada', isCorrect: false },
      { id: 'a4', text: 'Operação das Nações Unidas', isCorrect: false },
    ],
    explanation: 'ONU significa Organização das Nações Unidas.',
    createdAt: '2025-05-18T09:00:00Z',
    updatedAt: '2025-05-18T09:20:00Z',
    status: 'active',
    tags: ['atualidades', 'organizações'],
    optionsLayout: 'two-columns',
  },
  {
    id: '17',
    contentId: 'content-017',
    statement: 'Complete com a forma verbal correta: "Se eu ____ tempo, viajaria mais."',
    questionType: 'fill_in_the_blank',
    difficultyLevel: 'medium',
    discipline: 'Português',
    alternatives: [],
    correctAnswer: 'tivesse',
    explanation: 'O correto é "Se eu tivesse tempo", pois é uma oração condicional no pretérito imperfeito do subjuntivo.',
    createdAt: '2025-05-17T15:00:00Z',
    updatedAt: '2025-05-17T15:45:00Z',
    status: 'active',
    tags: ['português', 'verbo'],
  },
  {
    id: '18',
    contentId: 'content-018',
    statement: 'Explique os principais fatores da urbanização no Brasil.',
    questionType: 'essay',
    difficultyLevel: 'hard',
    discipline: 'Geografia',
    alternatives: [],
    explanation: 'Resposta deve abordar migração rural-urbana, industrialização e crescimento das cidades.',
    createdAt: '2025-05-16T10:00:00Z',
    updatedAt: '2025-05-16T10:30:00Z',
    status: 'draft',
    tags: ['geografia', 'urbanização'],
    source: 'Atlas Escolar IBGE',
    accessDate: '2025-04-12',
  },
  {
    id: '19',
    contentId: 'content-019',
    statement: 'A fotossíntese ocorre nas mitocôndrias das células vegetais.',
    questionType: 'true_false',
    difficultyLevel: 'medium',
    discipline: 'Biologia',
    alternatives: [
      { id: 'a1', text: 'Verdadeiro', isCorrect: false },
      { id: 'a2', text: 'Falso', isCorrect: true },
    ],
    explanation: 'A fotossíntese ocorre nos cloroplastos, não nas mitocôndrias.',
    createdAt: '2025-05-18T08:00:00Z',
    updatedAt: '2025-05-18T08:30:00Z',
    status: 'active',
    tags: ['biologia', 'célula'],
    optionsLayout: 'one-column',
  },
  {
    id: '20',
    contentId: 'content-020',
    statement: 'Qual é o valor de π (pi) aproximado até duas casas decimais?',
    questionType: 'multiple_choice',
    difficultyLevel: 'easy',
    discipline: 'Matemática',
    alternatives: [
      { id: 'a1', text: '3.12', isCorrect: false },
      { id: 'a2', text: '3.14', isCorrect: true },
      { id: 'a3', text: '3.16', isCorrect: false },
      { id: 'a4', text: '3.10', isCorrect: false },
    ],
    explanation: 'O valor aproximado de π é 3.14.',
    createdAt: '2025-05-21T11:00:00Z',
    updatedAt: '2025-05-21T11:30:00Z',
    status: 'active',
    tags: ['matemática', 'constantes'],
    optionsLayout: 'two-columns',
  },
  {
    id: '21',
    contentId: 'content-021',
    statement: 'Analise criticamente os impactos da globalização nas economias em desenvolvimento.',
    questionType: 'essay',
    difficultyLevel: 'hard',
    discipline: 'Geografia',
    alternatives: [],
    explanation: 'A resposta deve discutir vantagens como o acesso a mercados, e desvantagens como dependência econômica.',
    createdAt: '2025-05-21T13:00:00Z',
    updatedAt: '2025-05-21T13:30:00Z',
    status: 'active',
    tags: ['globalização', 'economia', 'geografia'],
    optionsLayout: 'three-columns',
  },
  {
    id: '22',
    contentId: 'content-022',
    statement: 'Explique a importância da ética na pesquisa científica e os riscos da sua negligência.',
    questionType: 'essay',
    difficultyLevel: 'hard',
    discipline: 'Ciências',
    alternatives: [],
    explanation: 'A resposta deve abordar consentimento, manipulação de dados, e impacto social.',
    createdAt: '2025-05-21T13:45:00Z',
    updatedAt: '2025-05-21T14:00:00Z',
    status: 'active',
    tags: ['ciência', 'ética'],
    optionsLayout: 'three-columns',
  },
  {
    id: '23',
    contentId: 'content-023',
    statement: 'Disserte sobre o papel da arte como ferramenta de transformação social.',
    questionType: 'essay',
    difficultyLevel: 'hard',
    discipline: 'Artes',
    alternatives: [],
    explanation: 'A resposta deve explorar o papel histórico da arte em movimentos sociais, cultura e política.',
    createdAt: '2025-05-21T14:15:00Z',
    updatedAt: '2025-05-21T14:45:00Z',
    status: 'active',
    tags: ['arte', 'sociedade'],
    optionsLayout: 'three-columns',
  },
  {
    id: '24',
    contentId: 'content-024',
    statement: 'Avalie os efeitos da revolução digital nas relações interpessoais no século XXI.',
    questionType: 'essay',
    difficultyLevel: 'hard',
    discipline: 'Sociologia',
    alternatives: [],
    explanation: 'Esperado: análise sobre redes sociais, isolamento, conectividade e mudanças comportamentais.',
    createdAt: '2025-05-21T15:00:00Z',
    updatedAt: '2025-05-21T15:30:00Z',
    status: 'active',
    tags: ['tecnologia', 'sociologia'],
    optionsLayout: 'three-columns',
  },
  {
    id: '25',
    contentId: 'content-025',
    statement: 'Comente sobre a crise climática atual e os desafios para a sustentabilidade global.',
    questionType: 'essay',
    difficultyLevel: 'hard',
    discipline: 'Geografia',
    alternatives: [],
    explanation: 'Resposta deve considerar emissões de carbono, políticas ambientais e desigualdade climática.',
    createdAt: '2025-05-21T16:00:00Z',
    updatedAt: '2025-05-21T16:30:00Z',
    status: 'active',
    tags: ['clima', 'meio ambiente'],
    optionsLayout: 'three-columns',
  }
];

// Mock de sumários de exames
export const mockExamSummaries: ExamSummary[] = [
  {
    examId: "exam123",
    title: "Avaliação de Matemática - 2º Semestre",
    subject: "Matemática",
    date: new Date("2025-06-10T09:00:00Z"),
    totalStudents: 150,
    averageScore: 78.4,
    skillAverages: {
      "algebra": 85.6,
      "geometria": 72.1,
      "aritmetica": 80.3,
      "estatistica": 65.4
    },
    passingRate: 85,
    highestScore: 98,
    lowestScore: 45,
    completionRate: 95,
    questionStatistics: {
      easiestQuestion: "q3",
      hardestQuestion: "q8"
    },
    results: [
      {
        id: "result001",
        examId: "exam123",
        studentId: "student001",
        answers: [
          { questionId: "q1", answer: "A", score: 9 },
          { questionId: "q2", answer: "C", score: 7 },
          { questionId: "q3", answer: "B", score: 10 },
          { questionId: "q4", answer: "A", score: 8 },
          { questionId: "q5", answer: "D", score: 6 },
          { questionId: "q6", answer: "C", score: 7 },
          { questionId: "q7", answer: "B", score: 9 },
          { questionId: "q8", answer: "A", score: 5 }
        ],
        totalScore: 61,
        completedAt: new Date("2025-06-10T10:30:00Z"),
        metadata: {
          timeSpent: 45,
          attempts: 1
        }
      },
      {
        id: "result002",
        examId: "exam123",
        studentId: "student002",
        answers: [
          { questionId: "q1", answer: "B", score: 8 },
          { questionId: "q2", answer: "A", score: 9 },
          { questionId: "q3", answer: "B", score: 10 },
          { questionId: "q4", answer: "C", score: 7 },
          { questionId: "q5", answer: "D", score: 6 },
          { questionId: "q6", answer: "A", score: 8 },
          { questionId: "q7", answer: "B", score: 9 },
          { questionId: "q8", answer: "D", score: 6 }
        ],
        totalScore: 63,
        completedAt: new Date("2025-06-10T11:00:00Z"),
        metadata: {
          timeSpent: 50,
          attempts: 1
        }
      }
    ]
  },
]


// Mock de resultados de alunos
export const mockStudentResults: StudentResult[] = [
  {
    studentId: "stu001",
    studentName: "Ana Paula Silva",
    studentEmail: "ana.silva@example.com",
    classId: "class101",
    className: "3º Ano A - Ensino Médio",
    examResults: [
      {
        id: "res001",
        examId: "exam001",
        studentId: "stu001",
        completedAt: new Date("2025-05-10"),
        totalScore: 82,
        answers: [
          {
            questionId: "q1",
            answer: "B",
            score: 10,
            skills: { "Álgebra": 1.0 }
          },
          {
            questionId: "q2",
            answer: "A",
            score: 8,
            skills: { "Geometria": 0.8 }
          },
          {
            questionId: "q3",
            answer: "C",
            score: 9,
            skills: { "Estatística": 0.9 }
          }
        ],
        metadata: {
          timeSpent: 60,
          attempts: 1,
        }
      },
      {
        id: "res002",
        examId: "exam003",
        studentId: "stu001",
        completedAt: new Date("2025-03-20"),
        totalScore: 75,
        answers: [
          {
            questionId: "q1",
            answer: "C",
            score: 9,
            skills: { "Cinemática": 0.9 }
          },
          {
            questionId: "q4",
            answer: "D",
            score: 6,
            skills: { "Dinâmica": 0.6 }
          }
        ],
        metadata: {
          timeSpent: 55,
          attempts: 1,
        }
      }
    ],
    overallAverage: 78.5,
    progressTrend: "improving",
    attendanceRate: 0.93,
    skillProfile: {
      "Álgebra": 0.95,
      "Geometria": 0.8,
      "Estatística": 0.88,
      "Cinemática": 0.9,
      "Dinâmica": 0.7
    },
    riskAssessment: {
      level: "low",
      factors: ["Alta frequência", "Boa evolução de notas"]
    }
  },
  {
    studentId: "stu002",
    studentName: "Carlos Henrique Mendes",
    studentEmail: "carlos.mendes@example.com",
    classId: "class101",
    className: "3º Ano A - Ensino Médio",
    examResults: [
      {
        id: "res003",
        examId: "exam001",
        studentId: "stu002",
        completedAt: new Date("2025-05-10"),
        totalScore: 58,
        answers: [
          {
            questionId: "q1",
            answer: "A",
            score: 5,
            skills: { "Álgebra": 0.5 }
          },
          {
            questionId: "q2",
            answer: "C",
            score: 7,
            skills: { "Geometria": 0.7 }
          }
        ],
        metadata: {
          timeSpent: 70,
          attempts: 2,
        }
      },
      {
        id: "res004",
        examId: "exam003",
        studentId: "stu002",
        completedAt: new Date("2025-03-20"),
        totalScore: 49,
        answers: [
          {
            questionId: "q1",
            answer: "D",
            score: 4,
            skills: { "Cinemática": 0.4 }
          },
          {
            questionId: "q5",
            answer: "B",
            score: 3,
            skills: { "Dinâmica": 0.3 }
          }
        ],
        metadata: {
          timeSpent: 65,
          attempts: 1,
        }
      }
    ],
    overallAverage: 53.5,
    progressTrend: "declining",
    attendanceRate: 0.75,
    skillProfile: {
      "Álgebra": 0.5,
      "Geometria": 0.65,
      "Cinemática": 0.4,
      "Dinâmica": 0.3
    },
    riskAssessment: {
      level: "high",
      factors: ["Baixo desempenho em áreas fundamentais", "Frequência abaixo do ideal"]
    }
  }
];

// Mock de desempenho de turmas
export const mockClassPerformances: ClassPerformance[] = [
  {
    classId: "class-101",
    className: "101 - FÍSICA",
    teacher: "Prof. João Silva",
    academicPeriod: "2023/2",
    averageScore: 75.6,
    passingRate: 85,
    examResults: [
      {
        examId: "exam-001",
        title: "Prova de Álgebra",
        subject: "Matemática",
        date: new Date("2023-06-15"),
        totalStudents: 30,
        averageScore: 78,
        passingRate: 83,
        highestScore: 98,
        lowestScore: 55,
        completionRate: 95,
        skillAverages: {
          "resolução de equações": 80,
          "matemática abstrata": 70,
        },
        questionStatistics: {
          easiestQuestion: "Qual o valor de x na equação 2x + 3 = 7?",
          hardestQuestion: "Prove que a matriz A é invertível.",
        },
        results: [
          {
            id: "result-001",
            examId: "exam-001",
            studentId: "student-001",
            answers: [
              {
                questionId: "q1",
                answer: "x=2",
                score: 10,
                skills: {
                  "resolução de equações": 10,
                },
              },
              {
                questionId: "q2",
                answer: "A é invertível",
                score: 5,
                skills: {
                  "matemática abstrata": 5,
                },
              },
            ],
            totalScore: 15,
            completedAt: new Date("2023-06-15T09:30:00"),
            metadata: {
              timeSpent: 45,
              attempts: 1,
            },
          },
          {
            id: "result-002",
            examId: "exam-001",
            studentId: "student-002",
            answers: [
              {
                questionId: "q1",
                answer: "x=3",
                score: 8,
                skills: {
                  "resolução de equações": 8,
                },
              },
              {
                questionId: "q2",
                answer: "A não é invertível",
                score: 7,
                skills: {
                  "matemática abstrata": 7,
                },
              },
            ],
            totalScore: 15,
            completedAt: new Date("2023-06-15T10:00:00"),
            metadata: {
              timeSpent: 50,
              attempts: 2,
            },
          },
        ],
      },
      {
        examId: "exam-002",
        title: "Prova de Cálculo Diferencial",
        subject: "Matemática",
        date: new Date("2023-07-10"),
        totalStudents: 30,
        averageScore: 82,
        passingRate: 90,
        highestScore: 96,
        lowestScore: 60,
        completionRate: 93,
        skillAverages: {
          "derivadas": 85,
          "integrais": 78,
        },
        questionStatistics: {
          easiestQuestion: "Qual a derivada de f(x) = x^2?",
          hardestQuestion: "Calcule a integral indefinida de e^x dx.",
        },
        results: [
          {
            id: "result-003",
            examId: "exam-002",
            studentId: "student-003",
            answers: [
              {
                questionId: "q1",
                answer: "2x",
                score: 10,
                skills: {
                  "derivadas": 10,
                },
              },
              {
                questionId: "q2",
                answer: "e^x + C",
                score: 7,
                skills: {
                  "integrais": 7,
                },
              },
            ],
            totalScore: 17,
            completedAt: new Date("2023-07-10T11:30:00"),
            metadata: {
              timeSpent: 55,
              attempts: 1,
            },
          },
        ],
      },
    ],
    studentCount: 30,
    performanceTrend: "stable",
    skillBreakdown: {
      "resolução de equações": 80,
      "matemática abstrata": 70,
      "derivadas": 85,
      "integrais": 78,
    },
    subjects: ["Matemática", "Álgebra", "Cálculo"],
    students: [
      { id: "student-001", name: "Ana Costa", email: "ana.costa@example.com" },
      { id: "student-002", name: "Lucas Almeida", email: "lucas.almeida@example.com" },
      { id: "student-003", name: "Carlos Pereira", email: "carlos.pereira@example.com" },
      // Adicione mais alunos conforme necessário
    ],
  },
  {
    classId: "class-102",
    className: "102 - FÍSICA",
    teacher: "Mr. John Doe",
    academicPeriod: "2025-1",
    averageScore: 78.5,
    passingRate: 85.2,
    examResults: [
      {
        examId: "EX1001",
        title: "Final Exam 2025",
        subject: "Math",
        date: new Date(),
        totalStudents: 20,
        averageScore: 75.6,
        passingRate: 80.0,
        highestScore: 98,
        lowestScore: 45,
        completionRate: 95.0,
        questionStatistics: {
          easiestQuestion: "Q5",
          hardestQuestion: "Q8",
        },
        results: [
          {
            id: "R1234",
            examId: "EX1001",
            studentId: "S001",
            answers: [
              { questionId: "Q1", answer: "A", score: 8.5, skills: { Math: 85, Geometry: 90 } },
              { questionId: "Q2", answer: "C", score: 7.0, skills: { Math: 80, Algebra: 75 } },
              { questionId: "Q3", answer: "B", score: 9.0, skills: { Math: 90, Geometry: 95 } },
            ],
            totalScore: 24.5,
            completedAt: new Date(),
            metadata: { timeSpent: 60, attempts: 1 },
          },
          {
            id: "R1235",
            examId: "EX1001",
            studentId: "S002",
            answers: [
              { questionId: "Q1", answer: "B", score: 7.5, skills: { Math: 80, Algebra: 70 } },
              { questionId: "Q2", answer: "D", score: 6.5, skills: { Math: 75, Geometry: 65 } },
              { questionId: "Q3", answer: "A", score: 8.0, skills: { Math: 85, Algebra: 85 } },
            ],
            totalScore: 22.0,
            completedAt: new Date(),
            metadata: { timeSpent: 55, attempts: 2 },
          },
        ],
      },
    ],
    studentCount: 20,
    performanceTrend: "stable",
    skillBreakdown: {
      Math: 80.5,
      Geometry: 75.0,
      Algebra: 78.5,
    },
    subjects: ["Math", "Geometry", "Algebra"],
    students: [
      { id: "S001", name: "Student 1", email: "student1@school.com" },
      { id: "S002", name: "Student 2", email: "student2@school.com" },
      { id: "S003", name: "Student 3", email: "student3@school.com" },
      { id: "S004", name: "Student 4", email: "student4@school.com" },
      { id: "S005", name: "Student 5", email: "student5@school.com" },
      { id: "S006", name: "Student 6", email: "student6@school.com" },
      { id: "S007", name: "Student 7", email: "student7@school.com" },
      { id: "S008", name: "Student 8", email: "student8@school.com" },
      { id: "S009", name: "Student 9", email: "student9@school.com" },
      { id: "S010", name: "Student 10", email: "student10@school.com" },
      { id: "S011", name: "Student 11", email: "student11@school.com" },
      { id: "S012", name: "Student 12", email: "student12@school.com" },
      { id: "S013", name: "Student 13", email: "student13@school.com" },
      { id: "S014", name: "Student 14", email: "student14@school.com" },
      { id: "S015", name: "Student 15", email: "student15@school.com" },
      { id: "S016", name: "Student 16", email: "student16@school.com" },
      { id: "S017", name: "Student 17", email: "student17@school.com" },
      { id: "S018", name: "Student 18", email: "student18@school.com" },
      { id: "S019", name: "Student 19", email: "student19@school.com" },
      { id: "S020", name: "Student 20", email: "student20@school.com" },
    ],
  },
  {
    classId: "class-201",
    className: "201 - FÍSICA",
    teacher: "Ms. Jane Smith",
    academicPeriod: "2025-1",
    averageScore: 72.3,
    passingRate: 78.0,
    examResults: [
      {
        examId: "EX1002",
        title: "Midterm Exam 2025",
        subject: "Programming",
        date: new Date(),
        totalStudents: 25,
        averageScore: 70.2,
        passingRate: 76.5,
        highestScore: 95,
        lowestScore: 40,
        completionRate: 92.0,
        questionStatistics: {
          easiestQuestion: "Q4",
          hardestQuestion: "Q7",
        },
        results: [
          {
            id: "R2234",
            examId: "EX1002",
            studentId: "S021",
            answers: [
              { questionId: "Q1", answer: "C", score: 7.5, skills: { Programming: 85, Logic: 90 } },
              { questionId: "Q2", answer: "A", score: 6.5, skills: { Programming: 80, Algorithms: 75 } },
              { questionId: "Q3", answer: "B", score: 8.0, skills: { Programming: 85, Logic: 80 } },
            ],
            totalScore: 22.0,
            completedAt: new Date(),
            metadata: { timeSpent: 50, attempts: 1 },
          },
          {
            id: "R2235",
            examId: "EX1002",
            studentId: "S022",
            answers: [
              { questionId: "Q1", answer: "B", score: 6.0, skills: { Programming: 75, Logic: 70 } },
              { questionId: "Q2", answer: "C", score: 5.5, skills: { Programming: 70, Algorithms: 80 } },
              { questionId: "Q3", answer: "D", score: 7.0, skills: { Programming: 80, Logic: 75 } },
            ],
            totalScore: 18.5,
            completedAt: new Date(),
            metadata: { timeSpent: 60, attempts: 2 },
          },
        ],
      },
    ],
    studentCount: 25,
    performanceTrend: "improving",
    skillBreakdown: {
      Programming: 78.0,
      Logic: 75.0,
      Algorithms: 70.5,
    },
    subjects: ["Programming", "Algorithms", "Logic"],
    students: [
      { id: "S021", name: "Student 21", email: "student21@school.com" },
      { id: "S022", name: "Student 22", email: "student22@school.com" },
      { id: "S023", name: "Student 23", email: "student23@school.com" },
      { id: "S024", name: "Student 24", email: "student24@school.com" },
      { id: "S025", name: "Student 25", email: "student25@school.com" },
      { id: "S026", name: "Student 26", email: "student26@school.com" },
      { id: "S027", name: "Student 27", email: "student27@school.com" },
      { id: "S028", name: "Student 28", email: "student28@school.com" },
      { id: "S029", name: "Student 29", email: "student29@school.com" },
      { id: "S030", name: "Student 30", email: "student30@school.com" },
      { id: "S031", name: "Student 31", email: "student31@school.com" },
      { id: "S032", name: "Student 32", email: "student32@school.com" },
      { id: "S033", name: "Student 33", email: "student33@school.com" },
      { id: "S034", name: "Student 34", email: "student34@school.com" },
      { id: "S035", name: "Student 35", email: "student35@school.com" },
      { id: "S036", name: "Student 36", email: "student36@school.com" },
      { id: "S037", name: "Student 37", email: "student37@school.com" },
      { id: "S038", name: "Student 38", email: "student38@school.com" },
      { id: "S039", name: "Student 39", email: "student39@school.com" },
      { id: "S040", name: "Student 40", email: "student40@school.com" },
    ],
  }, 
  {
    classId: "class-201",
    className: "301 - FÍSICA",
    teacher: "Ms. Jane Smith",
    academicPeriod: "2025-1",
    averageScore: 72.3,
    passingRate: 78.0,
    examResults: [
      {
        examId: "EX1002",
        title: "Midterm Exam 2025",
        subject: "Programming",
        date: new Date(),
        totalStudents: 25,
        averageScore: 70.2,
        passingRate: 76.5,
        highestScore: 95,
        lowestScore: 40,
        completionRate: 92.0,
        questionStatistics: {
          easiestQuestion: "Q4",
          hardestQuestion: "Q7",
        },
        results: [
          {
            id: "R2234",
            examId: "EX1002",
            studentId: "S021",
            answers: [
              { questionId: "Q1", answer: "C", score: 7.5, skills: { Programming: 85, Logic: 90 } },
              { questionId: "Q2", answer: "A", score: 6.5, skills: { Programming: 80, Algorithms: 75 } },
              { questionId: "Q3", answer: "B", score: 8.0, skills: { Programming: 85, Logic: 80 } },
            ],
            totalScore: 22.0,
            completedAt: new Date(),
            metadata: { timeSpent: 50, attempts: 1 },
          },
          {
            id: "R2235",
            examId: "EX1002",
            studentId: "S022",
            answers: [
              { questionId: "Q1", answer: "B", score: 6.0, skills: { Programming: 75, Logic: 70 } },
              { questionId: "Q2", answer: "C", score: 5.5, skills: { Programming: 70, Algorithms: 80 } },
              { questionId: "Q3", answer: "D", score: 7.0, skills: { Programming: 80, Logic: 75 } },
            ],
            totalScore: 18.5,
            completedAt: new Date(),
            metadata: { timeSpent: 60, attempts: 2 },
          },
        ],
      },
    ],
    studentCount: 25,
    performanceTrend: "improving",
    skillBreakdown: {
      Programming: 78.0,
      Logic: 75.0,
      Algorithms: 70.5,
    },
    subjects: ["Programming", "Algorithms", "Logic"],
    students: [
      { id: "S021", name: "Student 21", email: "student21@school.com" },
      { id: "S022", name: "Student 22", email: "student22@school.com" },
      { id: "S023", name: "Student 23", email: "student23@school.com" },
      { id: "S024", name: "Student 24", email: "student24@school.com" },
      { id: "S025", name: "Student 25", email: "student25@school.com" },
      { id: "S026", name: "Student 26", email: "student26@school.com" },
      { id: "S027", name: "Student 27", email: "student27@school.com" },
      { id: "S028", name: "Student 28", email: "student28@school.com" },
      { id: "S029", name: "Student 29", email: "student29@school.com" },
      { id: "S030", name: "Student 30", email: "student30@school.com" },
      { id: "S031", name: "Student 31", email: "student31@school.com" },
      { id: "S032", name: "Student 32", email: "student32@school.com" },
      { id: "S033", name: "Student 33", email: "student33@school.com" },
      { id: "S034", name: "Student 34", email: "student34@school.com" },
      { id: "S035", name: "Student 35", email: "student35@school.com" },
      { id: "S036", name: "Student 36", email: "student36@school.com" },
      { id: "S037", name: "Student 37", email: "student37@school.com" },
      { id: "S038", name: "Student 38", email: "student38@school.com" },
      { id: "S039", name: "Student 39", email: "student39@school.com" },
      { id: "S040", name: "Student 40", email: "student40@school.com" },
    ],
  }
];


// Mock de resultados de exames aprimorados
export const mockEnhancedResults: EnhancedExamResult[] = [
  {
    id: 'result-1',
    examId: 'exam-1',
    studentId: 'stu-1',
    answers: [
      { questionId: 'q1', answer: 'a3', score: 1 },
      { questionId: 'q2', answer: 'x = 5', score: 0.8 },
      { questionId: 'q3', answer: 'a2', score: 1 }
    ],
    totalScore: 9.3,
    completedAt: new Date('2023-04-15'),
    student: {
      id: 'stu-1',
      name: 'Ana Silva',
      email: 'ana.silva@escola.com',
      classId: 'class-1'
    },
    classId: 'class-1'
  },
  {
    id: 'result-2',
    examId: 'exam-2',
    studentId: 'stu-1',
    answers: [
      { questionId: 'q1', answer: 'a3', score: 1 },
      { questionId: 'q2', answer: 'x = 10', score: 0 },
      { questionId: 'q3', answer: 'a1', score: 0 }
    ],
    totalScore: 7.1,
    completedAt: new Date('2023-05-20'),
    student: {
      id: 'stu-1',
      name: 'Ana Silva',
      email: 'ana.silva@escola.com',
      classId: 'class-1'
    },
    classId: 'class-1'
  },
  {
    id: 'result-3',
    examId: 'exam-1',
    studentId: 'stu-2',
    answers: [
      { questionId: 'q1', answer: 'a1', score: 0 },
      { questionId: 'q2', answer: 'x = 5', score: 1 },
      { questionId: 'q3', answer: 'a2', score: 1 }
    ],
    totalScore: 7.5,
    completedAt: new Date('2023-04-15'),
    student: {
      id: 'stu-2',
      name: 'Carlos Oliveira',
      email: 'carlos.oliveira@escola.com',
      classId: 'class-1'
    },
    classId: 'class-1'
  },
  {
    id: 'result-4',
    examId: 'exam-2',
    studentId: 'stu-2',
    answers: [
      { questionId: 'q1', answer: 'a3', score: 1 },
      { questionId: 'q2', answer: 'x = 5', score: 1 },
      { questionId: 'q3', answer: 'a2', score: 1 }
    ],
    totalScore: 9.8,
    completedAt: new Date('2023-05-20'),
    student: {
      id: 'stu-2',
      name: 'Carlos Oliveira',
      email: 'carlos.oliveira@escola.com',
      classId: 'class-1'
    },
    classId: 'class-1'
  }
];
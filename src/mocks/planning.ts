import { Activity, DetailedPlanning, DiagnosticEvaluation, DidacticSequence, DigitalTechnologies, Evaluation, GeneralObjective, InclusionAndAccessibility, PlanningData, RegistrationAndFeedback, SchoolInfo, SupportMaterial, Topic } from "../utils/types/Planning";

const mockSchoolInfo: SchoolInfo[] = [
  {
    id: '1',
    school: "Escola Estadual Monte Verde",
    discipline: "Matemática",
    stage: "Ensino Fundamental II",
    grade: "8º ano",
    knowledgeArea: "Ciências da Natureza e Matemática",
    studentCount: 32,
    classes: ["8A", "8B"],
    period: "Matutino",
    trimester: "1º trimestre"
  },
  {
    id: '2',
    school: "Colégio Municipal Sol Nascente",
    discipline: "História",
    stage: "Ensino Fundamental I",
    grade: "5º ano",
    knowledgeArea: "Ciências Humanas",
    studentCount: 28,
    classes: ["5A"],
    period: "Vespertino",
    trimester: "2º trimestre"
  },
  {
    id: '3',
    school: "Instituto Educacional Nova Geração",
    discipline: "Língua Portuguesa",
    stage: "Ensino Médio",
    grade: "1º ano",
    knowledgeArea: "Linguagens e Códigos",
    studentCount: 40,
    classes: ["1A", "1B", "1C"],
    period: "Integral",
    trimester: "3º trimestre"
  },
  {
    id: '4',
    school: "Centro de Ensino Paulo Freire",
    discipline: "Física",
    stage: "Ensino Médio",
    grade: "2º ano",
    knowledgeArea: "Ciências da Natureza e Matemática",
    studentCount: 35,
    classes: ["2A"],
    period: "Noturno",
    trimester: "1º trimestre"
  },
  {
    id: '5',
    school: "Escola Técnica Estadual",
    discipline: "Química",
    stage: "Ensino Médio Técnico",
    grade: "3º ano",
    knowledgeArea: "Ciências da Natureza e Matemática",
    studentCount: 30,
    classes: ["3T"],
    period: "Integral",
    trimester: "2º trimestre"
  }
];

const mockGeneralObjectives: GeneralObjective[] = [
  {
    id: "obj-001",
    description: "Desenvolver o pensamento crítico e a capacidade de argumentação dos estudantes."
  },
  {
    id: "obj-002",
    description: "Estimular a colaboração em projetos interdisciplinares."
  },
  {
    id: "obj-003",
    description: "Promover a autonomia dos alunos na busca pelo conhecimento."
  }
];

const mockTopics: Topic[] = [
  {
    id: "top-001",
    title: "Energia e suas Transformações",
    competencies: [
      "Compreender os diferentes tipos de energia e suas transformações.",
      "Analisar o impacto do uso de energia no meio ambiente."
    ],
    knowledgeObjects: [
      "Fontes renováveis e não renováveis de energia",
      "Leis da termodinâmica",
      "Eficiência energética"
    ],
    transversalTopics: {
      topics: [
        "Sustentabilidade",
        "Consumo consciente"
      ],
      skills: [
        "Pensamento crítico",
        "Cidadania ambiental"
      ]
    },
    projects: [
      "Construção de maquetes de casas sustentáveis",
      "Campanha de economia de energia na escola"
    ],
    research: {
      topics: [
        "Impactos ambientais da matriz energética brasileira",
        "Inovações tecnológicas para energia limpa"
      ],
      criteria: [
        "Clareza na apresentação",
        "Relevância dos dados utilizados",
        "Aplicabilidade das propostas"
      ],
      contents: [
        "Estatísticas de consumo energético",
        "Estudos de caso sobre fontes alternativas"
      ]
    }
  },
  {
    id: "top-002",
    title: "Cultura Digital e Sociedade",
    competencies: [
      "Analisar o impacto das tecnologias digitais na vida cotidiana.",
      "Desenvolver atitudes responsáveis no uso das mídias sociais."
    ],
    knowledgeObjects: [
      "Privacidade e segurança digital",
      "Alfabetização midiática",
      "Fake news e desinformação"
    ],
    transversalTopics: {
      topics: [
        "Ética",
        "Cidadania digital"
      ],
      skills: [
        "Responsabilidade online",
        "Análise crítica de conteúdos digitais"
      ]
    },
    projects: [
      "Podcast escolar sobre uso consciente da internet",
      "Oficina de segurança digital para famílias"
    ],
    research: {
      topics: [
        "Comportamento digital de adolescentes",
        "Políticas de privacidade nas redes sociais"
      ],
      criteria: [
        "Originalidade",
        "Fundamentação teórica",
        "Coerência com os objetivos do tema"
      ],
      contents: [
        "Estudos sociológicos sobre tecnologia",
        "Legislação brasileira sobre dados pessoais"
      ]
    }
  }
];

const mockDetailedPlannings: DetailedPlanning[] = [
  {
    id: "plan-001",
    topic: "Sustentabilidade e Meio Ambiente",
    thematicAxis: "Ciências da Natureza",
    stage: "initial",
    skills: [
      "Relacionar ações humanas ao impacto ambiental",
      "Interpretar dados sobre poluição e preservação"
    ],
    objectives: [
      "Sensibilizar os alunos sobre a importância da preservação ambiental",
      "Incentivar práticas sustentáveis no cotidiano escolar"
    ],
    content: "Conceitos de sustentabilidade, reciclagem e consumo consciente.",
    justification: "O tema contribui para a formação de cidadãos conscientes e responsáveis.",
    methodology: "Aulas expositivas, rodas de conversa, vídeos temáticos e produção de cartazes.",
    resources: ["Projetor", "Cartolina", "Canetas coloridas", "Vídeos educativos"],
    duration: "2 semanas"
  },
  {
    id: "plan-002",
    topic: "Revolução Industrial",
    thematicAxis: "História",
    stage: "intermediate",
    skills: [
      "Analisar transformações sociais e econômicas decorrentes da Revolução Industrial",
      "Identificar os impactos das tecnologias no mundo do trabalho"
    ],
    objectives: [
      "Compreender os fatores que desencadearam a Revolução Industrial",
      "Relacionar a Revolução com o contexto atual de inovações tecnológicas"
    ],
    content: "Origem, fases e consequências da Revolução Industrial.",
    justification: "Esse estudo desenvolve a capacidade de análise histórica e crítica.",
    methodology: "Debates, análise de fontes históricas e linha do tempo colaborativa.",
    resources: ["Livros didáticos", "Mapas históricos", "Computadores", "Internet"],
    duration: "3 semanas"
  },
  {
    id: "plan-003",
    topic: "Matemática Financeira Básica",
    thematicAxis: "Matemática",
    stage: "final",
    skills: [
      "Resolver problemas com porcentagem e juros simples",
      "Aplicar conhecimentos matemáticos em situações do cotidiano"
    ],
    objectives: [
      "Ensinar conceitos básicos de finanças pessoais",
      "Desenvolver autonomia para tomada de decisões econômicas"
    ],
    content: "Porcentagem, descontos, juros simples e planejamento financeiro.",
    justification: "Contribui para o letramento financeiro e responsabilidade pessoal.",
    methodology: "Estudos de caso, simulações e planilhas de controle de gastos.",
    resources: ["Calculadora", "Planilhas digitais", "Simuladores online"],
    duration: "1 mês"
  }
];

const mockDidacticSequence: DidacticSequence = {
  introduction: "Apresentação do tema com perguntas provocativas e vídeo introdutório.",
  development: "Aulas dialogadas com apoio de recursos visuais, leituras e atividades em grupo.",
  application: "Resolução de situações-problema, elaboração de projetos e apresentações orais.",
  evaluationWeek: "Avaliação formativa com autoavaliação, rubricas e entrega de um projeto final."
};

const mockActivities: Activity[] = [
  {
    id: "act-001",
    type: "practice",
    description: "Experimento com materiais recicláveis para construção de filtros de água.",
    research: {
      topics: ["Purificação da água", "Impactos do lixo no meio ambiente"],
      content: ["Etapas do tratamento de água", "Poluição e saúde pública"],
      evaluationCriteria: ["Participação ativa", "Aplicação dos conceitos", "Clareza na apresentação"]
    },
    evaluative: {
      criteria: ["Criatividade", "Domínio do conteúdo", "Trabalho em equipe"]
    }
  },
  {
    id: "act-002",
    type: "exercise",
    description: "Lista de exercícios sobre porcentagem e juros simples.",
    answerKey: "1) 10%, 2) R$ 150,00, 3) R$ 82,50, 4) R$ 105,00, 5) R$ 920,00",
    evaluative: {
      criteria: ["Correção das respostas", "Aplicação dos conceitos matemáticos"]
    },
    leveling: "Usar como reforço para alunos com dificuldade em matemática básica."
  },
  {
    id: "act-003",
    type: "list",
    description: "Atividades de fixação sobre Revolução Industrial.",
    research: {
      topics: ["Fases da Revolução", "Condições de trabalho no século XIX"],
      content: ["Primeira e Segunda Revolução Industrial", "Trabalho infantil"],
      evaluationCriteria: ["Capacidade de síntese", "Conexão com o contexto atual"]
    },
    answerKey: "1) Inglaterra, 2) Máquinas a vapor, 3) Exploração do trabalho infantil, 4) Expansão urbana",
    leveling: "Utilizar para alunos em fase intermediária do conteúdo."
  }
];

const mockSupportMaterial: SupportMaterial = {
  slides: [
    "https://drive.google.com/sustainable-energy-slides",
    "https://drive.google.com/revolucao-industrial-apresentacao"
  ],
  learningNotebook: [
    "Resumo sobre porcentagem e juros simples",
    "Anotações sobre tratamento de água e sustentabilidade"
  ],
  exerciseLists: [
    "Lista de exercícios de Matemática Financeira",
    "Questionário sobre impactos ambientais",
    "Atividades sobre Revolução Industrial"
  ],
  readingsAndMedia: {
    films: [
      "Uma Verdade Inconveniente (2006)",
      "Tempos Modernos (1936)"
    ],
    books: [
      "História Ilustrada da Revolução Industrial",
      "Educação Financeira para Jovens"
    ],
    simulators: [
      "Simulador de juros simples - Banco Central",
      "Simulador de consumo energético doméstico"
    ],
    mindMaps: [
      "Mapa mental sobre fontes de energia",
      "Mapa sobre fases da Revolução Industrial"
    ],
    infographics: [
      "Infográfico: Como funciona uma estação de tratamento de água",
      "Infográfico: Evolução da indústria no século XIX"
    ]
  }
};

const mockEvaluation: Evaluation = {
  criteria: [
    "Participação nas atividades",
    "Compreensão dos conteúdos",
    "Aplicação prática dos conhecimentos",
    "Trabalho em equipe",
    "Organização e autonomia"
  ],
  instruments: [
    "Rubricas avaliativas",
    "Portfólio do aluno",
    "Autoavaliação",
    "Produções escritas",
    "Apresentações orais"
  ],
  selfEvaluation: "Os alunos responderão um questionário reflexivo sobre seu desempenho ao final de cada unidade."
};

const mockDiagnosticEvaluation: DiagnosticEvaluation = {
  initialEvaluation: "Aplicação de questionário diagnóstico para identificar conhecimentos prévios e possíveis dificuldades.",
  periodicEvaluations: [
    "Avaliações bimestrais com foco em habilidades desenvolvidas",
    "Atividades de revisão com exercícios aplicados em grupo",
    "Feedback contínuo com observações em sala"
  ]
};

const mockRegistrationAndFeedback: RegistrationAndFeedback = {
  registrationMethods: [
    "Registro em diário de classe digital",
    "Planilhas de acompanhamento individual",
    "Relatórios mensais de progresso"
  ],
  feedbackMethods: [
    "Devolutiva escrita em avaliações",
    "Rodas de conversa em grupo",
    "Reuniões individuais com alunos e responsáveis"
  ]
};

const mockInclusionAndAccessibility: InclusionAndAccessibility = {
  adaptations: [
    "Materiais com letra ampliada",
    "Atividades com recursos visuais e táteis",
    "Tempo adicional para realização de provas"
  ],
  strategies: [
    "Uso de tecnologias assistivas",
    "Parceria com professores de apoio",
    "Aulas com múltiplas linguagens (visual, auditiva, cinestésica)",
    "Flexibilização do currículo conforme o PEI (Plano Educacional Individualizado)"
  ]
};

const mockPlanningData: PlanningData = {
  id: '1',
  schoolInfo: {
    id: '5',
    school: "Escola Estadual Monte Verde",
    discipline: "Matemática",
    stage: "Ensino Fundamental II",
    grade: "8º ano",
    knowledgeArea: "Ciências da Natureza e Matemática",
    studentCount: 32,
    classes: ["8A", "8B"],
    period: "Matutino",
    trimester: "1º trimestre"
  },
  generalObjectives: [
    {
      id: "obj-001",
      description: "Desenvolver o pensamento crítico e a capacidade de argumentação dos estudantes."
    },
    {
      id: "obj-002",
      description: "Estimular a colaboração em projetos interdisciplinares."
    }
  ],
  trimesterTopics: [
    {
      id: "top-001",
      title: "Energia e suas Transformações",
      competencies: [
        "Compreender os diferentes tipos de energia e suas transformações.",
        "Analisar o impacto do uso de energia no meio ambiente."
      ],
      knowledgeObjects: [
        "Fontes renováveis e não renováveis de energia",
        "Leis da termodinâmica",
        "Eficiência energética"
      ],
      transversalTopics: {
        topics: [
          "Sustentabilidade",
          "Consumo consciente"
        ],
        skills: [
          "Pensamento crítico",
          "Cidadania ambiental"
        ]
      },
      projects: [
        "Construção de maquetes de casas sustentáveis",
        "Campanha de economia de energia na escola"
      ],
      research: {
        topics: [
          "Impactos ambientais da matriz energética brasileira",
          "Inovações tecnológicas para energia limpa"
        ],
        criteria: [
          "Clareza na apresentação",
          "Relevância dos dados utilizados",
          "Aplicabilidade das propostas"
        ],
        contents: [
          "Estatísticas de consumo energético",
          "Estudos de caso sobre fontes alternativas"
        ]
      }
    }
  ],
  detailedPlanning: [
    {
      id: "plan-001",
      topic: "Sustentabilidade e Meio Ambiente",
      thematicAxis: "Ciências da Natureza",
      stage: "initial",
      skills: [
        "Relacionar ações humanas ao impacto ambiental",
        "Interpretar dados sobre poluição e preservação"
      ],
      objectives: [
        "Sensibilizar os alunos sobre a importância da preservação ambiental",
        "Incentivar práticas sustentáveis no cotidiano escolar"
      ],
      content: "Conceitos de sustentabilidade, reciclagem e consumo consciente.",
      justification: "O tema contribui para a formação de cidadãos conscientes e responsáveis.",
      methodology: "Aulas expositivas, rodas de conversa, vídeos temáticos e produção de cartazes.",
      resources: ["Projetor", "Cartolina", "Canetas coloridas", "Vídeos educativos"],
      duration: "2 semanas"
    }
  ],
  didacticSequence: {
    introduction: "Apresentação do tema com perguntas provocativas e vídeo introdutório.",
    development: "Aulas dialogadas com apoio de recursos visuais, leituras e atividades em grupo.",
    application: "Resolução de situações-problema, elaboração de projetos e apresentações orais.",
    evaluationWeek: "Avaliação formativa com autoavaliação, rubricas e entrega de um projeto final."
  },
  activities: [
    {
      id: "act-001",
      type: "practice",
      description: "Experimento com materiais recicláveis para construção de filtros de água.",
      research: {
        topics: ["Purificação da água", "Impactos do lixo no meio ambiente"],
        content: ["Etapas do tratamento de água", "Poluição e saúde pública"],
        evaluationCriteria: ["Participação ativa", "Aplicação dos conceitos", "Clareza na apresentação"]
      },
      evaluative: {
        criteria: ["Criatividade", "Domínio do conteúdo", "Trabalho em equipe"]
      }
    }
  ],
  supportMaterials: {
    slides: [
      "https://drive.google.com/sustainable-energy-slides",
      "https://drive.google.com/revolucao-industrial-apresentacao"
    ],
    learningNotebook: [
      "Resumo sobre porcentagem e juros simples",
      "Anotações sobre tratamento de água e sustentabilidade"
    ],
    exerciseLists: [
      "Lista de exercícios de Matemática Financeira",
      "Questionário sobre impactos ambientais",
      "Atividades sobre Revolução Industrial"
    ],
    readingsAndMedia: {
      films: [
        "Uma Verdade Inconveniente (2006)",
        "Tempos Modernos (1936)"
      ],
      books: [
        "História Ilustrada da Revolução Industrial",
        "Educação Financeira para Jovens"
      ],
      simulators: [
        "Simulador de juros simples - Banco Central",
        "Simulador de consumo energético doméstico"
      ],
      mindMaps: [
        "Mapa mental sobre fontes de energia",
        "Mapa sobre fases da Revolução Industrial"
      ],
      infographics: [
        "Infográfico: Como funciona uma estação de tratamento de água",
        "Infográfico: Evolução da indústria no século XIX"
      ]
    }
  },
  evaluation: {
    criteria: [
      "Participação nas atividades",
      "Compreensão dos conteúdos",
      "Aplicação prática dos conhecimentos",
      "Trabalho em equipe",
      "Organização e autonomia"
    ],
    instruments: [
      "Rubricas avaliativas",
      "Portfólio do aluno",
      "Autoavaliação",
      "Produções escritas",
      "Apresentações orais"
    ],
    selfEvaluation: "Os alunos responderão um questionário reflexivo sobre seu desempenho ao final de cada unidade."
  },
  diagnosticEvaluation: {
    initialEvaluation: "Aplicação de questionário diagnóstico para identificar conhecimentos prévios e possíveis dificuldades.",
    periodicEvaluations: [
      "Avaliações bimestrais com foco em habilidades desenvolvidas",
      "Atividades de revisão com exercícios aplicados em grupo",
      "Feedback contínuo com observações em sala"
    ]
  },
  registrationAndFeedback: {
    registrationMethods: [
      "Registro em diário de classe digital",
      "Planilhas de acompanhamento individual",
      "Relatórios mensais de progresso"
    ],
    feedbackMethods: [
      "Devolutiva escrita em avaliações",
      "Rodas de conversa em grupo",
      "Reuniões individuais com alunos e responsáveis"
    ]
  },
  inclusionAndAccessibility: {
    adaptations: [
      "Materiais com letra ampliada",
      "Atividades com recursos visuais e táteis",
      "Tempo adicional para realização de provas"
    ],
    strategies: [
      "Uso de tecnologias assistivas",
      "Parceria com professores de apoio",
      "Aulas com múltiplas linguagens (visual, auditiva, cinestésica)",
      "Flexibilização do currículo conforme o PEI (Plano Educacional Individualizado)"
    ]
  },
  digitalTechnologies: {
    platforms: [
      "Google Classroom",
      "Khan Academy",
      "Edmodo"
    ],
    activities: {
      synchronous: [
        "Aulas ao vivo via Google Meet",
        "Debates online sobre temas de sustentabilidade"
      ],
      asynchronous: [
        "Leitura de artigos e vídeos no YouTube",
        "Atividades de fixação no Google Classroom"
      ]
    }
  },
  conclusions: "O planejamento permite que os alunos desenvolvam habilidades críticas para um futuro sustentável, com uso de tecnologias digitais e atividades práticas integradas ao conteúdo acadêmico.",
  references: [
    "Manual de Educação Ambiental – MEC",
    "A Revolução Industrial: Impactos e Consequências – História do Brasil",
    "Educação Financeira: O Futuro dos Jovens – Editora Nova"
  ]
};

const mockDigitalTechnologies: DigitalTechnologies = {
  platforms: [
    "Google Classroom",
    "Moodle",
    "Microsoft Teams",
    "Kahoot!",
    "Zoom"
  ],
  activities: {
    synchronous: [
      "Aulas ao vivo via Google Meet",
      "Discussões em tempo real usando Microsoft Teams",
      "Jogos educativos no Kahoot!",
      "Webinars com especialistas via Zoom"
    ],
    asynchronous: [
      "Leitura de artigos no Google Classroom",
      "Vídeos explicativos e tutoriais no YouTube",
      "Fóruns de discussão no Moodle",
      "Atividades de prática e quizzes no Microsoft Teams"
    ]
  }
};


export { 
    mockGeneralObjectives, mockSchoolInfo, mockTopics,
    mockDetailedPlannings, mockDidacticSequence, mockActivities,
    mockSupportMaterial, mockEvaluation, mockDiagnosticEvaluation,
    mockRegistrationAndFeedback, mockInclusionAndAccessibility,
    mockPlanningData, mockDigitalTechnologies
 };
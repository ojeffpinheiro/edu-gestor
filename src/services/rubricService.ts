import { v4 as uuidv4 } from 'uuid';

// Utilizando a tipagem EvaluationRubric já definida no documento
interface EvaluationRubric {
  id: string;
  title: string;
  criteria: {
    id: string;
    description: string;
    weight: number;
    levels: {
      score: number;
      description: string;
    }[];
  }[];
}

// Interface para aplicação de rubrica em avaliações
interface AppliedRubric {
  rubricId: string;
  examId: string;
  questionIds: string[]; // IDs das questões que usam esta rubrica
  createdAt: Date;
  updatedAt: Date;
}

// Dados mockados para uso inicial
const mockRubrics: EvaluationRubric[] = [
  {
    id: "1",
    title: "Avaliação de Apresentação Oral",
    criteria: [
      {
        id: "c1",
        description: "Clareza na comunicação",
        weight: 30,
        levels: [
          { score: 10, description: "Comunicação clara e articulada" },
          { score: 5, description: "Comunicação razoavelmente clara" },
          { score: 0, description: "Comunicação confusa e desorganizada" }
        ]
      },
      {
        id: "c2",
        description: "Domínio do conteúdo",
        weight: 40,
        levels: [
          { score: 10, description: "Demonstra domínio completo do tema" },
          { score: 5, description: "Demonstra conhecimento parcial do tema" },
          { score: 0, description: "Pouco conhecimento do tema apresentado" }
        ]
      },
      {
        id: "c3",
        description: "Recursos visuais",
        weight: 30,
        levels: [
          { score: 10, description: "Recursos visuais excelentes e relevantes" },
          { score: 5, description: "Recursos visuais adequados" },
          { score: 0, description: "Recursos visuais inadequados ou ausentes" }
        ]
      }
    ]
  },
  {
    id: "2",
    title: "Avaliação de Projeto Final",
    criteria: [
      {
        id: "c1",
        description: "Originalidade",
        weight: 25,
        levels: [
          { score: 10, description: "Projeto altamente original e inovador" },
          { score: 5, description: "Projeto com alguns elementos originais" },
          { score: 0, description: "Projeto sem originalidade" }
        ]
      },
      {
        id: "c2",
        description: "Implementação técnica",
        weight: 50,
        levels: [
          { score: 10, description: "Implementação técnica excelente" },
          { score: 5, description: "Implementação técnica satisfatória" },
          { score: 0, description: "Implementação técnica deficiente" }
        ]
      },
      {
        id: "c3",
        description: "Documentação",
        weight: 25,
        levels: [
          { score: 10, description: "Documentação completa e bem estruturada" },
          { score: 5, description: "Documentação adequada mas com falhas" },
          { score: 0, description: "Documentação insuficiente ou ausente" }
        ]
      }
    ]
  }
];

// Dados mockados para rubricas aplicadas
const mockAppliedRubrics: AppliedRubric[] = [
  {
    rubricId: "1",
    examId: "exam1",
    questionIds: ["q1", "q2"],
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15")
  },
  {
    rubricId: "2",
    examId: "exam2",
    questionIds: ["q3", "q4", "q5"],
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date("2024-02-12")
  }
];

// Simulação de delay para simular comunicação com o backend
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Serviço para gerenciamento de rubricas de avaliação
 */
export const getAllRubrics = async (): Promise<EvaluationRubric[]> => {
  try {
    // Simula delay de rede
    await delay(800);
    return [...mockRubrics];
  } catch (error) {
    console.error("Erro ao buscar rubricas:", error);
    throw new Error("Não foi possível buscar as rubricas. Tente novamente mais tarde.");
  }
};

/**
 * Busca uma rubrica específica pelo ID
 * @param id ID da rubrica a ser buscada
 * @returns Promise com a rubrica encontrada ou null
 */
export const getRubricById = async (id: string): Promise<EvaluationRubric | null> => {
  try {
    await delay(500);
    const rubric = mockRubrics.find(r => r.id === id);
    return rubric ? { ...rubric } : null;
  } catch (error) {
    console.error(`Erro ao buscar rubrica com ID ${id}:`, error);
    throw new Error(`Não foi possível buscar a rubrica solicitada. Tente novamente mais tarde.`);
  }
};

/**
 * Cria uma nova rubrica
 * @param rubric Dados da rubrica a ser criada (sem ID)
 * @returns Promise com a rubrica criada (incluindo ID)
 */
export const createRubric = async (rubric: Omit<EvaluationRubric, 'id'>): Promise<EvaluationRubric> => {
  try {
    await delay(1000);
    
    // Gerar IDs para critérios que não tenham
    const criteriaWithIds = rubric.criteria.map(criterion => ({
      ...criterion,
      id: criterion.id || uuidv4()
    }));

    // Criar nova rubrica com ID
    const newRubric: EvaluationRubric = {
      ...rubric,
      id: uuidv4(),
      criteria: criteriaWithIds
    };

    // Em um cenário real, aqui seria feito um POST para o backend
    // Simulação de adição ao array de mock
    mockRubrics.push(newRubric);
    
    return { ...newRubric };
  } catch (error) {
    console.error("Erro ao criar rubrica:", error);
    throw new Error("Não foi possível criar a rubrica. Tente novamente mais tarde.");
  }
};

/**
 * Atualiza uma rubrica existente
 * @param id ID da rubrica a ser atualizada
 * @param rubricData Dados atualizados da rubrica
 * @returns Promise com a rubrica atualizada
 */
export const updateRubric = async (id: string, rubricData: Partial<EvaluationRubric>): Promise<EvaluationRubric> => {
  try {
    await delay(1000);
    
    const index = mockRubrics.findIndex(r => r.id === id);
    
    if (index === -1) {
      throw new Error(`Rubrica com ID ${id} não encontrada`);
    }

    // Atualiza a rubrica existente com os novos dados
    const updatedRubric: EvaluationRubric = {
      ...mockRubrics[index],
      ...rubricData,
      id // Garante que o ID não seja alterado
    };

    // Em um cenário real, aqui seria feito um PUT para o backend
    mockRubrics[index] = updatedRubric;
    
    return { ...updatedRubric };
  } catch (error) {
    console.error(`Erro ao atualizar rubrica com ID ${id}:`, error);
    throw new Error("Não foi possível atualizar a rubrica. Tente novamente mais tarde.");
  }
};

/**
 * Remove uma rubrica
 * @param id ID da rubrica a ser removida
 * @returns Promise com boolean indicando sucesso
 */
export const deleteRubric = async (id: string): Promise<boolean> => {
  try {
    await delay(700);
    
    const index = mockRubrics.findIndex(r => r.id === id);
    
    if (index === -1) {
      throw new Error(`Rubrica com ID ${id} não encontrada`);
    }

    // Em um cenário real, aqui seria feito um DELETE para o backend
    mockRubrics.splice(index, 1);
    
    return true;
  } catch (error) {
    console.error(`Erro ao excluir rubrica com ID ${id}:`, error);
    throw new Error("Não foi possível excluir a rubrica. Tente novamente mais tarde.");
  }
};

/**
 * Busca rubricas filtradas por título
 * @param searchTerm Termo para buscar nos títulos das rubricas
 * @returns Promise com array de rubricas filtradas
 */
export const searchRubrics = async (searchTerm: string): Promise<EvaluationRubric[]> => {
  try {
    await delay(600);
    
    const normalizedSearchTerm = searchTerm.toLowerCase().trim();
    
    if (!normalizedSearchTerm) {
      return [...mockRubrics];
    }
    
    const filteredRubrics = mockRubrics.filter(rubric => 
      rubric.title.toLowerCase().includes(normalizedSearchTerm)
    );
    
    return filteredRubrics.map(rubric => ({ ...rubric }));
  } catch (error) {
    console.error("Erro ao buscar rubricas:", error);
    throw new Error("Não foi possível realizar a busca. Tente novamente mais tarde.");
  }
};

/**
 * Obtém todas as rubricas aplicadas
 * @returns Promise com array de rubricas aplicadas
 */
export const getAppliedRubrics = async (): Promise<AppliedRubric[]> => {
  try {
    await delay(800);
    return [...mockAppliedRubrics];
  } catch (error) {
    console.error("Erro ao buscar rubricas aplicadas:", error);
    throw new Error("Não foi possível buscar as rubricas aplicadas. Tente novamente mais tarde.");
  }
};

/**
 * Aplica uma rubrica a questões específicas de uma prova
 * @param rubricId ID da rubrica a ser aplicada
 * @param examId ID da prova 
 * @param questionIds Array de IDs das questões
 * @returns Promise com a rubrica aplicada
 */
export const applyRubricToExam = async (
  rubricId: string, 
  examId: string, 
  questionIds: string[]
): Promise<AppliedRubric> => {
  try {
    await delay(1000);
    
    // Verifica se a rubrica existe
    const rubric = mockRubrics.find(r => r.id === rubricId);
    if (!rubric) {
      throw new Error(`Rubrica com ID ${rubricId} não encontrada`);
    }
    
    // Verifica se já existe uma aplicação para esta prova e rubrica
    const existingIndex = mockAppliedRubrics.findIndex(
      ar => ar.rubricId === rubricId && ar.examId === examId
    );
    
    const now = new Date();
    
    // Se existir, atualiza
    if (existingIndex >= 0) {
      mockAppliedRubrics[existingIndex].questionIds = questionIds;
      mockAppliedRubrics[existingIndex].updatedAt = now;
      return { ...mockAppliedRubrics[existingIndex] };
    }
    
    // Caso contrário, cria uma nova
    const newAppliedRubric: AppliedRubric = {
      rubricId,
      examId,
      questionIds,
      createdAt: now,
      updatedAt: now
    };
    
    mockAppliedRubrics.push(newAppliedRubric);
    return { ...newAppliedRubric };
  } catch (error) {
    console.error("Erro ao aplicar rubrica:", error);
    throw new Error("Não foi possível aplicar a rubrica. Tente novamente mais tarde.");
  }
};
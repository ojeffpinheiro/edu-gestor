import { DifficultyLevelType, QuestionType } from "./types/Question";

// Tabela de mapeamento tipo de questão para configurações de exibição
export const QUESTION_TYPE_CONFIG: Record<QuestionType, {
  label: string;
  description: string;
  needsAlternatives: boolean;
}> = {
  multiple_choice: {
    label: 'Múltipla Escolha',
    description: 'Selecione a(s) alternativa(s) correta(s) entre as opções',
    needsAlternatives: true
  },
  true_false: {
    label: 'Verdadeiro/Falso',
    description: 'Questão com apenas duas opções: Verdadeiro ou Falso',
    needsAlternatives: true
  },
  essay: {
    label: 'Dissertativa',
    description: 'Resposta longa em formato de texto',
    needsAlternatives: false
  },
  fill_in_the_blank: {
    label: 'Preenchimento',
    description: 'Complete os espaços em branco no texto',
    needsAlternatives: false
  },
  short_answer: {
    label: 'Resposta Curta',
    description: 'Resposta breve em formato de texto',
    needsAlternatives: false
  },
  matching: {
    label: 'Correspondência',
    description: 'Relacione os itens das colunas correspondentes',
    needsAlternatives: true
  },
  ordering: {
    label: 'Ordenação',
    description: 'Organize os itens na sequência correta',
    needsAlternatives: true
  },
  composite: {
    label: 'Composta',
    description: 'Combinação de diferentes tipos de questões',
    needsAlternatives: false
  }
};

// Função auxiliar para obter a configuração
export const getQuestionTypeConfig = (type: QuestionType) => {
  return QUESTION_TYPE_CONFIG[type] || QUESTION_TYPE_CONFIG.multiple_choice;
};

export const FORM_CONFIG = {
  difficulty: {
    easy: {
      label: 'Fácil',
      value: 'easy' as DifficultyLevelType,
      color: 'var(--color-success)'
    },
    medium: {
      label: 'Médio',
      value: 'medium' as DifficultyLevelType,
      color: 'var(--color-warning)'
    },
    hard: {
      label: 'Difícil',
      value: 'hard' as DifficultyLevelType,
      color: 'var(--color-error)'
    }
  },
  questionType: {
    multiple_choice: {
      label: 'Múltipla Escolha',
      value: 'multiple_choice' as QuestionType
    },
    true_false: {
      label: 'Verdadeiro/Falso',
      value: 'true_false' as QuestionType
    },
    essay: {
      label: 'Dissertativa',
      value: 'essay' as QuestionType
    }
  }
};

export const getDifficultyConfig = (level: DifficultyLevelType) => {
  return Object.values(FORM_CONFIG.difficulty).find(d => d.value === level) || FORM_CONFIG.difficulty.medium;
};
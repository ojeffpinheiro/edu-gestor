import * as yup from 'yup';
import { DifficultyLevelType, QuestionType } from '../../types/evaluation/Question';

export const questionBaseSchema = yup.object().shape({
  title: yup.string()
    .required('O título é obrigatório')
    .max(100, 'Máximo de 100 caracteres'),
  statement: yup.string()
    .required('O enunciado é obrigatório')
    .max(2000, 'Máximo de 2000 caracteres'),
  explanation: yup.string()
    .max(1000, 'Máximo de 1000 caracteres'),
  difficultyLevel: yup.string()
    .oneOf<DifficultyLevelType>(['easy', 'medium', 'hard'], 'Selecione uma dificuldade válida')
    .required('A dificuldade é obrigatória'),
  questionType: yup.string()
    .oneOf<QuestionType>(
      ['multiple_choice', 'true_false', 'essay', 'fill_in_the_blank', 'short_answer'],
      'Selecione um tipo válido'
    )
    .required('O tipo de questão é obrigatório'),
});

export const multipleChoiceSchema = questionBaseSchema.concat(yup.object().shape({
  alternatives: yup.array()
    .of(
      yup.object().shape({
        text: yup.string().required('O texto da alternativa é obrigatório'),
        isCorrect: yup.boolean()
      })
    )
    .min(2, 'Mínimo de 2 alternativas')
    .test(
      'has-correct-answer',
      'Selecione pelo menos uma alternativa correta',
      (alternatives) => alternatives?.some(alt => alt.isCorrect)
    )
    .required('As alternativas são obrigatórias'),
}));

export const trueFalseSchema = questionBaseSchema.concat(yup.object().shape({
  alternatives: yup.array()
    .length(2, 'Questões V/F devem ter exatamente 2 alternativas')
    .test(
      'one-true-one-false',
      'Deve haver uma verdadeira e uma falsa',
      (alternatives) => {
        const trueCount = alternatives?.filter(alt => alt.isCorrect).length || 0;
        return trueCount === 1;
      }
    ),
}));

export const essaySchema = questionBaseSchema.concat(yup.object().shape({
  rubric: yup.array()
    .of(
      yup.object().shape({
        criteria: yup.string().required('Critério é obrigatório'),
        levels: yup.array()
          .min(2, 'Mínimo de 2 níveis')
          .required('Níveis são obrigatórios')
      })
    )
    .min(1, 'Mínimo de 1 critério')
}));

export const getQuestionSchema = (questionType: QuestionType) => {
  switch (questionType) {
    case 'multiple_choice':
      return multipleChoiceSchema;
    case 'true_false':
      return trueFalseSchema;
    case 'essay':
      return essaySchema;
    default:
      return questionBaseSchema;
  }
};

export const rubricCriteriaSchema = yup.object().shape({
  description: yup.string().required('Descrição do critério é obrigatória'),
  weight: yup
    .number()
    .required('Peso é obrigatório')
    .min(1, 'Peso mínimo é 1')
    .max(10, 'Peso máximo é 10'),
  levels: yup.array().of(
    yup.object().shape({
      description: yup.string().required('Descrição do nível é obrigatória'),
      points: yup.number().required('Pontos são obrigatórios').min(0),
    })
  ).min(2, 'Mínimo de 2 níveis necessários'),
});

export const alternativeSchema = yup.object().shape({
  text: yup.string().required('Texto da alternativa é obrigatório'),
  isCorrect: yup.boolean(),
});

export const resourceSchema = yup.object().shape({
  type: yup.string().oneOf(['image', 'video', 'link', 'audio']).required('Tipo de recurso é obrigatório'),
  url: yup.string().url('URL inválida').required('URL é obrigatória'),
  description: yup.string(),
});

export const statementSchema = yup.object().shape({
  statement: yup.string()
    .required('O enunciado é obrigatório')
    .max(1000, 'Máximo de 1000 caracteres'),
  explanation: yup.string()
    .max(500, 'Máximo de 500 caracteres'),
});
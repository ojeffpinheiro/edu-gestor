// utils/validationSchemas.ts
import * as yup from 'yup';
import { Exam } from '../types/evaluation/Exam';

export const examSchema = yup.object().shape({
  title: yup.string()
    .required('O título é obrigatório')
    .max(100, 'Título muito longo')
    .trim(),
  discipline: yup.string()
    .required('A disciplina é obrigatória'),
  totalQuestions: yup.number()
    .required()
    .min(1, 'Mínimo de 1 questão')
    .max(100, 'Máximo de 100 questões'),
  // ... outros campos
});

export const validateExamData = (data: Exam) => {
  try {
    examSchema.validateSync(data, { abortEarly: false });
    return { valid: true, errors: {} };
  } catch (err: yup.ValidationError | any) {
    const errors: Record<string, string> = {};
    (err as yup.ValidationError).inner.forEach(error => {
      if (error.path) {
        errors[error.path] = error.message;
      }
    });
    return { valid: false, errors };
  }
};
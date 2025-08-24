import { ExamResult } from "../types/academic/Assessment";

// Mock results for testing
export const mockResults: ExamResult[] = [
    {
        id: 'result1',
        examId: 'exam1',
        studentId: 'student1',
        answers: [
            { questionId: 'q1', answer: 'resposta1', score: 20 },
            { questionId: 'q2', answer: 'resposta2', score: 15 },
            { questionId: 'q3', answer: 'resposta3', score: 18 },
            { questionId: 'q4', answer: 'resposta4', score: 10 },
            { questionId: 'q5', answer: 'resposta5', score: 20 }
        ],
        totalScore: 83,
        completedAt: new Date('2023-03-20')
    },
    {
        id: 'result2',
        examId: 'exam1',
        studentId: 'student2',
        answers: [
            { questionId: 'q1', answer: 'resposta1', score: 18 },
            { questionId: 'q2', answer: 'resposta2', score: 12 },
            { questionId: 'q3', answer: 'resposta3', score: 15 },
            { questionId: 'q4', answer: 'resposta4', score: 8 },
            { questionId: 'q5', answer: 'resposta5', score: 17 }
        ],
        totalScore: 70,
        completedAt: new Date('2023-03-20')
    },
    {
        id: 'result3',
        examId: 'exam1',
        studentId: 'student3',
        answers: [
            { questionId: 'q1', answer: 'resposta1', score: 10 },
            { questionId: 'q2', answer: 'resposta2', score: 8 },
            { questionId: 'q3', answer: 'resposta3', score: 12 },
            { questionId: 'q4', answer: 'resposta4', score: 5 },
            { questionId: 'q5', answer: 'resposta5', score: 10 }
        ],
        totalScore: 45,
        completedAt: new Date('2023-03-21')
    },
    {
        id: 'result4',
        examId: 'exam2',
        studentId: 'student1',
        answers: [
            { questionId: 'q6', answer: 'resposta6', score: 18 },
            { questionId: 'q7', answer: 'resposta7', score: 17 },
            { questionId: 'q8', answer: 'resposta8', score: 19 },
            { questionId: 'q9', answer: 'resposta9', score: 20 },
            { questionId: 'q10', answer: 'resposta10', score: 16 }
        ],
        totalScore: 90,
        completedAt: new Date('2023-03-25')
    }
];

// Mock students for testing
export const mockStudents = {
    'student1': { id: 'student1', name: 'João Silva', email: 'joao@example.com', classId: 'class1' },
    'student2': { id: 'student2', name: 'Maria Oliveira', email: 'maria@example.com', classId: 'class1' },
    'student3': { id: 'student3', name: 'Pedro Santos', email: 'pedro@example.com', classId: 'class2' },
};


export const overviewData = [
  { subject: "Matemática", average: 7.2, national: 6.8 },
  { subject: "Português", average: 8.1, national: 7.5 },
  { subject: "Ciências", average: 6.9, national: 7.0 },
  { subject: "História", average: 7.8, national: 7.2 },
];

export const progressData = [
  { month: "Jan", score: 6.5 },
  { month: "Fev", score: 6.8 },
  { month: "Mar", score: 7.2 },
  { month: "Abr", score: 7.0 },
  { month: "Mai", score: 7.5 },
  { month: "Jun", score: 7.8 },
];

export const distributionData = [
  { range: "0-3", students: 5 },
  { range: "3-5", students: 12 },
  { range: "5-7", students: 28 },
  { range: "7-8", students: 35 },
  { range: "8-10", students: 20 },
];
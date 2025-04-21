import { Content, Question, Topic } from "../utils/types/Question";

export const mockTopics: Topic[] = [
    { id: '1', name: 'Matemática' },
    { id: '2', name: 'Português' },
];

export const mockContents: Content[] = [
    { id: '1', topicId: '1', name: 'Álgebra' },
    { id: '2', topicId: '1', name: 'Geometria' },
    { id: '3', topicId: '2', name: 'Gramática' },
];

export const mockQuestions: Question[] = [
    {
        id: '1',
        contentId: '1',
        statement: 'Qual é o resultado da expressão 2x + 3 = 7?',
        questionType: 'multiple_choice',
        difficultyLevel: 'easy',
        alternatives: [
            { id: '1', text: 'x = 2', isCorrect: true },
            { id: '2', text: 'x = 3', isCorrect: false },
            { id: '3', text: 'x = 4', isCorrect: false },
        ],
        explanation: 'Para resolver essa equação, subtraímos 3 de ambos os lados: 2x = 4. Depois dividimos por 2: x = 2.',
        createdAt: '2023-05-15T10:30:00Z',
        updatedAt: '2023-05-15T10:30:00Z',
        status: 'active',
    },
    {
        id: '2',
        contentId: '2',
        statement: 'Qual é a área de um círculo de raio 5 cm?',
        questionType: 'multiple_choice',
        difficultyLevel: 'medium',
        alternatives: [
            { id: '1', text: '25π cm²', isCorrect: true },
            { id: '2', text: '10π cm²', isCorrect: false },
            { id: '3', text: '5π cm²', isCorrect: false },
        ],
        explanation: 'A área do círculo é calculada pela fórmula A = πr², onde r é o raio. Substituindo r = 5, temos A = π×5² = 25π cm².',
        createdAt: '2023-05-16T14:20:00Z',
        updatedAt: '2023-05-16T14:20:00Z',
        status: 'active',
    },
    {
        id: '3',
        contentId: '3',
        statement: 'A palavra "casa" é um substantivo:',
        questionType: 'true_false',
        difficultyLevel: 'easy',
        alternatives: [
            { id: '1', text: 'Verdadeiro', isCorrect: true },
            { id: '2', text: 'Falso', isCorrect: false },
        ],
        explanation: '"Casa" é um substantivo comum, concreto e simples.',
        createdAt: '2023-05-17T09:45:00Z',
        updatedAt: '2023-05-17T09:45:00Z',
        status: 'active',
    },
    {
        id: '4',
        contentId: '3',
        statement: 'Explique a diferença entre sujeito e predicado em uma oração.',
        questionType: 'essay',
        difficultyLevel: 'hard',
        alternatives: [],
        explanation: 'O sujeito é o termo da oração que representa o ser sobre o qual se declara alguma coisa, enquanto o predicado é o termo que contém o verbo e apresenta uma informação sobre o sujeito.',
        createdAt: '2023-05-18T11:10:00Z',
        updatedAt: '2023-05-18T11:10:00Z',
        status: 'active',
    },
];
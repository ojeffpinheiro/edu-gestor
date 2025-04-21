import { Equation } from "../utils/types/Topic";

export const initialEquations: Equation[] = [
    {
        id: '1',
        latex: 'S = S_0 + v \\cdot t',
        name: 'Função Horária da Posição (MU)',
        description: 'Determina a posição de um móvel em movimento uniforme em função do tempo',
        variables: [
            { symbol: 'S', name: 'posição final', unit: 'm' },
            { symbol: 'S_0', name: 'posição inicial', unit: 'm' },
            { symbol: 'v', name: 'velocidade', unit: 'm/s' },
            { symbol: 't', name: 'tempo', unit: 's' }
        ],
        tags: ['cinemática', 'MU', 'mecânica'],
        topics: ['movimento-uniforme', 'cinemática'],
        createdAt: new Date('2023-05-15')
    },
    {
        id: '2',
        latex: '\\Delta S = v \\cdot \\Delta t',
        name: 'Deslocamento no MU',
        description: 'Calcula o deslocamento de um móvel em movimento uniforme',
        variables: [
            { symbol: '\\Delta S', name: 'deslocamento', unit: 'm' },
            { symbol: 'v', name: 'velocidade', unit: 'm/s' },
            { symbol: '\\Delta t', name: 'intervalo de tempo', unit: 's' }
        ],
        tags: ['cinemática', 'MU', 'mecânica'],
        topics: ['movimento-uniforme', 'cinemática'],
        createdAt: new Date('2023-05-15')
    },
    {
        id: '3',
        latex: 'v = \\frac{\\Delta S}{\\Delta t}',
        name: 'Velocidade Média',
        description: 'Calcula a velocidade média de um móvel',
        variables: [
            { symbol: 'v', name: 'velocidade média', unit: 'm/s' },
            { symbol: '\\Delta S', name: 'deslocamento', unit: 'm' },
            { symbol: '\\Delta t', name: 'intervalo de tempo', unit: 's' }
        ],
        tags: ['cinemática', 'MU', 'mecânica'],
        topics: ['movimento-uniforme', 'cinemática'],
        createdAt: new Date('2023-05-16')
    },
    {
        id: '4',
        latex: 't = \\frac{\\Delta S}{v}',
        name: 'Tempo no MU',
        description: 'Calcula o tempo necessário para um deslocamento com velocidade constante',
        variables: [
            { symbol: 't', name: 'tempo', unit: 's' },
            { symbol: '\\Delta S', name: 'deslocamento', unit: 'm' },
            { symbol: 'v', name: 'velocidade', unit: 'm/s' }
        ],
        tags: ['cinemática', 'MU'],
        topics: ['movimento-uniforme', 'cinemática'],
        createdAt: new Date('2023-05-16')
    },
    {
        id: '5',
        latex: 'S - S_0 = v \\cdot t',
        name: 'Equação de deslocamento alternativa',
        description: 'Forma alternativa para calcular o deslocamento no MU',
        variables: [
            { symbol: 'S', name: 'posição final', unit: 'm' },
            { symbol: 'S_0', name: 'posição inicial', unit: 'm' },
            { symbol: 'v', name: 'velocidade', unit: 'm/s' },
            { symbol: 't', name: 'tempo', unit: 's' }
        ],
        tags: ['cinemática', 'MU', 'equação'],
        topics: ['movimento-uniforme'],
        createdAt: new Date('2023-05-17')
    }
];
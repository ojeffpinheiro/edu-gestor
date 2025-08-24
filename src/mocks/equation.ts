// mocks/equation.ts
import { Equation, SymbolCategory } from '../types/academic/Topic';

/**
 * Dados iniciais para o sistema de equações
 */
export const initialEquations: Equation[] = [
  {
    id: 'eq1',
    name: 'Lei de Ohm',
    description: 'Relaciona tensão, corrente e resistência em um circuito elétrico',
    latex: 'V = I \\cdot R',
    variables: [
      { symbol: 'V', name: 'Tensão', unit: ['V'] },
      { symbol: 'I', name: 'Corrente', unit: ['A'] },
      { symbol: 'R', name: 'Resistência', unit: ['Ω'] }
    ],
    tags: ['Eletricidade', 'Física', 'Circuitos'],
    topics: ['Eletromagnetismo', 'Circuitos Elétricos'],
    createdAt: new Date('2023-01-15')
  },
  {
    id: 'eq2',
    name: 'Equação Quadrática',
    description: 'Fórmula para encontrar as raízes de uma equação de segundo grau',
    latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
    variables: [
      { symbol: 'x', name: 'Incógnita', unit: [''] },
      { symbol: 'a', name: 'Coeficiente de x²', unit: [''] },
      { symbol: 'b', name: 'Coeficiente de x', unit: ['']},
      { symbol: 'c', name: 'Termo constante', unit: [''] }
    ],
    tags: ['Álgebra', 'Matemática', 'Polinômios'],
    topics: ['Equações', 'Polinômios de 2º grau'],
    createdAt: new Date('2023-02-10')
  },
  {
    id: '1',
    latex: 'S = S_0 + v \\cdot t',
    name: 'Função Horária da Posição (MU)',
    description: 'Determina a posição de um móvel em movimento uniforme em função do tempo',
    variables: [
        { symbol: 'S', name: 'posição final', unit: ['m'] },
        { symbol: 'S_0', name: 'posição inicial', unit: ['m'] },
        { symbol: 'v', name: 'velocidade', unit: ['m/s'] },
        { symbol: 't', name: 'tempo', unit: ['s'] }
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
        { symbol: '\\Delta S', name: 'deslocamento', unit: ['m'] },
        { symbol: 'v', name: 'velocidade', unit: ['m/s'] },
        { symbol: '\\Delta t', name: 'intervalo de tempo', unit: ['s'] }
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
        { symbol: 'v', name: 'velocidade média', unit: ['m/s' ]},
        { symbol: '\\Delta S', name: 'deslocamento', unit: ['m'] },
        { symbol: '\\Delta t', name: 'intervalo de tempo', unit: ['s'] }
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
        { symbol: 't', name: 'tempo', unit: ['s'] },
        { symbol: '\\Delta S', name: 'deslocamento', unit: ['m'] },
        { symbol: 'v', name: 'velocidade', unit: ['m/s'] }
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
        { symbol: 'S', name: 'posição final', unit: ['m'] },
        { symbol: 'S_0', name: 'posição inicial', unit: ['m'] },
        { symbol: 'v', name: 'velocidade', unit: ['m/s'] },
        { symbol: 't', name: 'tempo', unit: ['s'] }
    ],
    tags: ['cinemática', 'MU', 'equação'],
    topics: ['movimento-uniforme'],
    createdAt: new Date('2023-05-17')
}
];

/**
 * Categorias de símbolos para o editor de equações
 */
export const symbolCategories: SymbolCategory[] = [
  {
    id: 'basic',
    title: 'Básicos',
    symbols: [
      { display: '+', insert: '+', tooltip: 'Adição' },
      { display: '-', insert: '-', tooltip: 'Subtração' },
      { display: '×', insert: '\\cdot', tooltip: 'Multiplicação' },
      { display: '÷', insert: '\\div', tooltip: 'Divisão' },
      { display: '=', insert: '=', tooltip: 'Igualdade' },
      { display: '≠', insert: '\\neq', tooltip: 'Diferente' },
      { display: '±', insert: '\\pm', tooltip: 'Mais ou menos' }
    ]
  },
  {
    id: 'exponents',
    title: 'Expoentes & Índices',
    symbols: [
      { display: 'x²', insert: '^{2}', tooltip: 'Quadrado' },
      { display: 'x³', insert: '^{3}', tooltip: 'Cubo' },
      { display: 'xⁿ', insert: '^{}', tooltip: 'Potência n' },
      { display: '√x', insert: '\\sqrt{}', tooltip: 'Raiz quadrada' },
      { display: '∛x', insert: '\\sqrt[3]{}', tooltip: 'Raiz cúbica' },
      { display: 'log', insert: '\\log_{}', tooltip: 'Logaritmo' }
    ]
  },
  {
    id: 'fractions',
    title: 'Frações',
    symbols: [
      { display: '½', insert: '\\frac{1}{2}', tooltip: 'Fração simples' },
      { display: 'a/b', insert: '\\frac{}{}}', tooltip: 'Fração' }
    ]
  },
  {
    id: 'greek',
    title: 'Letras Gregas',
    symbols: [
      { display: 'α', insert: '\\alpha', tooltip: 'Alpha' },
      { display: 'β', insert: '\\beta', tooltip: 'Beta' },
      { display: 'γ', insert: '\\gamma', tooltip: 'Gamma' },
      { display: 'Γ', insert: '\\Gamma', tooltip: 'Gamma maiúsculo' },
      { display: 'π', insert: '\\pi', tooltip: 'Pi' },
      { display: 'Σ', insert: '\\Sigma', tooltip: 'Sigma maiúsculo' },
      { display: 'Δ', insert: '\\Delta', tooltip: 'Delta maiúsculo' },
      { display: 'δ', insert: '\\delta', tooltip: 'Delta' },
      { display: 'θ', insert: '\\theta', tooltip: 'Theta' }
    ]
  }
];
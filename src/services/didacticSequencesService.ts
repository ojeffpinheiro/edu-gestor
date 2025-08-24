// src/services/didacticSequencesService.ts

import { DidacticSequence, DisciplineType } from '../types/academic/DidacticSequence';
import { v4 as uuidv4 } from 'uuid';

// Dados mocados
const mockSequences: DidacticSequence[] = [
  {
    id: 'seq-001',
    title: 'Leis de Newton',
    discipline: 'Ciências',
    author: 'Professor A',
    thematicAxis: 'Física',
    sequence: 'Exploração das três leis de Newton através de experimentos práticos.',
    educationLevel: 'Fundamental II',
    workload: 5,
    overview: 'Esta sequência aborda as Leis de Newton com experimentos que permitem a observação e compreensão das forças em ação.',
    skills: ['Identificar forças', 'Relacionar força e movimento'],
    bnccCodes: ['EF09CI01', 'EF09CI02'],
    lessonsCount: 3,
    objectives: ['Compreender as Leis de Newton', 'Aplicar os conceitos em situações reais'],
    createdAt: '2025-03-29T10:00:00Z',
    updatedAt: '2025-03-29T10:00:00Z',
    status: 'active',
    stages: []
  },
  {
    id: 'seq-002',
    title: 'Sistema Solar',
    discipline: 'Ciências',
    author: 'Professor B',
    thematicAxis: 'Astronomia',
    sequence: 'Estudo sobre os planetas, luas e outros corpos celestes.',
    educationLevel: 'Fundamental I',
    workload: 4,
    overview: 'Introdução ao Sistema Solar, seus planetas e movimentos.',
    skills: ['Identificar os planetas', 'Compreender o movimento dos astros'],
    bnccCodes: ['EF04CI01', 'EF04CI02'],
    lessonsCount: 2,
    objectives: ['Conhecer os planetas do Sistema Solar', 'Entender o movimento de rotação e translação'],
    createdAt: '2025-03-29T11:00:00Z',
    updatedAt: '2025-03-29T11:00:00Z',
    status: 'draft',
    stages: []
  },
  {
    id: 'seq-003',
    title: 'Ciclo da Água',
    discipline: 'Ciências',
    author: 'Professor C',
    thematicAxis: 'Meio Ambiente',
    sequence: 'Exploração do ciclo da água e sua importância para a natureza.',
    educationLevel: 'Fundamental I',
    workload: 3,
    overview: 'Aprendizado sobre evaporação, condensação e precipitação.',
    skills: ['Entender o ciclo da água', 'Relacionar com fenômenos naturais'],
    bnccCodes: ['EF05CI03', 'EF05CI04'],
    lessonsCount: 2,
    objectives: ['Compreender o ciclo da água', 'Relacionar com o clima'],
    createdAt: '2025-03-29T12:00:00Z',
    updatedAt: '2025-03-29T12:00:00Z',
    status: 'active',
    stages: []
  },
  {
    id: 'seq-004',
    title: 'Geometria Espacial',
    discipline: 'Matemática',
    author: 'Professor D',
    thematicAxis: 'Geometria',
    sequence: 'Estudo de figuras tridimensionais e cálculo de volumes.',
    educationLevel: 'Fundamental II',
    workload: 5,
    overview: 'Exploração de formas geométricas espaciais e seus cálculos.',
    skills: ['Calcular volume', 'Reconhecer formas tridimensionais'],
    bnccCodes: ['EF08MA01', 'EF08MA02'],
    lessonsCount: 3,
    objectives: ['Compreender sólidos geométricos', 'Aplicar fórmulas em exercícios'],
    createdAt: '2025-03-29T13:00:00Z',
    updatedAt: '2025-03-29T13:00:00Z',
    status: 'completed',
    stages: []
  }
];

// Funções do serviço
export const didacticSequencesService = {
  // Obter todas as sequências
  getSequences: async (): Promise<DidacticSequence[]> => {
    // Simulando uma chamada assíncrona
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockSequences]);
      }, 500);
    });
  },

  // Filtrar por disciplina
  getSequencesByDiscipline: async (discipline: DisciplineType): Promise<DidacticSequence[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredSequences = mockSequences.filter(seq => seq.discipline === discipline);
        resolve(filteredSequences);
      }, 500);
    });
  },

  // Obter uma sequência específica
  getSequenceById: async (id: string): Promise<DidacticSequence | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const sequence = mockSequences.find(seq => seq.id === id) || null;
        resolve(sequence);
      }, 300);
    });
  },

  // Criar uma nova sequência
  createSequence: async (sequenceData: Omit<DidacticSequence, 'id' | 'createdAt' | 'updatedAt'>): Promise<DidacticSequence> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newSequence: DidacticSequence = {
          ...sequenceData,
          id: uuidv4(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        mockSequences.push(newSequence);
        resolve(newSequence);
      }, 700);
    });
  },

  // Atualizar uma sequência existente
  updateSequence: async (id: string, sequenceData: Partial<Omit<DidacticSequence, 'id' | 'createdAt' | 'updatedAt'>>): Promise<DidacticSequence | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockSequences.findIndex(seq => seq.id === id);
        
        if (index === -1) {
          resolve(null);
          return;
        }
        
        const updatedSequence: DidacticSequence = {
          ...mockSequences[index],
          ...sequenceData,
          updatedAt: new Date().toISOString()
        };
        
        mockSequences[index] = updatedSequence;
        resolve(updatedSequence);
      }, 700);
    });
  },

  // Excluir uma sequência
  deleteSequence: async (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockSequences.findIndex(seq => seq.id === id);
        
        if (index === -1) {
          resolve(false);
          return;
        }
        
        mockSequences.splice(index, 1);
        resolve(true);
      }, 500);
    });
  }
};
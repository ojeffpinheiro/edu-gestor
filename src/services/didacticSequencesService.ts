// src/services/didacticSequencesService.ts
import { DidacticSequence, SequenceStage } from '../utils/types/DidacticSequence';
import { v4 as uuidv4 } from 'uuid';

// Simulação de uma API com armazenamento local
// Em um ambiente real, isso seria substituído por chamadas HTTP para um backend

// Armazenamento local (mock)
let sequences: DidacticSequence[] = [];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const didacticSequencesService = {
  // Obter todas as sequências didáticas
  getAll: async (): Promise<DidacticSequence[]> => {
    await delay(500); // Simula latência de rede
    return [...sequences];
  },

  // Obter sequência por ID
  getById: async (id: string): Promise<DidacticSequence | undefined> => {
    await delay(300);
    return sequences.find(sequence => sequence.id === id);
  },

  // Filtrar sequências por disciplina
  getByDiscipline: async (discipline: string): Promise<DidacticSequence[]> => {
    await delay(300);
    return sequences.filter(sequence => sequence.discipline === discipline);
  },

  // Criar nova sequência
  create: async (sequenceData: Omit<DidacticSequence, 'id' | 'createdAt' | 'updatedAt' | 'totalDuration'>): Promise<DidacticSequence> => {
    await delay(700);
    
    // Calcular duração total com base nas etapas
    const totalDuration = sequenceData.stages.reduce((total, stage) => total + stage.duration, 0);
    
    const newSequence: DidacticSequence = {
      ...sequenceData,
      id: uuidv4(),
      totalDuration,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    sequences.push(newSequence);
    return newSequence;
  },

  // Atualizar sequência existente
  update: async (id: string, sequenceData: Partial<Omit<DidacticSequence, 'id' | 'createdAt' | 'updatedAt'>>): Promise<DidacticSequence | undefined> => {
    await delay(500);
    
    const index = sequences.findIndex(sequence => sequence.id === id);
    
    if (index === -1) return undefined;
    
    // Recalcular duração total se as etapas foram atualizadas
    let totalDuration = sequences[index].totalDuration;
    if (sequenceData.stages) {
      totalDuration = sequenceData.stages.reduce((total, stage) => total + stage.duration, 0);
    }
    
    sequences[index] = {
      ...sequences[index],
      ...sequenceData,
      totalDuration,
      updatedAt: new Date()
    };
    
    return sequences[index];
  },

  // Adicionar uma nova etapa à sequência
  addStage: async (sequenceId: string, stageData: Omit<SequenceStage, 'id'>): Promise<DidacticSequence | undefined> => {
    await delay(400);
    
    const index = sequences.findIndex(sequence => sequence.id === sequenceId);
    
    if (index === -1) return undefined;
    
    const newStage: SequenceStage = {
      ...stageData,
      id: uuidv4()
    };
    
    sequences[index].stages.push(newStage);
    sequences[index].totalDuration += stageData.duration;
    sequences[index].updatedAt = new Date();
    
    return sequences[index];
  },

  // Deletar uma sequência
  delete: async (id: string): Promise<boolean> => {
    await delay(600);
    
    const initialLength = sequences.length;
    sequences = sequences.filter(sequence => sequence.id !== id);
    
    return sequences.length !== initialLength;
  }
};
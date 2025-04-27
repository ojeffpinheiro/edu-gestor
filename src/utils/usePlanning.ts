/* Hook personalizado para cálculos de planejamento
 */
import { useMemo } from 'react';
import { PlanningData } from './types/planningDashboard'

/**
 * Calcula percentuais de conclusão para um planejamento
 * 
 * @param total - Total de itens
 * @param completed - Itens concluídos
 * @param partial - Itens parcialmente concluídos (opcional)
 * @returns Objeto com percentuais calculados
 */
export const calculateCompletionPercentages = (
  total: number,
  completed: number,
  partial?: number
) => {
  // Evita divisão por zero
  if (total <= 0) {
    return {
      completePercent: 0,
      pendingPercent: 0,
      partialPercent: 0
    };
  }

  // Calcula os percentuais arredondados para inteiros
  const completePercent = Math.round((completed / total) * 100);
  const partialPercent = partial ? Math.round((partial / total) * 100) : 0;
  
  // Garante que o total seja exatamente 100%
  const pendingPercent = 100 - completePercent - partialPercent;

  return {
    completePercent,
    pendingPercent,
    partialPercent
  };
};

/**
 * Hook que calcula os percentuais de conclusão de um planejamento
 * 
 * @param planning - Dados do planejamento
 * @returns Objeto com percentuais calculados e métodos para atualização
 */
export const usePlanning = (planning: PlanningData) => {
  const { title, completo, pendente, parcial = 0 } = planning;
  const total = completo + pendente + parcial;

  // Calcula os percentuais apenas quando os valores mudam
  const percentages = useMemo(() => 
    calculateCompletionPercentages(total, completo, parcial),
    [total, completo, parcial]
  );

  return {
    title,
    total,
    completo,
    pendente,
    parcial,
    ...percentages
  };
};
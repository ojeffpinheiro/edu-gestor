/**
 * components/PlanningCard.tsx
 * Componente de cartão de planejamento refatorado com barra multi-colorida
 */
import React, { memo } from 'react';
import { PlanningCardWrapper, ProgressBar } from "./styles";
import { PlanningData } from '../../utils/types/planningDashboard';
import { usePlanning } from '../../utils/usePlanning';

/**
 * Componente para exibir um cartão de planejamento com barra de progresso multicolorida
 * 
 * @param title - Título do planejamento
 * @param completo - Número de itens completos
 * @param pendente - Número de itens pendentes
 * @param parcial - Número opcional de itens parcialmente completos
 */
export const PlanningCard: React.FC<PlanningData> = memo(({ 
  title, 
  completo, 
  pendente, 
  parcial = 0 // Valor padrão para evitar erros
}) => {
  // Usa o hook personalizado para cálculos
  const { completePercent, pendingPercent, partialPercent } = usePlanning({
    title,
    completo,
    pendente,
    parcial
  });

  // Texto para descrever o status completo da barra para acessibilidade
  const accessibilityText = `${completePercent}% concluído, ${partialPercent}% parcial, ${pendingPercent}% pendente`;

  return (
    <PlanningCardWrapper>
      <h3>{title}</h3>
      
      {/* Barra de progresso multicolorida acessível */}
      <ProgressBar 
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={completePercent}
        aria-label={accessibilityText}
      >
        <div 
          className="complete" 
          style={{ width: `${completePercent}%` }}
          title={`${completePercent}% concluído`}
        />
        <div 
          className="partial" 
          style={{ width: `${partialPercent}%` }}
          title={`${partialPercent}% parcial`}
        />
        <div 
          className="pending" 
          style={{ width: `${pendingPercent}%` }}
          title={`${pendingPercent}% pendente`}
        />
      </ProgressBar>
      
      {/* Status detalhado com cores semânticas e legenda */}
      <div className="mt-2 flex justify-between text-sm">
        <span className="text-green-600" title="Porcentagem concluída">
          {completePercent}% concluído
        </span>
        {parcial > 0 && (
          <span className="text-yellow-600" title="Porcentagem parcialmente concluída">
            {partialPercent}% parcial
          </span>
        )}
        <span className="text-red-600" title="Porcentagem pendente">
          {pendingPercent}% pendente
        </span>
      </div>
    </PlanningCardWrapper>
  );
});
import React from 'react'
import { WeightSummaryContainer, WeightWarning } from "./styles";

// Componente para mostrar o resumo de peso total
export const WeightSummary: React.FC<{ weight: number }> = ({ weight }) => {
    const isValid = weight === 100;
    
    return (
      <WeightSummaryContainer isValid={isValid}>
        <div>
          <strong>Peso Total:</strong> {weight}%
        </div>
        {!isValid && (
          <WeightWarning>
            {weight < 100 
              ? `Faltam ${100 - weight}% para completar 100%` 
              : `Excede em ${weight - 100}% o limite de 100%`}
          </WeightWarning>
        )}
      </WeightSummaryContainer>
    );
  };
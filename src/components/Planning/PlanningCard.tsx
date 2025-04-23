import React from 'react'
import styled from "styled-components";
import { calculateCompletionPercentages } from '../../hooks/usePlanning';

export const PlanningCardWrapper = styled.div`
  padding: 1rem;
  border: 1px solid var(--color-border-light);
  border-radius: 0.5rem;
  background-color: var(--color-background-secondary);
`;

export const ProgressBar = styled.div<{ $progress: number }>`
  position: relative;
  width: 100%;
  height: 8px;
  background-color: var(--color-success);
  border-radius: 4px;
  overflow: hidden;

  & > div {
    width: ${({ $progress }) => $progress}%;
    height: 100%;
    background-color: var(--color-feedback-success);
  }
`;

interface PlanningCardProps {
    title: string;
    completo: number;
    pendente: number;
    parcial?: number;
}

// Components
export const PlanningCard: React.FC<PlanningCardProps> = ({ title, completo, pendente, parcial }) => {
  const { completePercent, pendingPercent, partialPercent } = calculateCompletionPercentages(
    completo + pendente + (parcial || 0), completo, parcial
  );

  return (
    <PlanningCardWrapper>
      <h3>{title}</h3>
      <ProgressBar $progress={completePercent}>
        <div></div>
      </ProgressBar>
      <div className="mt-2 flex justify-between text-sm">
        <span className="text-green-600">{completePercent}% concluído</span>
        {parcial !== undefined && (
          <span className="text-yellow-600">{partialPercent}% parcial</span>
        )}
        <span className="text-red-600">{pendingPercent}% pendente</span>
      </div>
    </PlanningCardWrapper>
  );
};
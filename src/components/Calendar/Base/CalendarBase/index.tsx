import React from 'react';

import {
  CalendarContainer,
  CalendarHeader,
  CalendarTitle,
  CalendarControls,
  NavButton,
  TodayButton,
  CalendarContent,
  ViewControlsWrapper
} from './styles';

interface CalendarBaseProps {
  title: string;
  onPrev: () => void;
  onNext: () => void;
  onToday?: () => void;
  children: React.ReactNode;
  viewControls?: React.ReactNode;
}

export const CalendarBase: React.FC<CalendarBaseProps> = ({
  title,
  onPrev,
  onNext,
  onToday,
  children,
  viewControls
}) => {
  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>{title}</CalendarTitle>
        <CalendarControls>
          {viewControls && <ViewControlsWrapper>{viewControls}</ViewControlsWrapper>}
          <NavButton onClick={onPrev} aria-label="Período anterior">
            <ChevronLeft />
          </NavButton>
          {onToday && (
            <TodayButton onClick={onToday}>
              Hoje
            </TodayButton>
          )}
          <NavButton onClick={onNext} aria-label="Próximo período">
            <ChevronRight />
          </NavButton>
        </CalendarControls>
      </CalendarHeader>
      <CalendarContent>
        {children}
      </CalendarContent>
    </CalendarContainer>
  );
};

// Componentes de ícone (simplificados)
const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
  </svg>
);
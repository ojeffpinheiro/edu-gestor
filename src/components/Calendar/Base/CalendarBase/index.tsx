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
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

interface CalendarBaseProps {
  title: string;
  onPrev: () => void;
  onNext: () => void;
  onToday?: () => void;
  children: React.ReactNode;
  viewControls?: React.ReactNode;
}

const CalendarBase: React.FC<CalendarBaseProps> = ({
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
            <FaAngleLeft />
          </NavButton>
          {onToday && (
            <TodayButton onClick={onToday}>
              Hoje
            </TodayButton>
          )}
          <NavButton onClick={onNext} aria-label="Próximo período">
            <FaAngleRight />
          </NavButton>
        </CalendarControls>
      </CalendarHeader>
      <CalendarContent>
        {children}
      </CalendarContent>
    </CalendarContainer>
  );
};

export default CalendarBase;
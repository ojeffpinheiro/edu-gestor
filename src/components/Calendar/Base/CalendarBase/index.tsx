import React from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

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

/**
 * Props do componente CalendarBase
 * @typedef {Object} CalendarBaseProps
 * @property {string} title - Título exibido no cabeçalho
 * @property {function} onPrev - Callback para navegação anterior
 * @property {function} onNext - Callback para navegação seguinte
 * @property {function} [onToday] - Callback para voltar à data atual
 * @property {React.ReactNode} children - Conteúdo do calendário
 * @property {React.ReactNode} [viewControls] - Controles de visualização opcionais
 */
interface CalendarBaseProps {
  title: string;
  onPrev: () => void;
  onNext: () => void;
  onToday?: () => void;
  children: React.ReactNode;
  viewControls?: React.ReactNode;
}

/**
 * Componente base que fornece a estrutura comum para todas as visualizações do calendário
 * @param {CalendarBaseProps} props - Props do componente
 * @returns {JSX.Element} Estrutura base do calendário com cabeçalho e controles
 */
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
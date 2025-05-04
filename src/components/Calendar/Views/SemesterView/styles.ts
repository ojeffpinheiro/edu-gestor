import styled from "styled-components";
import { constants } from "../../../../utils/consts";

// Adicione estes novos componentes no final do arquivo
export const SemesterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${constants.spacing.md};
`;

export const SemesterHeader = styled.div`
  display: flex;
  justify-content: center;
  gap: ${constants.spacing.md};
  margin-bottom: ${constants.spacing.sm};
`;

export const NavigationButton = styled.button<{ isActive: boolean }>`
  padding: ${constants.spacing.sm} ${constants.spacing.md};
  background-color: ${props => 
    props.isActive 
      ? `${constants.colors.primary}20` 
      : constants.colors.background.secondary};
  color: ${props => 
    props.isActive 
      ? constants.colors.primary 
      : constants.colors.text.secondary};
  border: 1px solid ${props => 
    props.isActive 
      ? constants.colors.primary 
      : constants.colors.border.light};
  border-radius: ${constants.borderRadius.md};
  cursor: pointer;
  font-weight: ${props => props.isActive ? 'bold' : 'normal'};
  transition: all ${constants.transitions.fast};

  &:hover {
    background-color: ${props => 
      props.isActive 
        ? `${constants.colors.primary}30` 
        : constants.colors.background.third};
  }
`;

// Atualize o MonthsGrid para um layout mais compacto
export const MonthsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${constants.spacing.md};
  margin-top: ${constants.spacing.sm};

  @media (max-width: ${constants.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${constants.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

// Atualize o MonthContainer para um tamanho menor
export const MonthContainer = styled.div`
  border: 1px solid ${constants.colors.border.light};
  border-radius: ${constants.borderRadius.md};
  padding: ${constants.spacing.sm};
  background: ${constants.colors.background.secondary};
  min-width: 0; // Permite que o grid controle o tamanho
`;
import styled from "styled-components";
import { constants } from "../../../../utils/consts";

export const QuarterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${constants.spacing.md};
`;

export const QuarterHeader = styled.div`
  display: flex;
  justify-content: center;
  gap: ${constants.spacing.sm};
  margin-bottom: ${constants.spacing.sm};
  flex-wrap: wrap;

  @media (max-width: ${constants.breakpoints.sm}) {
    gap: ${constants.spacing.xs};
  }
`;

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

export const MonthContainer = styled.div`
  border: 1px solid ${constants.colors.border.light};
  border-radius: ${constants.borderRadius.md};
  padding: ${constants.spacing.sm};
  background: ${constants.colors.background.secondary};
  min-width: 0;
`;
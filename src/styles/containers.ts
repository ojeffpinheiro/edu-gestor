import styled from "styled-components";
import { BaseCard } from "./baseComponents";
import { slideUp } from "./animations";
import { mixins } from "./mixins";
import { constants } from "../utils/consts";

export const FormContainer = styled(BaseCard)`
  background-color: var(--color-background-secondary);
  border: 1px solid var(--color-border-light);
  margin-bottom: 1.5rem;
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    
    label {
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
      font-weight: var(--font-weight-medium);
    }
  }
`;

export const FormCard = styled.section`
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius-md);
  padding: var(--space-lg);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border-light);
  animation: ${slideUp} 0.3s ease;
  transition: all 0.2s ease-in-out;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }
`;

export const ScrollableEventsContainer = styled.div`
  overflow-y: auto;
  max-height: calc(100% - 30px);
  ${mixins.scrollbarStyle}
`;

export const ViewToggleContainer = styled.div`
  display: flex;
  margin-bottom: ${constants.spacing.md};
`;

export const PageContainer = styled.div`
  max-width: 95vw;
  margin: 0 auto;
  padding: var(--space-xl);
  position: relative;
  min-height: 500px;
`;

export const Section = styled.div`
  background: var(--color-background-secondary);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;
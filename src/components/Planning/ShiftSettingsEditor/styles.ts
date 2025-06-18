import styled from "styled-components";
import { ModalContent, ModalBody } from "../../../styles/modals";

export const PeriodItem = styled.div`
  background: var(--color-background-secondary);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

export const PeriodGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1rem;
`;

export const PeriodActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
`;

export const PeriodSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--color-border);
  background-color: var(--color-background);
  font-size: 0.95rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
  }
`;

export const ModalHeaderTitle = styled.h3`
  margin: 0;
  font-size: 1.5rem;
  color: var(--color-text-primary);
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const SectionTitle = styled.h4`
  margin: 2rem 0 1rem;
  font-size: 1.25rem;
  color: var(--color-text-primary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const EnhancedModalContent = styled(ModalContent)`
  max-width: 800px;
  width: 90vw;
  min-height: 60vh;
  max-height: 85vh;
`;

export const ScrollableModalBody = styled(ModalBody)`
  max-height: calc(60vh - 150px);
  overflow-y: auto;
  padding-right: 0.5rem;
`;

export const CenteredButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;
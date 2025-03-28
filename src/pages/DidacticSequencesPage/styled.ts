import styled from 'styled-components';
import {Select } from '../../styles/inputs'

export const DidacticSequenceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  padding: var(--space-lg);
  background-color: var(--color-background-secondary);
`;

export const SequenceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-md);
`;

export const SequenceActions = styled.div`
  display: flex;
  gap: var(--space-sm);
`;

export const StageCard = styled.div`
  background-color: var(--color-background-third);
  border-radius: var(--border-radius-md);
  padding: var(--space-md);
  margin-bottom: var(--space-sm);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all var(--transition-fast);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-sm);
  }
`;

export const ContentSectionContainer = styled.div`
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  padding: var(--space-md);
  margin-bottom: var(--space-sm);
`;

export const ContentSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-sm);
`;

export const ContentTypeSelect = styled(Select)`
  max-width: 200px;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: var(--z-index-modal);
`;

export const ModalContent = styled.div`
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius-md);
  padding: var(--space-lg);
  width: 80%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: var(--space-sm);
  margin-top: var(--space-lg);
`;
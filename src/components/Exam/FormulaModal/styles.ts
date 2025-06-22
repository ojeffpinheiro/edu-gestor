import styled from "styled-components";

export const ModalContainer = styled.div<{ $isOpen: boolean }>`
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .modal-content {
    background: var(--color-background);
    padding: var(--space-xl);
    border-radius: var(--border-radius-lg);
    width: 90%;
    max-width: 600px;
    box-shadow: var(--shadow-xl);
  }

  h2 {
    margin-top: 0;
  }
`;

export const FormulaInput = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: var(--space-md);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  margin: var(--space-md) 0;
  font-family: monospace;
`;

export const FormulaOptions = styled.div`
  display: flex;
  gap: var(--space-lg);
  margin-bottom: var(--space-xl);

  > div {
    flex: 1;
  }

  button {
    display: block;
    margin-bottom: var(--space-xs);
    padding: var(--space-xs) var(--space-sm);
    background: var(--color-background-secondary);
    border: none;
    border-radius: var(--border-radius-sm);
    cursor: pointer;

    &:hover {
      background: var(--color-primary-light);
    }
  }
`;

export const FormulaPreview = styled.div`
  padding: var(--space-md);
  background: var(--color-background-secondary);
  border-radius: var(--border-radius-md);
  margin-bottom: var(--space-md);
`;

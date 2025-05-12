import styled from "styled-components";

export const ButtonGroup = styled.div`
  display: flex;
  margin-top: var(--space-xl);
  gap: var(--space-md);

  button {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding: var(--space-sm) var(--space-lg);
    border-radius: var(--border-radius-md);
    font-weight: 500;
    cursor: pointer;
    transition: all var(--transition-fast);

    &.primary {
      background-color: var(--color-primary);
      color: var(--color-text-on-primary);
      border: none;

      &:hover {
        background-color: var(--color-primary-hover);
      }

      &:disabled {
        background-color: var(--color-button-disabled);
        cursor: not-allowed;
      }
    }

    &.secondary {
      background-color: transparent;
      border: 1px solid var(--color-primary);
      color: var(--color-primary);

      &:hover {
        background-color: var(--color-button);
      }
    }
  }
`;

export const ExamGeneratorContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 90vw;
  padding: var(--space-md);
  margin: 0 auto;
  color: var(--color-text);
  background-color: var(--color-background);

  @media (min-width: var(--breakpoint-md)) {
    padding: var(--space-xl);
  }

  h1 {
    font-size: var(--font-size-3xl);
    font-weight: 600;
    color: var(--color-title-card);
    text-align: center;
    margin-bottom: var(--space-sm);
  }

  p {
    color: var(--color-text-secondary);
    text-align: center;
    margin-bottom: var(--space-xl);
  }
`;

export const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-md) var(--space-xl);
  background-color: var(--color-primary);
  color: var(--color-text-on-primary);
  box-shadow: var(--shadow-sm);
`;

export const ToolbarTitle = styled.div`
  h1 {
    margin: 0;
    font-size: var(--font-size-2xl);
    font-weight: 600;
    color: var(--color-text-on-primary);
  }

  p {
    margin: var(--space-xs) 0 0;
    font-size: var(--font-size-sm);
    opacity: 0.9;
    color: var(--color-text-on-primary);
  }
`;

export const ToolbarActions = styled.div`
  display: flex;
  gap: var(--space-sm);

  button {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    padding: var(--space-sm) var(--space-md);
    border-radius: var(--border-radius-md);
    font-weight: 500;
    transition: all var(--transition-fast);

    &.primary {
      background-color: var(--color-secondary);
      color: var(--color-text-on-primary);

      &:hover {
        background-color: var(--color-secondary-hover);
      }
    }

    &.secondary {
      background-color: transparent;
      border: 1px solid var(--color-text-on-primary);
      color: var(--color-text-on-primary);

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }
  }
`;

export const EditorContainer = styled.div`
  flex: 1;
  padding: var(--space-xl);
  overflow-y: auto;
  background-color: var(--color-background-secondary);
`;

export const PreviewContainer = styled.div`
  flex: 1;
  padding: var(--space-xl);
  overflow-y: auto;
  background-color: var(--color-card);
  max-width: 210mm;
  margin: 0 auto;
  box-shadow: var(--shadow-md);

  @media print {
    box-shadow: none;
    padding: 0;
    max-width: 100%;
  }
`;

export const DocumentHeader = styled.div`
  text-align: center;
  margin-bottom: var(--space-xl);
  padding-bottom: var(--space-md);
  border-bottom: 2px solid var(--color-border-dark);

  h1 {
    font-size: var(--font-size-2xl);
    font-weight: bold;
    text-transform: uppercase;
    margin: 0;
    color: var(--color-text);
  }

  h2 {
    font-size: var(--font-size-lg);
    text-transform: uppercase;
    margin: var(--space-sm) 0 0;
    color: var(--color-text);
  }

  .grade-space {
    display: inline-block;
    border: 1px solid var(--color-border-dark);
    padding: var(--space-sm) var(--space-xl);
    margin-top: var(--space-md);

    p {
      margin: 0;
      font-weight: bold;
      color: var(--color-text);
    }
  }
`;

export const DocumentTitle = styled.div`
  text-align: center;
  margin-bottom: var(--space-xl);

  h2 {
    font-size: var(--font-size-3xl);
    font-weight: bold;
    text-transform: uppercase;
    margin: 0;
    padding: var(--space-sm) 0;
    border-top: 2px solid var(--color-border-dark);
    border-bottom: 2px solid var(--color-border-dark);
    color: var(--color-text);
  }
`;

export const DocumentInfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
  margin-bottom: var(--space-xl);
  font-size: var(--font-size-sm);

  p {
    margin: var(--space-xs) 0;
    color: var(--color-text);
  }

  strong {
    font-weight: 600;
  }
`;

export const InstructionsList = styled.ol`
  margin: var(--space-md) 0 var(--space-xl);
  padding-left: var(--space-2xl);
  font-size: var(--font-size-sm);

  li {
    margin-bottom: var(--space-sm);
    line-height: 1.4;
    color: var(--color-text);
  }
`;

export const QuestionGrid = styled.div<{ layout: 'grid' | 'list' }>`
  display: ${({ layout }) => (layout === 'grid' ? 'grid' : 'block')};
  grid-template-columns: ${({ layout }) => (layout === 'grid' ? '1fr 1fr' : '1fr')};
  gap: var(--space-md);
  margin-bottom: var(--space-xl);

  .question-item {
    page-break-inside: avoid;
    border: 1px solid var(--color-border-light);
    padding: var(--space-md);
    border-radius: var(--border-radius-md);
    background-color: var(--color-card);
    margin-bottom: ${({ layout }) => layout === 'list' ? 'var(--space-md)' : '0'};

    .question-number {
      font-weight: bold;
      margin-bottom: var(--space-sm);
      color: var(--color-text);
    }

    .question-content {
      p {
        margin: 0 0 var(--space-sm);
        color: var(--color-text);
      }
    }

    .options-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-sm);
      margin-top: var(--space-sm);

      .option {
        display: flex;
        gap: var(--space-sm);
        color: var(--color-text);
      }
    }
  }
`;

export const AnswerGrid = styled.div`
  margin-top: var(--space-2xl);
  padding-top: var(--space-md);
  border-top: 2px solid var(--color-border-dark);

  h3 {
    text-align: center;
    font-size: var(--font-size-lg);
    margin-bottom: var(--space-md);
    text-transform: uppercase;
    color: var(--color-text);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: var(--space-md);

    .answer-row {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      color: var(--color-text);

      span:first-child {
        font-weight: bold;
        min-width: 20px;
      }
    }

    .answer-option {
      width: 20px;
      height: 20px;
      border: 1px solid var(--color-border-dark);
      border-radius: var(--border-radius-full);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--font-size-xs);
      color: var(--color-text);
    }
  }
`;
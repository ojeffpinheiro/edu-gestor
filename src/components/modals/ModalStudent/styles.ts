import styled, { keyframes } from 'styled-components';

/**
 * Animations for UI elements
 */
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

/**
 * Modal container - Creates a full-screen overlay
 */
export const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: var(--space-md);
`;

export const ModalContent = styled.div`
    background: var(--color-card, #ffffff);
    border-radius: var(--border-radius-md);
    width: 100%;
    max-width: 80vw;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    box-shadow: var(--shadow-lg, 0 4px 20px rgba(0, 0, 0, 0.15));
    animation: ${fadeIn} 0.2s ease-out;
    overflow-y: auto;
    
    @media (max-width: var(--breakpoint-md)) {
        padding: var(--space-md);
        max-width: 100%;
    }
`;

/**
 * Modal header with title and close button
 */
export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid var(--color-border-light, #eaeaea);
  background-color: var(--color-background-third, #f7f9fc);
  border-radius: 8px 8px 0 0;

  h3 {
    margin: 0;
    font-size: 1.25rem;
    color: var(--color-text, #2d3748);
    font-weight: 600;
  }
`;

/**
 * Modal body containing the main content
 */
export const ModalBody = styled.div`
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  max-height: calc(90vh - 130px); /* Adjust for header and footer */
`;

/**
 * Modal footer with action buttons
 */
export const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-top: 1px solid var(--color-border-light, #eaeaea);
  
  .export-hint {
    font-size: 14px;
    color: var(--color-warning, #dd6b20);
  }
`;

export const CloseButton = styled.button`
    top: var(--space-md);
    right: var(--space-md);
    background-color: transparent;
    border: none;
    font-size: var(--font-size-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: var(--border-radius-full);
    cursor: pointer;
    color: var(--color-text);
    transition: all 0.2s;

    &:hover {
        background-color: var(--color-button);
    }

    &:focus-visible {
        outline: none;
        box-shadow: var(--shadow-focus);
    }
`;

/**
 * Button component with variant support
 */
export const Button = styled.button<{ variant: string }>`
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  background: ${({ variant }) =>
        variant === "primary" ? "var(--color-primary, #4299e1)" : "var(--color-secondary, #e2e8f0)"};
  color: ${({ variant }) =>
        variant === "primary" ? "var(--color-text-on-primary, #ffffff)" : "var(--color-text, #1e293b)"};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s;
  
  &:hover:not(:disabled) {
    background: ${({ variant }) =>
        variant === "primary" ? "var(--color-primary-hover, #3182ce)" : "var(--color-secondary-hover, #cbd5e0)"};
  }
  
  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${({ variant }) =>
        variant === "primary" ? "rgba(66, 153, 225, 0.3)" : "rgba(160, 174, 192, 0.3)"};
  }
  
  .loading-indicator {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: ${spin} 1s ease-in-out infinite;
  }
`;

/**
 * Table styling
 */
export const Table = styled.table`
    width: 100%;
    margin-top: var(--space-sm);
    border-collapse: collapse;
    border-radius: var(--border-radius-sm);
    overflow: hidden;

    .grade-good {
    color: var(--color-success, #38a169);
  }
  
  .grade-average {
    color: var(--color-warning, #dd6b20);
  }
  
  .grade-low {
    color: var(--color-error, #e53e3e);
  }
  
  .average-grade {
    margin-top: 12px;
    padding: 8px 12px;
    border-radius: 4px;
    font-weight: 600;
  }
`;

export const TableHeader = styled.th`
    padding: var(--space-md);
    background-color: var(--color-primary);
    color: var(--color-text-on-primary);
    text-align: left;
    font-weight: 600;
`;

export const TableCell = styled.td`
    padding: var(--space-md);
    border: 1px solid var(--color-border);
`;

export const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: var(--color-background-third);
    }

    &:hover {
        background-color: var(--color-background-secondary);
    }
`;

export const SectionContainer = styled.div<{ backgroundColor: string }>`
    margin-bottom: var(--space-xl);
    padding: var(--space-md);
    border-radius: var(--border-radius-md);
    background-color: ${props => props.backgroundColor || 'var(--color-background-third, #f7f9fc)'};
    box-shadow: var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.05));
    border: 1px solid var(--color-border-light, #eaeaea);
    transition: all 0.3s ease;
`;

export const SectionHeader = styled.h3`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--space-md);
    font-size: var(--font-size-lg);
    color: var(--color-title-card);
    cursor: pointer;
    padding: var(--space-sm);
    border-radius: var(--border-radius-sm);
    transition: background-color 0.2s;

    &:hover {
        background-color: rgba(0, 0, 0, 0.05);
    }
`;

/**
 * Empty state message styling
 */
export const EmptyStateMessage = styled.p`
color: var(--color-text-secondary);
font-style: italic;
padding: var(--space-md);
text-align: center;
`;

export const AttendanceStatsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: var(--space-md);
    margin-top: var(--space-md);
    p {
        padding: var(--space-sm);
        background-color: var(--color-background-secondary);
        border-radius: var(--border-radius-sm);
        text-align: center;

        strong {
            display: block;
            font-size: 16px;
            margin-top: 4px;
        }
    }
`;

export const ExportButtonContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-top: var(--space-xl);

.export-hint {
    margin-top: var(--space-sm);
    color: var(--color-warning);
    font-size: var(--font-size-sm);
}
`;

export const ActionButton = styled.button`
    padding: var(--space-md) var(--space-lg);
    background-color: var(--color-primary);
    color: var(--color-text-on-primary);
    border: none;
    border-radius: var(--border-radius-md);
    cursor: pointer;
    font-size: var(--font-size-md);
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    transition: background-color 0.2s;
    white-space: nowrap;

    &:hover:not(:disabled) {
        filter: brightness(1.1);
    }

    &:disabled {
        background-color: var(--color-button-disabled);
        cursor: not-allowed;
    }

    &:focus-visible {
        outline: none;
        box-shadow: var(--shadow-focus);
    }
`;

export const ButtonsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-md);
    margin-top: var(--space-xl);
    
    @media (max-width: var(--breakpoint-md)) {
        flex-direction: column;
    }
`;

export const StudentHeader = styled.div`
    border-bottom: 1px solid var(--color-border);
    margin-bottom: var(--space-lg);
    padding-bottom: var(--space-md);

    h2 {
        font-size: var(--font-size-2xl);
        color: var(--color-title-card);
        margin-bottom: var(--space-xs);
    }
`;

export const ContactInfo = styled.p`
    color: var(--color-text-secondary);
    font-size: var(--font-size-md);
`;

export const StatusBadge = styled.span<{ color: string }>`
    display: inline-block;
    padding: 0.25rem 0.5rem;
    border-radius: var(--border-radius-sm);
    background-color: ${props => props.color}20;
    color: ${props => props.color};
    font-size: var(--font-size-sm);
    font-weight: 500;
`;

export const CheckboxContainer = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: var(--space-md);
    color: var(--color-text-secondary);
    
    svg {
        color: var(--color-primary);
        font-size: var(--font-size-lg);
        margin-right: var(--space-xs);
    }
    
    &:hover {
        color: var(--color-text-primary);
    }
`;

export const CheckboxLabel = styled.span`
    font-size: var(--font-size-sm);
`;
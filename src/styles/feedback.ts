import styled from "styled-components";
import { constants } from "../utils/consts";
import { mixins } from "./mixins";
import { fadeIn, spin } from "./animations";

export const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  margin: ${constants.spacing.md} auto;
  border: 3px solid ${constants.colors.background.third};
  border-top: 3px solid ${constants.colors.primary};
  border-radius: 50%;

  
  ${mixins.flexCenter}
  padding: ${constants.spacing.xl};
  color: ${constants.colors.text.secondary};
  
  &:before {
    content: '';
    width: 20px;
    height: 20px;
    margin-right: ${constants.spacing.sm};
    border: 2px solid ${constants.colors.text.third};
    border-radius: 50%;
    border-top-color: ${constants.colors.primary};
    animation: spin 1s linear infinite;
    display: inline-block;
  }
  
  ${spin}
`;

export const LoadingMessage = styled.div`
  text-align: center;
  padding: ${constants.spacing.lg};
  color: ${constants.colors.text.third};
  font-size: ${constants.fontSize.md};
  animation: ${fadeIn} 0.5s ease;
`;

export const ErrorMessage = styled.div`
  text-align: center;
  padding: ${constants.spacing.md};
  color: ${constants.colors.status.error};
  font-size: ${constants.fontSize.md};
  border-radius: ${constants.borderRadius.md};
  font-size: var(--font-size-sm, 0.875rem);
  padding: ${constants.spacing.md};
  background-color: ${constants.colors.status.error}20;
  border-radius: ${constants.borderRadius.md};
  border-left: 3px solid var(--color-error, #e53e3e);
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin: ${constants.spacing.md};
  box-shadow: var(--shadow-sm);
  animation: ${fadeIn} 0.3s ease-out;
    
  &::before {
    content: "⚠️";
    margin-right: var(--space-sm);
}

    svg {
        flex-shrink: 0;
        font-size: var(--font-size-lg);
    }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: ${constants.spacing.xl};
  color: ${constants.colors.text.secondary};
  font-size: ${constants.fontSize.md};
  background-color: ${constants.colors.background.third};
  border-radius: ${constants.borderRadius.md};
  margin: ${constants.spacing.lg} 0;
  animation: ${fadeIn} 0.5s ease;
`;

export const InfoMessage = styled.div`
  text-align: center;
  padding: ${constants.spacing.md};
  color: ${constants.colors.status.info};
  font-size: ${constants.fontSize.md};
  background-color: ${constants.colors.status.infoBg};
  border-radius: ${constants.borderRadius.md};
  margin-bottom: ${constants.spacing.md};
  animation: ${fadeIn} 0.5s ease;
`;

export const SuccessMessage = styled.div`
    color: var(--color-success, #38a169);
    font-size: var(--font-size-sm, 0.875rem);
    padding: var(--space-md) var(--space-lg);
    background-color: var(--color-success-light);
    border-radius: var(--border-radius-md, 0.375rem);
    border-left: 3px solid var(--color-success, #38a169);
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    margin: var(--space-md) 0;
    margin-bottom: var(--space-md);
    box-shadow: var(--shadow-sm);
    animation: ${fadeIn} 0.3s ease-out;
    
    svg {
        flex-shrink: 0;
        font-size: var(--font-size-lg);
    }
    
    &::before {
        content: "✓";
        margin-right: var(--space-sm);
        font-weight: bold;
    }
`;
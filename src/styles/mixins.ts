// src/styles/mixins.ts
import { css } from "styled-components";
import { fadeIn, slideIn } from "./animations";

export const cardHoverEffect = css`
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
`;

export const focusEffect = css`
  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: var(--shadow-focus);
  }
`;

export const standardAnimation = css`
  animation: ${fadeIn} 0.4s ease-out;
`;

export const slideInAnimation = css`
  animation: ${slideIn} 0.3s ease-out;
`;

export const mixins = {
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  flexBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  flexColumn: css`
    display: flex;
    flex-direction: column;
  `,
  scrollbarStyle: css`
    scrollbar-width: thin;
    
    &::-webkit-scrollbar {
      width: 6px;
    }
    
    &::-webkit-scrollbar-track {
      background: var(--color-background-third, #f5f5f5);
      border-radius: var(--border-radius-sm, 4px);
    }
    
    &::-webkit-scrollbar-thumb {
      background: var(--color-border, #e0e0e0);
      border-radius: var(--border-radius-sm, 4px);
    }
    
    &::-webkit-scrollbar-thumb:hover {
      background: var(--color-text-third, #757575);
    }
  `,
  // Função para gerar estilos de evento baseado no tipo
  getEventStyles: (eventType?: string, eventColor?: string) => {
    if (eventColor) {
      return css`
        background-color: ${eventColor}20;
        color: ${eventColor};
        border-left: 2px solid ${eventColor};
      `;
    }
    
    const availableTypes = ['class', 'meeting', 'deadline', 'holiday', 'personal'];
    const type = availableTypes.includes(eventType || '') ? eventType : 'default';
    
    switch(type) {
      case 'class':
        return css`
          background-color: 'var(--color-success, #c8e6c9)',
          color: var(--color-success-text, #2e7d32);
          border-left: 2px solid var(--color-success-border, #2e7d32);
        `;
      case 'meeting':
        return css`
          background-color: var(--color-info, #bbdefb);
          color: var(--color-info-text, #0d47a1);
          border-left: 2px solid var(--color-info-border, #0d47a1);
        `;
      case 'deadline':
        return css`
          background-color: var(--color-error, #ffccbc);
          color: var(--color-error-text, #bf360c);
          border-left: 2px solid var(--color-error-border, #bf360c);
        `;
      case 'holiday':
        return css`
          background-color: var(--color-primary, #d1c4e9);
          color: var(--color-primary-text, #4527a0);
          border-left: 2px solid var(--color-primary-border, #4527a0);
        `;
      case 'personal':
        return css`
          background-color:var(--color-warning, #fff9c4);
          color: var(--color-warning-text, #f57c00);
          border-left: 2px solid var(--color-warning-border, #f57c00);
        `;
      default:
        return css`
          background-color: var(--color-info, #bbdefb);
          color: var(--color-info-text, #0d47a1);
          border-left: 2px solid var(--color-info-border, #0d47a1);
        `;
    }
  }
};
// baseComponents.ts
import styled, { css } from "styled-components";

// Shared styles as mixins
export const buttonBaseCss = css`
  border: none;
  border-radius: var(--border-radius-md);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
  font-size: var(--font-size-md);
  padding: var(--space-sm) var(--space-md);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  &:focus-visible {
    outline: none;
    box-shadow: var(--shadow-focus);
  }
  
  &:disabled {
    background-color: var(--color-button-disabled);
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const hoverEffectCss = css`
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: var(--shadow-sm);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

// Base components
export const BaseButton = styled.button`
  ${buttonBaseCss}
  ${hoverEffectCss}
`;

export const BaseCard = styled.div`
  background-color: var(--color-card);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  padding: var(--space-lg);
`;

export const BaseInput = styled.input`
  width: 100%;
  padding: var(--space-sm) var(--space-md);
  border: 2px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-input);
  color: var(--color-text);
  font-size: var(--font-size-md);
  
  &:focus {
    outline: none;
    border-color: var(--color-input-focus);
    box-shadow: var(--shadow-focus);
  }
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

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: var(--space-sm);
  margin-top: var(--space-lg);
`;

export const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 52px;
  height: 26px;
  
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--color-border);
    transition: .4s;
    border-radius: 34px;
    
    &:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }
  }
  
  input:checked + span {
    background-color: var(--color-primary);
    
    &:before {
      transform: translateX(26px);
    }
  }
  
  input:focus + span {
    box-shadow: var(--shadow-focus);
  }
`;

export const Alert = styled.div<{ type: 'success' | 'error' | 'warning' | 'info' }>`
  padding: var(--space-md);
  border-radius: var(--border-radius-md);
  margin-bottom: var(--space-lg);
  display: flex;
  align-items: center;
  gap: var(--space-md);
  background-color: ${({ type }) => {
    switch (type) {
      case 'success': return 'rgba(82, 196, 26, 0.1)';
      case 'error': return 'rgba(245, 34, 45, 0.1)';
      case 'warning': return 'rgba(250, 173, 20, 0.1)';
      case 'info': return 'rgba(24, 144, 255, 0.1)';
      default: return 'rgba(24, 144, 255, 0.1)';
    }
  }};
  color: ${({ type }) => {
    switch (type) {
      case 'success': return 'var(--color-success)';
      case 'error': return 'var(--color-error)';
      case 'warning': return 'var(--color-warning)';
      case 'info': return 'var(--color-info)';
      default: return 'var(--color-info)';
    }
  }};
  border-left: 4px solid ${({ type }) => {
    switch (type) {
      case 'success': return 'var(--color-success)';
      case 'error': return 'var(--color-error)';
      case 'warning': return 'var(--color-warning)';
      case 'info': return 'var(--color-info)';
      default: return 'var(--color-info)';
    }
  }};
`;

export const Tag = styled.span<{ color: string }>`
  display: inline-block;
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-xs);
  font-weight: 500;
  background-color: ${({ color }) => {
    switch (color) {
      case 'blue': return 'rgba(24, 144, 255, 0.1)';
      case 'green': return 'rgba(82, 196, 26, 0.1)';
      case 'red': return 'rgba(245, 34, 45, 0.1)';
      case 'yellow': return 'rgba(250, 173, 20, 0.1)';
      default: return 'rgba(24, 144, 255, 0.1)';
    }
  }};
  color: ${({ color }) => {
    switch (color) {
      case 'blue': return 'var(--color-info)';
      case 'green': return 'var(--color-success)';
      case 'red': return 'var(--color-error)';
      case 'yellow': return 'var(--color-warning)';
      default: return 'var(--color-info)';
    }
  }};
`;

export const SectionTitle = styled.h3`
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-md);
  font-weight: 500;
`;

export const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: var(--color-border-light);
  margin: var(--space-md) 0 var(--space-lg) 0;
`;

export const StatusBadge = styled.span<{ 
  type: 'success' | 'error' | 'warning' | 'info' | 'neutral'
}>`
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--border-radius-full);
  font-size: var(--font-size-xs);
  font-weight: 500;
  
  ${({ type }) => {
    switch(type) {
      case 'success': return `background: var(--color-success); color: white;`;
      case 'error': return `background: var(--color-error); color: white;`;
      case 'warning': return `background: var(--color-warning); color: white;`;
      case 'info': return `background: var(--color-info); color: white;`;
      default: return `background: var(--color-background-third); color: var(--color-text);`;
    }
  }}
`;

export const ResponsiveGrid = styled.div<{ minWidth?: string }>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${p => p.minWidth || '280px'}, 1fr));
  gap: var(--space-md);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-lg);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const IconWrapper = styled.span<{ 
  size?: 'sm' | 'md' | 'lg',
  color?: string
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: ${p => {
    switch(p.size) {
      case 'sm': return 'var(--font-size-sm)';
      case 'lg': return 'var(--font-size-lg)';
      default: return 'var(--font-size-md)';
    }
  }};
  color: ${p => p.color || 'inherit'};
`;

export const ListContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const ListItem = styled.li<{ clickable?: boolean }>`
  padding: var(--space-md);
  border-bottom: 1px solid var(--color-border-light);
  cursor: ${p => p.clickable ? 'pointer' : 'default'};
  
  &:hover {
    background-color: ${p => p.clickable ? 'var(--color-background-third)' : 'transparent'};
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: var(--space-xs);
`;

export const PageButton = styled.button<{ active?: boolean }>`
  min-width: 36px;
  padding: var(--space-xs);
  border-radius: var(--border-radius-sm);
  background: ${p => p.active ? 'var(--color-primary)' : 'transparent'};
  color: ${p => p.active ? 'white' : 'var(--color-text)'};
`;

export const Spacer = styled.div<{ 
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  horizontal?: boolean 
}>`
  ${p => p.horizontal 
    ? `width: var(--space-${p.size || 'md'}); height: auto;` 
    : `height: var(--space-${p.size || 'md'}); width: auto;`
  }
`;
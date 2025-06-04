import styled, { css } from "styled-components";

export const TabsContainer = styled.div`
  display: flex;
  gap: var(--space-sm);
  margin-bottom: var(--space-xl);
  position: relative;
  padding-bottom: var(--space-sm);

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: var(--color-border-light);
    z-index: 0;
  }
    
  @media (max-width: var(--breakpoint-md)) {
    overflow-x: auto;
    padding-bottom: var(--space-md);
    margin-bottom: var(--space-lg);

    &::-webkit-scrollbar {
      height: 4px;
    }
  }
`;

export const TabButton = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: var(--space-md) var(--space-lg);
  border: none;
  background: ${({ $active }) => 
    $active 
      ? 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.15) 100%)'
      : 'transparent'
  };
  color: ${({ $active }) => $active ? 'var(--color-text-button)' : 'rgba(255,255,255,0.8)'};
  border-radius: var(--border-radius-lg);
  font-weight: ${({ $active }) => $active ? 'var(--font-weight-semibold)' : 'var(--font-weight-medium)'};
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
    opacity: 0;
    transition: opacity var(--transition-normal);
    border-radius: var(--border-radius-lg);
    z-index: -1;
  }
  
  &:hover {
    color: var(--color-text-on-primary);
    transform: translateY(-1px);
    
    &::before {
      opacity: 1;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
  
  ${({ $active }) => $active && css`
    box-shadow: 
      var(--shadow-md),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  `}
  
  @media (max-width: var(--breakpoint-md)) {
    padding: var(--space-sm) var(--space-md);
    font-size: var(--font-size-xs);
  }
`;

export const TabContent = styled.div`
  animation: fadeIn var(--transition-normal);

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(var(--space-sm)); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
  width: 100%;
`;

export const MetricsCard = styled.div`
  background: var(--color-card);
  border-radius: var(--border-radius-md);
  padding: var(--space-lg);
  box-shadow: var(--shadow-sm);
`;

export const GraphsContainer = styled.div`
  width: 100%;
  background: var(--color-background);
  border-radius: var(--border-radius-lg);
  padding: var(--space-xl);
  box-shadow: var(--shadow-sm);
`;

export const SlideContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 400px;
`;

export const SlideControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--space-xl);
  margin-top: var(--space-xl);
`;

export const SlideButton = styled.button`
  background: var(--color-primary);
  color: var(--color-text-on-primary);
  border: none;
  border-radius: var(--border-radius-full);
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    transform: scale(1.1);
    background: var(--color-primary-hover);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const BulletsContainer = styled.div`
  display: flex;
  gap: var(--space-sm);
  margin: 0 var(--space-md);
`;

export const Bullet = styled.button<{ $active: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: var(--border-radius-full);
  border: none;
  cursor: pointer;
  transition: all var(--transition-fast);
  padding: 0;
  
  ${({ $active }) => $active 
    ? css`
      background: var(--color-primary);
      transform: scale(1.3);
    ` 
    : css`
      background: var(--color-border);
      opacity: 0.6;
    `
  }

  &:hover {
    transform: scale(1.3);
  }
`;

export const SlideTitle = styled.h3`
  font-size: var(--font-size-xl);
  margin-bottom: var(--space-lg);
  color: var(--color-title-card);
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-weight: var(--font-weight-semibold);
`;

export const ComparisonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  margin-top: var(--space-md);
  background: var(--color-background-secondary);
  padding: var(--space-md);
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-border-light);
`;

export const MetricHighlight = styled.div`
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  margin: var(--space-sm) 0;
  display: flex;
  align-items: center;
  gap: var(--space-sm);
`;

export const MetricGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-md);
  width: 100%;

  @media (max-width: var(--breakpoint-xl)) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: var(--breakpoint-md)) {
    grid-template-columns: 1fr;
  }
`;

export const KeyboardHint = styled.div`
  position: fixed;
  bottom: var(--space-md);
  right: var(--space-md);
  background: var(--color-background-secondary);
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--border-radius-lg);
  font-size: var(--font-size-sm);
  box-shadow: var(--shadow-md);
  opacity: 0.9;
  z-index: 100;
  
  kbd {
    background: var(--color-card);
    padding: 2px 6px;
    border-radius: 4px;
    box-shadow: 0 1px 1px rgba(0,0,0,0.2);
    margin: 0 2px;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;
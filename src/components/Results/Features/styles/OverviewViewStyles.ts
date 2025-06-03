import styled, { css } from "styled-components";

export const TabsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  position: relative;
  padding-bottom: 8px;

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
    
  @media (max-width: 768px) {
    overflow-x: auto;
    padding-bottom: 12px;
    margin-bottom: 16px;

    &::-webkit-scrollbar {
      height: 4px;
    }
  }
`;

export const TabButton = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 1rem 1.5rem;
  border: none;
  background: ${({ $active }) => 
    $active 
      ? 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.15) 100%)'
      : 'transparent'
  };
  color: ${({ $active }) => $active ? 'var(--color-text-button)' : 'rgba(255,255,255,0.8)'};
  border-radius: 12px;
  font-weight: ${({ $active }) => $active ? '600' : '500'};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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
    transition: opacity 0.3s;
    border-radius: 12px;
    z-index: -1;
  }
  
  &:hover {
    color: white;
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
      0 4px 12px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  `}
  
  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
    font-size: 0.8rem;
  }
`;

export const TabContent = styled.div`
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

export const MetricsCard = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

export const GraphsContainer = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.background};
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
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
  gap: 20px;
  margin-top: 20px;
`;

export const SlideButton = styled.button`
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const BulletsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin: 0 15px;
`;

export const Bullet = styled.button<{ $active: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  padding: 0;
  
  ${({ $active, theme }) => $active 
    ? css`
      background: ${theme.primary};
      transform: scale(1.3);
    ` 
    : css`
      background: ${theme.border};
      opacity: 0.6;
    `
  }

  &:hover {
    transform: scale(1.3);
  }
`;
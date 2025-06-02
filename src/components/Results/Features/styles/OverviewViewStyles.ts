import styled from "styled-components";

const tabHeight = '40px';
const activeBorderWidth = '3px';

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

export const TabButton = styled.button<{ $isActive: boolean }>`
  padding: 0 16px;
  height: ${tabHeight};
  border: none;
  background: ${({ $isActive }) =>
    $isActive ? 'var(--color-primary)' : 'transparent'};
  cursor: pointer;
  font-weight: 500;
  color: ${({ $isActive }) =>
    $isActive ? 'white' : 'var(--color-text-secondary)'};
  border-radius: 6px 6px 0 0;
  transition: all 0.2s ease;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 8px;

  &::after {
    height: ${activeBorderWidth};
    bottom: -${activeBorderWidth};
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    background: ${({ $isActive }) =>
    $isActive ? 'var(--color-primary)' : 'transparent'};
    transition: all 0.2s;
  }

  &:hover {
    background: ${({ $isActive }) =>
    !$isActive && 'rgba(var(--color-primary-rgb), 0.1)'};
    color: ${({ $isActive }) =>
    !$isActive && 'var(--color-primary)'};
  }
    
  svg {
    font-size: 1.1em;
    stroke-width: ${({ $isActive }) => $isActive ? '2.5px' : '2px'};
  }

  ${({ $isActive }) => $isActive && `
    box-shadow: 0 2px 8px -2px rgba(var(--color-primary-rgb), 0.3);
    font-weight: 600;
    letter-spacing: 0.01em;
  `}
`;

export const TabContent = styled.div`
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
import styled from "styled-components";

export const Nav = styled.nav`
  background: rgba(var(--glass-background-rgb), 0.7);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  position: sticky;
  top: 80px;
  z-index: var(--z-sticky);
`;


export const NavContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 var(--space-4);
`;

export const NavList = styled.ul`
  display: flex;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  gap: var(--space-4);
  padding: var(--space-2) 0;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const NavItem = styled.li`
  list-style: none;
  flex-shrink: 0;
`;

export const NavButton = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  background: ${props => props.$active 
    ? 'var(--gradient-primary)' 
    : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.$active 
    ? 'var(--color-text-on-primary)' 
    : 'rgba(255, 255, 255, 0.8)'};
  border-radius: 9999px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  box-shadow: ${props => props.$active 
    ? '0 4px 6px rgba(0, 0, 0, 0.1)' 
    : 'none'};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, ${props => props.$active ? '0.2' : '0.1'}) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    z-index: 1;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background: ${props => props.$active 
      ? 'var(--gradient-primary)' 
      : 'rgba(255, 255, 255, 0.15)'};
  }
  
  &:active {
    transform: translateY(0);
  }
  
  svg {
    width: 18px;
    height: 18px;
    opacity: ${props => props.$active ? 1 : 0.8};
    transition: all 0.3s ease;
    z-index: 2;
  }
  
  span {
    position: relative;
    z-index: 2;
  }
  
  ${props => props.$active && `
    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 50%;
      transform: translateX(-50%);
      width: 40%;
      height: 3px;
      background: var(--color-text-on-primary);
      border-radius: 9999px;
      opacity: 0.8;
      filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.7));
    }
  `}
`;
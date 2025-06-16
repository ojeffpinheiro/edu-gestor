import styled from 'styled-components';

// Container principal com glassmorphism
export const Container = styled.div`
  min-height: 100vh;
  background: var(--color-background);
  position: relative;
  
  /* Fundo gradiente sutil */
  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 50%, var(--color-primary-light) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, var(--color-secondary) 0%, transparent 50%),
      radial-gradient(circle at 40% 80%, var(--color-info-light) 0%, transparent 50%);
    opacity: 0.4;
    z-index: -1;
    pointer-events: none;
  }
`;

// Header com glassmorphism e gradient
export const Header = styled.header`
  background: var(--glass-background);
  backdrop-filter: var(--backdrop-blur);
  -webkit-backdrop-filter: var(--backdrop-blur);
  border-bottom: 1px solid var(--glass-border);
  color: var(--color-text-on-primary);
  padding: var(--space-6) var(--space-4);
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  
  /* Overlay gradient */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--gradient-primary);
    opacity: 0.9;
    z-index: -1;
  }
`;

export const HeaderContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  
  @media (min-width: var(--breakpoint-md)) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const Title = styled.h1`
  font-size: clamp(var(--font-size-2xl), 4vw, var(--font-size-4xl));
  font-weight: var(--font-weight-extrabold);
  color: var(--color-text-on-primary);
  letter-spacing: -0.02em;
  margin: 0;
  
  /* Gradient text effect */
  background: linear-gradient(135deg, white, rgba(255,255,255,0.8));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  margin: 0;
  opacity: 0.9;
`;

// Navegação moderna com indicadores fluidos
export const Nav = styled.nav`
  background: var(--color-surface);
  backdrop-filter: var(--backdrop-blur);
  -webkit-backdrop-filter: var(--backdrop-blur);
  border-bottom: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
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
  gap: var(--space-1);
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  @media (max-width: var(--breakpoint-md)) {
    padding: var(--space-2) 0;
  }
`;

export const NavItem = styled.li`
  list-style: none;
  flex-shrink: 0;
`;

export const NavButton = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  border: none;
  background: ${props => props.active 
    ? 'var(--gradient-primary)' 
    : 'transparent'};
  color: ${props => props.active 
    ? 'var(--color-text-on-primary)' 
    : 'var(--color-text)'};
  border-radius: var(--radius-xl);
  cursor: pointer;
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
  transition: var(--transition-all);
  position: relative;
  white-space: nowrap;
  
  /* Hover effect */
  &:hover {
    background: ${props => props.active 
      ? 'var(--gradient-primary)' 
      : 'var(--color-primary-light)'};
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  /* Icon styling */
  svg {
    width: 18px;
    height: 18px;
    opacity: ${props => props.active ? 1 : 0.7};
  }
  
  /* Active indicator */
  ${props => props.active && `
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 50%;
      transform: translateX(-50%);
      width: 60%;
      height: 2px;
      background: var(--color-text-on-primary);
      border-radius: var(--radius-full);
      opacity: 0.8;
    }
  `}
`;

export const Main = styled.main`
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--space-8) var(--space-4);
  min-height: calc(100vh - 200px);
  
  @media (max-width: var(--breakpoint-md)) {
    padding: var(--space-6) var(--space-4);
  }
`;

// Container para ações do header (se necessário)
export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-3);
`;

// Badge para notificações ou status
export const Badge = styled.span<{ variant?: 'primary' | 'success' | 'warning' | 'error' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  
  ${props => {
    switch (props.variant) {
      case 'success':
        return `
          background: var(--color-success-light);
          color: var(--color-success-dark);
        `;
      case 'warning':
        return `
          background: var(--color-warning-light);
          color: var(--color-warning-dark);
        `;
      case 'error':
        return `
          background: var(--color-error-light);
          color: var(--color-error-dark);
        `;
      default:
        return `
          background: var(--color-primary-light);
          color: var(--color-primary-dark);
        `;
    }
  }}
`;

// Floating Action Button (FAB) para ações rápidas
export const FloatingActionButton = styled.button`
  position: fixed;
  bottom: var(--space-8);
  right: var(--space-8);
  width: 56px;
  height: 56px;
  border-radius: var(--radius-full);
  background: var(--gradient-primary);
  border: none;
  color: var(--color-text-on-primary);
  box-shadow: var(--shadow-lg);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition-all);
  z-index: var(--z-fixed);
  
  &:hover {
    transform: scale(1.05);
    box-shadow: var(--shadow-xl), var(--shadow-glow);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  svg {
    width: 24px;
    height: 24px;
  }
  
  @media (max-width: var(--breakpoint-md)) {
    bottom: var(--space-6);
    right: var(--space-6);
    width: 48px;
    height: 48px;
    
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

// Loading skeleton para estados de carregamento
export const Skeleton = styled.div<{ width?: string; height?: string }>`
  background: var(--color-surface);
  border-radius: var(--radius-md);
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '1rem'};
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(
      90deg,
      transparent,
      var(--color-surface-elevated),
      transparent
    );
    transform: translateX(-100%);
    animation: shimmer 2s infinite;
  }
`;
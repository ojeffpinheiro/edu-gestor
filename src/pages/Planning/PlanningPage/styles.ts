import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background: var(--color-background);
  position: relative;
  overflow-x: hidden;
  
  /* Fundo gradiente animado moderno */
  &::before {
    content: '';
    position: fixed;
    top: -50%;
    left: -50%;
    right: -50%;
    bottom: -50%;
    background: 
      radial-gradient(circle at 10% 20%, var(--color-primary-light) 0%, transparent 25%),
      radial-gradient(circle at 90% 30%, var(--color-secondary) 0%, transparent 25%),
      radial-gradient(circle at 30% 70%, var(--color-info-light) 0%, transparent 25%);
    opacity: 0.15;
    z-index: -1;
    pointer-events: none;
    animation: gradientMove 25s ease infinite alternate;
  }
    
  @keyframes gradientMove {
    0% {
      transform: scale(1) rotate(0deg);
    }
    50% {
      transform: scale(1.2) rotate(5deg);
    }
    100% {
      transform: scale(1.1) rotate(-5deg);
    }
  }
`;

export const MainContent = styled.main`
  display: flex;
  flex: 1;
  gap: 1.5rem;
  padding: 1.5rem;
`;

export const Sidebar = styled.aside`
  width: 280px;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
`;

export const Section = styled.div<{ fullWidth?: boolean }>`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  ${props => props.fullWidth && 'grid-column: 1 / -1;'}
`;

export const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 1rem 0;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e2e8f0;
`;

export const SectionContent = styled.div`
  // Estilos para o conteúdo da seção
`;
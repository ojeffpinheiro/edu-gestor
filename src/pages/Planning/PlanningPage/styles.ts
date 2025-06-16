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

export const Main = styled.main`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1rem;
  min-height: calc(100vh - 200px);
  background: rgba(var(--glass-background-rgb), 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 1rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
    border-radius: 0.75rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`;
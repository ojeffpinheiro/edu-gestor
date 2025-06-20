import styled from 'styled-components';
import { rgba } from 'polished';

export const Container = styled.div`
  min-height: 100vh;
  background: #f8fafc;
  position: relative;
  overflow-x: hidden;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  
  /* Fundo moderno com gradiente sutil */
  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      ${rgba('#f0f4f8', 0.8)} 0%,
      ${rgba('#e6f0fa', 0.6)} 100%
    );
    z-index: -1;
    pointer-events: none;
  }
`;

export const MainContent = styled.main`
  display: flex;
  flex: 1;
  gap: 2rem;
  padding: 2rem;
  max-width: 1600px;
  margin: 0 auto;
`;

export const Sidebar = styled.aside`
  width: 280px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px ${rgba('#0a0a0a', 0.05)};
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: sticky;
  top: 2rem;
  height: fit-content;
`;

export const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-width: 0; // Fix for flexbox overflow
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

export const Section = styled.div<{ fullWidth?: boolean }>`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px ${rgba('#0a0a0a', 0.05)};
  padding: 2rem;
  ${props => props.fullWidth && 'grid-column: 1 / -1;'}
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    box-shadow: 0 10px 15px ${rgba('#0a0a0a', 0.1)};
    transform: translateY(-2px);
  }
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 1.5rem 0;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

// Novos componentes estilizados para modernização
export const Card = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px ${rgba('#0a0a0a', 0.05)};
  overflow: hidden;
  transition: all 0.2s ease;
  border: 1px solid #e2e8f0;
  
  &:hover {
    box-shadow: 0 8px 12px ${rgba('#0a0a0a', 0.1)};
    border-color: #cbd5e1;
  }
`;

export const CardHeader = styled.div`
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #f1f5f9;
  background: #f8fafc;
`;

export const CardBody = styled.div`
  padding: 1.5rem;
`;

export const CardFooter = styled.div`
  padding: 1rem 1.5rem;
  border-top: 1px solid #f1f5f9;
  background: #f8fafc;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
`;

export const Pill = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: #e2e8f0;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 500;
  color: #475569;
`;

export const Badge = styled.span<{ variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' }>`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  
  ${({ variant = 'primary' }) => {
    switch (variant) {
      case 'primary':
        return `background: #e0f2fe; color: #0369a1;`;
      case 'secondary':
        return `background: #e2e8f0; color: #475569;`;
      case 'success':
        return `background: #dcfce7; color: #166534;`;
      case 'warning':
        return `background: #fef9c3; color: #854d0e;`;
      case 'danger':
        return `background: #fee2e2; color: #991b1b;`;
    }
  }}
`;
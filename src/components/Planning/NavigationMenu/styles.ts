import styled from 'styled-components';

export const MenuContainer = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const MenuItem = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
  background-color: ${props => props.$active ? '#ebf8ff' : 'transparent'};
  color: ${props => props.$active ? '#3182ce' : '#4a5568'};
  font-weight: ${props => props.$active ? '600' : '500'};
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.$active ? '#ebf8ff' : '#f7fafc'};
    color: #3182ce;
  }
`;

export const MenuIcon = styled.div`
  font-size: 1.25rem;
`;

export const MenuLabel = styled.span`
  font-size: 0.95rem;
`;
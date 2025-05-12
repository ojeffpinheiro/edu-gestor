import styled from 'styled-components';

export const HeaderContainer = styled.div`
  background-color: var(--color-background);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  padding: var(--space-lg);
  margin-bottom: var(--space-lg);
  display: flex;
  align-items: center;
  gap: var(--space-lg);
`;

export const LogoContainer = styled.div`
  width: 120px;
  height: 120px;
  border: 1px dashed var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius-sm);
  overflow: hidden;
  
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

export const HeaderContent = styled.div`
  flex: 1;
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-md);
`;

export const AssessmentTitle = styled.h2`
  color: var(--color-text);
  font-size: var(--font-size-xl);
  font-weight: 500;
`;

export const EditButton = styled.button`
  background-color: transparent;
  border: none;
  color: var(--color-primary);
  font-size: var(--font-size-md);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-xs);
  border-radius: var(--border-radius-sm);
  
  &:hover {
    background-color: rgba(var(--color-primary-rgb), 0.05);
  }
`;

export const MetaInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--space-md);
`;

export const MetaInfoItem = styled.div`
  margin-bottom: var(--space-sm);
`;

export const MetaLabel = styled.div`
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-xs);
`;

export const MetaValue = styled.div`
  font-size: var(--font-size-md);
  color: var(--color-text);
  font-weight: 500;
`;

export const HeaderControls = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: var(--space-md);
  margin-top: var(--space-md);
`;

export const ControlButton = styled.button<{ primary?: boolean }>`
  background-color: ${({ primary }) => 
    primary ? 'var(--color-primary)' : 'transparent'};
  color: ${({ primary }) => 
    primary ? 'var(--color-text-on-primary)' : 'var(--color-primary)'};
  border: ${({ primary }) => 
    primary ? 'none' : '1px solid var(--color-primary)'};
  border-radius: var(--border-radius-sm);
  padding: var(--space-xs) var(--space-md);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
  
  &:hover {
    background-color: ${({ primary }) => 
      primary ? 'var(--color-primary-hover)' : 'rgba(var(--color-primary-rgb), 0.05)'};
  }
`;
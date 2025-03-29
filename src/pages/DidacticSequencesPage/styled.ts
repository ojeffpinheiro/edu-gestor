import styled from "styled-components";

const PageContainer = styled.div`
  max-width: 95vw;
  margin: 0 auto;
  padding: 2rem;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: var(--color-primary);
  font-size: 1.75rem;
  font-weight: 600;
`;

const IconButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  
  &.edit {
    color: #2196f3;
    &:hover {
      color: #1976d2;
    }
  }
  
  &.delete {
    color: #f44336;
    &:hover {
      color: #d32f2f;
    }
  }
  
  &.view {
    color: #4caf50;
    &:hover {
      color: #388e3c;
    }
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${props => props.active ? '#2196f3' : '#f5f5f5'};
  color: ${props => props.active ? 'white' : '#666'};
  border: 1px solid ${props => props.active ? '#2196f3' : '#ddd'};
  
  &:hover {
    background-color: ${props => props.active ? '#1976d2' : '#e0e0e0'};
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
  font-size: 1rem;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #d32f2f;
  font-size: 1rem;
  background-color: #ffebee;
  border-radius: 4px;
  margin-bottom: 2rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
  font-size: 1rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  
  ${({ status }) => {
    switch (status) {
      case 'draft':
        return `
          background-color: #ffe0b2;
          color: #e65100;
        `;
      case 'active':
        return `
          background-color: #c8e6c9;
          color: #2e7d32;
        `;
      case 'completed':
        return `
          background-color: #bbdefb;
          color: #0d47a1;
        `;
      default:
        return `
          background-color: #e0e0e0;
          color: #616161;
        `;
    }
  }}
`;

const CodeBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  margin-right: 0.25rem;
  margin-bottom: 0.25rem;
  background-color: #e3f2fd;
  color: #1565c0;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
`;

const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ActionsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export { ActionsContainer, BadgeContainer, CodeBadge, StatusBadge, EmptyState, ErrorMessage, FilterButton, FilterContainer, IconButton, LoadingMessage, PageContainer, PageHeader, Title }
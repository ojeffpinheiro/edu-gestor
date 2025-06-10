import styled from "styled-components";

export const DetailsContainer = styled.div`
  padding: var(--space-xl);
  flex: 1;
`;

export const BreadcrumbNav = styled.div`
  margin-bottom: var(--space-lg);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-xs);
`;

export const BreadcrumbItem = styled.span`
  cursor: pointer;
  transition: color var(--transition-fast);
  
  &:hover {
    color: var(--color-primary);
    text-decoration: underline;
  }
`;

export const DetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--space-xl);
  gap: var(--space-md);
`;

export const ItemTypeLabel = styled.div`
  font-size: var(--font-size-xs);
  text-transform: uppercase;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-sm);
  letter-spacing: 0.05em;
`;

export const DetailTitle = styled.h2`
  margin: 0;
  font-size: var(--font-size-2xl);
  color: var(--color-title-card);
  font-weight: var(--font-weight-semibold);
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: var(--space-sm);
`;

export const ActionButton = styled.button`
  background-color: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  padding: var(--space-sm);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--color-text-secondary);
  transition: all var(--transition-fast);
  
  &:hover {
    background-color: var(--color-background-secondary);
    color: var(--color-primary);
    border-color: var(--color-primary);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ContentSection = styled.div`
  margin-top: var(--space-xl);
`;

export const SectionTitle = styled.h3`
  font-size: var(--font-size-xl);
  margin-bottom: var(--space-md);
  color: var(--color-title-card);
  font-weight: var(--font-weight-semibold);
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: var(--space-md);
`;

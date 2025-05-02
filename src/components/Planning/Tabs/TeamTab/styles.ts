import styled from "styled-components";

export const Container = styled.div`
  padding: var(--space-lg);
`;

export const Title = styled.h2`
  font-size: var(--font-size-xl);
  font-weight: 600;
  margin-bottom: var(--space-lg);
  color: var(--color-title-card);
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-lg);

  @media (max-width: var(--breakpoint-md)) {
    grid-template-columns: 1fr;
  }
`;

export const TeamCard = styled.div`
  background-color: var(--color-card);
  border-radius: var(--border-radius-md);
  padding: var(--space-lg);
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
`;

export const TeamTitle = styled.h3`
  font-size: var(--font-size-lg);
  font-weight: 600;
  margin-bottom: var(--space-md);
  padding-bottom: var(--space-sm);
  border-bottom: 1px solid var(--color-border-light);
  color: var(--color-primary);
`;

export const TeamInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
`;

export const TeamIcon = styled.span`
  margin-right: var(--space-sm);
  color: var(--color-text-secondary);
  display: inline-flex;
  align-items: center;
`;

export const SectionTitle = styled.h4`
  font-weight: 500;
  margin: var(--space-md) 0 var(--space-sm);
  color: var(--color-text-secondary);
`;

export const ClassesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
`;

export const ClassItem = styled.div`
  background-color: var(--color-background-secondary);
  padding: var(--space-sm);
  border-radius: var(--border-radius-sm);
`;

export const ClassHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--space-xs);
  font-weight: 500;
`;

export const ClassTime = styled.div`
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
`;

export const EditButton = styled.button`
  margin-top: var(--space-md);
  background: none;
  border: none;
  color: var(--color-primary);
  font-weight: 500;
  cursor: pointer;
  text-align: left;
  padding: var(--space-xs) 0;
  transition: color var(--transition-fast);

  &:hover {
    color: var(--color-primary-hover);
    text-decoration: underline;
  }
`;

export const AddCard = styled.div`
  background-color: var(--color-card);
  border-radius: var(--border-radius-md);
  padding: var(--space-xl);
  border: 2px dashed var(--color-border-light);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    border-color: var(--color-primary);
    background-color: var(--color-background-secondary);
  }
`;

export const AddContent = styled.div`
  text-align: center;
`;

export const IconCircle = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: var(--border-radius-full);
  background-color: var(--color-background-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--space-sm);
  color: var(--color-primary);
`;

export const AddText = styled.p`
  font-size: var(--font-size-lg);
  font-weight: 500;
  color: var(--color-primary);
`;
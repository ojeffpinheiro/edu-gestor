import React from 'react'
import { FiInbox } from "react-icons/fi";
import styled from 'styled-components';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  title, 
  description, 
  icon = <FiInbox size={48} /> 
}) => (
  <Content>
    <Icon>{icon}</Icon>
    <Title>{title}</Title>
    {description && <Description>{description}</Description>}
  </Content>
);

const Content = styled.div`
  text-align: center;
  padding: 2rem;
  margin: 2rem 0;
  border-radius: 8px;
  background-color: var(--color-background-secondary);
`;

const Icon = styled.div`
  color: var(--color-text-secondary);
  margin-bottom: 1rem;
`;

const Title = styled.h3`
  margin: 0 0 0.5rem;
  color: var(--color-text);
`

const Description = styled.p`
  margin: 0;
  color: var(--color-text-secondary);
`
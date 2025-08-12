// components/DetailSection.tsx
import React, { ReactNode } from 'react';
import styled from 'styled-components';

const StyledSection = styled.div`
  margin-bottom: 1.5rem;
`;

const StyledLabel = styled.span`
  display: block;
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin-bottom: 0.25rem;
`;

const StyledValue = styled.div`
  font-size: 1rem;
  padding: 0.5rem;
  background-color: var(--color-background-secondary);
  border-radius: 4px;
`;

interface DetailSectionProps {
  label: string;
  children: ReactNode;
  icon?: ReactNode;
}

export const DetailSection: React.FC<DetailSectionProps> = ({ label, children, icon }) => (
  <StyledSection>
    <StyledLabel>
      {icon && <>{icon} </>}
      {label}
    </StyledLabel>
    <StyledValue>{children}</StyledValue>
  </StyledSection>
);
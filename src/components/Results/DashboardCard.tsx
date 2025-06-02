import React from 'react';
import styled from 'styled-components';

interface DashboardCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
}

const StyledCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;

const CardHeader = styled.div`
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #edf2f7;
`;

const CardTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
`;

const CardDescription = styled.p`
  font-size: 0.875rem;
  color: #718096;
  margin: 0.25rem 0 0;
`;

const CardContent = styled.div`
  padding: 1.5rem;
  flex: 1;
`;

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  children,
  fullWidth = false,
  className = ''
}) => {
  return (
    <StyledCard className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </StyledCard>
  );
};

export default DashboardCard;
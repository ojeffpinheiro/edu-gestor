import React from 'react';
import { StyledCard } from '../../styles/card';

interface DashboardCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  children,
  fullWidth = false,
  className = ''
}) => {
  return (
    <StyledCard>
      <div className="card-header">
        <h3>{title}</h3>
        {description && <p className="card-description">{description}</p>}
      </div>
      <div className="card-content">
        {children}
      </div>
    </StyledCard>
  );
};



export default DashboardCard;
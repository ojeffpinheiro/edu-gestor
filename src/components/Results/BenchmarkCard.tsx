// components/BenchmarkCard.tsx
import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 20px;
  margin-bottom: 20px;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 18px;
`;

interface BenchmarkCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const BenchmarkCard: React.FC<BenchmarkCardProps> = ({ 
  title, 
  value, 
  change, 
  icon, 
  children 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {icon}
      </CardHeader>
      
      <div className="card-value">
        {value}
        {change !== undefined && (
          <span className={`change-indicator ${change >= 0 ? 'positive' : 'negative'}`}>
            {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
          </span>
        )}
      </div>
      
      {children}
    </Card>
  );
};

export default BenchmarkCard;
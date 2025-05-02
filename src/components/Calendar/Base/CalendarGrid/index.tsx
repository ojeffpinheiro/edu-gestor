import React from 'react';
import styled from 'styled-components';

interface CalendarGridProps {
  columns: number;
  rows?: number;
  children: React.ReactNode;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({ columns, rows, children }) => {
  return (
    <GridContainer columns={columns} rows={rows}>
      {children}
    </GridContainer>
  );
};

const GridContainer = styled.div<{ columns: number; rows?: number }>`
  display: grid;
  grid-template-columns: repeat(${props => props.columns}, 1fr);
  ${props => props.rows && `grid-template-rows: repeat(${props.rows}, 1fr);`}
  gap: 1px;
  background-color: #e2e8f0;
  border: 1px solid #e2e8f0;
`;
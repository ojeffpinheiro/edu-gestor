// src/components/Exam/ClassCards/styles.ts
import styled from 'styled-components';

export const ClassCard = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 16px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const ClassHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #f5f5f5;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #ebebeb;
  }

  h3 {
    margin: 0;
    font-size: 1.1rem;
  }
`;

export const AssessmentItem = styled.div`
  border-top: 1px solid #e0e0e0;
  padding: 12px 16px;

  .assessment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }

  .students-scores {
    margin-top: 8px;
    padding: 8px 0;
  }
`;

export const StudentScore = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
  font-size: 0.9rem;
`;

export const CollapseButton = styled.button<{ small?: boolean }>`
  background: none;
  border: none;
  font-size: ${props => props.small ? '1rem' : '1.2rem'};
  cursor: pointer;
  padding: 0 8px;
  color: #666;
`;
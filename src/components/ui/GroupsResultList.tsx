import React from 'react';
import { FaUsers } from "react-icons/fa";

import { Student } from '../../utils/types'
import styled from 'styled-components';

interface GroupsResultListProps {
    studentGroups: Student[][];
    showResults: boolean;
}

/**
 * Componente para renderizar a lista de grupos formados
 */
const GroupsResultList: React.FC<GroupsResultListProps> = ({ 
    studentGroups, 
    showResults 
}) => {
    if (!showResults || studentGroups.length === 0) return null;
    
    return (
        <GroupsList>
            <h4>
                <FaUsers style={{ marginRight: '8px' }} />
                Grupos Formados ({studentGroups.length})
            </h4>
            {studentGroups.map((group, index) => (
                <GroupItem key={index}>
                    <h5>Grupo {index + 1} ({group.length} estudantes)</h5>
                    <StudentsList>
                        {group.map((student) => (
                            <StudentItem key={student.id}>{student.name}</StudentItem>
                        ))}
                    </StudentsList>
                </GroupItem>
            ))}
        </GroupsList>
    );
};

export default GroupsResultList;

/**
 * Container for groups list with proper scrolling and visual separation
 */
export const GroupsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 8px;
  max-height: 300px;
  overflow-y: auto;
  padding: 12px;
  background-color: var(--color-background-third, #f7fafc);
  border-radius: 6px;
  border: 1px solid var(--color-border-light, #e2e8f0);

  h4 {
    margin: 0 0 8px 0;
    font-size: 16px;
    color: var(--color-text, #2d3748);
    font-weight: 600;
  }
  
  /* Custom scrollbar for better user experience */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: var(--color-background-third, #f7fafc);
    border-radius: 6px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: var(--color-border, #cbd5e0);
    border-radius: 6px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background-color: var(--color-border-dark, #a0aec0);
  }
`;

/**
 * Individual group item with visual hierarchy
 */
export const GroupItem = styled.div`
  padding: 12px;
  background-color: var(--color-card, #ffffff);
  border-radius: 6px;
  box-shadow: var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.05));
  border: 1px solid var(--color-border-light, #edf2f7);
  transition: all 0.2s;
  
  &:hover {
    box-shadow: var(--shadow-md, 0 2px 5px rgba(0, 0, 0, 0.08));
  }

  h5 {
    margin: 0 0 8px 0;
    font-size: 15px;
    color: var(--color-primary, #3182ce);
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 6px;
    
    &::before {
      content: '•';
      color: var(--color-primary, #3182ce);
    }
  }
`;

/**
 * List of students within a group
 */
export const StudentsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

/**
 * Individual student item with subtle visual distinction
 */
export const StudentItem = styled.li`
  padding: 8px 12px;
  background-color: var(--color-background-secondary, #f8fafc);
  border-radius: 4px;
  font-size: 14px;
  color: var(--color-text-secondary, #4a5568);
  border-left: 3px solid var(--color-border-light, #e2e8f0);
  transition: all 0.2s;
  
  &:hover {
    background-color: var(--color-background-third, #edf2f7);
    border-left-color: var(--color-primary, #4299e1);
  }
`;
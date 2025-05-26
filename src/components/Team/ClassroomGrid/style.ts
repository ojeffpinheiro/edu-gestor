import styled from "styled-components";

export const ClassroomLayout = styled.div`
  background-color: var(--color-card);
  border-radius: var(--border-radius-md);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
  
  h3 {
    margin-bottom: 1rem;
  }
`;

export const TeacherDesk = styled.div`
  padding: 1rem;
  margin-bottom: 2rem;
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius-md);
  text-align: center;
  font-weight: 500;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;
  margin-top: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
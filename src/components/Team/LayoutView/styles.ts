import styled from "styled-components";

export const ClassroomLayout = styled.div`
  background-color: var(--color-card);
  border-radius: var(--border-radius-md);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
  margin-top: 1rem;
  
  h3 {
    margin-bottom: 1.5rem;
    color: var(--color-text-primary);
    font-size: 1.25rem;
  }
`;

export const TeacherDesk = styled.div`
  padding: 1.25rem;
  margin-bottom: 2rem;
  background-color: var(--color-primary-light);
  border-radius: var(--border-radius-md);
  text-align: center;
  font-weight: 500;
  color: var(--color-primary-dark);
  border: 2px dashed var(--color-primary);
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  }
`;
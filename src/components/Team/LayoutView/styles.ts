import styled, { css } from "styled-components";

import { Template } from "../../../utils/classroomUtils";

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

export const GridContainer = styled.div<{ $template?: Template }>`
  width: 100%;
  margin-top: 1rem;
  position: relative;

  ${props => props.$template === 'U' && css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  `}

  ${props => props.$template === 'circle' && css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 500px;
    position: relative;
    margin: 2rem 0;
    
    /* Círculo de fundo para referência (opcional) */
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 70%;
      height: 70%;
      border: 2px dashed rgba(0, 0, 0, 0.1);
      border-radius: 50%;
      z-index: 0;
    }
  `}

  ${props => props.$template === 'groups' && css`
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
  `}

  ${props =>
    (!props.$template ||
      props.$template === "rows") &&
    css`
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 1rem;
    `
  }
`;

export const GroupContainer = styled.div`
  border: 2px dashed #ccc;
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
  background: rgba(0, 0, 0, 0.02);
`;
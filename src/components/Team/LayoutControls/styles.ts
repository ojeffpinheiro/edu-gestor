import styled from "styled-components";

export const ActionContainer = styled.div`
  display: flex;
  gap: '0.5rem'; 
  flex-wrap: 'wrap';
`;

export const Content = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const TemplateSelect = styled.select`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  appearance: none;
  padding-left: 2rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
  }
`;
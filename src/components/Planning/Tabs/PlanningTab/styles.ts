import styled from 'styled-components';

export const PlanningContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

export const TabsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding: 1rem 0;
  margin-bottom: 2rem;
  border-bottom: 1px solid #e2e8f0;
`;

export const TabButton = styled.button<{ active: boolean }>`
  padding: 10px 15px;
  background: ${({ active }) => (active ? '#4a6fa5' : '#f0f0f0')};
  color: ${({ active }) => (active ? 'white' : '#333')};
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background: ${({ active }) => (active ? '#3a5a80' : '#e0e0e0')};
  }
`;

export const Section = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
  }

  input, textarea, select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-family: inherit;
  }

  textarea {
    min-height: 100px;
  }
`;

export const Card = styled.div`
  background: #f9f9f9;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const CardContent = styled.div`
  padding: 1.5rem;
`;

export const CardActions = styled.div`
  padding: 1rem 1.5rem;
  background: #f7fafc;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
`;

export const Button = styled.button<{ secondary?: boolean }>`
  padding: 0.75rem 1.5rem;
  background: ${({ secondary }) => (secondary ? '#e2e8f0' : '#3182ce')};
  color: ${({ secondary }) => (secondary ? '#4a5568' : 'white')};
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background: ${({ secondary }) => (secondary ? '#cbd5e0' : '#2c5282')};
  }

  &.danger {
    background: #d9534f;

    &:hover {
      background: #c9302c;
    }
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

export const ErrorMessage = styled.div`
  color: #d9534f;
  font-size: 0.9em;
  margin-top: 5px;
`;

export const ConfirmationDialog = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  div {
    background: white;
    padding: 20px;
    border-radius: 8px;
    max-width: 400px;
    width: 100%;
  }

  p {
    margin-bottom: 20px;
  }
`;


export const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-family: inherit;
  min-height: 150px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 1px #3182ce;
  }
`;
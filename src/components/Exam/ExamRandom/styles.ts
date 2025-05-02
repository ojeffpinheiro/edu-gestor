import styled from "styled-components";

// Estilização dos componentes
export const StepContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;
`;

export const CheckboxGroup = styled.div`
  margin-bottom: 10px;
`;

export const DifficultySliders = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 10px;
`;

export const DifficultySlider = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const TotalQuestions = styled.div`
  margin-top: 15px;
  font-size: 14px;
  color: #555;
`;

export const Summary = styled.div`
  margin-top: 20px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
  
  h3 {
    margin-bottom: 10px;
    font-size: 16px;
  }
  
  p {
    margin: 5px 0;
    font-size: 14px;
  }
`;
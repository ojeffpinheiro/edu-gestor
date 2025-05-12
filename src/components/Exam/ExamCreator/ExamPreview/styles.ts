import styled from "styled-components";

const colors = {
    primary: '#4a90e2',
    primaryHover: '#3a7bc8',
    secondary: '#f8f9fa',
    text: '#333',
    textLight: '#666',
    border: '#e0e0e0',
    background: '#ffffff',
    error: '#e74c3c',
    success: '#2ecc71',
    warning: '#f39c12'
  };
  
  // Componentes estilizados
export  const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    background-color: ${colors.secondary};
    padding: 20px;
    box-sizing: border-box;
  `;
  
export  const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 15px;
  `;
  
export  const Title = styled.h2`
    font-size: 24px;
    color: ${colors.text};
    margin: 0;
  `;
  
export  const Controls = styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
    flex-wrap: wrap;
  `;
  
export  const ExamContainer = styled.div`
    background-color: ${colors.background};
    border-radius: 8px;
    padding: 30px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    max-width: 90vw;
    margin: 0 auto;
    width: 100%;
  `;
  
export  const ExamHeader = styled.div`
    text-align: center;
    margin-bottom: 30px;
    border-bottom: 1px solid ${colors.border};
    padding-bottom: 20px;
  `;
  
export  const ExamTitle = styled.h1`
    font-size: 24px;
    margin-bottom: 10px;
    color: ${colors.text};
  `;
  
export  const ExamSubtitle = styled.div`
    font-size: 16px;
    color: ${colors.textLight};
    margin-bottom: 5px;
  `;
  
export  const ExamContent = styled.div`
    font-size: 16px;
    line-height: 1.6;
  `;
  
export  const QuestionItem = styled.div`
    margin-bottom: 30px;
    position: relative;
    padding: 15px;
    border-radius: 8px;
    border: 1px solid transparent;
    transition: all 0.2s ease;
    
    &:hover {
      border-color: ${colors.border};
      background-color: #f9f9f9;
    }
  `;
  
export  const QuestionActions = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    gap: 8px;
    opacity: 0;
    transition: opacity 0.2s ease;
    
    ${QuestionItem}:hover & {
      opacity: 1;
    }
  `;
  
  interface ActionButtonProps {
    color?: string;
    hoverColor?: string;
  }
  
export  const ActionButton = styled.button<ActionButtonProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: none;
    background-color: ${colors.background};
    color: ${colors.textLight};
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;
    
    &:hover {
      background-color: ${props => props.color || '#f1f3f5'};
      color: ${props => props.hoverColor || colors.text};
    }
  
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;
  
export  const QuestionNumber = styled.div`
    font-weight: bold;
    margin-bottom: 10px;
    color: ${colors.text};
  `;
  
export  const QuestionText = styled.div`
    margin-bottom: 15px;
    color: ${colors.text};
  `;
  
export  const Options = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
  `;
  
export  const Option = styled.div`
    display: flex;
    gap: 10px;
    align-items: baseline;
  `;
  
export  const OptionLetter = styled.span`
    font-weight: bold;
    color: ${colors.text};
  `;
  
export  const OptionText = styled.span`
    color: ${colors.text};
  `;
  
export  const Answer = styled.div`
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px dashed ${colors.border};
    color: ${colors.success};
    font-style: italic;
  `;
  
export  const ButtonsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;
    flex-wrap: wrap;
    gap: 15px;
  `;
  
export  const LeftButtons = styled.div`
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  `;
  
export  const ToggleButton = styled.button<{ active?: boolean }>`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background-color: ${props => props.active ? colors.primary : colors.background};
    color: ${props => props.active ? 'white' : colors.text};
    border: 1px solid ${props => props.active ? colors.primary : colors.border};
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s ease;
    
    &:hover {
      background-color: ${props => props.active ? colors.primaryHover : '#f1f3f5'};
    }
  `;
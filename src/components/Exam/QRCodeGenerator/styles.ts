
import styled from 'styled-components';

// Styled Components
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  position: relative;
`;

export const ModalContainer = styled(Container)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  max-width: 450px;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: #333;
  }
`;

export const Title = styled.h3`
  color: #333;
  margin-bottom: 1rem;
  font-weight: 600;
  text-align: center;
`;

export const QRContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

export const IdText = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 0.5rem 0 1rem;
  text-align: center;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
  width: 100%;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;
  gap: 0.5rem;
  flex: 1;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const PrimaryButton = styled(Button)`
  background-color: #4a6cf7;
  color: white;
  
  &:hover {
    background-color: #3a5ce7;
  }
`;

export const SecondaryButton = styled(Button)`
  background-color: #f0f0f0;
  color: #333;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

export const FormatSelector = styled.div`
  display: flex;
  width: 100%;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

interface FormatOptionProps {
  active?: boolean;
}

export const FormatOption = styled.div<FormatOptionProps>`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  flex: 1;
  font-size: 0.9rem;
  background-color: ${props => props.active ? '#4a6cf7' : '#f0f0f0'};
  color: ${props => props.active ? 'white' : '#333'};
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.active ? '#3a5ce7' : '#e0e0e0'};
  }
`;

export const SizeControl = styled.div`
  width: 100%;
  margin: 1rem 0;
`;

export const SizeControlWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
`;

export const SizeLabel = styled.label`
  font-size: 0.9rem;
  color: #666;
`;

export const SizeSlider = styled.input`
  flex: 1;
  height: 4px;
  background: #e0e0e0;
  border-radius: 5px;
  outline: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #4a6cf7;
    cursor: pointer;
  }
`;

export const SizeValue = styled.span`
  font-size: 0.9rem;
  color: #666;
  width: 50px;
  text-align: right;
`;
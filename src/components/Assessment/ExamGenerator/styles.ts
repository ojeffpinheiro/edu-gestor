import styled from "styled-components";

export const Container = styled.div`
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  padding: 24px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

export const Title = styled.h2`
  font-size: 18px;
  margin-bottom: 24px;
  color: #333;
  font-weight: 600;
`;

export const FormContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-bottom: 24px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-size: 14px;
  color: #595959;
  margin-bottom: 8px;
`;

export const NumberInput = styled.input.attrs({ type: 'number' })`
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  width: 100%;
  max-width: 120px;
  
  &:focus {
    border-color: #1890ff;
    outline: none;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
`;

export const TextInput = styled.input.attrs({ type: 'text' })`
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  width: 100%;
  max-width: 300px;
  
  &:focus {
    border-color: #1890ff;
    outline: none;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
`;

export const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const SwitchLabel = styled.span`
  margin-left: 8px;
  font-size: 14px;
`;

export const SwitchInput = styled.input.attrs({ type: 'checkbox' })`
  position: relative;
  appearance: none;
  width: 40px;
  height: 20px;
  background-color: #d9d9d9;
  border-radius: 20px;
  transition: background-color 0.3s;
  cursor: pointer;
  
  &:checked {
    background-color: #1890ff;
  }
  
  &:before {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    top: 2px;
    left: 2px;
    background-color: white;
    transition: left 0.3s;
  }
  
  &:checked:before {
    left: 22px;
  }
`;

export const Button = styled.button<{ primary?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
  background-color: ${props => props.primary ? '#1890ff' : '#fff'};
  color: ${props => props.primary ? '#fff' : '#595959'};
  border: 1px solid ${props => props.primary ? '#1890ff' : '#d9d9d9'};
  
  &:hover {
    background-color: ${props => props.primary ? '#40a9ff' : '#f7f7f7'};
    border-color: ${props => props.primary ? '#40a9ff' : '#d9d9d9'};
  }
  
  &:disabled {
    background-color: #f5f5f5;
    border-color: #d9d9d9;
    color: #bfbfbf;
    cursor: not-allowed;
  }
`;

export const IconWrapper = styled.span`
  margin-right: 8px;
  display: inline-flex;
  align-items: center;
`;

export const Divider = styled.div`
  height: 1px;
  background-color: #e8e8e8;
  margin: 24px 0;
`;

export const Alert = styled.div<{ type: 'success' | 'error' | 'warning' | 'info' }>`
  padding: 12px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  background-color: ${props => {
    switch (props.type) {
      case 'success': return '#f6ffed';
      case 'error': return '#fff2f0';
      case 'warning': return '#fffbe6';
      case 'info': return '#e6f7ff';
      default: return '#e6f7ff';
    }
  }};
  border: 1px solid ${props => {
    switch (props.type) {
      case 'success': return '#b7eb8f';
      case 'error': return '#ffccc7';
      case 'warning': return '#ffe58f';
      case 'info': return '#91d5ff';
      default: return '#91d5ff';
    }
  }};
  color: ${props => {
    switch (props.type) {
      case 'success': return '#52c41a';
      case 'error': return '#ff4d4f';
      case 'warning': return '#faad14';
      case 'info': return '#1890ff';
      default: return '#1890ff';
    }
  }};
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

export const VariantCard = styled.div`
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 16px;
  background-color: #fafafa;
`;

export const VariantHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f0f0f0;
`;

export const VariantTitle = styled.h3`
  font-size: 16px;
  margin: 0;
  color: #333;
`;

export const VariantActions = styled.div`
  display: flex;
  gap: 8px;
`;

export const VariantDetails = styled.div`
  margin-bottom: 8px;
  
  p {
    margin: 4px 0;
    font-size: 14px;
  }
`;

export const Tag = styled.span<{ color: string }>`
  display: inline-flex;
  align-items: center;
  height: 22px;
  padding: 0 8px;
  font-size: 12px;
  line-height: 20px;
  white-space: nowrap;
  background: ${props => {
    switch (props.color) {
      case 'blue': return '#e6f7ff';
      case 'green': return '#f6ffed';
      default: return '#f5f5f5';
    }
  }};
  border: 1px solid ${props => {
    switch (props.color) {
      case 'blue': return '#91d5ff';
      case 'green': return '#b7eb8f';
      default: return '#d9d9d9';
    }
  }};
  border-radius: 2px;
  color: ${props => {
    switch (props.color) {
      case 'blue': return '#1890ff';
      case 'green': return '#52c41a';
      default: return '#595959';
    }
  }};
  margin-left: 8px;
`;
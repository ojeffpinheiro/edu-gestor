import styled from 'styled-components';

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #4a5568;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Input = styled.input<{ hasError?: boolean }>`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.hasError ? '#e53e3e' : '#e2e8f0'};
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #4299e1;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #4299e1;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  font-size: 1rem;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #4299e1;
  }
`;

export const FileUpload = styled.input`
  display: none;
`;

export const FileUploadLabel = styled.label`
  display: block;
  width: 100%;
  padding: 0.75rem;
  border: 1px dashed #cbd5e0;
  border-radius: 0.375rem;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f7fafc;
  }
`;

export const SessionSelector = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

export const SessionOption = styled.div<{ $active: boolean }>`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid ${props => props.$active ? '#4299e1' : '#e2e8f0'};
  border-radius: 0.375rem;
  text-align: center;
  cursor: pointer;
  background-color: ${props => props.$active ? '#ebf8ff' : 'white'};
  color: ${props => props.$active ? '#2b6cb0' : '#4a5568'};
  font-weight: ${props => props.$active ? '600' : '500'};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s;
  
  &:hover {
    border-color: #4299e1;
  }
`;

export const ErrorMessage = styled.span`
  display: block;
  margin-top: 0.25rem;
  color: #e53e3e;
  font-size: 0.875rem;
`;
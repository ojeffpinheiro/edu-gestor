import styled from "styled-components";

export const ReportContainerWrapper = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;
  overflow: hidden;
`;

export const ReportHeader = styled.div`
  background: linear-gradient(to right, #3b82f6, #2563eb);
  color: white;
  padding: 1rem;
`;

export const ReportTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
`;

export const ReportContent = styled.div`
  padding: 1.5rem;
`;

export const ActionButton = styled.button`
  padding: 0.5rem;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 0.25rem;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

export const Tr = styled.tr`
  hover: { 
    backgroundColor: '#f9fafb' 
  }
`;

export const GeneratedReportsContainer = styled.div`
  min-height: 100vh;
  background-color: #f3f4f6;
  padding: 1.5rem;
`;

export const ChangeItem = styled.div`
  border: '1px solid #e5e7eb';
  borderRadius: '0.5rem';
  padding: '1rem';
  
  &:hover {
    backgroundColor: #f9fafb
  }
`

export const ReportsGrid = styled.div`
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #3b82f6;
  margin-bottom: 1rem;
  
  &:hover {
    color: #1d4ed8;
  }
`;

export const ReportTypeButton = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: background-color 0.2s;
  background-color: ${props => props.active ? '#3b82f6' : 'white'};
  color: ${props => props.active ? 'white' : '#374151'};
  
  &:hover {
    background-color: ${props => props.active ? '#2563eb' : '#f9fafb'};
  }
`;
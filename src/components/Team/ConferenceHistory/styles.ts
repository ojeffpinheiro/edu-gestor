import styled from 'styled-components';

export const HistoryContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const HistoryItem = styled.div`
  padding: 12px 0;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

export const HistoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const VerificationBadge = styled.span`
  background: #4CAF50;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
`;

export const HistoryDetails = styled.div`
  display: grid;
  gap: 12px;
`;

export const AbsenceList = styled.ul`
  color: #F44336;
  padding-left: 20px;
`;

export const MismatchList = styled.ul`
  color: #FFC107;
  padding-left: 20px;
`;
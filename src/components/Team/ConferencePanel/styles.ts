import styled from "styled-components";

export const ConferenceControlPanel = styled.div`
  background: #f8f9fa;
  border-radius: var(--border-radius-md);
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #e0e0e0;
`;

export const ConferenceStats = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
`;

export const StatItem = styled.div`
  text-align: center;
`;

export const StatLabel = styled.div`
  font-size: 0.8rem;
  color: #666;
`;

export const StatValue = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;
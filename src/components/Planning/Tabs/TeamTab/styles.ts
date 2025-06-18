import styled from "styled-components";
import { Button } from "../../../../styles/buttons";

export const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  font-size: 1.8rem;
  color: #2d3748;
  font-weight: 600;
`;

export const TeamsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

export const TeamCard = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

export const TeamHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
`;

export const TeamTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
`;

export const TeamSession = styled.span`
  background: #edf2f7;
  color: #4a5568;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
`;

export const TeamDetails = styled.div`
  margin-bottom: 1.5rem;
`;

export const DetailItem = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
`;

export const DetailLabel = styled.span`
  font-weight: 500;
  color: #4a5568;
  margin-right: 0.5rem;
`;

export const DetailValue = styled.span`
  color: #2d3748;
`;

export const TeamActions = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

export const ActionButton = styled(Button)`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
`;
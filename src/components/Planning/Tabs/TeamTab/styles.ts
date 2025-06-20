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
  grid-template-columns: repeat(3, minmax(320px, 1fr));
  gap: 1.5rem;
`;

export const TeamCard = styled.div<{ $session: 'Manhã' | 'Tarde' | 'Noite' }>`
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid #e2e8f0;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    border-color: #cbd5e0;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${props =>
    props.$session === 'Manhã' ? '#3182ce' :
      props.$session === 'Tarde' ? '#d69e2e' : '#805ad5'};
    transition: all 0.3s ease;
  }

  &:hover::before {
    width: 6px;
  }
`;

export const TeamHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #edf2f7;
  gap: 1rem;
`;

export const TeamInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;

export const TeamTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  line-height: 1.4;
  padding-right: 1.5rem;
`;

export const TeamSession = styled.span<{ $session: 'Manhã' | 'Tarde' | 'Noite' }>`
  background: ${props =>
    props.$session === 'Manhã' ? '#EBF8FF' :
      props.$session === 'Tarde' ? '#FEFCBF' : '#E9D8FD'};
  color: ${props =>
    props.$session === 'Manhã' ? '#2C5282' :
      props.$session === 'Tarde' ? '#744210' : '#44337A'};
  padding: 0.35rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  align-self: flex-start;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

export const TeamDetails = styled.div`
  margin-bottom: 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.75rem;
`;

export const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  background-color: #f8fafc;

  &:hover {
    background-color: #edf2f7;
    transform: translateY(-1px);
  }
`;

export const DetailLabel = styled.span`
  font-weight: 500;
  color: #4a5568;
  font-size: 0.8125rem;
`;

export const DetailValue = styled.span`
  color: #1a202c;
  font-weight: 600;
  font-size: 0.9375rem;
  margin-left: auto;
`;

export const TeamActions = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

export const ActionButton = styled(Button)`
  padding: 0.5rem;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;
  width: 36px;
  height: 36px;
  position: relative;
  color: white;

  &:hover {
    transform: none;
    background: #f8fafc;
    color: #2d3748;

    &::after {
      content: attr(data-tooltip);
      position: absolute;
      bottom: -30px;
      left: 50%;
      transform: translateX(-50%);
      background: #2d3748;
      color: white;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      font-size: 0.75rem;
      white-space: nowrap;
      z-index: 10;
    }
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background: #f8fafc;
  border-radius: 0.5rem;
  border: 1px dashed #cbd5e0;
  
  p {
    color: #718096;
    margin-bottom: 1.5rem;
  }

  ${Button} {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
`;
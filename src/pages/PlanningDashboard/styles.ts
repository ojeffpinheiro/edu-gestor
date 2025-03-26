import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: auto;
  font-family: Arial, sans-serif;
`;

export const Header = styled.header`
  text-align: center;
  margin-bottom: 20px;

  h1 {
    color: #2C3E50;
    font-size: 2rem;
  }

  p {
    color: #7F8C8D;
    font-size: 1rem;
  }
`;

export const Section = styled.section`
  background: #ECF0F1;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;

  h2 {
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    color: #34495E;
    gap: 8px;
  }
`;

export const Button = styled.button<{ active: boolean }>`
  background: ${(props) => (props.active ? '#2980B9' : '#BDC3C7')};
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: 0.3s;

  &:hover {
    background: #2980B9;
  }
`;

export const Notification = styled.div<{ type: string }>`
  background: white;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  span {
    font-weight: bold;
    color: ${(props) =>
      props.type === 'prazo' ? '#E74C3C' : props.type === 'lembrete' ? '#F1C40F' : '#3498DB'};
  }

  p {
    color: #2C3E50;
    margin: 5px 0;
  }

  small {
    color: #7F8C8D;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
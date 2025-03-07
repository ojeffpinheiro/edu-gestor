import React from 'react';
import { FaClipboardList, FaChartBar, FaUsers, FaUserEdit } from 'react-icons/fa';
import { useTheme } from '../../contexts/ThemeContext';
import { Container, Title, CardsContainer, Card } from './styles';

const TeamPage: React.FC = () => {
  const theme = useTheme();

  return (
    <Container theme={theme}>
      <Title>Gestão da Turma</Title>
      <CardsContainer>
        <Card>
          <FaClipboardList size={40} />
          <span>Realizar Chamada</span>
        </Card>
        <Card>
          <FaChartBar size={40} />
          <span>Acompanhar Notas</span>
        </Card>
        <Card>
          <FaUsers size={40} />
          <span>Comportamento da Turma</span>
        </Card>
        <Card >
          <FaUserEdit size={40} />
          <span>Gerenciar Alunos</span>
        </Card>
      </CardsContainer>
    </Container>
  );
};

export default TeamPage;

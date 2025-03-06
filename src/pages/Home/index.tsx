import React from "react";
import { FaBook, FaChalkboardTeacher, FaClipboardList } from "react-icons/fa";
import { useTheme } from "../../contexts/ThemeContext";

import {
  Container,
  Title,
  CardsContainer,
  FeatureCard,
  IconWrapper,
  FeatureTitle,
  FeatureDescription,
} from "./styles";

const HomePage: React.FC = () => {
  const theme = useTheme();

  return (
    <Container theme={theme}>
      <Title>Edu Gestor - Home</Title>

      <CardsContainer>
        <FeatureCard>
          <IconWrapper>
            <FaBook size={40} color="#4A90E2" />
          </IconWrapper>
          <FeatureTitle>Caderno Digital</FeatureTitle>
          <FeatureDescription>
            Organize suas anotações e materiais de aula de forma prática e acessível.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <IconWrapper>
            <FaChalkboardTeacher size={40} color="#F5A623" />
          </IconWrapper>
          <FeatureTitle>Planejador de Classe</FeatureTitle>
          <FeatureDescription>
            Estruture suas aulas com facilidade e planeje suas atividades com eficiência.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <IconWrapper>
            <FaClipboardList size={40} color="#7ED321" />
          </IconWrapper>
          <FeatureTitle>Avaliação</FeatureTitle>
          <FeatureDescription>
            Gerencie provas e avaliações para acompanhar o desempenho dos alunos.
          </FeatureDescription>
        </FeatureCard>
      </CardsContainer>
    </Container>
  );
};

export default HomePage;

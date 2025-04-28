import React from 'react';
import styled from 'styled-components';
import { FaUsers, FaClock } from 'react-icons/fa';

// Dados de exemplo
const turmas = [
  { id: 1, nome: "Turma A", alunos: 25, periodo: "Matutino" },
  { id: 2, nome: "Turma B", alunos: 30, periodo: "Vespertino" },
  { id: 3, nome: "Turma C", alunos: 28, periodo: "Noturno" }
];

const aulas = [
  { id: 1, turma: "Turma A", disciplina: "Matemática", dia: "Seg", horario: "08:00 - 09:40" },
  { id: 2, turma: "Turma A", disciplina: "Português", dia: "Ter", horario: "10:00 - 11:40" },
  { id: 3, turma: "Turma B", disciplina: "História", dia: "Qua", horario: "14:00 - 15:40" },
  { id: 4, turma: "Turma C", disciplina: "Física", dia: "Qui", horario: "19:00 - 20:40" }
];

// Componentes estilizados
const Container = styled.div`
  padding: 1rem;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled.div`
  background-color: white;
  padding: 1rem;
  border-radius: 0.375rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const CardTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
`;

const SpacedItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FlexItem = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  margin-right: 0.5rem;
  color: #4b5563;
`;

const SectionTitle = styled.h4`
  font-weight: 500;
  margin-bottom: 0.25rem;
  margin-top: 0.75rem;
`;

const AulasList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const AulaItem = styled.div`
  font-size: 0.875rem;
  background-color: #eff6ff;
  padding: 0.5rem;
  border-radius: 0.375rem;
`;

const AulaHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AulaTime = styled.div`
  color: #6b7280;
`;

const ButtonContainer = styled.div`
  margin-top: 0.75rem;
  display: flex;
  justify-content: flex-end;
`;

const EditButton = styled.button`
  color: #2563eb;
  font-size: 0.875rem;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const AddCard = styled(Card)`
  border: 2px dashed #d1d5db;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AddContent = styled.div`
  text-align: center;
`;

const IconCircle = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
  background-color: #dbeafe;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 0.5rem;
`;

const AddText = styled.p`
  font-size: 1.125rem;
  font-weight: 500;
  color: #2563eb;
`;

// Componente principal
const TabTurmas = () => (
  <Container>
    <Title>Personalização por Turma</Title>
    
    <Grid>
      {turmas.map(turma => (
        <Card key={turma.id}>
          <CardTitle>{turma.nome}</CardTitle>
          <SpacedItems>
            <FlexItem>
              <Icon>
                <FaUsers size={18} />
              </Icon>
              <span>{turma.alunos} alunos</span>
            </FlexItem>
            
            <FlexItem>
              <Icon>
                <FaClock size={18} />
              </Icon>
              <span>Período: {turma.periodo}</span>
            </FlexItem>
            
            <div>
              <SectionTitle>Aulas Programadas</SectionTitle>
              <AulasList>
                {aulas
                  .filter(aula => aula.turma === turma.nome)
                  .map(aula => (
                    <AulaItem key={aula.id}>
                      <AulaHeader>
                        <span>{aula.disciplina}</span>
                        <span style={{ color: '#4b5563' }}>{aula.dia}</span>
                      </AulaHeader>
                      <AulaTime>{aula.horario}</AulaTime>
                    </AulaItem>
                  ))}
              </AulasList>
            </div>
            
            <ButtonContainer>
              <EditButton>Editar turma</EditButton>
            </ButtonContainer>
          </SpacedItems>
        </Card>
      ))}
      
      <AddCard>
        <AddContent>
          <IconCircle>
            <FaUsers size={24} style={{ color: '#2563eb' }} />
          </IconCircle>
          <AddText>Adicionar Nova Turma</AddText>
        </AddContent>
      </AddCard>
    </Grid>
  </Container>
);

export default TabTurmas;
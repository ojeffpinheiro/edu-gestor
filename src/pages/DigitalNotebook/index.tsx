import React from "react";
import { FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { classes } from "../../mocks/classesData";

import {
  Container,
  Title,
  ClassList,
  ClassCard,
  IconWrapper,
  ClassTitle,
  ClassDescription,
} from "./styles";

const DigitalNotebook: React.FC = () => {
  const navigate = useNavigate();
  
  const handleClassClick = (classId: number) => {
    console.log(`Clicked on class ${classId}`);
    navigate('/team-management');
  };

  return (
    <Container>
      <Title>Caderno Digital</Title>

      <ClassList>
        {classes.map((turma) => (
          <ClassCard key={turma.id} onClick={() => handleClassClick(turma.id)}>
            <IconWrapper>
              <FaUsers size={30} color="#4A90E2" />
            </IconWrapper>
            <ClassTitle>{turma.name}</ClassTitle>
            <ClassDescription>{turma.description}</ClassDescription>
          </ClassCard>
        ))}
      </ClassList>
    </Container>
  );
};

export default DigitalNotebook;

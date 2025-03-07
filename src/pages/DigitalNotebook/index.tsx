import React from "react";
import { FaUsers } from "react-icons/fa";
import { useTheme } from "../../contexts/ThemeContext";

import {
  Container,
  Title,
  ClassList,
  ClassCard,
  IconWrapper,
  ClassTitle,
  ClassDescription,
} from "./styles";

const classes = [
  { id: 1, name: "Turma 1A", description: "Matemática - 9º Ano" },
  { id: 2, name: "Turma 2B", description: "História - 7º Ano" },
  { id: 3, name: "Turma 3C", description: "Física - 2º Ano EM" }, 
  { id: 4, name: "Turma 1A", description: "Matemática - 9º Ano" },
  { id: 5, name: "Turma 2B", description: "História - 7º Ano" },
  { id: 6, name: "Turma 3C", description: "Física - 2º Ano EM" },  
  { id: 7, name: "Turma 1A", description: "Matemática - 9º Ano" },
  { id: 8, name: "Turma 2B", description: "História - 7º Ano" },
  { id: 9, name: "Turma 3C", description: "Física - 2º Ano EM" },
  { id: 10, name: "Turma 3C", description: "Física - 2º Ano EM" },  
  { id: 11, name: "Turma 1A", description: "Matemática - 9º Ano" },
  { id: 12, name: "Turma 2B", description: "História - 7º Ano" },
  { id: 13, name: "Turma 3C", description: "Física - 2º Ano EM" },
  { id: 14, name: "Turma 3C", description: "Física - 2º Ano EM" },
  { id: 15, name: "Turma 3C", description: "Física - 2º Ano EM" },  
  { id: 16, name: "Turma 1A", description: "Matemática - 9º Ano" },
  { id: 17, name: "Turma 2B", description: "História - 7º Ano" },
  { id: 18, name: "Turma 3C", description: "Física - 2º Ano EM" }
];

const DigitalNotebook: React.FC = () => {
  const theme = useTheme();
  
  const handleClassClick = (classId: number) => {
    console.log(`Clicked on class ${classId}`);
  };

  return (
    <Container theme={theme}>
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

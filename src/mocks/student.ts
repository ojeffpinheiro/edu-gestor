import { StudentFormData } from "../utils/types/BasicUser";

export const mockStudents = [
    { id: 1, name: "Ana Souza", email: "ana.souza@example.com", attendance: 90 },
    { id: 2, name: "Carlos Oliveira", email: "carlos.oliveira@example.com", attendance: 85 },
    { id: 3, name: "Fernanda Lima", email: "fernanda.lima@example.com", attendance: 75 },
    { id: 4, name: "Rafael Mendes", email: "rafael.mendes@example.com", attendance: 35 },
    { id: 5, name: "Juliana Costa", email: "juliana.costa@example.com", attendance: 45 },
    { id: 6, name: "Lucas Pereira", email: "lucas.pereira@example.com", attendance: 25 },
    { id: 7, name: "Mariana Silva", email: "mariana.silva@example.com", attendance: 5 },
    { id: 8, name: "Gabriel Santos", email: "gabriel.santos@example.com", attendance: 55 },
    { id: 9, name: "Isabela Rocha", email: "isabela.rocha@example.com", attendance: 85 },
    { id: 10, name: "Felipe Almeida", email: "felipe.almeida@example.com", attendance: 74 },
];

export const mockStudentsTeam: StudentFormData[] = [
  {
    id: 1,
    name: "Ana Beatriz Silva",
    email: "ana.silva@email.com",
    attendance: 95,
    birthDate: "2010-04-15",
    className: "Turma A",
    rollNumber: 1001,
    status: "active",
    gender: "female",
    specialNeeds: "low_vision"
  },
  {
    id: 2,
    name: "João Pedro Oliveira",
    email: "joao.oliveira@email.com",
    attendance: 88,
    birthDate: "2009-11-02",
    className: "Turma B",
    rollNumber: 1002,
    status: "active",
    gender: "male",
    specialNeeds: "intellectual_disability"
  },
  {
    id: 3,
    name: "Lucas Fernandes",
    email: "lucas.fernandes@email.com",
    birthDate: "2011-01-22",
    className: "Turma C",
    rollNumber: 1003,
    status: "inactive",
    gender: "male",
    specialNeeds: "learning_difficulty"
  },
  {
    id: 4,
    name: "Maria Eduarda Rocha",
    email: "maria.eduarda@email.com",
    attendance: 72,
    birthDate: "2010-06-30",
    className: "Turma A",
    rollNumber: 1004,
    status: "active",
    gender: "female",
    specialNeeds: "good_pair"
  },
  {
    id: 5,
    name: "Carlos Henrique Lima",
    email: "carlos.lima@email.com",
    attendance: 65,
    birthDate: "2008-09-18",
    className: "Turma D",
    rollNumber: 1005,
    status: "suspended",
    gender: "male",
    specialNeeds: "attention_required"
  },
  {
    id: 6,
    name: "Fernanda Costa",
    email: "fernanda.costa@email.com",
    birthDate: "2009-12-05",
    className: "Turma B",
    rollNumber: 1006,
    status: "active",
    gender: "female",
    specialNeeds: "behavioral_support"
  },
  {
    id: 7,
    name: "Bruno Silva",
    email: "bruno.silva@email.com",
    className: "Turma E",
    specialNeeds: null
  }
];

import { CurriculumItem, Topic } from "../types/academic/Topic";

// Mock de dados iniciais
const initialTopics: Topic[] = [
  {
    id: '1',
    title: 'Mecânica',
    discipline: 'Física',
    knowledgeArea: 'Mecânica Clássica',
    parentId: null,
    level: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    children: [
      {
        id: '2',
        title: 'Cinemática',
        discipline: 'Física',
        knowledgeArea: 'Mecânica Clássica',
        parentId: '1',
        level: 1,
        children: [
          {
            id: '3',
            title: 'Movimento Retilíneo Uniforme',
            discipline: 'Física',
            knowledgeArea: 'Mecânica Clássica',
            parentId: '2',
            level: 2,
            children: []
          },
          {
            id: '4',
            title: 'Movimento Retilíneo Uniformemente Variado',
            discipline: 'Física',
            knowledgeArea: 'Mecânica Clássica',
            parentId: '2',
            level: 2,
            children: []
          }
        ]
      },
      {
        id: '5',
        title: 'Dinâmica',
        discipline: 'Física',
        knowledgeArea: 'Mecânica Clássica',
        parentId: '1',
        level: 1,
        children: [
          {
            id: '6',
            title: 'Leis de Newton',
            discipline: 'Física',
            knowledgeArea: 'Mecânica Clássica',
            parentId: '5',
            level: 2,
            children: []
          }
        ]
      }
    ]
  },
  {
    id: '7',
    title: 'Álgebra',
    discipline: 'Matemática',
    knowledgeArea: 'Matemática Básica',
    parentId: null,
    level: 0,
    children: [
      {
        id: '8',
        title: 'Equações',
        discipline: 'Matemática',
        knowledgeArea: 'Matemática Básica',
        parentId: '7',
        level: 1,
        children: []
      }
    ]
  }
];

// Lista de áreas de conhecimento
const knowledgeAreas = [
  'Mecânica Clássica',
  'Eletromagnetismo',
  'Termodinâmica',
  'Óptica',
  'Física Moderna',
  'Matemática Básica',
  'Cálculo',
  'Geometria',
  'Estatística',
  'Álgebra Linear'
];

// Dados de exemplo
export const initialCurriculumItem: CurriculumItem[] = [
  {
    id: 'eixo1',
    name: 'Mecânica Clássica',
    type: 'eixoTematico',
    parentId: null,
    children: [
      {
        id: 'unidade1',
        name: 'Cinemática',
        type: 'unidade',
        parentId: 'eixo1',
        children: [
          {
            id: 'cap1',
            name: 'Movimento Retilíneo',
            type: 'capitulo',
            parentId: 'unidade1',
            children: [
              {
                id: 'titulo1',
                name: 'Movimento Uniforme',
                type: 'titulo',
                parentId: 'cap1',
                children: [
                  {
                    id: 'sub1',
                    name: 'Equações do MU',
                    type: 'subtitulo',
                    parentId: 'titulo1',
                    children: []
                  },
                  {
                    id: 'sub2',
                    name: 'Exercícios Aplicados',
                    type: 'subtitulo',
                    parentId: 'titulo1',
                    children: []
                  }
                ]
              },
              {
                id: 'titulo2',
                name: 'Movimento Uniformemente Variado',
                type: 'titulo',
                parentId: 'cap1',
                children: [
                  {
                    id: 'sub3',
                    name: 'Aceleração',
                    type: 'subtitulo',
                    parentId: 'titulo2',
                    children: []
                  }
                ]
              }
            ]
          },
          {
            id: 'cap2',
            name: 'Movimento Circular',
            type: 'capitulo',
            parentId: 'unidade1',
            children: []
          }
        ]
      },
      {
        id: 'unidade2',
        name: 'Dinâmica',
        type: 'unidade',
        parentId: 'eixo1',
        children: []
      }
    ]
  },
  {
    id: 'eixo2',
    name: 'Eletromagnetismo',
    type: 'eixoTematico',
    parentId: null,
    children: []
  }
];

export { knowledgeAreas, initialTopics };
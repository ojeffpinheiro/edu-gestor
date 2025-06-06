
import { v4 as uuidv4 } from 'uuid';
import { Question } from '../services/examsService';

export const questions: Question[] = [
  {
    id: uuidv4(),
    text: 'Qual é o resultado de 5 + 7?',
    options: ['10', '11', '12', '13'],
    correctAnswer: 2,
    topic: 'Matemática',
    difficulty: 'easy',
  },
  {
    id: uuidv4(),
    text: 'Quem escreveu "Dom Quixote"?',
    options: ['Machado de Assis', 'Miguel de Cervantes', 'José de Alencar', 'Eça de Queirós'],
    correctAnswer: 1,
    topic: 'Literatura',
    difficulty: 'medium',
  },
  {
    id: uuidv4(),
    text: 'Qual o símbolo químico da água?',
    options: ['O2', 'H2O', 'CO2', 'HO2'],
    correctAnswer: 1,
    topic: 'Química',
    difficulty: 'easy',
  },
  {
    id: uuidv4(),
    text: 'Em que ano o homem pisou na Lua pela primeira vez?',
    options: ['1965', '1969', '1971', '1975'],
    correctAnswer: 1,
    topic: 'História',
    difficulty: 'medium',
  },
  {
    id: uuidv4(),
    text: 'Quem é conhecido como "pai da computação"?',
    options: ['Bill Gates', 'Alan Turing', 'Steve Jobs', 'Tim Berners-Lee'],
    correctAnswer: 1,
    topic: 'Tecnologia',
    difficulty: 'medium',
  },
  {
    id: uuidv4(),
    text: 'Qual planeta é conhecido como "Planeta Vermelho"?',
    options: ['Terra', 'Júpiter', 'Marte', 'Vênus'],
    correctAnswer: 2,
    topic: 'Astronomia',
    difficulty: 'easy',
  },
  {
    id: uuidv4(),
    text: 'Qual é o maior oceano da Terra?',
    options: ['Atlântico', 'Índico', 'Ártico', 'Pacífico'],
    correctAnswer: 3,
    topic: 'Geografia',
    difficulty: 'easy',
  },
  {
    id: uuidv4(),
    text: 'Quem pintou a "Mona Lisa"?',
    options: ['Pablo Picasso', 'Leonardo da Vinci', 'Vincent Van Gogh', 'Claude Monet'],
    correctAnswer: 1,
    topic: 'Arte',
    difficulty: 'easy',
  },
  {
    id: uuidv4(),
    text: 'Quantos elementos químicos existem atualmente na tabela periódica?',
    options: ['112', '118', '120', '126'],
    correctAnswer: 1,
    topic: 'Química',
    difficulty: 'hard',
  },
  {
    id: uuidv4(),
    text: 'Quem formulou a Teoria da Relatividade?',
    options: ['Isaac Newton', 'Albert Einstein', 'Galileu Galilei', 'Nikola Tesla'],
    correctAnswer: 1,
    topic: 'Física',
    difficulty: 'medium',
  },
  {
    id: uuidv4(),
    text: 'Qual é a capital do Canadá?',
    options: ['Toronto', 'Vancouver', 'Ottawa', 'Montreal'],
    correctAnswer: 2,
    topic: 'Geografia',
    difficulty: 'medium',
  },
  {
    id: uuidv4(),
    text: 'Quem descobriu o Brasil?',
    options: ['Cristóvão Colombo', 'Pedro Álvares Cabral', 'Américo Vespúcio', 'Fernão de Magalhães'],
    correctAnswer: 1,
    topic: 'História',
    difficulty: 'easy',
  },
  {
    id: uuidv4(),
    text: 'Qual a função principal do DNA?',
    options: ['Produzir energia', 'Armazenar informação genética', 'Defender o organismo', 'Produzir proteínas'],
    correctAnswer: 1,
    topic: 'Biologia',
    difficulty: 'medium',
  },
  {
    id: uuidv4(),
    text: 'Qual é a fórmula da área do triângulo?',
    options: ['base × altura', '(base × altura) ÷ 2', 'lado × lado', 'base + altura'],
    correctAnswer: 1,
    topic: 'Matemática',
    difficulty: 'easy',
  },
  {
    id: uuidv4(),
    text: 'Qual país é conhecido como "Terra do Sol Nascente"?',
    options: ['China', 'Japão', 'Coreia do Sul', 'Tailândia'],
    correctAnswer: 1,
    topic: 'Geografia',
    difficulty: 'easy',
  },
  {
    id: uuidv4(),
    text: 'Qual é a moeda oficial da União Europeia?',
    options: ['Libra', 'Euro', 'Dólar', 'Franco'],
    correctAnswer: 1,
    topic: 'Economia',
    difficulty: 'medium',
  },
  {
    id: uuidv4(),
    text: 'Quem escreveu "O Pequeno Príncipe"?',
    options: ['J. K. Rowling', 'Antoine de Saint-Exupéry', 'George Orwell', 'Charles Dickens'],
    correctAnswer: 1,
    topic: 'Literatura',
    difficulty: 'easy',
  },
  {
    id: uuidv4(),
    text: 'Qual é a principal fonte de energia da Terra?',
    options: ['Água', 'Petróleo', 'Sol', 'Carvão'],
    correctAnswer: 2,
    topic: 'Ciências',
    difficulty: 'easy',
  },
  {
    id: uuidv4(),
    text: 'O que significa a sigla ONU?',
    options: ['Organização Nacional Unificada', 'Organização das Nações Unidas', 'Operação das Nações Unidas', 'Ordem Nacional Universal'],
    correctAnswer: 1,
    topic: 'História',
    difficulty: 'medium',
  },
  {
    id: uuidv4(),
    text: 'Qual é o maior mamífero terrestre?',
    options: ['Elefante', 'Baleia Azul', 'Girafa', 'Hipopótamo'],
    correctAnswer: 0,
    topic: 'Biologia',
    difficulty: 'easy',
  },
  {
    id: uuidv4(),
    text: 'Qual a linguagem de programação é conhecida pela logo da xícara de café?',
    options: ['Python', 'Java', 'C++', 'Ruby'],
    correctAnswer: 1,
    topic: 'Tecnologia',
    difficulty: 'easy',
  },
  {
    id: uuidv4(),
    text: 'Qual filósofo grego foi mestre de Alexandre, o Grande?',
    options: ['Sócrates', 'Aristóteles', 'Platão', 'Pitágoras'],
    correctAnswer: 1,
    topic: 'Filosofia',
    difficulty: 'medium',
  },
  {
    id: uuidv4(),
    text: 'Qual é a camada mais externa da Terra?',
    options: ['Manto', 'Crosta', 'Núcleo', 'Atmosfera'],
    correctAnswer: 1,
    topic: 'Geografia',
    difficulty: 'easy',
  },
  {
    id: uuidv4(),
    text: 'Em qual país se originou a Revolução Industrial?',
    options: ['Alemanha', 'Estados Unidos', 'França', 'Inglaterra'],
    correctAnswer: 3,
    topic: 'História',
    difficulty: 'medium',
  },
  {
    id: uuidv4(),
    text: 'Qual é a capital da Austrália?',
    options: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'],
    correctAnswer: 2,
    topic: 'Geografia',
    difficulty: 'medium',
  },
  {
    id: uuidv4(),
    text: 'Quantos graus tem um triângulo equilátero em cada ângulo interno?',
    options: ['45°', '60°', '90°', '120°'],
    correctAnswer: 1,
    topic: 'Matemática',
    difficulty: 'easy',
  },
  {
    id: uuidv4(),
    text: 'Qual destes não é um planeta do sistema solar?',
    options: ['Marte', 'Vênus', 'Plutão', 'Polaris'],
    correctAnswer: 3,
    topic: 'Astronomia',
    difficulty: 'medium',
  },
  {
    id: uuidv4(),
    text: 'Quem escreveu a teoria da evolução?',
    options: ['Charles Darwin', 'Gregor Mendel', 'Louis Pasteur', 'Galileu Galilei'],
    correctAnswer: 0,
    topic: 'Biologia',
    difficulty: 'medium',
  },
  {
    id: uuidv4(),
    text: 'Qual é a unidade de medida da corrente elétrica?',
    options: ['Ohm', 'Volt', 'Ampère', 'Watt'],
    correctAnswer: 2,
    topic: 'Física',
    difficulty: 'medium',
  },
  {
    id: uuidv4(),
    text: 'Em qual continente está o deserto do Saara?',
    options: ['Ásia', 'África', 'América', 'Europa'],
    correctAnswer: 1,
    topic: 'Geografia',
    difficulty: 'easy',
  }
];
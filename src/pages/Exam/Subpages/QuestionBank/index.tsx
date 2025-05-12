import React, { useState } from 'react';
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiFilter, FiDownload, FiDatabase } from 'react-icons/fi';
import { 
  QuestionBankContainer,
  Header,
  ActionsBar,
  SearchInput,
  FilterButton,
  QuestionTable,
  TableHeader,
  TableRow,
  ActionButton,
  AddButton
} from './styles';

const QuestionBank = () => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      title: 'Equação do 2º grau',
      statement: 'Resolva a equação: x² - 5x + 6 = 0',
      category: 'Matemática',
      difficulty: 'Médio',
      type: 'Múltipla escolha'
    },
    {
      id: 2,
      title: 'Análise sintática',
      statement: 'Identifique o sujeito da oração: "Os alunos estudaram para a prova."',
      category: 'Português',
      difficulty: 'Fácil',
      type: 'Dissertativa'
    },
    {
      id: 3,
      title: 'Sistema solar',
      statement: 'Qual é o planeta mais próximo do Sol?',
      category: 'Ciências',
      difficulty: 'Fácil',
      type: 'Múltipla escolha'
    },
    {
      id: 4,
      title: 'Revolução Francesa',
      statement: 'Quais foram as principais causas da Revolução Francesa?',
      category: 'História',
      difficulty: 'Difícil',
      type: 'Dissertativa'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredQuestions = questions.filter(q =>
    q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.statement.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <QuestionBankContainer>
      <Header>
        <h1><FiDatabase size={24} /> Banco de Questões</h1>
        <p>Gerencie todas as questões disponíveis para avaliações</p>
      </Header>

      <ActionsBar>
        <SearchInput>
          <FiSearch />
          <input
            type="text"
            placeholder="Buscar questões..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchInput>

        <div>
          <FilterButton>
            <FiFilter /> Filtrar
          </FilterButton>
          <AddButton>
            <FiPlus /> Nova Questão
          </AddButton>
        </div>
      </ActionsBar>

      <QuestionTable>
        <TableHeader>
          <div>TÍTULO</div>
          <div>CATEGORIA</div>
          <div>DIFICULDADE</div>
          <div>TIPO</div>
          <div>AÇÕES</div>
        </TableHeader>

        {filteredQuestions.map(question => (
          <TableRow key={question.id}>
            <div>
              <strong>{question.title}</strong>
              <p>{question.statement}</p>
            </div>
            <div>{question.category}</div>
            <div>{question.difficulty}</div>
            <div>{question.type}</div>
            <div>
              <ActionButton><FiEdit2 /> Editar</ActionButton>
              <ActionButton danger><FiTrash2 /> Excluir</ActionButton>
              <ActionButton><FiDownload /> Exportar</ActionButton>
            </div>
          </TableRow>
        ))}
      </QuestionTable>
    </QuestionBankContainer>
  );
};

export default QuestionBank;
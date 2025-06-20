import React, { useState } from 'react';
import {
  FiSearch, FiPlus, FiEdit2, FiTrash2, FiFilter,
  FiDownload, FiUpload, FiDatabase, FiGrid, FiList,
  FiCopy, FiZoomIn,
  FiBookmark
} from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';
import {
  QuestionBankContainer,
  Header,
  ActionsBar,
  SearchInput,
  FilterButton,
  QuestionTable,
  QuestionGrid,
  QuestionCard,
  TableHeader,
  TableRow,
  ActionButton,
  AddButton,
  ImportButton,
  ExportButton,
  ViewToggle,
  ViewOption,
  FilterPanel,
  FilterGroup,
  FilterTitle,
  FilterCheckbox,
  FilterSelect,
  DateRangeInput
} from './styles';
import { DifficultyLevelType, Question, QuestionStatus, QuestionType } from '../../../../utils/types/Question';

const QuestionBank = () => {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      contentId: 'math1',
      statement: 'Resolva a equação: x² - 5x + 6 = 0',
      questionType: 'multiple_choice',
      difficultyLevel: 'medium',
      discipline: 'Matemática',
      alternatives: [
        { id: '1', text: 'x = 2 e x = 3', isCorrect: true },
        { id: '2', text: 'x = 1 e x = 6', isCorrect: false }
      ],
      explanation: 'Fatorando a equação...',
      createdAt: '2023-01-15',
      updatedAt: '2023-01-15',
      status: 'active',
      tags: ['álgebra', 'equações']
    },
    // ... other questions
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    difficulty: '' as DifficultyLevelType | '',
    questionType: '' as QuestionType | '',
    status: '' as QuestionStatus | '',
    hasImage: false,
    tags: [] as string[],
    dateRange: { start: '', end: '' },
    minUsage: 0,
    minCorrectRate: 0,
  });
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Question;
    direction: 'asc' | 'desc';
  }>();

  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);

  const allTags = Array.from(new Set(questions.flatMap(q => q.tags || [])));
  const allDifficulties: DifficultyLevelType[] = ['easy', 'medium', 'hard'];
  const allQuestionTypes: QuestionType[] = ['multiple_choice', 'true_false', 'essay', 'fill_in_the_blank'];
  const allStatuses: QuestionStatus[] = ['active', 'inactive', 'draft'];

  const filteredQuestions = questions.filter(q => {
    const matchesSearch =
      q.statement.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (q.tags && q.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));

    const matchesFilters =
      (filters.difficulty === '' || q.difficultyLevel === filters.difficulty) &&
      (filters.questionType === '' || q.questionType === filters.questionType) &&
      (filters.status === '' || q.status === filters.status) &&
      (filters.hasImage === false || q.imageUrl !== undefined) &&
      (filters.tags.length === 0 || (q.tags && filters.tags.every(tag => q.tags!.includes(tag)))) &&
      (filters.dateRange.start === '' || new Date(q.createdAt) >= new Date(filters.dateRange.start)) &&
      (filters.dateRange.end === '' || new Date(q.createdAt) <= new Date(filters.dateRange.end));

    return matchesSearch && matchesFilters;
  });

  const topicStats = questions.reduce((acc: Record<string, number>, q: Question) => {
    const topic = q.discipline;
    acc[topic] = (acc[topic] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const combineQuestions = () => {
    if (selectedQuestions.length < 2) return;

    const combinedQuestion: Question = {
      id: uuidv4(),
      contentId: 'composite-' + Date.now(),
      statement: `Questão composta:\n${selectedQuestions.map(id => {
        const q = questions.find(q => q.id === id)!;
        return `• ${q.statement}`;
      }).join('\n')
        }`,
      questionType: 'multiple_choice',
      difficultyLevel: 'medium',
      discipline: questions.find(q => q.id === selectedQuestions[0])?.discipline || 'Geral',
      alternatives: [],
      explanation: 'Questão composta de múltiplas questões',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'active',
      isComposite: true,
      componentQuestions: selectedQuestions
    };

    setQuestions([...questions, combinedQuestion]);
  };

  const togglePin = (id: string) => {
    setQuestions(questions.map(q =>
      q.id === id ? { ...q, pinned: !q.pinned } : q
    ));
  };

  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    if (!sortConfig) return 0;
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue === undefined && bValue === undefined) return 0;
    if (aValue === undefined) return 1;
    if (bValue === undefined) return -1;
    if (aValue === bValue) return 0;
    return (aValue < bValue ? -1 : 1) * (sortConfig.direction === 'asc' ? 1 : -1);
  });

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // TODO: Implement import logic
      console.log('Importing file:', file.name);
    }
  };

  const handleExport = () => {
    // TODO: Implement export logic
    console.log('Exporting questions:', selectedQuestions.length > 0 ? selectedQuestions : 'all');
  };

  const toggleQuestionSelection = (id: string) => {
    setSelectedQuestions(prev =>
      prev.includes(id)
        ? prev.filter(qId => qId !== id)
        : [...prev, id]
    );
  };

  const selectAllQuestions = () => {
    setSelectedQuestions(prev =>
      prev.length === filteredQuestions.length
        ? []
        : filteredQuestions.map(q => q.id!)
    );
  };

  const createVariation = (question: Question) => {
    const variation = {
      ...question,
      id: uuidv4(),
      isVariation: true,
      originalQuestionId: question.id,
      createdAt: new Date().toISOString(),
    };
    setQuestions([...questions, variation]);
  };

  const findSimilarQuestions = (question: Question) => {
    return questions.filter(q =>
      q.id !== question.id &&
      (q.statement.includes(question.statement.substring(0, 20)) ||
        q.tags?.some(tag => question.tags?.includes(tag)))
    );
  };

  const handleSort = (key: keyof Question) => {
    setSortConfig({
      key,
      direction: sortConfig?.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  return (
    <QuestionBankContainer>
      <Header>
        <h1><FiDatabase size={24} /> Banco de Questões</h1>
        <p>Gerencie todas as questões disponíveis para avaliações</p>
      </Header>

      <ActionsBar>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <SearchInput>
            <FiSearch />
            <input
              type="text"
              placeholder="Buscar questões..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchInput>

          <FilterButton onClick={() => setShowFilters(!showFilters)}>
            <FiFilter /> {showFilters ? 'Ocultar Filtros' : 'Filtrar'}
          </FilterButton>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <ViewToggle>
            <ViewOption
              active={viewMode === 'table'}
              onClick={() => setViewMode('table')}
            >
              <FiList />
            </ViewOption>
            <ViewOption
              active={viewMode === 'grid'}
              onClick={() => setViewMode('grid')}
            >
              <FiGrid />
            </ViewOption>
          </ViewToggle>

          <ImportButton>
            <FiUpload /> Importar
            <input
              type="file"
              accept=".csv,.json"
              onChange={handleImport}
              style={{ display: 'none' }}
            />
          </ImportButton>
          <ExportButton onClick={handleExport}>
            <FiDownload /> Exportar
          </ExportButton>
          <AddButton>
            <FiPlus /> Nova Questão
          </AddButton>
        </div>
      </ActionsBar>

      <DifficultyChart questions={questions} />

      <div className="topic-stats">
        {Object.entries(topicStats).map(([topic, count]) => (
          <div key={topic}>{topic}: {count}</div>
        ))}
      </div>

      <button
        onClick={combineQuestions}
        disabled={selectedQuestions.length < 2}
      >
        Combinar Questões Selecionadas
      </button>

      {showFilters && (
        <FilterPanel>
          <FilterGroup>
            <FilterTitle>Dificuldade</FilterTitle>
            {allDifficulties.map(difficulty => (
              <FilterCheckbox key={difficulty}>
                <input
                  type="checkbox"
                  checked={filters.difficulty === difficulty}
                  onChange={() => setFilters(prev => ({
                    ...prev,
                    difficulty: prev.difficulty === difficulty ? '' : difficulty
                  }))}
                />
                {difficulty === 'easy' ? 'Fácil' :
                  difficulty === 'medium' ? 'Médio' : 'Difícil'}
              </FilterCheckbox>
            ))}
          </FilterGroup>

          <FilterGroup>
            <FilterTitle>Tipo de Questão</FilterTitle>
            {allQuestionTypes.map(type => (
              <FilterCheckbox key={type}>
                <input
                  type="checkbox"
                  checked={filters.questionType === type}
                  onChange={() => setFilters(prev => ({
                    ...prev,
                    questionType: prev.questionType === type ? '' : type
                  }))}
                />
                {type === 'multiple_choice' ? 'Múltipla escolha' :
                  type === 'true_false' ? 'Verdadeiro/Falso' :
                    type === 'essay' ? 'Dissertativa' : 'Preencher lacunas'}
              </FilterCheckbox>
            ))}
          </FilterGroup>

          <FilterGroup>
            <FilterTitle>Status</FilterTitle>
            {allStatuses.map(status => (
              <FilterCheckbox key={status}>
                <input
                  type="checkbox"
                  checked={filters.status === status}
                  onChange={() => setFilters(prev => ({
                    ...prev,
                    status: prev.status === status ? '' : status
                  }))}
                />
                {status === 'active' ? 'Ativo' :
                  status === 'inactive' ? 'Inativo' : 'Rascunho'}
              </FilterCheckbox>
            ))}
          </FilterGroup>

          <FilterGroup>
            <FilterTitle>Tags</FilterTitle>
            <FilterSelect
              multiple
              value={filters.tags}
              onChange={(e) => {
                const options = e.target.options;
                const selected: string[] = [];
                for (let i = 0; i < options.length; i++) {
                  if (options[i].selected) {
                    selected.push(options[i].value);
                  }
                }
                setFilters(prev => ({ ...prev, tags: selected }));
              }}
            >
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </FilterSelect>
          </FilterGroup>

          <FilterGroup>
            <FilterTitle>Data de Criação</FilterTitle>
            <DateRangeInput>
              <input
                type="date"
                value={filters.dateRange.start}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  dateRange: { ...prev.dateRange, start: e.target.value }
                }))}
                placeholder="Data inicial"
              />
              <span>até</span>
              <input
                type="date"
                value={filters.dateRange.end}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  dateRange: { ...prev.dateRange, end: e.target.value }
                }))}
                placeholder="Data final"
              />
            </DateRangeInput>
          </FilterGroup>

          <FilterGroup>
            <FilterCheckbox>
              <input
                type="checkbox"
                checked={filters.hasImage}
                onChange={() => setFilters(prev => ({
                  ...prev,
                  hasImage: !prev.hasImage
                }))}
              />
              Apenas questões com imagens
            </FilterCheckbox>
          </FilterGroup>
        </FilterPanel>
      )}

      {viewMode === 'table' ? (
        <QuestionTable>
          <TableHeader>
            <div>
              <input
                type="checkbox"
                checked={selectedQuestions.length === filteredQuestions.length && filteredQuestions.length > 0}
                onChange={selectAllQuestions}
              />
            </div>
            <div onClick={() => handleSort('discipline')}>DISCIPLINA</div>
            <div onClick={() => handleSort('difficultyLevel')}>DIFICULDADE</div>
            <div>ENUNCIADO</div>
            <div>TIPO</div>
            <div>STATUS</div>
            <div>AÇÕES</div>
          </TableHeader>

          {sortedQuestions.map(question => (
            <TableRow key={question.id}>
              <div>
                <input
                  type="checkbox"
                  checked={selectedQuestions.includes(question.id!)}
                  onChange={() => toggleQuestionSelection(question.id!)}
                />
              </div>
              <div>
                <strong>{question.statement.substring(0, 100)}{question.statement.length > 100 ? '...' : ''}</strong>
                {question.tags && question.tags.length > 0 && (
                  <p>{question.tags.join(', ')}</p>
                )}
              </div>
              <div>{question.discipline}</div>
              <div>
                {question.difficultyLevel === 'easy' ? 'Fácil' :
                  question.difficultyLevel === 'medium' ? 'Médio' : 'Difícil'}
              </div>
              <div>
                {question.questionType === 'multiple_choice' ? 'Múltipla escolha' :
                  question.questionType === 'true_false' ? 'V/F' :
                    question.questionType === 'essay' ? 'Dissertativa' : 'Lacunas'}
              </div>
              <div>
                {question.status === 'active' ? 'Ativo' :
                  question.status === 'inactive' ? 'Inativo' : 'Rascunho'}
              </div>
              <div>
                <ActionButton onClick={() => createVariation(question)}>
                  <FiCopy /> Criar Variação
                </ActionButton>

                <ActionButton onClick={() => {
                  const similar = findSimilarQuestions(question);
                  alert(`${similar.length} questões similares encontradas`);
                }}>
                  <FiZoomIn /> Encontrar Similares
                </ActionButton>

                <ActionButton><FiEdit2 /> Editar</ActionButton>
                <ActionButton onClick={() => togglePin(question.id!)}>
                  {question.pinned ? <FiBookmark /> : <FiBookmark />}
                </ActionButton>
              </div>
            </TableRow>
          ))}
        </QuestionTable>
      ) : (
        <QuestionGrid>
          {filteredQuestions.map(question => (
            <QuestionCard key={question.id}>
              <div className="card-header">
                <input
                  type="checkbox"
                  checked={selectedQuestions.includes(question.id!)}
                  onChange={() => toggleQuestionSelection(question.id!)}
                />
                <span className={`status-badge ${question.status}`}>
                  {question.status === 'active' ? 'Ativo' :
                    question.status === 'inactive' ? 'Inativo' : 'Rascunho'}
                </span>
              </div>
              <div className="card-body">
                <h3>{question.statement.substring(0, 100)}{question.statement.length > 100 ? '...' : ''}</h3>
                <div className="meta">
                  <span className="discipline">{question.discipline}</span>
                  <span className={`difficulty ${question.difficultyLevel}`}>
                    {question.difficultyLevel === 'easy' ? 'Fácil' :
                      question.difficultyLevel === 'medium' ? 'Médio' : 'Difícil'}
                  </span>
                  <span className="type">
                    {question.questionType === 'multiple_choice' ? 'Múltipla escolha' :
                      question.questionType === 'true_false' ? 'V/F' :
                        question.questionType === 'essay' ? 'Dissertativa' : 'Lacunas'}
                  </span>
                </div>
                {question.tags && question.tags.length > 0 && (
                  <div className="tags">
                    {question.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="card-actions">
                <ActionButton><FiEdit2 /></ActionButton>
                <ActionButton danger><FiTrash2 /></ActionButton>
              </div>
            </QuestionCard>
          ))}
        </QuestionGrid>
      )}
    </QuestionBankContainer>
  );
};

const DifficultyChart = ({ questions }: { questions: Question[] }) => {
  const data = [
    { level: 'Fácil', value: questions.filter(q => q.difficultyLevel === 'easy').length },
    { level: 'Médio', value: questions.filter(q => q.difficultyLevel === 'medium').length },
    { level: 'Difícil', value: questions.filter(q => q.difficultyLevel === 'hard').length },
  ];

  return (
    <div className="chart">
      {data.map(item => (
        <div key={item.level} className="chart-item">
          <span>{item.level}</span>
          <div className="bar" style={{ width: `${(item.value / questions.length) * 100}%` }} />
          <span>{item.value}</span>
        </div>
      ))}
    </div>
  );
};

export default QuestionBank;
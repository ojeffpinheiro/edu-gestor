import React, { useEffect, useState } from 'react';
import {
  FiSearch, FiPlus, FiFilter,
  FiDownload, FiUpload, FiDatabase, FiGrid, FiList,
} from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';

import { Content, DifficultyLevelType, Filter, Question, QuestionStatus, QuestionType } from '../../../../utils/types/Question';

import QuestionTable from '../../../../components/Exam/Questions/QuestionTable';
import QuestionGrid from '../../../../components/Exam/Questions/QuestionGrid';
import DifficultyChart from '../../../../components/Exam/Questions/DifficultyChart';

import {
  QuestionBankContainer,
  Header,
  ActionsBar,
  SearchInput,
  FilterButton,
  AddButton,
  ImportButton,
  ExportButton,
  ViewToggle,
  ViewOption
} from './styles';
import FiltersPanel from '../../../../components/Exam/Questions/FilterPanel';
import GapReport from '../../../../components/Exam/Questions/GapReport';
const QuestionBank = () => {
  const [currentFilters, setCurrentFilters] = useState<Filter>({
    difficulty: '',
    questionType: '',
    status: '',
    hasImage: false,
    tags: [],
    dateRange: { start: '', end: '' },
    contentId: ''
  });

  const [availableContents, setAvailableContents] = useState<Content[]>([]);
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
  
  const [showGapReport, setShowGapReport] = useState(false);

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

  // Dummy fetchContents implementation (replace with real API call as needed)
  const fetchContents = async (): Promise<Content[]> => {
    // Example: return [{ id: 'math1', name: 'Matemática' }];
    return [];
  };

  useEffect(() => {
    const loadContents = async () => {
      const contents = await fetchContents()
      setAvailableContents(contents);
    };
    loadContents();
  }, []);

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
              aria-label="Buscar questões"
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

      <div className="report-actions">
        <button onClick={() => setShowGapReport(!showGapReport)}>
          {showGapReport ? 'Ocultar' : 'Mostrar'} Relatório de Lacunas
        </button>
      </div>
      
      {showGapReport && <GapReport questions={questions} />}

      {showFilters && (
        <FiltersPanel
          filters={currentFilters}
          onApply={(appliedFilters) => {
            setCurrentFilters(appliedFilters);
          }}
          contents={availableContents}
          allTags={allTags}
          allDifficulties={allDifficulties}
          allQuestionTypes={allQuestionTypes}
          allStatuses={allStatuses}
        />
      )}

      {viewMode === 'table' ? (
        <QuestionTable 
          filteredQuestions={filteredQuestions}
          selectedQuestions={selectedQuestions}
          sortedQuestions={sortedQuestions}
          togglePin={togglePin}
          toggleQuestionSelection={toggleQuestionSelection}
          onQuestionSelectAll={selectAllQuestions}
          onSort={handleSort}
          createVariation={createVariation} 
          findSimilarQuestions={findSimilarQuestions} />
      ) : (
        <QuestionGrid 
          filteredQuestions={filteredQuestions}
          selectedQuestions={selectedQuestions}
          toggleQuestionSelection={toggleQuestionSelection} />
      )}
    </QuestionBankContainer>
  );
};

export default QuestionBank;
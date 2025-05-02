// src/components/QuestionManager.tsx
import React, { useState, useMemo, useEffect } from 'react';
import {
    FaSearch,
    FaTimes,
    FaFilter,
    FaCheck,
    FaListUl,
    FaTags,
    FaSignal,
    FaBook,
    FaCheckCircle
} from 'react-icons/fa';

import { Question, QuestionDifficulty } from '../../../services/examsService';
import { FilterButton, IconButton } from '../../../styles/buttons';
import { EmptyState } from '../../../styles/feedback';

import {
    FiltersContainer,
    ManagerContainer,
    CorrectAnswerBadge,
    FilterButtons,
    FilterGroup,
    FilterInput,
    FilterLabel,
    FilterSelect,
    FiltersFooter,
    FiltersGrid,
    FiltersTitle,
    MetaItem,
    OptionItem,
    OptionLetter,
    OptionList,
    QuestionCheckbox,
    QuestionContent,
    QuestionCount,
    QuestionItem,
    QuestionMeta,
    QuestionText,
    QuestionTitle,
    QuestionsList,
    SelectedTopics,
    SelectionSummary,
    TopicTag
} from './styles';

interface QuestionManagerProps {
    questions: Question[];
    selectedIds?: string[];
    onSelectionChange?: (selectedIds: string[]) => void;
    initialTopics: string[];
    onTopicsChange: (topics: string[]) => void;
    readOnly?: boolean;
    showAnswers?: boolean;
}

const QuestionManager: React.FC<QuestionManagerProps> = ({
    questions,
    selectedIds = [],
    onSelectionChange,
    initialTopics,
    onTopicsChange,
    readOnly = false,
    showAnswers = false
}) => {
    const [filters, setFilters] = useState({
        searchTerm: '',
        topics: initialTopics,
        difficulty: 'all' as 'all' | QuestionDifficulty
    });

    // Extrair tópicos únicos das questões
    const uniqueTopics = [...new Set(questions.map(q => q.topic))];

    const filteredQuestions = useMemo(() => {
        return questions.filter(question => {
            const matchesSearch = question.text.toLowerCase().includes(filters.searchTerm.toLowerCase());
            const matchesTopic = filters.topics.length === 0 || filters.topics.includes(question.topic);
            const matchesDifficulty = filters.difficulty === 'all' || question.difficulty === filters.difficulty;
            return matchesSearch && matchesTopic && matchesDifficulty;
        });
    }, [questions, filters.searchTerm, filters.topics, filters.difficulty]);

    // Atualiza os tópicos localmente e notifica o componente pai
    const handleTopicsChange = (newTopics: string[]) => {
        setFilters(prev => ({ ...prev, topics: newTopics }));
        if (onTopicsChange) {
            onTopicsChange(newTopics);
        }
    };

    // Quando um tópico é removido
    const handleRemoveTopic = (topic: string) => {
        const newTopics = filters.topics.filter(t => t !== topic);
        handleTopicsChange(newTopics);
    };

    // Quando um tópico é adicionado
    const handleAddTopic = (topic: string) => {
        if (!filters.topics.includes(topic)) {
            const newTopics = [...filters.topics, topic];
            handleTopicsChange(newTopics);
        }
    };

    // Função de seleção melhorada
const toggleQuestionSelection = (questionId: string) => {
    if (readOnly || !onSelectionChange) return;
  
    const newSelected = selectedIds.includes(questionId)
      ? selectedIds.filter(id => id !== questionId)
      : [...selectedIds, questionId];
  
    onSelectionChange(newSelected);
  };
  
  // Garantir que initialTopics seja atualizado quando mudar
  useEffect(() => {
    setFilters(prev => ({ ...prev, topics: initialTopics }));
  }, [initialTopics]);

    // Traduzir nível de dificuldade
    const translateDifficulty = (difficulty: QuestionDifficulty): string => {
        switch (difficulty) {
            case 'easy': return 'Fácil';
            case 'medium': return 'Média';
            case 'hard': return 'Difícil';
            default: return difficulty;
        }
    };

    return (
        <ManagerContainer>
            {!readOnly && (
                <FiltersContainer>
                    <FiltersTitle>
                        <FaFilter />
                        Filtros
                    </FiltersTitle>

                    <FiltersGrid>
                        <FilterGroup>
                            <FilterLabel>
                                <FaSearch size={14} />
                                Buscar
                            </FilterLabel>
                            <FilterInput
                                type="text"
                                value={filters.searchTerm}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilters({ ...filters, searchTerm: e.target.value })}
                                placeholder="Buscar por texto ou palavras-chave"
                            />
                        </FilterGroup>

                        <FilterGroup>
                            <FilterLabel>
                                <FaTags size={14} />
                                Tópicos
                            </FilterLabel>
                            <FilterSelect
                                value=""
                                onChange={(e) => e.target.value && handleAddTopic(e.target.value)}
                            >
                                <option value="">Selecione para adicionar...</option>
                                {uniqueTopics
                                    .filter(topic => !filters.topics.includes(topic))
                                    .map(topic => (
                                        <option key={topic} value={topic}>{topic}</option>
                                    ))
                                }
                            </FilterSelect>

                            {filters.topics.length > 0 && (
                                <SelectedTopics>
                                    {filters.topics.map(topic => (
                                        <TopicTag key={topic}>
                                            {topic}
                                            <IconButton 
                                                size="sm" 
                                                aria-label="Remover tópico"
                                                onClick={() => handleRemoveTopic(topic)}>
                                                <FaTimes size={10} />
                                            </IconButton>
                                        </TopicTag>
                                    ))}
                                </SelectedTopics>
                            )}
                        </FilterGroup>

                        <FilterGroup>
                            <FilterLabel>
                                <FaSignal size={14} />
                                Dificuldade
                            </FilterLabel>
                            <FilterSelect
                                value={filters.difficulty}
                                onChange={(e) => setFilters({
                                    ...filters,
                                    difficulty: e.target.value as 'all' | QuestionDifficulty
                                })}
                            >
                                <option value="all">Todas</option>
                                <option value="easy">Fácil</option>
                                <option value="medium">Média</option>
                                <option value="hard">Difícil</option>
                            </FilterSelect>
                        </FilterGroup>
                    </FiltersGrid>

                    <FiltersFooter>
                        <QuestionCount>
                            <FaListUl size={14} className="inline mr-1" />
                            Mostrando {filteredQuestions.length} de {questions.length} questões
                        </QuestionCount>

                        <FilterButtons>
                            <FilterButton
                                onClick={() => setFilters({
                                    searchTerm: '',
                                    topics: [],
                                    difficulty: 'all'
                                })}
                            >
                                <FaTimes size={12} />
                                Limpar Filtros
                            </FilterButton>

                            {selectedIds.length > 0 && (
                                <FilterButton
                                    onClick={() => {
                                        if (onSelectionChange) {
                                            onSelectionChange([]);
                                        }
                                    }}
                                >
                                    <FaTimes size={12} />
                                    Limpar Seleção ({selectedIds.length})
                                </FilterButton>
                            )}
                        </FilterButtons>
                    </FiltersFooter>
                </FiltersContainer>
            )}

            {/* Lista de questões */}
            <QuestionsList>
                {filteredQuestions.length === 0 ? (
                    <EmptyState>
                        Nenhuma questão encontrada com os filtros atuais.
                    </EmptyState>
                ) : (
                    filteredQuestions.map((question, index) => (
                        <QuestionItem
                            key={question.id}
                            selected={selectedIds.includes(question.id)}
                            clickable={!readOnly}
                            onClick={() => toggleQuestionSelection(question.id)}
                        >
                            <QuestionContent onClick={undefined}>
                                {!readOnly && (
                                    <QuestionCheckbox
                                        type="checkbox"
                                        checked={selectedIds.includes(question.id)}
                                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                                    />
                                )}
                                <QuestionText>
                                    <QuestionTitle>
                                        {index + 1}. {question.text}
                                    </QuestionTitle>

                                    <OptionList>
                                        {question.options.map((option, optIndex) => (
                                            <OptionItem
                                                key={optIndex}
                                                isCorrect={showAnswers && optIndex === question.correctAnswer}>
                                                <OptionLetter>{String.fromCharCode(65 + optIndex)})</OptionLetter>
                                                {option}
                                                {showAnswers && optIndex === question.correctAnswer && (
                                                    <CorrectAnswerBadge>
                                                        <FaCheckCircle size={12} className="inline mr-1" />
                                                        Resposta correta
                                                    </CorrectAnswerBadge>
                                                )}
                                            </OptionItem>
                                        ))}
                                    </OptionList>

                                    <QuestionMeta>
                                        <MetaItem>
                                            <FaBook size={12} />
                                            <strong>Tópico:</strong> {question.topic}
                                        </MetaItem>
                                        <MetaItem>
                                            <FaSignal size={12} />
                                            <strong>Dificuldade:</strong> {translateDifficulty(question.difficulty)}
                                        </MetaItem>
                                    </QuestionMeta>
                                </QuestionText>
                            </QuestionContent>
                        </QuestionItem>
                    )))}
            </QuestionsList>

            {!readOnly && (
                <SelectionSummary>
                    <FaCheck className="inline mr-1" />
                    {selectedIds.length} {selectedIds.length === 1 ? 'questão selecionada' : 'questões selecionadas'}
                </SelectionSummary>
            )
            }
        </ManagerContainer>
    );
};

export default QuestionManager;
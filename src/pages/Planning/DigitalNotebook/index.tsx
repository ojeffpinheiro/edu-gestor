import React, { useState, useEffect, useMemo } from "react";
import { FaUsers, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { ClassData, ClassFilters } from "../../../types/classroom/Class";

// Importação dos dados de classes (mockados)
import { classes } from "../../../mocks/classesData";

// Importação dos componentes estilizados
import {
  Container,
  Title,
  ClassList,
  ClassCard,
  IconWrapper,
  ClassTitle,
  ClassDescription,
  FilterContainer,
  FilterGroup,
  FilterLabel,
  FilterSelect,
  FilterButton,
  NoResultsMessage,
  LoadingSpinner,
  FilterBadge,
  FilterBadgeContainer,
  FilterBadgeText,
  ClearFilterButton,
} from "./styles";

/**
 * Componente DigitalNotebook - Exibe as turmas disponíveis com opções de filtragem
 * Permite visualizar as turmas por disciplina, série e turno
 */
const DigitalNotebook: React.FC = () => {
  const navigate = useNavigate();
  
  // Estado para controlar classes e filtros
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredClasses, setFilteredClasses] = useState<ClassData[]>([]);
  const [filters, setFilters] = useState<ClassFilters>({
    subject: "",
    grade: "",
    shift: "",
  });

  // Extrai as opções únicas para cada filtro
  const filterOptions = useMemo(() => {
    return {
      subjects: Array.from(new Set(classes.map(c => c.subject).filter(Boolean))),
      grades: Array.from(new Set(classes.map(c => c.grade).filter(Boolean))),
      shifts: Array.from(new Set(classes.map(c => c.shift).filter(Boolean))),
    };
  }, []);

  // Cores associadas a diferentes disciplinas
  const subjectColors: Record<string, string> = {
    "Matemática": "#4A90E2",
    "Português": "#FF6B6B",
    "Ciências": "#66BB6A",
    "História": "#FFA726",
    "Geografia": "#7E57C2",
    "Inglês": "#26C6DA",
    "Educação Física": "#EC407A",
    "Artes": "#AB47BC",
    "default": "#4A90E2"
  };

  /**
   * Manipula a navegação para a página de gerenciamento de equipe quando uma turma é clicada
   * @param classId - ID da turma selecionada
   */
  const handleClassClick = (classId: number) => {
    try {
      console.log(`Navegando para a turma ${classId}`);
      navigate(`/team-management/`);
    } catch (err) {
      console.error("Erro ao navegar:", err);
      setError("Não foi possível acessar esta turma. Tente novamente mais tarde.");
    }
  };

  /**
   * Atualiza o estado dos filtros quando um filtro é alterado
   * @param event - Evento do elemento select
   */
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  /**
   * Remove um filtro específico
   * @param filterName - Nome do filtro a ser removido
   */
  const handleRemoveFilter = (filterName: keyof ClassFilters) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: ""
    }));
  };

  /**
   * Limpa todos os filtros aplicados
   */
  const handleClearAllFilters = () => {
    setFilters({
      subject: "",
      grade: "",
      shift: ""
    });
  };

  /**
   * Determina a cor do cartão com base na disciplina
   * @param subject - Nome da disciplina
   * @returns Cor associada à disciplina
   */
  const getCardColor = (subject?: string): string => {
    if (!subject) return subjectColors.default;
    return subjectColors[subject] || subjectColors.default;
  };

  // Efeito para carregar e filtrar as turmas
  useEffect(() => {
    try {
      setLoading(true);
      
      // Simula um atraso de carregamento para demonstrar o spinner
      const loadingTimeout = setTimeout(() => {
        const filtered = classes.filter(classItem => {
          const matchesSubject = !filters.subject || classItem.subject === filters.subject;
          const matchesGrade = !filters.grade || classItem.grade === filters.grade;
          const matchesShift = !filters.shift || classItem.shift === filters.shift;
          
          return matchesSubject && matchesGrade && matchesShift;
        });
        
        // Adiciona cores às turmas filtradas
        const colorizedClasses = filtered.map(classItem => ({
          ...classItem,
          color: getCardColor(classItem.subject)
        }));
        
        setFilteredClasses(colorizedClasses);
        setLoading(false);
      }, 600);
      
      return () => clearTimeout(loadingTimeout);
    } catch (err) {
      console.error("Erro ao filtrar as turmas:", err);
      setError("Ocorreu um erro ao carregar as turmas. Tente novamente mais tarde.");
      setLoading(false);
    }
  }, [filters]);

  // Verifica se algum filtro está aplicado
  const hasActiveFilters = Object.values(filters).some(value => value !== "");

  // Renderização dos badges de filtros ativos
  const renderFilterBadges = () => {
    if (!hasActiveFilters) return null;
    
    return (
      <FilterBadgeContainer>
        {Object.entries(filters).map(([key, value]) => {
          if (!value) return null;
          
          let labelText = "";
          let valueText = "";
          
          switch (key) {
            case "subject":
              labelText = "Disciplina";
              valueText = value;
              break;
            case "grade":
              labelText = "Série";
              valueText = value;
              break;
            case "shift":
              labelText = "Turno";
              valueText = value;
              break;
          }
          
          return (
            <FilterBadge key={key} color={key === "subject" ? getCardColor(value) : undefined}>
              <FilterBadgeText>
                {labelText}: {valueText}
              </FilterBadgeText>
              <ClearFilterButton
                onClick={() => handleRemoveFilter(key as keyof ClassFilters)}
                aria-label={`Remover filtro de ${labelText}`}
              >
                <FaTimes size={12} />
              </ClearFilterButton>
            </FilterBadge>
          );
        })}
        
        {hasActiveFilters && (
          <FilterButton 
            onClick={handleClearAllFilters}
            aria-label="Limpar todos os filtros"
          >
            Limpar Filtros
          </FilterButton>
        )}
      </FilterBadgeContainer>
    );
  };

  return (
    <Container>
      <Title>Caderno Digital</Title>

      {/* Seção de Filtros */}
      <FilterContainer>
        <FilterGroup>
          <FilterLabel htmlFor="subject-filter">Disciplina</FilterLabel>
          <FilterSelect
            id="subject-filter"
            name="subject"
            value={filters.subject}
            onChange={handleFilterChange}
            aria-label="Filtrar por disciplina"
          >
            <option value="">Todas as disciplinas</option>
            {filterOptions.subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </FilterSelect>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel htmlFor="grade-filter">Série</FilterLabel>
          <FilterSelect
            id="grade-filter"
            name="grade"
            value={filters.grade}
            onChange={handleFilterChange}
            aria-label="Filtrar por série"
          >
            <option value="">Todas as séries</option>
            {filterOptions.grades.map((grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </FilterSelect>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel htmlFor="shift-filter">Turno</FilterLabel>
          <FilterSelect
            id="shift-filter"
            name="shift"
            value={filters.shift}
            onChange={handleFilterChange}
            aria-label="Filtrar por turno"
          >
            <option value="">Todos os turnos</option>
            {filterOptions.shifts.map((shift) => (
              <option key={shift} value={shift}>
                {shift}
              </option>
            ))}
          </FilterSelect>
        </FilterGroup>
      </FilterContainer>

      {/* Exibição dos filtros ativos */}
      {renderFilterBadges()}

      {/* Exibição de erro */}
      {error && (
        <NoResultsMessage role="alert">
          {error}
        </NoResultsMessage>
      )}

      {/* Estado de carregamento */}
      {loading ? (
        <LoadingSpinner aria-label="Carregando turmas" />
      ) : (
        <>
          {/* Exibição quando não há resultados */}
          {filteredClasses.length === 0 && !error ? (
            <NoResultsMessage role="status">
              Nenhuma turma encontrada com os filtros selecionados.
            </NoResultsMessage>
          ) : (
            /* Lista de turmas */
            <ClassList>
              {filteredClasses.map((turma) => (
                <ClassCard 
                  key={turma.id} 
                  onClick={() => handleClassClick(turma.id)}
                  color={turma.color}
                  className="card-animated"
                  aria-label={`Turma ${turma.name}: ${turma.description}`}
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleClassClick(turma.id);
                    }
                  }}
                >
                  <IconWrapper color={turma.color}>
                    <FaUsers size={30} color="#FFFFFF" />
                  </IconWrapper>
                  <ClassTitle>{turma.name}</ClassTitle>
                  <ClassDescription>{turma.description}</ClassDescription>
                  {turma.subject && (
                    <ClassDescription className="subject-tag">
                      {turma.subject}
                    </ClassDescription>
                  )}
                  {turma.grade && turma.shift && (
                    <ClassDescription className="details-tag">
                      {turma.grade} · {turma.shift}
                    </ClassDescription>
                  )}
                </ClassCard>
              ))}
            </ClassList>
          )}
        </>
      )}
    </Container>
  );
};

export default DigitalNotebook;

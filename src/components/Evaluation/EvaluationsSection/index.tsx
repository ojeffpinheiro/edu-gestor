import React from 'react';
import { FaPlus } from 'react-icons/fa';

import { Evaluation } from '../../../types/evaluation/AssessmentEvaluation';

import EvaluationsList from '../EvaluationsList';

import { Section, SectionHeader } from '../../../styles/layoutUtils';
import { SectionTitle } from '../../../styles/baseComponents';
import { ActionButton } from '../../../styles/buttons';

import { FilterContainer, FilterLabel, FilterSelect } from './styles';

interface EvaluationsSectionProps {
    evaluations: Evaluation[];
    filters: {
        schoolFilter: string;
        trimesterFilter: string;
        seriesFilter: string;
        typeFilter: string;
        statusFilter: string;
    };
    filterFunctions: {
        setSchoolFilter: (value: string) => void;
        setTrimesterFilter: (value: string) => void;
        setSeriesFilter: (value: string) => void;
        setTypeFilter: (value: string) => void;
        setStatusFilter: (value: string) => void;
    };
    handleClick: () => void;
    onSelect: (evaluation: Evaluation) => void;
    onDelete: (id: number) => void;
    onDuplicate: (evaluation: Evaluation) => void;
    onRegisterScores: (evaluation: Evaluation) => void;
}

const EvaluationsSection: React.FC<EvaluationsSectionProps> = ({
    evaluations,
    filters,
    filterFunctions,
    handleClick,
    onSelect,
    onDelete,
    onDuplicate,
    onRegisterScores
}) => {

    const {
        schoolFilter,
        trimesterFilter,
        seriesFilter,
        typeFilter,
        statusFilter
    } = filters;

    const {
        setSchoolFilter,
        setTrimesterFilter,
        setSeriesFilter,
        setTypeFilter,
        setStatusFilter
    } = filterFunctions;

    return (
        <Section>
            <SectionHeader>
                <SectionTitle>Gerenciamento de Avaliações</SectionTitle>
                <ActionButton onClick={handleClick}><FaPlus /> Nova Avaliação</ActionButton>
            </SectionHeader>

            <FilterContainer>
                <FilterLabel>Filtrar por Escola:</FilterLabel>
                <FilterSelect value={schoolFilter} onChange={(e) => setSchoolFilter(e.target.value)}>
                    <option value="">Todas</option>
                    <option value="9 de Out">9 de Out</option>
                    <option value="Rio Branco">Rio Branco</option>
                </FilterSelect>

                <FilterLabel>Filtrar por Trimestre:</FilterLabel>
                <FilterSelect value={trimesterFilter} onChange={(e) => setTrimesterFilter(e.target.value)}>
                    <option value="">Todos</option>
                    <option value="1">1 TRI</option>
                    <option value="2">2 TRI</option>
                    <option value="3">3 TRI</option>
                </FilterSelect>

                <FilterLabel>Filtrar por Série:</FilterLabel>
                <FilterSelect value={seriesFilter} onChange={(e) => setSeriesFilter(e.target.value)}>
                    <option value="">Todas</option>
                    <option value="Ensino Médio 1 ano">1º Ano do Médio</option>
                    <option value="Ensino Médio 2 ano">2º Ano do Médio</option>
                    <option value="Ensino Médio 3 ano">3º Ano do Médio</option>
                </FilterSelect>

                <FilterLabel>Filtrar por Tipo:</FilterLabel>
                <FilterSelect value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                    <option value="">Todos</option>
                    <option value="Lista de exercícios">Lista de exercícios</option>
                    <option value="Quizz">Quizz</option>
                    <option value="Resumo">Resumo</option>
                    <option value="Apresentação">Apresentação</option>
                    <option value="Projeto">Projeto</option>
                    <option value="Atitudinal">Atitudinal</option>
                    <option value="Caderno">Caderno</option>
                    <option value="Avaliação trimestral">Avaliação trimestral</option>
                    <option value="Relatório de atividade experimental">Relatório de atividade experimental</option>
                    <option value="Situação de aprendizagem">Situação de aprendizagem</option>
                </FilterSelect>

                <FilterLabel>Filtrar por Status:</FilterLabel>
                <FilterSelect value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="">Todos</option>
                    <option value="não planejada">Não planejada</option>
                    <option value="planejada">Planejada</option>
                    <option value="impressa">Impressa</option>
                    <option value="em aplicação">Em aplicação</option>
                    <option value="aplicada">Aplicada</option>
                    <option value="corrigida">Corrigida</option>
                    <option value="lançada">Lançada</option>
                </FilterSelect>
            </FilterContainer>
            
            {evaluations.length > 0 ? (
                <EvaluationsList
                    evaluations={evaluations}
                    onDelete={onDelete}
                    onSelect={onSelect}
                    onDuplicate={onDuplicate}
                    onRegisterScores={onRegisterScores}
                />
            ) : (
                <p>Nenhuma avaliação encontrada. Clique em "Nova Avaliação" para criar.</p>
            )}
        </Section>
    );
};

export default EvaluationsSection;
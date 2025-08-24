import React, { useEffect, useState, useCallback } from "react";

import { Evaluation, StudentScore } from "../../../types/evaluation/AssessmentEvaluation";
import { mockStudents } from "../../../mocks/student";
import { mockEvaluations } from "../../../mocks/evaluation";

import { useEvaluationFilters } from "../../../hooks/assessment/useEvaluationFilters";

import EvaluationForm from "../../../components/modals/EvaluationForm";
import RegisterScoresModal from "../../../components/modals/RegisterScoresModal";


import GradesView from "../../../components/Evaluation/GradesView";
import RecoveryView from "../../../components/Evaluation/RecoveryView";

import ResultsView from "../../../components/Evaluation/ResultsView";
import EvaluationsSection from "../../../components/Evaluation/EvaluationsSection";

import {
    NavButton,
    Container,
    MainContent,
    SideBar
} from './styles';
const EvaluationManagement: React.FC = () => {
    const [isEvaluationModalOpen, setIsEvaluationModalOpen] = useState<boolean>(false);
    const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
    const [activeView, setActiveView] = useState<string>('evaluations');
    const [selectedEvaluation, setSelectedEvaluation] = useState<Evaluation | null>(null);
    const [showScoresModal, setShowScoresModal] = useState<boolean>(false);
    const [filterText, setFilterText] = useState<string>('');

    const { filters, filterFunctions } = useEvaluationFilters();

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

    useEffect(() => {
        setEvaluations(mockEvaluations);
        setSelectedEvaluation(mockEvaluations[0]);
    }, []);

    const openEvaluationModal = useCallback((evaluation: Evaluation | null) => {
        setIsEvaluationModalOpen(true);
        setSelectedEvaluation(evaluation);
    }, []);

    const closeEvaluationModal = useCallback(() => {
        setIsEvaluationModalOpen(false);
        setSelectedEvaluation(null);
    }, []);

    const openScoresModal = useCallback((evaluation: Evaluation) => {
        setSelectedEvaluation(evaluation);
        setShowScoresModal(true);
    }, []);

    const closeScoresModal = useCallback(() => {
        setShowScoresModal(false);
        setSelectedEvaluation(null);
    }, []);

    const addEvaluation = useCallback(async (newEvaluation: Evaluation) => {
        if (selectedEvaluation) {
            // Editar avaliação existente
            setEvaluations(prevEvaluations =>
                prevEvaluations.map(ev => ev.id === selectedEvaluation.id ? newEvaluation : ev)
            );
        } else {
            // Adicionar nova avaliação
            setEvaluations(prevEvaluations => [...prevEvaluations, newEvaluation]);
        }
        closeEvaluationModal();
    }, [closeEvaluationModal, selectedEvaluation]);

    const duplicateEvaluation = useCallback((evaluation: Evaluation) => {
        const duplicatedEvaluation = { ...evaluation, id: Date.now() }; // Gera um novo ID
        setEvaluations(prevEvaluations => [...prevEvaluations, duplicatedEvaluation]);
    }, []);

    const filteredEvaluations = evaluations.filter(evaluation =>
        evaluation.name.toLowerCase().includes(filterText.toLowerCase()) &&
        (schoolFilter ? evaluation.school === schoolFilter : true) &&
        (trimesterFilter ? evaluation.trimester === parseInt(trimesterFilter) : true) &&
        (seriesFilter ? evaluation.series === seriesFilter : true) &&
        (typeFilter ? evaluation.type === typeFilter : true) &&
        (statusFilter ? evaluation.status === statusFilter : true)
    );

    const handleSaveScores = (scores: StudentScore[]) => {
        // Lógica para salvar as notas
        console.log("Notas registradas:", scores);
        closeScoresModal();
    };

    return (
        <Container>
            <SideBar>
                <NavButton active={activeView === 'evaluations'} onClick={() => setActiveView('evaluations')}>AVALIAÇÕES</NavButton>
                <NavButton active={activeView === 'scores'} onClick={() => setActiveView('scores')}>NOTAS</NavButton>
                <NavButton active={activeView === 'recovery'} onClick={() => setActiveView('recovery')}>RECUPERAÇÃO</NavButton>
                <NavButton active={activeView === 'results'} onClick={() => setActiveView('results')}>RESULTADO FINAL</NavButton>
            </SideBar>

            <MainContent>
                {activeView === 'evaluations' && (
                    <EvaluationsSection
                        evaluations={filteredEvaluations}
                        filters={{
                            schoolFilter,
                            trimesterFilter,
                            seriesFilter,
                            typeFilter,
                            statusFilter
                        }}
                        filterFunctions={{
                            setSchoolFilter,
                            setTrimesterFilter,
                            setSeriesFilter,
                            setTypeFilter,
                            setStatusFilter
                        }}
                        handleClick={() => openEvaluationModal(null)}
                        onSelect={openEvaluationModal}
                        onDelete={(id) => setEvaluations(evaluations.filter(ev => ev.id !== id))}
                        onDuplicate={duplicateEvaluation}
                        onRegisterScores={openScoresModal}
                    />
                )}
                {activeView === 'scores' && (
                    <GradesView evaluations={evaluations} />
                )}
                {activeView === 'recovery' && (
                    <RecoveryView />
                )}
                {activeView === 'results' && (
                    <ResultsView evaluations={evaluations} />
                )}
            </MainContent>

            {isEvaluationModalOpen && (
                <EvaluationForm
                    evaluation={selectedEvaluation}
                    onSave={async (evaluation) => {
                        if (evaluation) {
                            await addEvaluation(evaluation); // Garante que um Promise<void> seja retornado
                        }
                    }}
                    onClose={() => setIsEvaluationModalOpen(false)}
                />

            )}

            {showScoresModal && selectedEvaluation && (
                <RegisterScoresModal
                    students={mockStudents}
                    evaluationParts={selectedEvaluation.parts ?? []}
                    onClose={closeScoresModal}
                    onSave={handleSaveScores}
                />
            )}
        </Container>
    );
};

export default EvaluationManagement;
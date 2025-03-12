import React, { useEffect, useState } from "react";

import { Evaluation, EvaluationPart, EvaluationTool, Student, StudentAttendance, StudentScore } from "../../utils/types";

// import  from '../../components/EvaluationsList'

import { ActionButton, Container, MainContent, NavButton, Section, SectionHeader, SectionTitle, SideBar } from './styles'
import EvaluationsList from "../../components/EvaluationsList";


interface StudentData extends Student {
    attendance: number;
}

const EvaluationManagement: React.FC = () => {
    const [students, setStudents] = useState<StudentData[]>([]);
    const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
    const [scores, setScores] = useState<StudentScore[]>([]);
    const [activeView, setActiveView] = useState<string>('evaluations');
    const [selectedEvaluation, setSelectedEvaluation] = useState<Evaluation | null>(null);
    const [showResults, setShowResults] = useState<boolean>(false);
    const [filterOptions, setFilterOptions] = useState({
        trimester: 0,
        partId: '',
        evaluationId: ''
    });

    useEffect(() => {
        // Dados de exemplo
        const mockStudents: StudentAttendance[] = [
            { id: 1, name: 'Ana Souza', email: 'ana@exemplo.com', attendance: 90 },
            { id: 2, name: 'Carlos Oliveira', email: 'carlos@exemplo.com', attendance: 85 },
            { id: 3, name: 'Fernanda Lima', email: 'fernanda@exemplo.com', attendance: 95 },
        ];

        const mockEvaluations: Evaluation[] = [
            {
                id: '1',
                name: 'Avaliação do 1º Trimestre',
                trimester: 1,
                passingGrade: 6,
                formula: 'standard', // standard, weighted, custom
                parts: [
                    { id: 'p1', name: 'Teórico', weight: 60, maxScore: 10 },
                    { id: 'p2', name: 'Prático', weight: 40, maxScore: 10 }
                ],
                tools: [
                    { id: 't1', name: 'Prova escrita', partId: 'p1', weight: 40, maxScore: 10 },
                    { id: 't2', name: 'Trabalho em grupo', partId: 'p1', weight: 20, maxScore: 10 },
                    { id: 't3', name: 'Projeto prático', partId: 'p2', weight: 25, maxScore: 10 },
                    { id: 't4', name: 'Apresentação', partId: 'p2', weight: 15, maxScore: 10 }
                ]
            }
        ];

        const mockScores: StudentScore[] = [
            { studentId: '1', toolId: 't1', score: 8.5 },
            { studentId: '1', toolId: 't2', score: 9.0 },
            { studentId: '1', toolId: 't3', score: 7.5 },
            { studentId: '1', toolId: 't4', score: 8.0 },

            { studentId: '2', toolId: 't1', score: 7.0 },
            { studentId: '2', toolId: 't2', score: 8.5 },
            { studentId: '2', toolId: 't3', score: 6.5 },
            { studentId: '2', toolId: 't4', score: 7.0 },

            { studentId: '3', toolId: 't1', score: 5.5 },
            { studentId: '3', toolId: 't2', score: 6.0 },
            { studentId: '3', toolId: 't3', score: 6.0 },
            { studentId: '3', toolId: 't4', score: 5.5 },

            { studentId: '4', toolId: 't1', score: 9.0 },
            { studentId: '4', toolId: 't2', score: 9.5 },
            { studentId: '4', toolId: 't3', score: 9.0 },
            { studentId: '4', toolId: 't4', score: 8.5 },

            { studentId: '5', toolId: 't1', score: 4.5 },
            { studentId: '5', toolId: 't2', score: 5.0 },
            { studentId: '5', toolId: 't3', score: 5.5 },
            { studentId: '5', toolId: 't4', score: 4.0 }
        ];

        setStudents(mockStudents);
        setEvaluations(mockEvaluations);
        setScores(mockScores);
        setSelectedEvaluation(mockEvaluations[0]);

    })

    // Funções para gerenciar avaliações
    const addEvaluation = (evaluation: Evaluation) => {
        setEvaluations([...evaluations, evaluation]);
    };

    const updateEvaluation = (updatedEvaluation: Evaluation) => {
        setEvaluations(evaluations.map(ev =>
            ev.id === updatedEvaluation.id ? updatedEvaluation : ev
        ));
        if (selectedEvaluation?.id === updatedEvaluation.id) {
            setSelectedEvaluation(updatedEvaluation);
        }
    };

    const deleteEvaluation = (id: string) => {
        setEvaluations(evaluations.filter(ev => ev.id !== id));
        if (selectedEvaluation?.id === id) {
            setSelectedEvaluation(null);
        }
    };

    // Função para salvar pontuações dos alunos
    const saveScores = (newScores: StudentScore[]) => {
        // Remove scores existentes dos mesmos alunos/ferramentas
        const filteredScores = scores.filter(existingScore =>
            !newScores.some(newScore =>
                newScore.studentId === existingScore.studentId &&
                newScore.toolId === existingScore.toolId
            )
        );

        // Adiciona os novos scores
        setScores([...filteredScores, ...newScores]);
    };

    // Função para gerenciar avaliações de recuperação
    const updateRecoveryEvaluation = (evaluationId: string, recoveryEvaluation: Evaluation['recoveryEvaluation']) => {
        const updatedEvaluations = evaluations.map(evaluation => {
            if (evaluation.id === evaluationId) {
                return { ...evaluation, recoveryEvaluation };
            }
            return evaluation;
        });

        setEvaluations(updatedEvaluations);
        if (selectedEvaluation?.id === evaluationId) {
            setSelectedEvaluation({ ...selectedEvaluation, recoveryEvaluation });
        }
    };

    // Função para atualizar partes de avaliação
    const updateEvaluationParts = (evaluationId: string, parts: EvaluationPart[]) => {
        const updatedEvaluations = evaluations.map(evaluation => {
            if (evaluation.id === evaluationId) {
                return { ...evaluation, parts };
            }
            return evaluation;
        });

        setEvaluations(updatedEvaluations);
        if (selectedEvaluation?.id === evaluationId) {
            setSelectedEvaluation({ ...selectedEvaluation, parts });
        }
    };

    // Função para atualizar ferramentas de avaliação
    const updateEvaluationTools = (evaluationId: string, tools: EvaluationTool[]) => {
        const updatedEvaluations = evaluations.map(evaluation => {
            if (evaluation.id === evaluationId) {
                return { ...evaluation, tools };
            }
            return evaluation;
        });

        setEvaluations(updatedEvaluations);
        if (selectedEvaluation?.id === evaluationId) {
            setSelectedEvaluation({ ...selectedEvaluation, tools });
        }
    };

    // Função para atualizar a fórmula de cálculo
    const updateEvaluationFormula = (evaluationId: string, formula: string) => {
        const updatedEvaluations = evaluations.map(evaluation => {
            if (evaluation.id === evaluationId) {
                return { ...evaluation, formula };
            }
            return evaluation;
        });

        setEvaluations(updatedEvaluations);
        if (selectedEvaluation?.id === evaluationId) {
            setSelectedEvaluation({ ...selectedEvaluation, formula });
        }
    };

    // Função para calcular a nota final do aluno em uma avaliação
    const calculateFinalGrade = (studentId: string, evaluation: Evaluation): number => {
        if (!evaluation) return 0;

        const studentScores = scores.filter(score =>
            score.studentId === studentId &&
            evaluation.tools.some(tool => tool.id === score.toolId)
        );

        if (studentScores.length === 0) return 0;

        if (evaluation.formula === 'standard') {
            // Método padrão: média ponderada das notas pelos pesos das ferramentas
            let totalWeight = 0;
            let weightedSum = 0;

            for (const tool of evaluation.tools) {
                const score = studentScores.find(s => s.toolId === tool.id);
                if (score) {
                    weightedSum += (score.score * tool.weight);
                    totalWeight += tool.weight;
                }
            }

            return totalWeight ? (weightedSum / totalWeight) : 0;
        } else if (evaluation.formula === 'weighted') {
            // Método por partes: calcula a nota de cada parte e depois a média ponderada das partes
            const partScores: { [key: string]: { sum: number, weight: number } } = {};

            // Inicializa cada parte
            evaluation.parts.forEach(part => {
                partScores[part.id] = { sum: 0, weight: 0 };
            });

            // Calcula a nota para cada parte
            for (const tool of evaluation.tools) {
                const score = studentScores.find(s => s.toolId === tool.id);
                if (score && partScores[tool.partId]) {
                    partScores[tool.partId].sum += (score.score * tool.weight);
                    partScores[tool.partId].weight += tool.weight;
                }
            }

            // Calcula a média ponderada das partes
            let finalGrade = 0;
            let totalPartWeight = 0;

            evaluation.parts.forEach(part => {
                if (partScores[part.id].weight > 0) {
                    const partGrade = partScores[part.id].sum / partScores[part.id].weight;
                    finalGrade += (partGrade * part.weight);
                    totalPartWeight += part.weight;
                }
            });

            return totalPartWeight ? (finalGrade / totalPartWeight) : 0;
        } else {
            // Fórmula personalizada (simplificada para este exemplo)
            // Na implementação real, seria utilizado um parser de expressões
            return (studentScores.reduce((sum, s) => sum + s.score, 0) / studentScores.length);
        }
    };

    // Função para calcular se o aluno está abaixo da média
    const isBelowPassingGrade = (studentId: string, evaluation: Evaluation): boolean => {
        if (!evaluation) return false;
        const grade = calculateFinalGrade(studentId, evaluation);
        return grade < evaluation.passingGrade;
    };
    
    return (
        <Container>
            <SideBar>
                <NavButton active={activeView === 'evaluations'} onClick={() => setActiveView('evaluations')}>AVALIAÇÕES</NavButton>
                <NavButton active={activeView === 'students'} onClick={() => setActiveView('students')} >ALUNOS</NavButton>
                {selectedEvaluation && (
                    <>
                        <NavButton active={activeView === 'parts'} onClick={() => setActiveView('parts')}>Partes da Avaliação</NavButton>
                        <NavButton active={activeView === 'tools'} onClick={() => setActiveView('tools')}>Instrumentos Avaliativos</NavButton>
                        <NavButton active={activeView === 'scores'} onClick={() => setActiveView('scores')}>Notas</NavButton>
                        <NavButton active={activeView === 'results'} onClick={() => setActiveView('results')}>Resultados</NavButton>
                        <NavButton active={activeView === 'rule'} onClick={() => setActiveView('rule')}>Fórmula de Cálculo da Média</NavButton>
                        <NavButton active={activeView === 'recovery'} onClick={() => setActiveView('recovery')}>Recuperação</NavButton>
                    </>
                )}
            </SideBar>

            <MainContent>
                {activeView === 'evaluations' && (
                    <Section>
                        <SectionHeader>
                            <SectionTitle>Gerenciamento de Avaliações</SectionTitle>
                            <ActionButton onClick={() => setSelectedEvaluation(null)} >Nova Avaliação</ActionButton>
                        </SectionHeader>
                        <EvaluationsList evaluations={evaluations} onDelete={deleteEvaluation} onSelect={setSelectedEvaluation} />
                    </Section>
                )}

                {activeView === 'students' && (
                    <Section>
                        <SectionTitle>Alunos e Frequência</SectionTitle>
                    </Section>
                )}        

            </MainContent>
        </Container>
    )
};

export default EvaluationManagement;
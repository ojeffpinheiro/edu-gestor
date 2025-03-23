import React, { useEffect, useState, useCallback } from "react";
import { Evaluation, StudentScore } from "../../utils/types";

import EvaluationsList from "../../components/EvaluationsList";
import EvaluationForm from "../../components/modals/EvaluationForm";
import RegisterScoresModal from "../../components/modals/RegisterScoresModal";

import {
    ActionButton,
    NavButton,
    Container,
    MainContent,
    Section,
    SectionHeader,
    SectionTitle,
    SideBar,
    FilterSelect,
    FilterLabel,
    FilterContainer
} from './styles';

const EvaluationManagement: React.FC = () => {
    const [isEvaluationModalOpen, setIsEvaluationModalOpen] = useState<boolean>(false);
    const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
    const [activeView, setActiveView] = useState<string>('evaluations');
    const [selectedEvaluation, setSelectedEvaluation] = useState<Evaluation | null>(null);
    const [showScoresModal, setShowScoresModal] = useState<boolean>(false);
    const [filterText, setFilterText] = useState<string>('');
    const [schoolFilter, setSchoolFilter] = useState<string>('');
    const [trimesterFilter, setTrimesterFilter] = useState<string>('');
    const [seriesFilter, setSeriesFilter] = useState<string>('');
    const [typeFilter, setTypeFilter] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<string>('');

    useEffect(() => {
        const mockEvaluations: Evaluation[] = [
            {
                id: 2,
                name: 'Avaliação do 2º Trimestre',
                trimester: 2,
                passingGrade: 6,
                formula: 'standard',
                parts: [
                    { id: 'p1', name: 'Teórico', weight: 50, maxScore: 10 },
                    { id: 'p2', name: 'Prático', weight: 50, maxScore: 10 }
                ],
                tools: [
                    { id: 't1', name: 'Prova escrita', partId: 'p1', weight: 30, maxScore: 10 },
                    { id: 't2', name: 'Redação', partId: 'p1', weight: 20, maxScore: 10 },
                    { id: 't3', name: 'Experimento', partId: 'p2', weight: 35, maxScore: 10 },
                    { id: 't4', name: 'Seminário', partId: 'p2', weight: 15, maxScore: 10 }
                ],
                school: '9 de Out',
                series: 'Ensino Médio 1 ano',
                class: 'A',
                objective: 'Avaliar conhecimentos do segundo trimestre',
                contents: 'Leis de Newton, Trabalho e Energia, Quantidade de Movimento',
                evaluationCriteria: 'Correção conceitual, clareza na resolução dos problemas, participação nas atividades práticas.',
                subject: 'Física',
                record: 'Notas registradas no sistema acadêmico',
                applicationDate: new Date('2025-06-30'),
                type: 'Avaliação trimestral',
                status: 'PLANEJADA',
                resources: [
                    { id: 1, name: 'Calculadora científica', quantity: 10 },
                    { id: 2, name: 'Kit de experimento de forças', quantity: 5 }
                ]
            },
            {
                id: 3,
                name: 'Avaliação do 3º Trimestre',
                trimester: 3,
                passingGrade: 6,
                formula: 'standard',
                parts: [
                    { id: 'p1', name: 'Teórico', weight: 40, maxScore: 10 },
                    { id: 'p2', name: 'Prático', weight: 60, maxScore: 10 }
                ],
                tools: [
                    { id: 't1', name: 'Teste objetivo', partId: 'p1', weight: 20, maxScore: 10 },
                    { id: 't2', name: 'Estudo de caso', partId: 'p1', weight: 20, maxScore: 10 },
                    { id: 't3', name: 'Projeto interdisciplinar', partId: 'p2', weight: 40, maxScore: 10 },
                    { id: 't4', name: 'Apresentação oral', partId: 'p2', weight: 20, maxScore: 10 }
                ],
                school: '9 de Out',
                series: 'Ensino Médio 1 ano',
                class: 'A',
                objective: 'Avaliar conhecimentos do terceiro trimestre',
                contents: 'Ondulatória, Termodinâmica, Óptica',
                evaluationCriteria: 'Demonstração do entendimento dos conceitos, aplicação em situações reais, organização e argumentação nas respostas.',
                subject: 'Física',
                record: 'Notas registradas no diário do professor',
                applicationDate: new Date('2025-09-30'),
                type: 'Avaliação trimestral',
                status: 'PLANEJADA',
                resources: [
                    { id: 3, name: 'Laser para experimentos', quantity: 2 },
                    { id: 4, name: 'Kit de lentes e espelhos', quantity: 4 }
                ]
            },
            {
                id: 4,
                name: 'Avaliação Final',
                trimester: 4,
                passingGrade: 6,
                formula: 'standard',
                parts: [
                    { id: 'p1', name: 'Prova Integrada', weight: 70, maxScore: 10 },
                    { id: 'p2', name: 'Projeto Final', weight: 30, maxScore: 10 }
                ],
                tools: [
                    { id: 't1', name: 'Prova dissertativa', partId: 'p1', weight: 50, maxScore: 10 },
                    { id: 't2', name: 'Análise de problemas', partId: 'p1', weight: 20, maxScore: 10 },
                    { id: 't3', name: 'Trabalho de conclusão', partId: 'p2', weight: 30, maxScore: 10 }
                ],
                school: '9 de Out',
                series: 'Ensino Médio 1 ano',
                class: 'A',
                objective: 'Avaliação final abrangendo todo o conteúdo do ano',
                contents: 'Revisão geral: Mecânica, Termodinâmica, Ondas e Óptica',
                evaluationCriteria: 'Capacidade de síntese, domínio dos conteúdos ao longo do ano, criatividade e inovação no projeto final.',
                subject: 'Física',
                record: 'Notas finais inseridas no boletim',
                applicationDate: new Date('2025-12-15'),
                type: 'Avaliação final',
                status: 'PLANEJADA',
                resources: [
                    { id: 5, name: 'Cronômetro digital', quantity: 3 },
                    { id: 6, name: 'Dinamômetros', quantity: 5 }
                ]
            }, {
                id: 5,
                name: 'Avaliação do 1º Trimestre',
                trimester: 1,
                passingGrade: 6,
                formula: 'standard',
                parts: [
                    { id: 'p1', name: 'Teórico', weight: 60, maxScore: 10 },
                    { id: 'p2', name: 'Prático', weight: 40, maxScore: 10 }
                ],
                tools: [
                    { id: 't1', name: 'Prova escrita', partId: 'p1', weight: 40, maxScore: 10 },
                    { id: 't2', name: 'Trabalho em grupo', partId: 'p1', weight: 20, maxScore: 10 },
                    { id: 't3', name: 'Experiência de laboratório', partId: 'p2', weight: 25, maxScore: 10 },
                    { id: 't4', name: 'Apresentação de resultados', partId: 'p2', weight: 15, maxScore: 10 }
                ],
                school: '9 de Out',
                series: 'Ensino Médio 2 ano',
                class: 'B',
                objective: 'Avaliar os conceitos básicos da Cinemática',
                contents: 'Movimento retilíneo uniforme, Movimento uniformemente variado, Gráficos do movimento',
                evaluationCriteria: 'Capacidade de interpretação de gráficos, aplicação das equações do movimento e justificativa das respostas.',
                subject: 'Física',
                record: 'Notas registradas no diário eletrônico',
                applicationDate: new Date('2025-03-25'),
                type: 'Avaliação trimestral',
                status: 'PLANEJADA',
                resources: [
                    { id: 7, name: 'Cronômetro', quantity: 6 },
                    { id: 8, name: 'Carrinhos de experimento', quantity: 4 }
                ]
            },
            {
                id: 6,
                name: 'Avaliação do 2º Trimestre',
                trimester: 2,
                passingGrade: 6,
                formula: 'standard',
                parts: [
                    { id: 'p1', name: 'Teórico', weight: 55, maxScore: 10 },
                    { id: 'p2', name: 'Prático', weight: 45, maxScore: 10 }
                ],
                tools: [
                    { id: 't1', name: 'Prova objetiva', partId: 'p1', weight: 35, maxScore: 10 },
                    { id: 't2', name: 'Análise de gráficos', partId: 'p1', weight: 20, maxScore: 10 },
                    { id: 't3', name: 'Experimento sobre forças', partId: 'p2', weight: 30, maxScore: 10 },
                    { id: 't4', name: 'Relatório técnico', partId: 'p2', weight: 15, maxScore: 10 }
                ],
                school: '9 de Out',
                series: 'Ensino Médio 2 ano',
                class: 'B',
                objective: 'Avaliar os conceitos de Dinâmica e Forças',
                contents: 'Leis de Newton, Forças de atrito, Trabalho e Energia',
                evaluationCriteria: 'Aplicação correta das leis de Newton, interpretação de situações-problema e análise de forças em gráficos.',
                subject: 'Física',
                record: 'Notas registradas na planilha acadêmica',
                applicationDate: new Date('2025-06-28'),
                type: 'Avaliação trimestral',
                status: 'PLANEJADA',
                resources: [
                    { id: 9, name: 'Dinamômetro', quantity: 5 },
                    { id: 10, name: 'Blocos de atrito', quantity: 4 }
                ]
            },
            {
                id: 7,
                name: 'Avaliação do 3º Trimestre',
                trimester: 3,
                passingGrade: 6,
                formula: 'standard',
                parts: [
                    { id: 'p1', name: 'Teórico', weight: 50, maxScore: 10 },
                    { id: 'p2', name: 'Prático', weight: 50, maxScore: 10 }
                ],
                tools: [
                    { id: 't1', name: 'Questões discursivas', partId: 'p1', weight: 30, maxScore: 10 },
                    { id: 't2', name: 'Simulação computacional', partId: 'p1', weight: 20, maxScore: 10 },
                    { id: 't3', name: 'Projeto experimental', partId: 'p2', weight: 35, maxScore: 10 },
                    { id: 't4', name: 'Discussão em grupo', partId: 'p2', weight: 15, maxScore: 10 }
                ],
                school: '9 de Out',
                series: 'Ensino Médio 2 ano',
                class: 'B',
                objective: 'Avaliar os conceitos de eletricidade e circuitos',
                contents: 'Corrente elétrica, Lei de Ohm, Circuitos elétricos',
                evaluationCriteria: 'Resolução de problemas elétricos, organização na elaboração dos circuitos e clareza na argumentação.',
                subject: 'Física',
                record: 'Notas adicionadas ao sistema escolar',
                applicationDate: new Date('2025-09-27'),
                type: 'Avaliação trimestral',
                status: 'PLANEJADA',
                resources: [
                    { id: 11, name: 'Multímetros', quantity: 3 },
                    { id: 12, name: 'Fontes de tensão', quantity: 2 },
                    { id: 13, name: 'Resistores diversos', quantity: 10 }
                ]
            },
            {
                id: 8,
                name: 'Avaliação Final',
                trimester: 4,
                passingGrade: 6,
                formula: 'standard',
                parts: [
                    { id: 'p1', name: 'Prova Integrada', weight: 70, maxScore: 10 },
                    { id: 'p2', name: 'Projeto Final', weight: 30, maxScore: 10 }
                ],
                tools: [
                    { id: 't1', name: 'Prova dissertativa', partId: 'p1', weight: 50, maxScore: 10 },
                    { id: 't2', name: 'Análise de experimentos', partId: 'p1', weight: 20, maxScore: 10 },
                    { id: 't3', name: 'Apresentação de trabalho', partId: 'p2', weight: 30, maxScore: 10 }
                ],
                school: '9 de Out',
                series: 'Ensino Médio 2 ano',
                class: 'B',
                objective: 'Avaliação final abrangendo todos os conceitos do ano',
                contents: 'Mecânica, Eletricidade, Termodinâmica',
                evaluationCriteria: 'Síntese e integração dos conteúdos, inovação nas soluções e justificativas adequadas.',
                subject: 'Física',
                record: 'Notas finais enviadas para o boletim escolar',
                applicationDate: new Date('2025-12-10'),
                type: 'Avaliação final',
                status: 'PLANEJADA',
                resources: [
                    { id: 14, name: 'Kit de circuitos elétricos', quantity: 5 },
                    { id: 15, name: 'Software de simulação', quantity: 1 }
                ]
            }
        ];
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

    const mockStudents = [
        { id: 1, name: "Ana Souza", email: "ana.souza@example.com" },
        { id: 2, name: "Carlos Oliveira", email: "carlos.oliveira@example.com" },
        { id: 3, name: "Fernanda Lima", email: "fernanda.lima@example.com" },
        { id: 4, name: "Rafael Mendes", email: "rafael.mendes@example.com" },
        { id: 5, name: "Juliana Costa", email: "juliana.costa@example.com" },
        { id: 6, name: "Lucas Pereira", email: "lucas.pereira@example.com" },
        { id: 7, name: "Mariana Silva", email: "mariana.silva@example.com" },
        { id: 8, name: "Gabriel Santos", email: "gabriel.santos@example.com" },
        { id: 9, name: "Isabela Rocha", email: "isabela.rocha@example.com" },
        { id: 10, name: "Felipe Almeida", email: "felipe.almeida@example.com" },
    ];

    return (
        <Container>
            <SideBar>
                <NavButton active={activeView === 'evaluations'} onClick={() => setActiveView('evaluations')}>AVALIAÇÕES</NavButton>
                <NavButton active={activeView === 'scores'} onClick={() => setActiveView('scores')}>NOTAS</NavButton>
                <NavButton active={activeView === 'recovery'} onClick={() => setActiveView('recovery')}>RECUPERAÇÃO</NavButton>
                <NavButton active={activeView === 'results'} onClick={() => setActiveView('results')}>RESULTADO FINAL</NavButton>
            </SideBar>

            <MainContent>
                <Section>
                    <SectionHeader>
                        <SectionTitle>Gerenciamento de Avaliações</SectionTitle>
                        <ActionButton onClick={() => openEvaluationModal(null)}>Nova Avaliação</ActionButton>
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

                    {filteredEvaluations.length > 0 ? (
                        <EvaluationsList
                            evaluations={evaluations}
                            onDelete={(id) => setEvaluations(evaluations.filter(ev => ev.id !== id))}
                            onSelect={openEvaluationModal}
                            onDuplicate={duplicateEvaluation}
                            onRegisterScores={openScoresModal}
                        />
                    ) : (
                        <p>Nenhuma avaliação encontrada. Clique em "Nova Avaliação" para criar.</p>
                    )}
                </Section>
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
                    evaluationParts={selectedEvaluation.parts ?? []} // Usando coalescência nula
                    onClose={closeScoresModal}
                    onSave={handleSaveScores}
                />
            )}
        </Container>
    );
};

export default EvaluationManagement;
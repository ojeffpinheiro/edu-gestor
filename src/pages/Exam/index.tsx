// src/pages/Exams/index.tsx
import React, { useState } from 'react';
import {
    FaList,
    FaSave,
    FaLock,
    FaCheckCircle,
    FaPlus
} from 'react-icons/fa';
import { useExam } from '../../contexts/ExamContext';
import QuestionManager from '../../components/Exam/QuestionManager/QuestionManager';

import {
    ActionButtons,
    Card,
    CardTitle,
    ExamCard,
    ExamInfo,
    ExamTitle,
    ExamViewHeader,
    ExamViewTitle,
    ExamsGrid,
    Header,
    HeaderTitle,
    MainContent,
    PageContainer,
    PasswordBadge,
    SecondaryButton
} from './styles'
import ExamIdentification from '../../components/Exam/ExamIdentification/ExamIdentification';
import { Button } from '../../styles/buttons';
import { ActionContainer } from '../../components/Assessment/ExamGenerator/ExamGeneratorStyles';
import ExamSpecific from '../../components/Exam/ExamSpecific';
import ExamGenerationFlow from '../../components/Exam/ExamGenerationFlow';

const Exams: React.FC = () => {
    const [password, setPassword] = useState('');
    const [showGenerator, setShowGenerator] = useState(false);
    const [showGeneratorSpecific, setShowGeneratorSpecific] = useState(false);

    const {
        questions,
        exams,
        currentExam,
        examParams,
        selectedQuestionIds,
        isLoading,
        error,
        setSelectedQuestionIds,
        setCurrentExam,
        generateRandomExams,
        generateSpecificExam,
        saveExamAsPDF,
        exportAnswerKey
    } = useExam();

    const uniqueTopics = [...new Set(questions.map(q => q.topic))];

    const handleSaveExam = async () => {
        if (!currentExam) return;
        try {
            await saveExamAsPDF(currentExam.id);
            alert(`Prova "${currentExam.title}" salva com sucesso!`);
        } catch (err) {
            alert(`Erro ao salvar prova: ${err instanceof Error ? err.message : 'Erro desconhecido'}`);
        }
    };

    const handleExportAnswerKey = async () => {
        if (!currentExam) return;

        try {
            await exportAnswerKey(currentExam.id);
            alert(`Gabarito da prova "${currentExam.title}" exportado com sucesso!`);
        } catch (err) {
            alert(`Erro ao exportar gabarito: ${err instanceof Error ? err.message : 'Erro desconhecido'}`);
        }
    };

    const handleOpenGenerator = () => {
        setShowGenerator(true);
    };

    const handleOpenGeneratorSpecif = () => {
        setShowGeneratorSpecific(true);
    }

    const handleCloseGenerator = () => {
        setShowGenerator(false);
    };

    const handleExamGenerate = async () => {
        await generateRandomExams();
        handleCloseGenerator();
    }

    return (
        <PageContainer>
            <Header>
                <HeaderTitle>Sistema de Geração de Provas</HeaderTitle>
                <ActionContainer>
                    <Button variant="primary"
                        onClick={handleOpenGenerator}
                        aria-label="Criar uma nova prova"
                        data-testid="create-exam-button" >
                        <FaPlus /> Gerar de Provas
                    </Button>
                    <Button variant='primary'
                        onClick={handleOpenGeneratorSpecif}
                        aria-label="Criar uma nova prova com questões específicas"
                        data-testid="create-exam-button">
                        <FaList /> Selecionar questões
                    </Button>
                </ActionContainer>
            </Header>

            <MainContent>
                <Card>
                    <CardTitle>Provas Salvas</CardTitle>

                    {exams.length === 0 ? (
                        <p>Nenhuma prova foi gerada ainda.</p>
                    ) : (
                        <ExamsGrid>
                            {exams.map((exam) => (
                                <ExamCard
                                    key={exam.id}
                                    active={currentExam?.id === exam.id}
                                    onClick={() => setCurrentExam(exam)}
                                >
                                    <ExamTitle>{exam.title}</ExamTitle>
                                    <ExamInfo>{exam.questions.length} questões</ExamInfo>
                                    {exam.password && (
                                        <PasswordBadge>
                                            <FaLock size={10} />
                                            Protegido por senha
                                        </PasswordBadge>
                                    )}
                                </ExamCard>
                            ))}
                        </ExamsGrid>
                    )}
                </Card>

                {currentExam && (
                    <Card>
                        <ExamViewHeader>
                            <ExamViewTitle>{currentExam.title}</ExamViewTitle>
                            <ActionButtons>
                                <SecondaryButton onClick={handleSaveExam} disabled={isLoading}>
                                    <FaSave size={12} />
                                    Salvar PDF
                                </SecondaryButton>
                                <SecondaryButton onClick={handleExportAnswerKey} disabled={isLoading}>
                                    <FaCheckCircle size={12} />
                                    Exportar Gabarito
                                </SecondaryButton>
                            </ActionButtons>
                        </ExamViewHeader>

                        <ExamIdentification
                            examId={currentExam.id}
                            title={currentExam.title}
                            createdAt={currentExam.createdAt}
                        />

                        <QuestionManager
                            questions={currentExam.questions}
                            readOnly
                            showAnswers
                            initialTopics={[]}
                            onTopicsChange={() => { }}
                        />
                    </Card>
                )}

                {error && (
                    <div style={{ color: 'red', marginTop: '1rem' }}>
                        {error}
                    </div>
                )}
            </MainContent>

            {showGenerator &&
                <ExamGenerationFlow
                    initialExamParams={examParams}
                    availableQuestions={questions}
                    isLoading={isLoading}
                    onExamGenerate={handleExamGenerate}
                    onModalClose={handleCloseGenerator} />}

            {showGeneratorSpecific &&
                <ExamSpecific
                    examParams={examParams}
                    isLoading={isLoading}
                    pass={password}
                    questions={questions}
                    selectedQuestionIds={selectedQuestionIds}
                    setSelectedQuestionIds={setSelectedQuestionIds}
                    generateSpecificExam={generateSpecificExam}
                    onClose={handleOpenGeneratorSpecif}
                    isOpen={showGeneratorSpecific} />}
        </PageContainer>
    );
};

export default Exams;
import React, { useState, useEffect } from "react";
import { FaFileExport, FaChartBar, FaUserGraduate, FaFilter } from "react-icons/fa";

import { useExamResults } from "../../../hooks/assessment/useExamResults";
import { Exam, ExamResult } from "../../../types/academic/Assessment";

import examService from "../../../services/examService";
import { Select } from "../../../styles/inputs";
import { Table } from "../../../styles/table";
import { Container } from "../../../styles/layoutUtils";
import { Card } from "../../../styles/card";
import { LoadingMessage, LoadingSpinner } from "../../../styles/feedback";
import { Title } from "../../../styles/typography";


import { 
    ExportButton, 
    ExportContainer, 
    FiltersContainer, 
    SpinnerIcon, 
    SummaryCard, 
    VisualizationsContainer
 } from "./styles";


const ExamSelector: React.FC<{
    exams: Exam[];
    selectedExam: string;
    onChange: (examId: string) => void;
}> = ({ exams, selectedExam, onChange }) => (
    <div>
        <label htmlFor="exam-selector">
            <FaFilter /> Selecionar Avaliação
        </label>
        <Select
            id="exam-selector"
            value={selectedExam}
            onChange={(e) => onChange(e.target.value)}
        >
            <option value="">Todas as avaliações</option>
            {exams.map((exam) => (
                <option key={exam.id} value={exam.id}>
                    {exam.title}
                </option>
            ))}
        </Select>
    </div>
);

const ClassSelector: React.FC<{
    selectedExam: string;
    selectedClass: string;
    onChange: (classId: string) => void;
}> = ({ selectedExam, selectedClass, onChange }) => (
    <div>
        <label htmlFor="class-selector">
            <FaUserGraduate /> Selecionar Turma
        </label>
        <Select
            id="class-selector"
            value={selectedClass}
            onChange={(e) => onChange(e.target.value)}
            disabled={!selectedExam}
        >
            <option value="">Todas as turmas</option>
            {/* Opções de turmas seriam carregadas dinamicamente baseadas no exame selecionado */}
        </Select>
    </div>
);

const ResultsSummary: React.FC<{
    examResults: ExamResult[];
}> = ({ examResults }) => {
    // Calcular estatísticas básicas
    const totalStudents = new Set(examResults.map(result => result.studentId)).size;
    const totalScores = examResults.reduce((sum, result) => sum + result.totalScore, 0);
    const averageScore = totalStudents > 0 ? totalScores / totalStudents : 0;
    const scores = examResults.map(result => result.totalScore);
    const highestScore = scores.length > 0 ? Math.max(...scores) : 0;
    const lowestScore = scores.length > 0 ? Math.min(...scores) : 0;

    return (
        <SummaryCard>
            <h2>Resumo dos Resultados</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                <div>
                    <h3>Total de Alunos</h3>
                    <p>{totalStudents}</p>
                </div>
                <div>
                    <h3>Nota Média</h3>
                    <p>{averageScore.toFixed(1)}</p>
                </div>
                <div>
                    <h3>Nota Mais Alta</h3>
                    <p>{highestScore}</p>
                </div>
                <div>
                    <h3>Nota Mais Baixa</h3>
                    <p>{lowestScore}</p>
                </div>
            </div>
        </SummaryCard>
    );
};

const PerformanceChart: React.FC<{
    data: ExamResult[];
}> = ({ data }) => (
    <Card>
        <h2>
            <FaChartBar /> Desempenho por Questão
        </h2>
        <p>Gráfico de desempenho seria renderizado aqui</p>
        {/* Aqui seria implementado um gráfico real usando uma biblioteca como recharts */}
    </Card>
);

const QuestionDifficultyAnalysis: React.FC<{
    data: ExamResult[];
}> = ({ data }) => (
    <Card>
        <h2>Análise de Dificuldade das Questões</h2>
        <p>Análise de dificuldade seria renderizada aqui</p>
        {/* Aqui seria implementada uma visualização real */}
    </Card>
);

const StudentResultsTable: React.FC<{
    results: ExamResult[];
    onStudentSelect: (studentId: string) => void;
}> = ({ results, onStudentSelect }) => {
    // Agrupar resultados por estudante
    const studentResults = results.reduce((acc, result) => {
        if (!acc[result.studentId]) {
            acc[result.studentId] = {
                studentId: result.studentId,
                totalScore: result.totalScore,
                completedAt: result.completedAt
            };
        }
        return acc;
    }, {} as Record<string, { studentId: string; totalScore: number; completedAt: Date }>);

    return (
        <div>
            <h2>Resultados dos Alunos</h2>
            <Table>
                <thead>
                    <tr>
                        <th>ID do Aluno</th>
                        <th>Pontuação Total</th>
                        <th>Data de Conclusão</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(studentResults).map((student) => (
                        <tr key={student.studentId}>
                            <td>{student.studentId}</td>
                            <td>{student.totalScore}</td>
                            <td>{student.completedAt.toLocaleString()}</td>
                            <td>
                                <button onClick={() => onStudentSelect(student.studentId)}>
                                    Ver Detalhes
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

const ExportOptions: React.FC<{
    data: ExamResult[];
    formats: string[];
    onExport: (format: string) => void;
}> = ({ data, formats, onExport }) => (
    <ExportContainer>
        {formats.map((format) => (
            <ExportButton key={format} onClick={() => onExport(format)}>
                <FaFileExport /> Exportar {format.toUpperCase()}
            </ExportButton>
        ))}
    </ExportContainer>
);

export const ExamResults: React.FC = () => {
    const [selectedExam, setSelectedExam] = useState<string>('');
    const [selectedClass, setSelectedClass] = useState<string>('');
    const [exams, setExams] = useState<Exam[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Usa o hook de resultados corretamente passando um objeto de props
    const {
        results,
        isLoading: resultsLoading
    } = useExamResults({
        examId: selectedExam,
        classId: selectedClass
    });

    // Carregar exames quando o componente montar
    useEffect(() => {
        const fetchExams = async () => {
            try {
                const response = await examService.getAllExams();
                if (response.success && response.data) {
                    setExams(response.data);
                }
            } catch (error) {
                console.error("Erro ao carregar exames:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchExams();
    }, []);

    const handleStudentSelect = (studentId: string) => {
        console.log(`Selecionado estudante: ${studentId}`);
        // Implementar lógica para mostrar detalhes do estudante
    };

    const handleExport = (format: string) => {
        console.log(`Exportando no formato: ${format}`);
        // Implementar lógica de exportação
    };

    if (loading) {
        return (
            <LoadingSpinner>
                <SpinnerIcon />
                <LoadingMessage>Carregando exames...</LoadingMessage>
            </LoadingSpinner>
        );
    }

    if (resultsLoading) {
        return (
            <LoadingSpinner>
                <SpinnerIcon />
                <LoadingMessage>Carregando resultados...</LoadingMessage>
            </LoadingSpinner>
        );
    }

    return (
        <Container>
            <Title>Resultados das Avaliações</Title>

            <FiltersContainer>
                <ExamSelector
                    exams={exams}
                    selectedExam={selectedExam}
                    onChange={setSelectedExam}
                />
                <ClassSelector
                    selectedExam={selectedExam}
                    selectedClass={selectedClass}
                    onChange={setSelectedClass}
                />
            </FiltersContainer>

            <ResultsSummary examResults={results} />

            <VisualizationsContainer>
                <PerformanceChart data={results} />
                <QuestionDifficultyAnalysis data={results} />
            </VisualizationsContainer>

            <StudentResultsTable
                results={results}
                onStudentSelect={handleStudentSelect}
            />

            <ExportOptions
                data={results}
                formats={['pdf', 'excel', 'csv']}
                onExport={handleExport}
            />
        </Container>
    );
};
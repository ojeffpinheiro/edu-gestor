import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaFileAlt, FaDownload, FaChartBar, FaListAlt, FaUserGraduate, FaInfoCircle, FaTimes } from 'react-icons/fa';

import { Exam, ExamResult, Question } from '../../../utils/types/Assessment';

// Importação de componentes de estilo
import { Button, ActionButton, PrimaryActionButton, CloseButton } from '../../../styles/buttons';
import { InputGroup, Label, Select, TextArea } from '../../../styles/inputs';
import { Card } from '../../../styles/containers';
import { Table, TableHeader, TableRow, TableCell, EmptyStateMessage } from '../../../styles/table';
import { ModalContainer, ModalContent, ModalHeader, ModalBody, ModalFooter } from '../../../styles/modals';

interface Student {
    id: string;
    name: string;
    email: string;
    registrationNumber: string;
}

interface ReportTemplate {
    id: string;
    name: string;
    description: string;
    type: 'individual' | 'class' | 'question' | 'summary';
    sections: ReportSection[];
}

interface ReportSection {
    id: string;
    title: string;
    type: 'scores' | 'chart' | 'statistics' | 'comments' | 'questions';
    config: any;
}

interface ReportData {
    exam: Exam;
    results: ExamResult[];
    questions: Question[];
    students: Student[];
}

interface ReportGeneratorProps {
    type: 'summary' | 'detailed' | 'individual' | 'comparative';
    results: ExamResult[];
    exam: Exam | null;
    statistics: {
        average: number;
        median: number;
        highest: number;
        lowest: number;
        passingRate: number;
        standardDeviation: number;
    };
    examId?: string;
    classId?: string;
    studentId?: string;
    onGenerate?: (reportData: any) => void;
}

// Componentes estilizados adicionais
const ReportContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
`;

const TemplateCard = styled(Card)`
  cursor: pointer;
  padding: var(--space-md);
  transition: all 0.2s ease;
  border: 2px solid transparent;
  
  &:hover {
    border-color: var(--color-primary);
  }
  
  &.selected {
    border-color: var(--color-primary);
    background-color: var(--color-background-third);
  }
  
  .card-header {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    margin-bottom: var(--space-md);
    
    svg {
      color: var(--color-primary);
      font-size: 1.5rem;
    }
    
    h3 {
      margin: 0;
    }
  }
  
  .card-body {
    color: var(--color-text-secondary);
  }
`;

const TemplatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
`;

const SectionContainer = styled.div`
  margin-bottom: var(--space-lg);
  border: 1px solid var(--color-border-light);
  border-radius: var(--border-radius-md);
  padding: var(--space-md);
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-md);
    padding-bottom: var(--space-sm);
    border-bottom: 1px solid var(--color-border-light);
    
    h3 {
      margin: 0;
      display: flex;
      align-items: center;
      gap: var(--space-sm);
    }
  }
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: var(--space-lg);
`;

const Tab = styled.button<{ active: boolean }>`
  padding: var(--space-md) var(--space-lg);
  background: transparent;
  border: none;
  border-bottom: 2px solid ${props => props.active ? 'var(--color-primary)' : 'transparent'};
  color: ${props => props.active ? 'var(--color-primary)' : 'var(--color-text-secondary)'};
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: var(--color-background-third);
  }
`;

const InfoMessage = styled.div`
  padding: var(--space-md);
  background-color: var(--color-background-third);
  border-left: 4px solid var(--color-info);
  margin-bottom: var(--space-lg);
  display: flex;
  align-items: center;
  gap: var(--space-md);
  
  svg {
    color: var(--color-info);
    font-size: 1.5rem;
  }
`;

// Componente principal
const ReportGenerator: React.FC<ReportGeneratorProps> = ({
    examId, classId, studentId, onGenerate }) => {
    const [activeTab, setActiveTab] = useState<'templates' | 'custom'>('templates');
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
    const [customSections, setCustomSections] = useState<ReportSection[]>([]);
    const [previewData, setPreviewData] = useState<any | null>(null);
    const [showPreview, setShowPreview] = useState(false);
    const [reportTitle, setReportTitle] = useState('');
    const [reportDescription, setReportDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [templates, setTemplates] = useState<ReportTemplate[]>([]);

    // Efeito para carregar templates pré-definidos
    useEffect(() => {
        // Em um cenário real, esses templates viriam de uma API
        const predefinedTemplates: ReportTemplate[] = [
            {
                id: 'template-individual',
                name: 'Relatório Individual',
                description: 'Relatório detalhado do desempenho de um estudante específico',
                type: 'individual',
                sections: [
                    {
                        id: 'section-1',
                        title: 'Informações da Avaliação',
                        type: 'statistics',
                        config: { showDate: true, showScore: true }
                    },
                    {
                        id: 'section-2',
                        title: 'Desempenho por Questão',
                        type: 'questions',
                        config: { showDifficulty: true, showCategories: true }
                    },
                    {
                        id: 'section-3',
                        title: 'Comentários',
                        type: 'comments',
                        config: { editable: true }
                    }
                ]
            },
            {
                id: 'template-class',
                name: 'Relatório de Turma',
                description: 'Visão geral do desempenho de toda a turma na avaliação',
                type: 'class',
                sections: [
                    {
                        id: 'section-1',
                        title: 'Estatísticas Gerais',
                        type: 'statistics',
                        config: { showAverage: true, showMedian: true, showHighest: true, showLowest: true }
                    },
                    {
                        id: 'section-2',
                        title: 'Gráfico de Desempenho',
                        type: 'chart',
                        config: { chartType: 'bar', showLabels: true }
                    },
                    {
                        id: 'section-3',
                        title: 'Resultados Individuais',
                        type: 'scores',
                        config: { sortBy: 'score', order: 'desc' }
                    }
                ]
            },
            {
                id: 'template-questions',
                name: 'Análise de Questões',
                description: 'Análise detalhada das respostas para cada questão',
                type: 'question',
                sections: [
                    {
                        id: 'section-1',
                        title: 'Estatísticas por Questão',
                        type: 'statistics',
                        config: { showPercentCorrect: true, showAverageScore: true }
                    },
                    {
                        id: 'section-2',
                        title: 'Gráfico de Acertos',
                        type: 'chart',
                        config: { chartType: 'pie', showPercentage: true }
                    }
                ]
            },
            {
                id: 'template-summary',
                name: 'Resumo Executivo',
                description: 'Visão geral concisa dos principais resultados da avaliação',
                type: 'summary',
                sections: [
                    {
                        id: 'section-1',
                        title: 'Resumo da Avaliação',
                        type: 'statistics',
                        config: {
                            showAverage: true,
                            showPassRate: true,
                            showTotalStudents: true
                        }
                    },
                    {
                        id: 'section-2',
                        title: 'Análise por Categoria',
                        type: 'chart',
                        config: {
                            chartType: 'radar',
                            groupBy: 'category'
                        }
                    }
                ]
            }
        ];

        setTemplates(predefinedTemplates);
    }, []);

    const handleTemplateSelect = (templateId: string) => {
        setSelectedTemplate(templateId);

        // Encontra o template selecionado
        const template = templates.find(t => t.id === templateId);
        if (template) {
            setReportTitle(`${template.name} - ${new Date().toLocaleDateString()}`);
            setReportDescription(template.description);
            setCustomSections([...template.sections]);
        }
    };

    const handleAddSection = () => {
        const newSection: ReportSection = {
            id: `section-${Date.now()}`,
            title: 'Nova Seção',
            type: 'statistics',
            config: {}
        };

        setCustomSections([...customSections, newSection]);
    };

    const handleRemoveSection = (sectionId: string) => {
        setCustomSections(customSections.filter(section => section.id !== sectionId));
    };

    const handleSectionChange = (sectionId: string, field: string, value: any) => {
        setCustomSections(
            customSections.map(section =>
                section.id === sectionId
                    ? { ...section, [field]: value }
                    : section
            )
        );
    };

    const handleSectionConfigChange = (sectionId: string, configField: string, value: any) => {
        setCustomSections(
            customSections.map(section =>
                section.id === sectionId
                    ? {
                        ...section,
                        config: {
                            ...section.config,
                            [configField]: value
                        }
                    }
                    : section
            )
        );
    };

    const handleGenerateReport = async () => {
        setIsLoading(true);

        try {
            // Em um cenário real, aqui seriam feitas chamadas à API para buscar os dados necessários
            // Simulando dados para o preview
            const mockData: ReportData = {
                exam: {
                    id: examId || 'exam-1',
                    title: 'Avaliação Final - Matemática',
                    description: 'Avaliação abrangendo todos os conteúdos do semestre',
                    questions: ['q1', 'q2', 'q3', 'q4', 'q5'],
                    classIds: [classId || 'class-1'],
                    totalPoints: 100,
                    qrCode: 'data:image/png;base64,abcdef123456',
                    barCode: '123456789',
                    password: '123456',
                    createdAt: new Date(),
                    createdBy: 'teacher-1',
                    questionDistribution: [],
                    useQRCode: false,
                    useBarCode: false,
                    requirePassword: false,
                    variants: [],
                },
                results: [
                    {
                        id: 'result-1',
                        examId: examId || 'exam-1',
                        studentId: studentId || 'student-1',
                        answers: [
                            { questionId: 'q1', answer: 'Resposta 1', score: 20 },
                            { questionId: 'q2', answer: 'Resposta 2', score: 15 },
                            { questionId: 'q3', answer: 'Resposta 3', score: 18 },
                            { questionId: 'q4', answer: 'Resposta 4', score: 20 },
                            { questionId: 'q5', answer: 'Resposta 5', score: 10 },
                        ],
                        totalScore: 83,
                        completedAt: new Date()
                    },
                    // Mais resultados poderiam ser adicionados aqui em um cenário real
                ],
                questions: [
                    {
                        id: 'q1',
                        content: 'Qual é a fórmula para calcular a área de um círculo?',
                        difficulty: 'medium',
                        categories: ['geometria', 'fórmulas'],
                        createdBy: 'teacher-1',
                        createdAt: new Date(),
                        updatedAt: new Date()
                    },
                    // Mais questões poderiam ser adicionadas aqui em um cenário real
                ],
                students: [
                    {
                        id: 'student-1',
                        name: 'João Silva',
                        email: 'joao.silva@exemplo.com',
                        registrationNumber: '2023001'
                    },
                    // Mais estudantes poderiam ser adicionados aqui em um cenário real
                ]
            };

            // Gera o relatório com base nos dados e nas seções escolhidas
            const reportData = {
                title: reportTitle,
                description: reportDescription,
                generatedAt: new Date(),
                sections: customSections,
                data: mockData
            };

            // Atualiza o estado para mostrar o preview
            setPreviewData(reportData);
            setShowPreview(true);

            // Chama o callback onGenerate se fornecido
            if (onGenerate) {
                onGenerate(reportData);
            }
        } catch (error) {
            console.error('Erro ao gerar relatório:', error);
            // Aqui seria implementado um toast ou notificação para o usuário
        } finally {
            setIsLoading(false);
        }
    };

    const handleExportReport = () => {
        // Em um cenário real, aqui seria implementada a exportação para PDF ou outro formato
        alert('Exportação de relatório - Esta funcionalidade seria implementada com uma biblioteca de geração de PDF.');
    };

    const handleClosePreview = () => {
        setShowPreview(false);
    };

    // Renderização da seção de acordo com seu tipo
    const renderSectionPreview = (section: ReportSection, reportData: ReportData) => {
        switch (section.type) {
            case 'statistics':
                return (
                    <div className="statistics-section">
                        <h3>{section.title}</h3>
                        <Table>
                            <thead>
                                <tr>
                                    <TableHeader>Métrica</TableHeader>
                                    <TableHeader>Valor</TableHeader>
                                </tr>
                            </thead>
                            <tbody>
                                {section.config.showAverage && (
                                    <TableRow>
                                        <TableCell>Média da Turma</TableCell>
                                        <TableCell>83</TableCell>
                                    </TableRow>
                                )}
                                {section.config.showMedian && (
                                    <TableRow>
                                        <TableCell>Mediana</TableCell>
                                        <TableCell>85</TableCell>
                                    </TableRow>
                                )}
                                {section.config.showHighest && (
                                    <TableRow>
                                        <TableCell>Nota Mais Alta</TableCell>
                                        <TableCell>98</TableCell>
                                    </TableRow>
                                )}
                                {section.config.showLowest && (
                                    <TableRow>
                                        <TableCell>Nota Mais Baixa</TableCell>
                                        <TableCell>65</TableCell>
                                    </TableRow>
                                )}
                                {section.config.showPassRate && (
                                    <TableRow>
                                        <TableCell>Taxa de Aprovação</TableCell>
                                        <TableCell>85%</TableCell>
                                    </TableRow>
                                )}
                                {section.config.showTotalStudents && (
                                    <TableRow>
                                        <TableCell>Total de Estudantes</TableCell>
                                        <TableCell>25</TableCell>
                                    </TableRow>
                                )}
                            </tbody>
                        </Table>
                    </div>
                );

            case 'scores':
                return (
                    <div className="scores-section">
                        <h3>{section.title}</h3>
                        <Table>
                            <thead>
                                <tr>
                                    <TableHeader>Estudante</TableHeader>
                                    <TableHeader>Nota</TableHeader>
                                    <TableHeader>Percentual</TableHeader>
                                </tr>
                            </thead>
                            <tbody>
                                <TableRow>
                                    <TableCell>João Silva</TableCell>
                                    <TableCell>83</TableCell>
                                    <TableCell>83%</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Maria Santos</TableCell>
                                    <TableCell>92</TableCell>
                                    <TableCell>92%</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Pedro Oliveira</TableCell>
                                    <TableCell>78</TableCell>
                                    <TableCell>78%</TableCell>
                                </TableRow>
                            </tbody>
                        </Table>
                    </div>
                );

            case 'chart':
                return (
                    <div className="chart-section">
                        <h3>{section.title}</h3>
                        <div style={{
                            height: '300px',
                            backgroundColor: 'var(--color-background-third)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 'var(--border-radius-md)'
                        }}>
                            {section.config.chartType === 'bar' &&
                                <div>Gráfico de Barras - Distribuição de Notas</div>
                            }
                            {section.config.chartType === 'pie' &&
                                <div>Gráfico de Pizza - Distribuição de Acertos por Questão</div>
                            }
                            {section.config.chartType === 'radar' &&
                                <div>Gráfico Radar - Desempenho por Categoria de Conteúdo</div>
                            }
                        </div>
                        <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center', marginTop: 'var(--space-md)' }}>
                            (Visualização do gráfico seria renderizada com biblioteca de gráficos)
                        </p>
                    </div>
                );

            case 'questions':
                return (
                    <div className="questions-section">
                        <h3>{section.title}</h3>
                        <Table>
                            <thead>
                                <tr>
                                    <TableHeader>Questão</TableHeader>
                                    <TableHeader>Resposta</TableHeader>
                                    <TableHeader>Pontuação</TableHeader>
                                    {section.config.showDifficulty && <TableHeader>Dificuldade</TableHeader>}
                                    {section.config.showCategories && <TableHeader>Categorias</TableHeader>}
                                </tr>
                            </thead>
                            <tbody>
                                {reportData.results[0].answers.map((answer, index) => (
                                    <TableRow key={answer.questionId}>
                                        <TableCell>{`Questão ${index + 1}`}</TableCell>
                                        <TableCell>{answer.answer}</TableCell>
                                        <TableCell>{answer.score}</TableCell>
                                        {section.config.showDifficulty && (
                                            <TableCell>
                                                {index === 0 ? 'Média' : index === 1 ? 'Fácil' : index === 2 ? 'Difícil' : 'Média'}
                                            </TableCell>
                                        )}
                                        {section.config.showCategories && (
                                            <TableCell>
                                                {index === 0 ? 'Geometria, Fórmulas' :
                                                    index === 1 ? 'Álgebra' :
                                                        index === 2 ? 'Equações' :
                                                            index === 3 ? 'Funções' : 'Trigonometria'}
                                            </TableCell>
                                        )}
                                    </TableRow>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                );

            case 'comments':
                return (
                    <div className="comments-section">
                        <h3>{section.title}</h3>
                        {section.config.editable ? (
                            <TextArea
                                placeholder="Adicione comentários sobre o desempenho do aluno..."
                                disabled={!section.config.editable}
                            />
                        ) : (
                            <p>Comentários serão adicionados pelo professor.</p>
                        )}
                    </div>
                );

            default:
                return <p>Tipo de seção não suportado</p>;
        }
    };

    // UI para configurar uma seção específica
    const renderSectionConfig = (section: ReportSection) => {
        return (
            <SectionContainer key={section.id}>
                <div className="section-header">
                    <h3>
                        {section.type === 'statistics' && <FaChartBar />}
                        {section.type === 'chart' && <FaChartBar />}
                        {section.type === 'scores' && <FaListAlt />}
                        {section.type === 'questions' && <FaListAlt />}
                        {section.type === 'comments' && <FaUserGraduate />}
                        {section.title}
                    </h3>
                    <Button
                        variant="error"
                        onClick={() => handleRemoveSection(section.id)}
                    >
                        Remover
                    </Button>
                </div>

                <InputGroup>
                    <Label htmlFor={`section-title-${section.id}`}>Título da Seção</Label>
                    <input
                        id={`section-title-${section.id}`}
                        type="text"
                        value={section.title}
                        onChange={(e) => handleSectionChange(section.id, 'title', e.target.value)}
                    />
                </InputGroup>

                <InputGroup>
                    <Label htmlFor={`section-type-${section.id}`}>Tipo de Seção</Label>
                    <Select
                        id={`section-type-${section.id}`}
                        value={section.type}
                        onChange={(e) => handleSectionChange(section.id, 'type', e.target.value)}
                    >
                        <option value="statistics">Estatísticas</option>
                        <option value="chart">Gráfico</option>
                        <option value="scores">Notas</option>
                        <option value="questions">Questões</option>
                        <option value="comments">Comentários</option>
                    </Select>
                </InputGroup>

                {/* Configurações específicas para cada tipo de seção */}
                {section.type === 'statistics' && (
                    <div className="section-specific-config">
                        <h4>Métricas a exibir:</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={section.config.showAverage || false}
                                    onChange={(e) => handleSectionConfigChange(section.id, 'showAverage', e.target.checked)}
                                />
                                Média
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={section.config.showMedian || false}
                                    onChange={(e) => handleSectionConfigChange(section.id, 'showMedian', e.target.checked)}
                                />
                                Mediana
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={section.config.showHighest || false}
                                    onChange={(e) => handleSectionConfigChange(section.id, 'showHighest', e.target.checked)}
                                />
                                Nota Mais Alta
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={section.config.showLowest || false}
                                    onChange={(e) => handleSectionConfigChange(section.id, 'showLowest', e.target.checked)}
                                />
                                Nota Mais Baixa
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={section.config.showPassRate || false}
                                    onChange={(e) => handleSectionConfigChange(section.id, 'showPassRate', e.target.checked)}
                                />
                                Taxa de Aprovação
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={section.config.showTotalStudents || false}
                                    onChange={(e) => handleSectionConfigChange(section.id, 'showTotalStudents', e.target.checked)}
                                />
                                Total de Estudantes
                            </label>
                        </div>
                    </div>
                )}

                {section.type === 'chart' && (
                    <div className="section-specific-config">
                        <InputGroup>
                            <Label htmlFor={`chart-type-${section.id}`}>Tipo de Gráfico</Label>
                            <Select
                                id={`chart-type-${section.id}`}
                                value={section.config.chartType || 'bar'}
                                onChange={(e) => handleSectionConfigChange(section.id, 'chartType', e.target.value)}
                            >
                                <option value="bar">Barras</option>
                                <option value="pie">Pizza</option>
                                <option value="line">Linha</option>
                                <option value="radar">Radar</option>
                            </Select>
                        </InputGroup>
                    </div>
                )}

                {section.type === 'questions' && (
                    <div className="section-specific-config">
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={section.config.showDifficulty || false}
                                    onChange={(e) => handleSectionConfigChange(section.id, 'showDifficulty', e.target.checked)}
                                />
                                Mostrar Dificuldade
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={section.config.showCategories || false}
                                    onChange={(e) => handleSectionConfigChange(section.id, 'showCategories', e.target.checked)}
                                />
                                Mostrar Categorias
                            </label>
                        </div>
                    </div>
                )}

                {section.type === 'comments' && (
                    <div className="section-specific-config">
                        <label>
                            <input
                                type="checkbox"
                                checked={section.config.editable || false}
                                onChange={(e) => handleSectionConfigChange(section.id, 'editable', e.target.checked)}
                            />
                            Permitir edição de comentários no relatório
                        </label>
                    </div>
                )}
            </SectionContainer>
        );
    };

    // Preview Modal
    const renderPreviewModal = () => {
        if (!showPreview || !previewData) return null;

        return (
            <ModalContainer>
                <ModalContent>
                    <ModalHeader>
                        <h3>Prévia do Relatório</h3>
                        <CloseButton onClick={handleClosePreview}>
                            <FaTimes />
                        </CloseButton>
                    </ModalHeader>

                    <ModalBody>
                        <h1>{previewData.title}</h1>
                        <p>{previewData.description}</p>
                        <p>Gerado em: {previewData.generatedAt.toLocaleString()}</p>

                        <hr style={{ margin: '1rem 0' }} />

                        {previewData.sections.map((section: ReportSection) => (
                            <div key={section.id} style={{ marginBottom: '2rem' }}>
                                {renderSectionPreview(section, previewData.data)}
                            </div>
                        ))}
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="secondary" onClick={handleClosePreview}>Fechar</Button>
                        <ActionButton onClick={handleExportReport}>
                            <FaDownload />
                            Exportar PDF
                        </ActionButton>
                    </ModalFooter>
                </ModalContent>
            </ModalContainer>
        );
    };

    return (
        <ReportContainer>
            <h2>Gerador de Relatórios</h2>
            <TabsContainer>
                <Tab
                    active={activeTab === 'templates'}
                    onClick={() => setActiveTab('templates')}
                >
                    Templates Pré-definidos
                </Tab>
                <Tab
                    active={activeTab === 'custom'}
                    onClick={() => setActiveTab('custom')}
                >
                    Personalizado
                </Tab>
            </TabsContainer>

            {activeTab === 'templates' && (
                <>
                    <InfoMessage>
                        <FaInfoCircle />
                        <div>
                            Selecione um template pré-definido para começar. Você poderá personalizar as seções após a seleção.
                        </div>
                    </InfoMessage>

                    <TemplatesGrid>
                        {templates.map(template => (
                            <TemplateCard
                                key={template.id}
                                className={selectedTemplate === template.id ? 'selected' : ''}
                                onClick={() => handleTemplateSelect(template.id)}
                            >
                                <div className="card-header">
                                    {template.type === 'individual' && <FaUserGraduate />}
                                    {template.type === 'class' && <FaListAlt />}
                                    {template.type === 'question' && <FaFileAlt />}
                                    {template.type === 'summary' && <FaChartBar />}
                                    <h3>{template.name}</h3>
                                </div>
                                <div className="card-body">
                                    <p>{template.description}</p>
                                    <p>Seções: {template.sections.length}</p>
                                </div>
                            </TemplateCard>
                        ))}
                    </TemplatesGrid>

                    {selectedTemplate && (
                        <div className="template-sections">
                            <h3>Seções do Template</h3>
                            {customSections.map(section => renderSectionConfig(section))}

                            <Button onClick={handleAddSection}>+ Adicionar Seção</Button>
                        </div>
                    )}
                </>
            )}

            {activeTab === 'custom' && (
                <>
                    <InfoMessage>
                        <FaInfoCircle />
                        <div>
                            Crie um relatório personalizado adicionando as seções que desejar. Configure cada seção de acordo com suas necessidades.
                        </div>
                    </InfoMessage>

                    {customSections.length > 0 ? (
                        customSections.map(section => renderSectionConfig(section))
                    ) : (
                        <EmptyStateMessage>
                            <FaFileAlt style={{ fontSize: '2rem', marginBottom: 'var(--space-md)' }} />
                            <h3>Sem seções</h3>
                            <p>Adicione seções para construir seu relatório personalizado.</p>
                        </EmptyStateMessage>
                    )}

                    <Button onClick={handleAddSection}>+ Adicionar Seção</Button>
                </>
            )}
            <InputGroup>
                <Label htmlFor="report-title">Título do Relatório</Label>
                <input
                    id="report-title"
                    type="text"
                    value={reportTitle}
                    onChange={(e) => setReportTitle(e.target.value)}
                    placeholder="Digite o título do relatório"
                />
            </InputGroup>

            <InputGroup>
                <Label htmlFor="report-description">Descrição do Relatório</Label>
                <TextArea
                    id="report-description"
                    value={reportDescription}
                    onChange={(e) => setReportDescription(e.target.value)}
                    placeholder="Descreva o propósito deste relatório"
                />
            </InputGroup>

            <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 'var(--space-md)',
                marginTop: 'var(--space-xl)'
            }}>
                <Button variant="secondary">Cancelar</Button>
                <PrimaryActionButton
                    onClick={handleGenerateReport}
                    disabled={customSections.length === 0 || isLoading}
                >
                    {isLoading ? 'Gerando...' : 'Gerar Relatório'}
                </PrimaryActionButton>
            </div>

            {renderPreviewModal()}
        </ReportContainer>
    );
};

export default ReportGenerator;
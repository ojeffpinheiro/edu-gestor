import React, { useState } from 'react';
import { FaDownload, FaAngleDown, FaAngleUp, FaCheckSquare, FaSquare } from 'react-icons/fa';
import { 
  ModalContainer, 
  ModalContent, 
  CloseButton, 
  ActionButton, 
  Table, 
  TableHeader, 
  TableCell, 
  TableRow, 
  SectionContainer, 
  SectionHeader,
  StudentHeader, 
  ContactInfo,
  StatusBadge,
  CheckboxContainer,
  CheckboxLabel
} from './styles';

import { colorPalette } from '../../../styles/colors'
import { useExportData } from '../../../hooks/useExportData'
import { formatDate } from '../../../utils/dateFormatter'


/**
 * Tipos de status de frequência disponíveis
 */
type AttendanceStatus = 'Presente' | 'Ausente' | 'Justificada';

/**
 * Interface para representar um registro de frequência
 */
interface AttendanceRecord {
    date: string;
    status: AttendanceStatus;
}

/**
 * Interface para representar uma avaliação
 */
interface Assessment {
    instrument: string;
    grade: number;
}

/**
 * Interface para representar um estudante
 */
interface Student {
    name: string;
    email: string;
    assessments: Assessment[];
    attendance: AttendanceRecord[];
    comments: string;
}

/**
 * Propriedades do componente ModalAluno
 */
interface StudentModalProps {
    studentData?: Student; // Dados do aluno (opcional)
    isLoading?: boolean;   // Indicador de carregamento
    onClose: () => void;   // Callback para fechar o modal
    onExport?: (studentId: string, exportOptions: ExportOptions) => void; // Callback opcional para exportação
}

/**
 * Opções para exportação de relatório
 */
interface ExportOptions {
    includeGrades: boolean;
    includeAttendance: boolean;
    includeComments: boolean;
}

/**
 * Componente que exibe um badge com estilo baseado no status de presença
 */
const AttendanceStatusBadge: React.FC<{ status: AttendanceStatus }> = ({ status }) => {
    const getStatusColor = () => {
        switch (status) {
            case 'Presente':
                return colorPalette.feedback.success;
            case 'Ausente':
                return colorPalette.feedback.error;
            case 'Justificada':
                return colorPalette.feedback.warning;
            default:
                return colorPalette.gray[500];
        }
    };

    return <StatusBadge color={getStatusColor()}>{status}</StatusBadge>;
};

/**
 * Checkbox personalizado para selecionar opções de exportação
 */
const ReportCheckbox: React.FC<{
    checked: boolean;
    onChange: () => void;
    label: string;
}> = ({ checked, onChange, label }) => {
    return (
        <CheckboxContainer onClick={onChange}>
            {checked ? <FaCheckSquare /> : <FaSquare />}
            <CheckboxLabel>{label}</CheckboxLabel>
        </CheckboxContainer>
    );
};

/**
 * Seção colapsável para exibir diferentes tipos de dados
 */
const CollapsibleSection: React.FC<{
    title: string;
    initiallyExpanded?: boolean;
    sectionColor: string;
    includeInReport: boolean;
    onToggleInclude: () => void;
    children: React.ReactNode;
}> = ({ 
    title, 
    initiallyExpanded = false, 
    sectionColor,
    includeInReport,
    onToggleInclude,
    children 
}) => {
    const [isExpanded, setIsExpanded] = useState(initiallyExpanded);

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <SectionContainer backgroundColor={sectionColor}>
            <SectionHeader onClick={toggleExpanded}>
                {title} {isExpanded ? <FaAngleUp /> : <FaAngleDown />}
            </SectionHeader>
            
            <ReportCheckbox 
                checked={includeInReport} 
                onChange={onToggleInclude}
                label={`Incluir ${title.toLowerCase()} no relatório`}
            />
            
            {isExpanded && children}
        </SectionContainer>
    );
};

/**
 * Componente de tabela para notas do aluno
 */
const GradesTable: React.FC<{ assessments: Assessment[] }> = ({ assessments }) => {
    if (!assessments || assessments.length === 0) {
        return <p>Nenhuma avaliação registrada.</p>;
    }

    // Calcular média das notas
    const calculateAverage = (): number => {
        if (assessments.length === 0) return 0;
        const sum = assessments.reduce((acc, curr) => acc + curr.grade, 0);
        return sum / assessments.length;
    };

    return (
        <>
            <Table>
                <thead>
                    <tr>
                        <TableHeader>Instrumento</TableHeader>
                        <TableHeader>Nota</TableHeader>
                    </tr>
                </thead>
                <tbody>
                    {assessments.map((assessment, index) => (
                        <TableRow key={index}>
                            <TableCell>{assessment.instrument}</TableCell>
                            <TableCell>{assessment.grade.toFixed(1)}</TableCell>
                        </TableRow>
                    ))}
                </tbody>
            </Table>
            <p style={{ marginTop: 'var(--space-md)', fontWeight: 'bold' }}>
                Média: {calculateAverage().toFixed(1)}
            </p>
        </>
    );
};

/**
 * Componente de tabela para frequência do aluno
 */
const AttendanceTable: React.FC<{ attendance: AttendanceRecord[] }> = ({ attendance }) => {
    if (!attendance || attendance.length === 0) {
        return <p>Nenhum registro de frequência disponível.</p>;
    }

    return (
        <Table>
            <thead>
                <tr>
                    <TableHeader>Data</TableHeader>
                    <TableHeader>Status</TableHeader>
                </tr>
            </thead>
            <tbody>
                {attendance.map((record, index) => (
                    <TableRow key={index}>
                        <TableCell>{formatDate(record.date)}</TableCell>
                        <TableCell>
                            <AttendanceStatusBadge status={record.status} />
                        </TableCell>
                    </TableRow>
                ))}
            </tbody>
        </Table>
    );
};

/**
 * Componente principal que exibe os detalhes do aluno em um modal
 */
export const StudentModal: React.FC<StudentModalProps> = ({ 
    studentData, 
    isLoading = false,
    onClose,
    onExport 
}) => {
    // Dados mockados para quando studentData não é fornecido
    const mockStudent: Student = {
        name: 'Ana Souza',
        email: 'ana@exemplo.com',
        assessments: [
            { instrument: 'Prova Final', grade: 8.5 },
            { instrument: 'Trabalho', grade: 9 },
        ],
        attendance: [
            { date: '2025-03-01', status: 'Presente' },
            { date: '2025-03-02', status: 'Ausente' },
            { date: '2025-03-03', status: 'Justificada' },
        ],
        comments: 'Aluno muito participativo e dedicado. Demonstra bom domínio do conteúdo e colabora nas atividades em grupo. Precisa melhorar pontualidade na entrega de trabalhos.',
    };

    // Use os dados fornecidos ou os dados mockados
    const student = studentData || mockStudent;
    
    // Hook personalizado para exportação
    const { exportData, isExporting } = useExportData();

    // Estado para controlar opções de exportação
    const [exportOptions, setExportOptions] = useState<ExportOptions>({
        includeGrades: true,
        includeAttendance: true,
        includeComments: true
    });

    // Cores para cada seção (alternando)
    const sectionColors = {
        grades: 'var(--color-background-third)',
        attendance: 'var(--color-background-secondary)',
        comments: 'var(--color-background-third)'
    };

    // Alternar inclusão de seções no relatório
    const toggleIncludeGrades = () => {
        setExportOptions(prev => ({ ...prev, includeGrades: !prev.includeGrades }));
    };

    const toggleIncludeAttendance = () => {
        setExportOptions(prev => ({ ...prev, includeAttendance: !prev.includeAttendance }));
    };

    const toggleIncludeComments = () => {
        setExportOptions(prev => ({ ...prev, includeComments: !prev.includeComments }));
    };

    // Exportar dados do aluno
    const handleExport = () => {
        try {
            exportData(student, exportOptions);
            if (onExport) {
                onExport('student-id', exportOptions); // Em uma implementação real, usaríamos o ID real do aluno
            }
        } catch (error) {
            console.error('Erro ao exportar dados:', error);
            // Em uma aplicação real, mostraríamos uma notificação de erro ao usuário
        }
    };

    // Renderização condicional para estado de carregamento
    if (isLoading) {
        return (
            <ModalContainer>
                <ModalContent>
                    <CloseButton onClick={onClose} aria-label="Fechar">X</CloseButton>
                    <div style={{ textAlign: 'center', padding: '2rem' }}>
                        <p>Carregando informações do aluno...</p>
                        {/* Aqui poderíamos adicionar um spinner de carregamento */}
                    </div>
                </ModalContent>
            </ModalContainer>
        );
    }

    return (
        <ModalContainer>
            <ModalContent>
                <CloseButton onClick={onClose} aria-label="Fechar">X</CloseButton>
                
                <StudentHeader>
                    <h2>{student.name}</h2>
                    <ContactInfo>Email: {student.email}</ContactInfo>
                </StudentHeader>

                {/* Seção de Notas (Colapsável) */}
                <CollapsibleSection 
                    title="Notas" 
                    initiallyExpanded={true}
                    sectionColor={sectionColors.grades}
                    includeInReport={exportOptions.includeGrades}
                    onToggleInclude={toggleIncludeGrades}
                >
                    <GradesTable assessments={student.assessments} />
                </CollapsibleSection>

                {/* Seção de Frequência (Colapsável) */}
                <CollapsibleSection 
                    title="Frequência" 
                    initiallyExpanded={false}
                    sectionColor={sectionColors.attendance}
                    includeInReport={exportOptions.includeAttendance}
                    onToggleInclude={toggleIncludeAttendance}
                >
                    <AttendanceTable attendance={student.attendance} />
                </CollapsibleSection>

                {/* Seção de Observações (Colapsável) */}
                <CollapsibleSection 
                    title="Observações" 
                    initiallyExpanded={false}
                    sectionColor={sectionColors.comments}
                    includeInReport={exportOptions.includeComments}
                    onToggleInclude={toggleIncludeComments}
                >
                    <p>{student.comments || 'Nenhuma observação registrada.'}</p>
                </CollapsibleSection>

                {/* Botão Exportar */}
                <ActionButton 
                    onClick={handleExport} 
                    disabled={isExporting || (!exportOptions.includeGrades && !exportOptions.includeAttendance && !exportOptions.includeComments)}
                    aria-label="Exportar dados do aluno"
                >
                    <FaDownload /> {isExporting ? 'Exportando...' : 'Exportar'}
                </ActionButton>
            </ModalContent>
        </ModalContainer>
    );
};
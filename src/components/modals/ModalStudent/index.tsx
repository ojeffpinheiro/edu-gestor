import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { FaDownload, FaAngleDown, FaAngleUp, FaTimes } from 'react-icons/fa';

import { useExportData } from '../../../hooks/useExportData';
import { formatDate } from '../../../utils/dateFormatter';
import { useToast } from '../../../hooks/useToast';

import AttendanceStatusBadge from '../../ui/AttendanceStatusBadge';
import ReportCheckbox from '../../ui/ReportCheckbox';
import ErrorBoundary from '../../ui/ErrorBoundary';
import Spinner from '../../ui/Spinner';
import ConfirmationDialog from '../../ui/ConfirmationDialog';

import {
    Assessment,
    AttendanceRecord,
    CollapsibleProps,
    ExportOptions,
    StudentData,
    StudentModalProps
} from '../../../utils/types';

import {
    ModalContainer,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    CloseButton,
    Button,
    Table,
    TableHeader,
    TableCell,
    TableRow,
    SectionContainer,
    SectionHeader,
    EmptyStateMessage,
    AttendanceStatsContainer,
} from './styles';

// Configuration for different sections of the modal
const SECTION_CONFIG = {
    GRADES: {
        color: 'var(--color-background-third)',
        title: 'Notas',
        key: 'includeGrades',
        initiallyExpanded: true,
        emptyMessage: 'Nenhuma avaliação registrada para este aluno.'
    },
    ATTENDANCE: {
        color: 'var(--color-background-secondary)',
        title: 'Frequência',
        key: 'includeAttendance',
        initiallyExpanded: false,
        emptyMessage: 'Nenhum registro de frequência disponível para este aluno.'
    },
    COMMENTS: {
        color: 'var(--color-background-third)',
        title: 'Observações',
        key: 'includeComments',
        initiallyExpanded: false,
        emptyMessage: 'Nenhuma observação registrada para este aluno.'
    }
};

// Default student data for testing when no real data is available
const DEFAULT_STUDENT_DATA: StudentData = {
    id: 'default-123',
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

/**
 * Collapsible section component to display different types of student data
 */
const CollapsibleSection: React.FC<CollapsibleProps> = ({
    title,
    initiallyExpanded = false,
    sectionColor,
    includeInReport,
    onToggleInclude,
    children
}) => {
    const [isExpanded, setIsExpanded] = useState(initiallyExpanded);
    const sectionId = `content-${title.toLowerCase().replace(/\s+/g, '-')}`;

    const toggleExpanded = useCallback(() => {
        setIsExpanded(prevExpanded => !prevExpanded);
    }, []);

    const handleKeyboardToggle = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            toggleExpanded();
            e.preventDefault();
        }
    }, [toggleExpanded]);

    return (
        <SectionContainer
            backgroundColor={sectionColor}
            data-testid={`section-${title.toLowerCase().replace(/\s+/g, '-')}`}
        >
            <SectionHeader
                onClick={toggleExpanded}
                aria-expanded={isExpanded}
                tabIndex={0}
                role="button"
                aria-controls={sectionId}
                onKeyDown={handleKeyboardToggle}
            >
                {title} {isExpanded ? <FaAngleUp aria-hidden="true" /> : <FaAngleDown aria-hidden="true" />}
            </SectionHeader>

            <ReportCheckbox
                checked={includeInReport}
                onChange={onToggleInclude}
                label={`Incluir ${title.toLowerCase()} no relatório`}
            />

            {isExpanded && (
                <div id={sectionId}>
                    {children}
                </div>
            )}
        </SectionContainer>
    );
};

/**
 * Calculates the average grade from a list of assessments
 * @param assessments List of assessments with grades
 * @returns Average grade or 0 if no valid grades exist
 */
const calculateAverageGrade = (assessments: Assessment[]): number => {
    if (!assessments || assessments.length === 0) return 0;

    // Filter invalid values before calculating
    const validGrades = assessments.filter(assessment =>
        typeof assessment.grade === 'number' && !isNaN(assessment.grade)
    );

    if (validGrades.length === 0) return 0;

    const sum = validGrades.reduce((total, current) => total + current.grade, 0);
    return parseFloat((sum / validGrades.length).toFixed(1));
};

/**
 * Determines the CSS class based on the grade for visual feedback
 * @param grade Grade to evaluate
 * @returns CSS class name
 */
const getGradeColorClass = (grade: number): string => {
    if (grade >= 7) return "grade-good";
    if (grade >= 5) return "grade-average";
    return "grade-low";
};

/**
 * Component to display student grades
 */
const GradesTable: React.FC<{ assessments: Assessment[] }> = ({ assessments }) => {
    if (!assessments || assessments.length === 0) {
        return <EmptyStateMessage>{SECTION_CONFIG.GRADES.emptyMessage}</EmptyStateMessage>;
    }

    const averageGrade = calculateAverageGrade(assessments);
    const averageGradeClass = getGradeColorClass(averageGrade);

    return (
        <>
            <Table aria-label="Tabela de notas">
                <thead>
                    <tr>
                        <TableHeader scope="col">Instrumento</TableHeader>
                        <TableHeader scope="col">Nota</TableHeader>
                    </tr>
                </thead>
                <tbody>
                    {assessments.map((assessment, index) => (
                        <TableRow key={`grade-${index}`}>
                            <TableCell>{assessment.instrument}</TableCell>
                            <TableCell
                                className={getGradeColorClass(assessment.grade)}
                                data-testid={`grade-value-${index}`}
                            >
                                {assessment.grade.toFixed(1)}
                            </TableCell>
                        </TableRow>
                    ))}
                </tbody>
            </Table>
            <p className={`average-grade ${averageGradeClass}`} data-testid="average-grade">
                Média: {averageGrade.toFixed(1)}
            </p>
        </>
    );
};

/**
 * Calculates attendance statistics for visual feedback
 * @param attendance List of attendance records
 * @returns Object with attendance statistics
 */
const calculateAttendanceStats = (attendance: AttendanceRecord[] = []) => {
    const total = attendance.length;

    if (total === 0) {
        return {
            presentPercentage: '0.0',
            absentPercentage: '0.0',
            justifiedPercentage: '0.0',
            totalClasses: 0,
            present: 0,
            absent: 0,
            justified: 0
        };
    }

    const present = attendance.filter(record => record.status === 'Presente').length;
    const absent = attendance.filter(record => record.status === 'Ausente').length;
    const justified = attendance.filter(record => record.status === 'Justificada').length;

    return {
        presentPercentage: (present / total * 100).toFixed(1),
        absentPercentage: (absent / total * 100).toFixed(1),
        justifiedPercentage: (justified / total * 100).toFixed(1),
        totalClasses: total,
        present,
        absent,
        justified
    };
};

/**
 * Component to display student attendance records
 */
const AttendanceTable: React.FC<{ attendance: AttendanceRecord[] }> = ({ attendance }) => {
    if (!attendance || attendance.length === 0) {
        return <EmptyStateMessage>{SECTION_CONFIG.ATTENDANCE.emptyMessage}</EmptyStateMessage>;
    }

    const stats = calculateAttendanceStats(attendance);

    return (
        <>
            <Table aria-label="Tabela de frequência">
                <thead>
                    <tr>
                        <TableHeader scope="col">Data</TableHeader>
                        <TableHeader scope="col">Status</TableHeader>
                    </tr>
                </thead>
                <tbody>
                    {attendance.map((record, index) => (
                        <TableRow key={`attendance-${index}`}>
                            <TableCell>{formatDate(record.date)}</TableCell>
                            <TableCell>
                                <AttendanceStatusBadge status={record.status} />
                            </TableCell>
                        </TableRow>
                    ))}
                </tbody>
            </Table>

            <AttendanceStatsContainer aria-label="Estatísticas de frequência">
                <p>Total de aulas: <strong>{stats.totalClasses}</strong></p>
                <p>Presença: <strong>{stats.presentPercentage}%</strong></p>
                <p>Ausência: <strong>{stats.absentPercentage}%</strong></p>
                <p>Justificadas: <strong>{stats.justifiedPercentage}%</strong></p>
            </AttendanceStatsContainer>
        </>
    );
};

/**
 * Component to display comments about the student
 */
const CommentsSection: React.FC<{ comments: string }> = ({ comments }) => {
    if (!comments || comments.trim() === '') {
        return <EmptyStateMessage>{SECTION_CONFIG.COMMENTS.emptyMessage}</EmptyStateMessage>;
    }

    return (
        <div className="comments-container">
            <p className="student-comments">{comments}</p>
        </div>
    );
};

/**
 * Main StudentModal component
 * Displays detailed student information with export options
 */
const StudentModal: React.FC<StudentModalProps> = ({
    studentData,
    isLoading = false,
    onClose,
    onExport
}) => {
    // Hooks for user feedback and data export
    const { showToast } = useToast();
    const { exportData, isExporting } = useExportData();
    const modalRef = useRef<HTMLDivElement>(null);

    // Use default data only when necessary
    const [student, setStudent] = useState<StudentData>(studentData || DEFAULT_STUDENT_DATA);

    // Update student data when prop changes
    useEffect(() => {
        if (studentData) {
            setStudent(studentData);
        }
    }, [studentData]);
    
    // State for exit confirmation during export
    const [showExitConfirmation, setShowExitConfirmation] = useState(false);

    // State to control export options
    const [exportOptions, setExportOptions] = useState<ExportOptions>({
        includeGrades: true,
        includeAttendance: true,
        includeComments: true
    });

    // Handler for clicking outside the modal
    const handleOutsideClick = useCallback((event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            handleCloseRequest();
        }
    }, []);

    // Add event listener for outside clicks
    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [handleOutsideClick]);

    // Toggle handlers for export options using a factory function approach
    const toggleExportOption = useCallback((optionKey: keyof ExportOptions) => {
        return () => {
            setExportOptions(prevOptions => ({
                ...prevOptions,
                [optionKey]: !prevOptions[optionKey]
            }));
        };
    }, []);

    // Individual toggle handlers
    const toggleIncludeGrades = useCallback(() => toggleExportOption('includeGrades')(), [toggleExportOption]);
    const toggleIncludeAttendance = useCallback(() => toggleExportOption('includeAttendance')(), [toggleExportOption]);
    const toggleIncludeComments = useCallback(() => toggleExportOption('includeComments')(), [toggleExportOption]);

    // Calculate if any section is selected for export
    const hasSelectedSections = useMemo(() =>
        exportOptions.includeGrades ||
        exportOptions.includeAttendance ||
        exportOptions.includeComments,
        [exportOptions]);

    /**
     * Handles exporting student data with error handling
     */
    const handleExport = useCallback(async () => {
        // Verify at least one section is selected for export
        if (!hasSelectedSections) {
            showToast('Selecione pelo menos uma seção para exportar', 'warning');
            return;
        }

        try {
            await exportData(student, exportOptions);

            if (onExport) {
                onExport(student.id, exportOptions);
            }

            showToast('Dados exportados com sucesso!', 'success');
        } catch (error) {
            console.error('Erro ao exportar dados:', error);
            showToast('Falha ao exportar dados. Tente novamente.', 'error');
        }
    }, [student, exportOptions, exportData, onExport, showToast, hasSelectedSections]);

    /**
     * Handles close request during export
     */
    const handleCloseRequest = useCallback(() => {
        if (isExporting) {
            setShowExitConfirmation(true);
        } else {
            onClose();
        }
    }, [isExporting, onClose]);

    /**
     * Confirms modal exit
     */
    const handleConfirmExit = useCallback(() => {
        setShowExitConfirmation(false);
        onClose();
    }, [onClose]);

    /**
     * Cancels exit confirmation dialog
     */
    const handleCancelExit = useCallback(() => {
        setShowExitConfirmation(false);
    }, []);

    /**
     * Handles keyboard events for modal actions
     */
    const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
        if (event.key === 'Escape') {
            handleCloseRequest();
        }
    }, [handleCloseRequest]);

    // Loading state display
    if (isLoading) {
        return (
            <ModalContainer role="dialog" aria-modal="true" aria-labelledby="loading-title">
                <ModalContent>
                    <CloseButton onClick={onClose} aria-label="Fechar modal">X</CloseButton>
                    <div className="loading-container">
                        <h2 id="loading-title">Carregando informações do aluno</h2>
                        <Spinner size="medium" />
                        <p>Por favor, aguarde enquanto carregamos os dados...</p>
                    </div>
                </ModalContent>
            </ModalContainer>
        );
    }

    return (
        <ModalContainer
            role="dialog"
            aria-modal="true"
            aria-labelledby="student-name"
            onKeyDown={handleKeyDown}
        >
            <ModalContent ref={modalRef}>
                <ModalHeader>
                    <h3 id="student-name">{student.name}</h3>
                    <CloseButton
                        onClick={handleCloseRequest}
                        aria-label="Fechar modal"
                        title="Fechar"
                        data-testid="close-modal-btn"
                    >
                        <FaTimes />
                    </CloseButton>
                </ModalHeader>

                {showExitConfirmation && (
                    <ConfirmationDialog
                        title="Exportação em andamento"
                        message="Há uma exportação em andamento. Tem certeza que deseja sair?"
                        confirmText="Sim, sair"
                        cancelText="Não, continuar"
                        onConfirm={handleConfirmExit}
                        onCancel={handleCancelExit}
                    />
                )}

                <ErrorBoundary fallback={
                    <div className="error-container">
                        <h3>Erro ao carregar dados</h3>
                        <p>Ocorreu um problema ao carregar os dados do aluno.</p>
                        <Button variant="primary" onClick={onClose}>Fechar</Button>
                    </div>
                }>
                    <ModalBody>
                        <div className="contact-info">
                            <p>Email: {student.email || 'Não informado'}</p>
                        </div>

                        {/* Grades Section */}
                        <CollapsibleSection
                            title={SECTION_CONFIG.GRADES.title}
                            initiallyExpanded={SECTION_CONFIG.GRADES.initiallyExpanded}
                            sectionColor={SECTION_CONFIG.GRADES.color}
                            includeInReport={exportOptions.includeGrades}
                            onToggleInclude={toggleIncludeGrades}
                        >
                            <GradesTable assessments={student.assessments} />
                        </CollapsibleSection>

                        {/* Attendance Section */}
                        <CollapsibleSection
                            title={SECTION_CONFIG.ATTENDANCE.title}
                            initiallyExpanded={SECTION_CONFIG.ATTENDANCE.initiallyExpanded}
                            sectionColor={SECTION_CONFIG.ATTENDANCE.color}
                            includeInReport={exportOptions.includeAttendance}
                            onToggleInclude={toggleIncludeAttendance}
                        >
                            <AttendanceTable attendance={student.attendance} />
                        </CollapsibleSection>

                        {/* Comments Section */}
                        <CollapsibleSection
                            title={SECTION_CONFIG.COMMENTS.title}
                            initiallyExpanded={SECTION_CONFIG.COMMENTS.initiallyExpanded}
                            sectionColor={SECTION_CONFIG.COMMENTS.color}
                            includeInReport={exportOptions.includeComments}
                            onToggleInclude={toggleIncludeComments}
                        >
                            <CommentsSection comments={student.comments} />
                        </CollapsibleSection>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            variant="primary"
                            onClick={handleExport}
                            disabled={isExporting || !hasSelectedSections}
                            aria-label={isExporting ? 'Exportando dados do aluno' : 'Exportar dados do aluno'}
                            aria-busy={isExporting}
                            data-testid="export-button"
                        >
                            {isExporting ? (
                                <>
                                    <span className="loading-indicator"></span>
                                    Exportando...
                                </>
                            ) : (
                                <>
                                    <FaDownload aria-hidden="true" />
                                    Exportar
                                </>
                            )}
                        </Button>
                        {!hasSelectedSections && (
                            <p className="export-hint">Selecione ao menos uma seção para exportar</p>
                        )}
                    </ModalFooter>
                </ErrorBoundary>
            </ModalContent>
        </ModalContainer>
    );
};

export default StudentModal;
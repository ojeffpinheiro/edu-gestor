import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';

import { useExportData } from '../../../hooks/useExportData';
import { useToast } from '../../../hooks/useToast';

import Spinner from '../../ui/Spinner';
import ConfirmationDialog from '../../ui/ConfirmationDialog';
import CollapsibleSection from '../../ui/CollapsibleSection';

import { Table, TableHeader, TableRow, TableCell, EmptyStateMessage } from '../../../styles/table'
import { Button, CloseButton } from '../../../styles/buttons'

import { DEFAULT_STUDENT_DATA, SECTION_CONFIG } from '../../../utils/setting'

import AttendanceTable from '../../ui/AttendanceTable';
import { ErrorBoundary } from '../../shared/ErrorBoundary';
import { Assessment } from '../../../types/evaluation/AssessmentEvaluation';
import { StudentModalProps } from '../../../types/ui/UIComponent';
import { StudentData } from '../../../utils/types/BasicUser';
import { ExportOptions } from '../../../types/shared/ExportReport';
import { ModalBody, ModalContainer, ModalContent } from '../../../styles/modals';
import Modal from '../Modal';

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

    // Handler for clicking outside the modal
    const handleOutsideClick = useCallback((event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            handleCloseRequest();
        }
    }, [handleCloseRequest]);

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
                <ModalContent size='lg' >
                    <CloseButton onClick={onClose} aria-label="Fechar modal">
                        <FaTimes />
                    </CloseButton>
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
        <Modal
            isOpen
            title={student.name}
            size='lg'
            submitText={isExporting ? 'Exportando dados do aluno' : 'Exportar dados do aluno'}
            onSubmit={handleExport}
            onClose={handleCloseRequest} >
            <ModalContainer
                role="dialog"
                aria-modal="true"
                aria-labelledby="student-name"
                onKeyDown={handleKeyDown}
            >
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
                </ErrorBoundary>
            </ModalContainer>
        </Modal>
    );
};

export default StudentModal;
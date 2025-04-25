import React, { useState } from 'react';

import { StudentAttendance } from '../../../utils/types/BasicUser';
import { Event } from '../../../utils/types/Event';
import { eventInital } from '../../../mocks/planner';

import { useStudents, StudentFormData } from '../../../hooks/useStudent';

import ActionsContainer from '../../../components/Team/ActionsContainer';
import StudentTable from '../../../components/StudentTable';

import StudentModal from '../../../components/modals/ModalStudent';
import GroupDrawModal from '../../../components/modals/GroupDrawModal';
import StudentFormModal from '../../../components/modals/StudentFormModal';
import StudentDrawModal from '../../../components/modals/StudentDrawModal';
import CalendarModal from '../../../components/modals/CalendarModal';

import { PageContainer, Title } from './styles';
import Notification from '../../../components/shared/Notification';
import ConfirmDialog from '../../../components/shared/ConfirmDialog';

const TeamManagement: React.FC = () => {
    const {
        studentList,
        setFormData,
        handleSaveStudent,
        handleDelStudent,
        validateForm
    } = useStudents();

    // Modal visibility states
    const [showModalStudent, setShowModalStudent] = useState<boolean>(false);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [showSortGroupModal, setShowSortGroupModal] = useState<boolean>(false);
    const [showCalendarioModal, setShowCalendarioModal] = useState<boolean>(false);
    const [showStudentDrawModal, setShowStudentDrawModal] = useState<boolean>(false);

    // Calendar states
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [activeTab, setActiveTab] = useState<string>('todos');

    // Drawn student state
    const [drawnStudent, setDrawnStudent] = useState<StudentAttendance | null>(null);

    const [currentClass] = useState("3º Ano - Turma A");

    // Notification and confirmation dialog states
    const [notification, setNotification] = useState<{ show: boolean; message: string; type: string }>({
        show: false,
        message: '',
        type: 'info'
    });
    const [confirmDialog, setConfirmDialog] = useState<{
        show: boolean;
        title: string;
        message: string;
        confirmLabel: string;
        cancelLabel: string;
        onConfirm: () => void;
        type: 'danger' | 'warning' | 'info';
    }>({
        show: false,
        title: '',
        message: '',
        confirmLabel: 'Confirmar',
        cancelLabel: 'Cancelar',
        onConfirm: () => { },
        type: 'warning'
    });

    // Eventos de exemplo para o calendário
    const events: Event[] = eventInital;

    // Show notification helper function
    const showNotification = (message: string, type: string = 'info', duration: number = 3000) => {
        setNotification({ show: true, message, type });
        setTimeout(() => {
            setNotification(prev => ({ ...prev, show: false }));
        }, duration);
    };

    // Close notification handler
    const handleCloseNotification = () => {
        setNotification(prev => ({ ...prev, show: false }));
    };

    // Fixed student handling functions with proper integration
    const handleStudentAdd = () => {
        try {
            const validation = validateForm();
            if (!validation.isValid) {
                showNotification('Verifique os campos obrigatórios', 'error');
                return false;
            }
            
            // Now properly call handleSaveStudent() which actually adds the student
            handleSaveStudent();
            setShowForm(false);
            showNotification('Aluno adicionado com sucesso!', 'success');
            return true;
        } catch (error) {
            console.error('Erro ao adicionar aluno:', error);
            showNotification('Erro ao adicionar aluno. Tente novamente.', 'error');
            return false;
        }
    };

    // Fixed to properly handle student edit
    const handleStudentEdit = (studentData: StudentFormData) => {
        try {
            // Set the form data with the student to edit
            setFormData(studentData);
            setShowForm(true);
        } catch (error) {
            console.error('Erro ao editar aluno:', error);
            showNotification('Erro ao carregar dados do aluno. Tente novamente.', 'error');
        }
    };

    // Modified to take a student ID as parameter to match StudentTable's expected onDelete function signature
    const confirmDeleteStudent = (id: number) => {
        // Find the student in the list by id
        const student = studentList.find(s => s.id === id);

        if (!student) {
            showNotification('Aluno não encontrado', 'error');
            return;
        }

        setConfirmDialog({
            show: true,
            title: 'Confirmar exclusão',
            message: `Tem certeza que deseja excluir o aluno ${student.name}?`,
            confirmLabel: 'Excluir',
            cancelLabel: 'Cancelar',
            onConfirm: () => {
                try {
                    if (student.id !== undefined) {
                        handleDelStudent(student.id);
                    }
                    showNotification('Aluno excluído com sucesso!', 'success');
                } catch (error) {
                    console.error('Erro ao excluir aluno:', error);
                    showNotification('Erro ao excluir aluno. Tente novamente.', 'error');
                }
                setConfirmDialog(prev => ({ ...prev, show: false }));
            },
            type: 'danger'
        });
    };

    // Student draw functions with error handling
    const handleShowStudentDraw = () => {
        try {
            if (studentList.length === 0) {
                showNotification('Não há alunos para sortear', 'warning');
                return;
            }

            setShowStudentDrawModal(true);
            handleSortGroups();
        } catch (error) {
            console.error('Erro ao sortear aluno:', error);
            showNotification('Erro ao sortear aluno. Tente novamente.', 'error');
        }
    };

    const handleSortGroups = () => {
        try {
            if (studentList.length > 0) {
                const randomIndex = Math.floor(Math.random() * studentList.length);
                const selectedStudent = studentList[randomIndex];
                if (selectedStudent.id !== undefined) {
                    setDrawnStudent({
                        ...selectedStudent,
                        id: selectedStudent.id
                    } as StudentAttendance);
                }
            } else {
                showNotification('Não há alunos para sortear', 'warning');
            }
        } catch (error) {
            console.error('Erro ao sortear grupos:', error);
            showNotification('Erro ao sortear grupos. Tente novamente.', 'error');
        }
    };

    // Modal operation functions
    const handleOpenAddStudentForm = () => {
        // Reset form data for new student
        setFormData({
            name: "",
            email: "",
            attendance: 0,
            birthDate: "",
            className: currentClass,
            rollNumber: 0,
            status: "Ativo",
            gender: ""
        });
        setShowForm(true);
    };

    const handleCloseStudentForm = () => {
        setShowForm(false);
    };

    const handleCloseSortGroupModal = () => setShowModalStudent(false);

    const handleCloseStudentDraw = () => {
        setShowStudentDrawModal(false);
        setDrawnStudent(null);
    };

    const handleOpenSortGroupModal = () => {
        if (studentList.length < 2) {
            showNotification('São necessários pelo menos 2 alunos para formar grupos', 'warning');
            return;
        }
        setShowSortGroupModal(true);
    };

    const handleCloseSorteioGrupoModal = () => {
        setShowSortGroupModal(false);
    };

    const handleShowCalendario = () => {
        setShowCalendarioModal(true);
    };

    const handleCloseCalendarioModal = () => {
        setShowCalendarioModal(false);
    };

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
    };

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <>
            <PageContainer>
                <Title>Gerenciamento de Alunos</Title>

                <ActionsContainer
                    onAddStudent={handleOpenAddStudentForm}
                    onSortGroups={handleOpenSortGroupModal}
                    onSortStudent={handleShowStudentDraw}
                    onShowCalendar={handleShowCalendario}
                />

                <StudentTable
                    students={studentList.filter((student): student is StudentAttendance => 
                        typeof student.id === 'number'
                    )}
                    onEdit={handleStudentEdit}
                    onDelete={confirmDeleteStudent}
                />
            </PageContainer>

            {/* Modals */}
            {showForm && (
                <StudentFormModal 
                    defaultClass={currentClass}
                    onSave={handleStudentAdd} 
                    onClose={handleCloseStudentForm} 
                />
            )}

            {showModalStudent && <StudentModal onClose={handleCloseSortGroupModal} />}

            {showSortGroupModal && (
                <GroupDrawModal
                    students={studentList.filter((student): student is StudentAttendance => 
                        typeof student.id === 'number'
                    )}
                    onClose={handleCloseSorteioGrupoModal}
                />
            )}

            {showStudentDrawModal && (
                <StudentDrawModal
                    students={studentList.filter((student): student is StudentAttendance => 
                        typeof student.id === 'number'
                    )}
                    onClose={handleCloseStudentDraw}
                    onDraw={handleSortGroups}
                    drawnStudent={drawnStudent}
                />
            )}

            {showCalendarioModal && (
                <CalendarModal
                    events={events}
                    onClose={handleCloseCalendarioModal}
                    selectedDate={selectedDate}
                    onSelectDate={handleDateSelect}
                    activeTab={activeTab}
                    onTabChange={handleTabChange}
                />
            )}

            {/* Notification component */}
            {notification.show && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={handleCloseNotification}
                />
            )}

            {/* Confirmation dialog component */}
            {confirmDialog.show && (
                <ConfirmDialog
                    title={confirmDialog.title}
                    message={confirmDialog.message}
                    confirmLabel={confirmDialog.confirmLabel}
                    cancelLabel={confirmDialog.cancelLabel}
                    onConfirm={confirmDialog.onConfirm}
                    onCancel={() => setConfirmDialog(prev => ({ ...prev, show: false }))}
                    type={confirmDialog.type}
                />
            )}
        </>
    );
};

export default TeamManagement;
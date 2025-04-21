import React, { useState } from 'react';

import { useStudents } from '../../../hooks/useStudent';
import { drawStudent } from '../../../hooks/useRandomSelection';

import ActionsContainer from '../../../components/Team/ActionsContainer';
import StudentTable from '../../../components/StudentTable';

import StudentModal from '../../../components/modals/ModalStudent';
import GroupDrawModal from '../../../components/modals/GroupDrawModal';
import StudentFormModal from '../../../components/modals/StudentFormModal';
import StudentDrawModal from '../../../components/modals/StudentDrawModal';
import CalendarModal from '../../../components/modals/CalendarModal';

import {
    PageContainer,
    Title
} from './styles';
import { StudentAttendance } from '../../../utils/types/BasicUser';
import { Event } from '../../../utils/types/Event';
import { eventInital } from '../../../mocks/planner';

const TeamManagement: React.FC = () => {
    const { studentList, formData, handleAddStudent, handleEditStudent, handleDelStudent, handleInputChange } = useStudents();

    const [showModalStudent, setShowModalStudent] = useState<boolean>(true);
    const [showForm, setShowForm] = useState<boolean>(false);

    const [showSortGroupModal, setShowSortGroupModal] = useState<boolean>(false);
    const [showCalendarioModal, setShowCalendarioModal] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [activeTab, setActiveTab] = useState<string>('todos');
    const [showStudentDrawModal, setShowStudentDrawModal] = useState<boolean>(false);

    // Estado para aluno sorteado
    const [drawnStudent, setDrawnStudent] = useState<StudentAttendance | null>(null);

    // Eventos de exemplo para o calendário
    const events: Event[] = eventInital;

    // Funções para modais existentes
    const handleCloseSortGroupModal = () => setShowModalStudent(false);
    // Abrir/Fechar modais
    const handleShowStudentDraw = () => {
        setShowStudentDrawModal(true);
        drawStudent(studentList)
        handleSortGroups();
    };

    const handleCloseStudentDraw = () => {
        setShowStudentDrawModal(false);
        setDrawnStudent(null);
    };

    // Função de sorteio de aluno
    const handleSortGroups = () => {
        if (studentList.length > 0) {
            const randomIndex = Math.floor(Math.random() * studentList.length);
            setDrawnStudent(studentList[randomIndex]);
        }
    };

    const handleCancel = () => {
        setShowForm(false);
    };

    // Funções para os novos recursos
    const handleOpenSortGroupModal = () => {
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
                    onAddStudent={handleAddStudent}
                    onSortGroups={handleOpenSortGroupModal}
                    onSortStudent={handleShowStudentDraw}
                    onShowCalendar={handleShowCalendario} />

                <StudentTable students={studentList}
                    onEdit={handleEditStudent} onDelete={handleDelStudent} />

            </PageContainer>

            {showForm && (
                <StudentFormModal
                    studentData={formData}
                    onInputChange={handleInputChange}
                    onSave={handleAddStudent}
                    onClose={handleCancel} />)}

            {showModalStudent && <StudentModal onClose={handleCloseSortGroupModal} />}

            {/* Modal de Sorteio de Grupos */}
            {showSortGroupModal && (
                <GroupDrawModal students={studentList} onClose={handleCloseSorteioGrupoModal} />
            )}

            {showStudentDrawModal && (
                <StudentDrawModal
                    students={studentList}
                    onClose={handleCloseStudentDraw}
                    onDraw={handleSortGroups}
                    drawnStudent={drawnStudent}
                />
            )}

            {/* Modal de Calendário */}
            {showCalendarioModal && (
                <CalendarModal events={events} onClose={handleCloseCalendarioModal} selectedDate={selectedDate} onSelectDate={handleDateSelect} activeTab={activeTab} onTabChange={handleTabChange} />
            )}
        </>
    );
};

export default TeamManagement;
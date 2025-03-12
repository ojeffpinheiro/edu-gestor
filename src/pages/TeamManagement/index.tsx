import React, { useState } from 'react';

import { Event, Student, StudentAttendance } from '../../utils/types';

import ActionsContainer from '../../components/ActionsContainer';
import StudentTable from '../../components/StudentTable';

import StudentModal from '../../components/modals/ModalStudent';
import GroupDrawModal from '../../components/modals/GroupDrawModal';
import StudentFormModal from '../../components/modals/StudentFormModal';
import StudentDrawModal from '../../components/modals/StudentDrawModal';
import CalendarModal from '../../components/modals/CalendarModal';

import {
    PageContainer,
    Title
} from './styles';

const TeamManagement: React.FC = () => {
    const [students, setStudents] = useState<StudentAttendance[]>([
        { id: 1, name: 'Ana Souza', email: 'ana@exemplo.com', attendance: 90 },
        { id: 2, name: 'Carlos Oliveira', email: 'carlos@exemplo.com', attendance: 85 },
        { id: 3, name: 'Fernanda Lima', email: 'fernanda@exemplo.com', attendance: 95 },
    ]);
    const [showModalStudent, setShowModalStudent] = useState<boolean>(true);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [editedStudent, setEditedStudent] = useState<Student | null>(null);
    const [formData, setFormData] = useState<Omit<Student, 'id'>>({ name: '', email: '' });

    const [showSorteioGrupoModal, setShowSorteioGrupoModal] = useState<boolean>(false);
    const [showCalendarioModal, setShowCalendarioModal] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [activeTab, setActiveTab] = useState<string>('todos');
    const [showStudentDrawModal, setShowStudentDrawModal] = useState<boolean>(false);

    // Estado para aluno sorteado
    const [drawnStudent, setDrawnStudent] = useState<Student | null>(null);

    // Eventos de exemplo para o calendário
    const [events, setEvents] = useState<Event[]>([
        {
            id: 1,
            title: 'Prova Bimestral',
            date: new Date(new Date().getFullYear(), new Date().getMonth(), 15),
            type: 'assessment',
            description: 'Avaliação de conteúdos do bimestre'
        },
        {
            id: 2,
            title: 'Entrega de Trabalho',
            date: new Date(new Date().getFullYear(), new Date().getMonth(), 22),
            type: 'activity',
            description: 'Entrega do trabalho em grupo sobre o tema estudado'
        },
        {
            id: 3,
            title: 'Feira de Ciências',
            date: new Date(new Date().getFullYear(), new Date().getMonth(), 28),
            type: 'event',
            description: 'Apresentação dos projetos na feira de ciências'
        }
    ]);

    // Funções para modais existentes
    const handleCloseModalStudent = () => setShowModalStudent(false);
    // Abrir/Fechar modais
    const handleShowStudentDraw = () => {
        setShowStudentDrawModal(true);
        realizarSorteioAluno();
    };
    const handleCloseStudentDraw = () => {
        setShowStudentDrawModal(false);
        setDrawnStudent(null);
    };

    // Função de sorteio de aluno
    const realizarSorteioAluno = () => {
        if (students.length > 0) {
            const indiceAleatorio = Math.floor(Math.random() * students.length);
            setDrawnStudent(students[indiceAleatorio]);
        }
    };

    const handleAdicionarAluno = () => {
        setEditedStudent(null);
        setFormData({ name: '', email: '' });
        setShowForm(true);
    };

    const handleEditarAluno = (aluno: Student) => {
        setEditedStudent(aluno);
        setFormData({ name: aluno.name, email: aluno.email });
        setShowForm(true);
    };

    const handleExcluirAluno = (id: number) => {
        setStudents(students.filter((aluno) => aluno.id !== id));
    };

    const handleSalvarAluno = () => {
        if (editedStudent) {
            setStudents(
                students.map((a) => (a.id === editedStudent.id ? { ...a, ...formData, attendance: a.attendance } : a))
            );
        } else {
            setStudents([...students, { ...formData, id: Date.now(), attendance: 0 }]);
        }
        setShowForm(false);
    };

    const handleCancelar = () => {
        setShowForm(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // Mapear o nome do campo se necessário
        const fieldName = name === 'name' ? 'name' : name === 'email' ? 'email' : name;

        setFormData({
            ...formData,
            [fieldName]: value
        });
    };

    // Funções para os novos recursos
    const handleSorteioGrupos = () => {
        setShowSorteioGrupoModal(true);
    };

    const handleCloseSorteioGrupoModal = () => {
        setShowSorteioGrupoModal(false);
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
                    onAddStudent={handleAdicionarAluno}
                    onSortGroups={handleSorteioGrupos}
                    onSortStudent={handleShowStudentDraw}
                    onShowCalendar={handleShowCalendario} />
                <StudentTable students={students} onEdit={handleEditarAluno} onDelete={handleExcluirAluno}  />

            </PageContainer>

            {showForm && (
                <StudentFormModal
                    studentData={formData}
                    onInputChange={handleInputChange}
                    onSave={handleSalvarAluno}
                    onClose={handleCancelar} />)}

            {showModalStudent && <StudentModal onClose={handleCloseModalStudent} />}

            {/* Modal de Sorteio de Grupos */}
            {showSorteioGrupoModal && (
                <GroupDrawModal students={students} onClose={handleCloseSorteioGrupoModal} />
            )}

            {showStudentDrawModal && (
                <StudentDrawModal
                    students={students}
                    onClose={handleCloseStudentDraw}
                    onDraw={realizarSorteioAluno}
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
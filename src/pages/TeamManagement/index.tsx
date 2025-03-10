import React, { useState } from 'react';

import ActionsContainer from '../../components/ActionsContainer';
import Calendar from '../../components/Calendar';
import StudentTable from '../../components/StudentTable';
import StudentModal from '../../components/modals/ModalStudent';

import { Event, Student } from '../../utils/types';

import {
    PageContainer,
    Button,
    Title,
    ModalContainer,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    CloseButton,
    EventIndicator,
    TabContainer,
    TabButton
} from './styles';
import GroupDrawModal from '../../components/modals/GroupDrawModal';
import StudentFormModal from '../../components/modals/StudentFormModal';
import StudentDrawModal from '../../components/modals/StudentDrawModal';

const TeamManagement: React.FC = () => {
    const [alunos, setAlunos] = useState<Student[]>([
        { id: 1, name: 'Ana Souza', email: 'ana@exemplo.com' },
        { id: 2, name: 'Carlos Oliveira', email: 'carlos@exemplo.com' },
        { id: 3, name: 'Fernanda Lima', email: 'fernanda@exemplo.com' },
    ]);
    const [showModalStudent, setShowModalStudent] = useState<boolean>(true);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [alunoEditando, setAlunoEditando] = useState<Student | null>(null);
    const [formData, setFormData] = useState<Omit<Student, 'id'>>({ name: '', email: '' });

    const [showSorteioGrupoModal, setShowSorteioGrupoModal] = useState<boolean>(false);
    const [showCalendarioModal, setShowCalendarioModal] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [activeTab, setActiveTab] = useState<string>('todos');
    const [showStudentDrawModal, setShowStudentDrawModal] = useState<boolean>(false);
    
    // Estado para aluno sorteado
    const [drawnStudent, setDrawnStudent] = useState<Student | null>(null);

    // Eventos de exemplo para o calendário
    const [eventos, setEventos] = useState<Event[]>([
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
        if (alunos.length > 0) {
            const indiceAleatorio = Math.floor(Math.random() * alunos.length);
            setDrawnStudent(alunos[indiceAleatorio]);
        }
    };

    const handleAdicionarAluno = () => {
        setAlunoEditando(null);
        setFormData({ name: '', email: '' });
        setShowForm(true);
    };

    const handleEditarAluno = (aluno: Student) => {
        setAlunoEditando(aluno);
        setFormData({ name: aluno.name, email: aluno.email });
        setShowForm(true);
    };

    const handleExcluirAluno = (id: number) => {
        setAlunos(alunos.filter((aluno) => aluno.id !== id));
    };

    const handleSalvarAluno = () => {
        if (alunoEditando) {
            setAlunos(
                alunos.map((a) => (a.id === alunoEditando.id ? { ...a, ...formData } : a))
            );
        } else {
            setAlunos([...alunos, { ...formData, id: Date.now() }]);
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

    // Converter eventos para o formato esperado pelo componente Calendar
    const mapEventsToCalendarFormat = () => {
        return eventos.filter(evento =>
            activeTab === 'todos' || evento.type === activeTab
        ).map(evento => ({
            date: evento.date,
            title: evento.title
        }));
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

                <StudentTable students={alunos} onEdit={handleEditarAluno} onDelete={handleExcluirAluno} />
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
                <GroupDrawModal students={alunos} onClose={handleCloseSorteioGrupoModal} />
            )}

            {showStudentDrawModal && (
                <StudentDrawModal
                    students={alunos}
                    onClose={handleCloseStudentDraw}
                    onDraw={realizarSorteioAluno}
                    drawnStudent={drawnStudent}
                />
            )}

            {/* Modal de Calendário */}
            {showCalendarioModal && (
                <ModalContainer>
                    <ModalContent className="large">
                        <ModalHeader>
                            <h3>Calendário da Turma</h3>
                            <CloseButton onClick={handleCloseCalendarioModal}>×</CloseButton>
                        </ModalHeader>
                        <ModalBody>
                            <TabContainer>
                                <TabButton
                                    active={activeTab === 'todos'}
                                    onClick={() => handleTabChange('todos')}
                                >
                                    Todos
                                </TabButton>
                                <TabButton
                                    active={activeTab === 'atividade'}
                                    onClick={() => handleTabChange('atividade')}
                                    className="atividade"
                                >
                                    Atividades
                                </TabButton>
                                <TabButton
                                    active={activeTab === 'avaliacao'}
                                    onClick={() => handleTabChange('avaliacao')}
                                    className="avaliacao"
                                >
                                    Avaliações
                                </TabButton>
                                <TabButton
                                    active={activeTab === 'evento'}
                                    onClick={() => handleTabChange('evento')}
                                    className="evento"
                                >
                                    Eventos
                                </TabButton>
                            </TabContainer>

                            <Calendar
                                initialSelectedDate={selectedDate}
                                onSelectDate={handleDateSelect}
                                events={mapEventsToCalendarFormat()}
                                className="calendar-wrapper"
                            />

                            <div className="legend" style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                                <div style={{ marginRight: '1rem' }}>
                                    <EventIndicator className="atividade" /> Atividades
                                </div>
                                <div style={{ marginRight: '1rem' }}>
                                    <EventIndicator className="avaliacao" /> Avaliações
                                </div>
                                <div>
                                    <EventIndicator className="evento" /> Eventos
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="secondary" onClick={handleCloseCalendarioModal}>Fechar</Button>
                        </ModalFooter>
                    </ModalContent>
                </ModalContainer>
            )}
        </>
    );
};

export default TeamManagement;
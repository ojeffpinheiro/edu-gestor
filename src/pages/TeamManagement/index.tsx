import React, { useState } from 'react';
import { FaEdit, FaTrashAlt, FaUserPlus, FaSave, FaTimes, FaRandom, FaUser, FaCalendarAlt } from 'react-icons/fa';

import { StudentModal } from '../../components/modals/ModalStudent';
import { Event, Student } from '../../utils/types';

import {
    PageContainer,
    TableContainer,
    Table,
    Th,
    Tr,
    Td,
    Button,
    IconButton,
    Icon,
    FormContainer,
    Input,
    FormActions,
    EmptyState,
    Title,
    ButtonGroup,
    ModalContainer,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    CloseButton,
    CalendarContainer,
    CalendarHeader,
    CalendarGrid,
    CalendarDay,
    CalendarEvent,
    EventIndicator,
    TabContainer,
    TabButton,
    ActionsContainer
} from './styles';

const TeamManagement: React.FC = () => {
    const [alunos, setAlunos] = useState<Student[]>([
        { id: 1, name: 'Ana Souza', email: 'ana@exemplo.com' },
        { id: 2, name: 'Carlos Oliveira', email: 'carlos@exemplo.com' },
        { id: 3, name: 'Fernanda Lima', email: 'fernanda@exemplo.com' },
    ]);
    const [showModalStudent, setShowModalStudent] = useState<boolean>(false);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [alunoEditando, setAlunoEditando] = useState<Student | null>(null);
    const [formData, setFormData] = useState<Omit<Student, 'id'>>({ name: '', email: '' });

    // Estados para os novos recursos
    const [showSorteioGrupoModal, setShowSorteioGrupoModal] = useState<boolean>(false);
    const [showSorteioAlunoModal, setShowSorteioAlunoModal] = useState<boolean>(false);
    const [showCalendarioModal, setShowCalendarioModal] = useState<boolean>(false);
    const [tamanhoGrupo, setTamanhoGrupo] = useState<number>(2);
    const [gruposSorteados, setGruposSorteados] = useState<Student[][]>([]);
    const [alunoSorteado, setAlunoSorteado] = useState<Student | null>(null);
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [activeTab, setActiveTab] = useState<string>('todos');

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
    const handleShowModalStudent = () => setShowModalStudent(true);
    const handleCloseModalStudent = () => setShowModalStudent(false);

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
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Funções para os novos recursos
    const handleSorteioGrupos = () => {
        setShowSorteioGrupoModal(true);
    };

    const handleCloseSorteioGrupoModal = () => {
        setShowSorteioGrupoModal(false);
    };

    const handleRealizarSorteioGrupos = () => {
        // Copia a lista de alunos para não modificar o estado original
        const alunosEmbaralhados = [...alunos].sort(() => Math.random() - 0.5);
        const grupos: Student[][] = [];

        // Divide os alunos em grupos do tamanho especificado
        for (let i = 0; i < alunosEmbaralhados.length; i += tamanhoGrupo) {
            grupos.push(alunosEmbaralhados.slice(i, i + tamanhoGrupo));
        }

        setGruposSorteados(grupos);
    };

    const handleSorteioAluno = () => {
        setShowSorteioAlunoModal(true);
        realizarSorteioAluno();
    };

    const handleCloseSorteioAlunoModal = () => {
        setShowSorteioAlunoModal(false);
        setAlunoSorteado(null);
    };

    const realizarSorteioAluno = () => {
        if (alunos.length > 0) {
            const indiceAleatorio = Math.floor(Math.random() * alunos.length);
            setAlunoSorteado(alunos[indiceAleatorio]);
        }
    };

    const handleShowCalendario = () => {
        setShowCalendarioModal(true);
    };

    const handleCloseCalendarioModal = () => {
        setShowCalendarioModal(false);
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    // Função para gerar os dias do calendário
    const getDaysInMonth = (year: number, month: number) => {
        // Retorna o último dia do mês
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year: number, month: number) => {
        // Retorna o dia da semana (0-6) do primeiro dia do mês
        return new Date(year, month, 1).getDay();
    };

    // Filtra eventos com base na aba ativa
    const filteredEventos = activeTab === 'todos'
        ? eventos
        : eventos.filter(evento => evento.type === activeTab);

    // Gera o grid do calendário
    const generateCalendarGrid = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = getDaysInMonth(year, month);
        const firstDay = getFirstDayOfMonth(year, month);

        const days = [];

        // Adiciona dias vazios para o início do mês
        for (let i = 0; i < firstDay; i++) {
            days.push(<CalendarDay key={`empty-${i}`} className="empty" />);
        }

        // Adiciona os dias do mês
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const eventsOnDay = filteredEventos.filter(
                evento => evento.date.getDate() === day &&
                    evento.date.getMonth() === month &&
                    evento.date.getFullYear() === year
            );

            days.push(
                <CalendarDay key={`day-${day}`}>
                    <div className="day-number">{day}</div>
                    {eventsOnDay.map(evento => (
                        <CalendarEvent key={evento.id} className={evento.type}>
                            <EventIndicator className={evento.type} />
                            {evento.title}
                        </CalendarEvent>
                    ))}
                </CalendarDay>
            );
        }

        return days;
    };

    return (
        <>
            {showModalStudent && <StudentModal onClose={handleCloseModalStudent} />}
            <PageContainer>
                <Title>Gerenciamento de Alunos</Title>

                <ActionsContainer>
                    <Button
                        variant="primary"
                        onClick={handleAdicionarAluno}
                    >
                        <Icon><FaUserPlus /></Icon> Adicionar Aluno
                    </Button>

                    <ButtonGroup>
                        <Button
                            variant="info"
                            onClick={handleSorteioGrupos}
                        >
                            <Icon><FaRandom /></Icon> Sortear Grupos
                        </Button>

                        <Button
                            variant="warning"
                            onClick={handleSorteioAluno}
                        >
                            <Icon><FaUser /></Icon> Sortear Aluno
                        </Button>

                        <Button
                            variant="success"
                            onClick={handleShowCalendario}
                        >
                            <Icon><FaCalendarAlt /></Icon> Calendário
                        </Button>
                    </ButtonGroup>
                </ActionsContainer>

                {showForm && (
                    <FormContainer>
                        <Input
                            type="text"
                            name="nome"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Nome do aluno"
                        />
                        <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email do aluno"
                        />
                        <FormActions>
                            <Button onClick={handleSalvarAluno} variant="primary">
                                <Icon><FaSave /></Icon> Salvar
                            </Button>
                            <Button onClick={handleCancelar} variant="secondary">
                                <Icon><FaTimes /></Icon> Cancelar
                            </Button>
                        </FormActions>
                    </FormContainer>
                )}

                <TableContainer>
                    <Table>
                        <thead>
                            <tr>
                                <Th>Nome</Th>
                                <Th>Email</Th>
                                <Th>Ações</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {alunos.length > 0 ? (
                                alunos.map((aluno) => (
                                    <Tr key={aluno.id}>
                                        <Td onClick={handleCloseModalStudent}>{aluno.name}</Td>
                                        <Td>{aluno.email}</Td>
                                        <Td>
                                            <IconButton onClick={() => handleEditarAluno(aluno)} variant="info">
                                                <FaEdit />
                                            </IconButton>
                                            <IconButton onClick={() => handleExcluirAluno(aluno.id)} variant="error">
                                                <FaTrashAlt />
                                            </IconButton>
                                        </Td>
                                    </Tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3}>
                                        <EmptyState>
                                            Nenhum aluno cadastrado. Clique em "Adicionar Aluno" para começar.
                                        </EmptyState>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </TableContainer>
            </PageContainer>

            {/* Modal de Sorteio de Grupos */}
            {showSorteioGrupoModal && (
                <ModalContainer>
                    <ModalContent>
                        <ModalHeader>
                            <h3>Sorteio de Grupos</h3>
                            <CloseButton onClick={handleCloseSorteioGrupoModal}>×</CloseButton>
                        </ModalHeader>
                        <ModalBody>
                            <div>
                                <label htmlFor="tamanhoGrupo">Alunos por grupo:</label>
                                <Input
                                    type="number"
                                    id="tamanhoGrupo"
                                    min="2"
                                    max={alunos.length}
                                    value={tamanhoGrupo}
                                    onChange={(e) => setTamanhoGrupo(parseInt(e.target.value))}
                                />
                            </div>

                            <Button
                                variant="primary"
                                onClick={handleRealizarSorteioGrupos}
                                style={{ marginTop: 'var(--space-md)' }}
                            >
                                <Icon><FaRandom /></Icon> Realizar Sorteio
                            </Button>

                            {gruposSorteados.length > 0 && (
                                <div style={{ marginTop: 'var(--space-lg)' }}>
                                    <h4>Grupos Formados:</h4>
                                    {gruposSorteados.map((grupo, index) => (
                                        <div key={index} style={{ margin: 'var(--space-md) 0', padding: 'var(--space-md)', background: 'var(--color-background-third)', borderRadius: 'var(--border-radius-sm)' }}>
                                            <h5>Grupo {index + 1}</h5>
                                            <ul>
                                                {grupo.map((aluno) => (
                                                    <li key={aluno.id}>{aluno.name}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="secondary" onClick={handleCloseSorteioGrupoModal}>Fechar</Button>
                        </ModalFooter>
                    </ModalContent>
                </ModalContainer>
            )}

            {/* Modal de Sorteio de Aluno */}
            {showSorteioAlunoModal && (
                <ModalContainer>
                    <ModalContent>
                        <ModalHeader>
                            <h3>Sorteio de Aluno</h3>
                            <CloseButton onClick={handleCloseSorteioAlunoModal}>×</CloseButton>
                        </ModalHeader>
                        <ModalBody>
                            {alunoSorteado ? (
                                <div style={{ textAlign: 'center', margin: 'var(--space-lg) 0' }}>
                                    <h4>Aluno Sorteado:</h4>
                                    <div style={{
                                        fontSize: 'var(--font-size-xl)',
                                        fontWeight: 'bold',
                                        margin: 'var(--space-lg)',
                                        padding: 'var(--space-lg)',
                                        background: 'var(--color-primary)',
                                        color: 'var(--color-text-on-primary)',
                                        borderRadius: 'var(--border-radius-md)'
                                    }}>
                                        {alunoSorteado.name}
                                    </div>
                                </div>
                            ) : (
                                <EmptyState>Nenhum aluno disponível para sorteio.</EmptyState>
                            )}

                            <Button
                                variant="primary"
                                onClick={realizarSorteioAluno}
                                style={{ marginTop: 'var(--space-md)' }}
                                disabled={alunos.length === 0}
                            >
                                <Icon><FaRandom /></Icon> Sortear Novamente
                            </Button>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="secondary" onClick={handleCloseSorteioAlunoModal}>Fechar</Button>
                        </ModalFooter>
                    </ModalContent>
                </ModalContainer>
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

                            <CalendarContainer>
                                <CalendarHeader>
                                    <Button variant="secondary" onClick={handlePrevMonth}>
                                        &lt;
                                    </Button>
                                    <h4>
                                        {currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                                    </h4>
                                    <Button variant="secondary" onClick={handleNextMonth}>
                                        &gt;
                                    </Button>
                                </CalendarHeader>

                                <div className="weekdays">
                                    <div>Dom</div>
                                    <div>Seg</div>
                                    <div>Ter</div>
                                    <div>Qua</div>
                                    <div>Qui</div>
                                    <div>Sex</div>
                                    <div>Sáb</div>
                                </div>

                                <CalendarGrid>
                                    {generateCalendarGrid()}
                                </CalendarGrid>

                                <div className="legend">
                                    <div>
                                        <EventIndicator className="atividade" /> Atividades
                                    </div>
                                    <div>
                                        <EventIndicator className="avaliacao" /> Avaliações
                                    </div>
                                    <div>
                                        <EventIndicator className="evento" /> Eventos
                                    </div>
                                </div>
                            </CalendarContainer>
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
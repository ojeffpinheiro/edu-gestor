import React, { useState, useEffect, useCallback } from 'react';
import { FaTable, FaThLarge, FaExchangeAlt, FaCheck, FaClipboardCheck } from 'react-icons/fa';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { useStudents } from '../../../hooks/useStudent';
import { StudentFormData } from '../../../utils/types/BasicUser';
import { DailyVerification, LayoutConfig, PriorityType, SeatType } from '../../../utils/types/Team';
import Notification from '../../../components/shared/Notification';
import { Container } from '../../../styles/layoutUtils';
import { ActionButton } from '../../../styles/buttons';
import DraggableStudent from '../../../components/Team/DraggableStudent';
import DroppableSeat from '../../../components/Team/DroppableSeat';

import SeatFormModal from '../../../components/Team/SeatFormModal';
import VerificationHistory from '../../../components/Team/VerificationHistory';

import {
    ActionContainer,
    ContentContainer,
    TableView,
    TableHeader,
    TableRow,
    AttendanceBadge,
    LayoutContainer,
    StudentsPanel,
    StudentList,
    SettingsPanel,
    GridContainer,
    ClassroomLayout,
    TeacherDesk,
    Header,
    ConferenceControlPanel,
    ConferenceStats,
    StatItem,
    StatLabel,
    StatValue,
} from './styles';

const MAX_COLUMNS = 5; // Definindo máximo de 5 colunas

const ClassroomLayoutPage: React.FC = () => {
    const [layout, setLayout] = useState<LayoutConfig>({
        rows: 5,
        columns: MAX_COLUMNS,
        seats: [],
    });
    const [conferenceMode, setConferenceMode] = useState(false);
    const [conferenceDate, setConferenceDate] = useState(new Date().toISOString().split('T')[0]);
    const [checkedSeats, setCheckedSeats] = useState<string[]>([]);
    const [mismatchedSeats, setMismatchedSeats] = useState<string[]>([]);

    const [verificationHistory, setVerificationHistory] = useState<DailyVerification[]>([]);
    const [currentVerification, setCurrentVerification] = useState<DailyVerification>({
        date: new Date().toISOString().split('T')[0],
        verifiedSeats: [],
        mismatchedSeats: [],
    });

    const [view, setView] = useState<'table' | 'layout'>('layout');
    const [selectedStudent, setSelectedStudent] = useState<StudentFormData | null>(null);
    const [selectedSeat, setSelectedSeat] = useState<SeatType | null>(null);
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });
    const [verifyMode, setVerifyMode] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { studentList } = useStudents();

    useEffect(() => {
        initializeLayout(5, MAX_COLUMNS);
    }, []);

    const showNotification = (message: string, type: string) => {
        setNotification({ show: true, message, type });
        setTimeout(() => {
            setNotification({ show: false, message: '', type: '' });
        }, 3000);
    };

    const initializeLayout = (rows: number, columns: number) => {
        const seats: SeatType[] = [];

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns; col++) {
                seats.push({
                    id: `seat-${row}-${col}`,
                    position: { row, column: col },
                    studentId: undefined,
                    priority: null,
                });
            }
        }

        setLayout({ rows, columns, seats });
    };

    // Função auxiliar para encontrar melhor assento
    const findBestSeatForStudent = (student: StudentFormData, seats: SeatType[]) => {
        if (student.specialNeeds === 'low_vision') {
            return seats.find(s =>
                !s.studentId && s.position.row === 0 // Primeira fileira
            );
        }
        // Outras lógicas de prioridade...
        return seats.find(s => !s.studentId);
    };

    const generateAutomaticLayout = () => {
        const newSeats = [...layout.seats];
        const unassignedStudents = [...studentList]
            .filter(student => !newSeats.some(s => s.studentId === student.id));

        // 1. Atribuir alunos com prioridades primeiro
        const priorityStudents = unassignedStudents.filter(student => student.specialNeeds);
        priorityStudents.forEach(student => {
            const bestSeat = findBestSeatForStudent(student, newSeats);
            if (bestSeat) {
                bestSeat.studentId = student.id;
            }
        });

        // 2. Atribuir alunos restantes
        const remainingStudents = unassignedStudents.filter(student =>
            !priorityStudents.includes(student)
        );

        remainingStudents.forEach(student => {
            const emptySeat = newSeats.find(s => !s.studentId);
            if (emptySeat) {
                emptySeat.studentId = student.id;
            }
        });

        setLayout({ ...layout, seats: newSeats });
    };

    const verifySeating = () => {
        setVerifyMode(!verifyMode);
        showNotification(
            verifyMode ? 'Modo de verificação desativado' : 'Modo de verificação ativado',
            'info'
        );
    };

    const toggleView = () => {
        setView(prev => prev === 'table' ? 'layout' : 'table');
    };

    const updateSeatPriority = (seatId: string, priority: PriorityType | null) => {
        const updatedSeats = layout.seats.map(seat => {
            if (seat.id === seatId) {
                return { ...seat, priority };
            }
            return seat;
        });

        setLayout({ ...layout, seats: updatedSeats });
        showNotification(`Prioridade do assento atualizada: ${priority || 'Nenhuma'}`, 'success');
    };

    const handleSeatClick = (seat: SeatType) => {
        if (verifyMode) {
            handleSeatVerification(seat.id);
            return;
        }

        if (selectedStudent && seat.studentId === undefined) {
            const updatedSeats = layout.seats.map(s => {
                if (s.id === seat.id) {
                    return { ...s, studentId: selectedStudent.id };
                }
                return s;
            });

            setLayout({ ...layout, seats: updatedSeats });
            setSelectedStudent(null);
            showNotification(`Aluno ${selectedStudent.name} atribuído ao assento`, 'success');
        } else if (seat.studentId !== undefined) {
            setSelectedSeat(seat);
            setIsModalOpen(true); // Abre o modal ao clicar no assento ocupado
        }
    };

    const removeStudentFromSeat = (seatId: string) => {
        const updatedSeats = layout.seats.map(seat => {
            if (seat.id === seatId) {
                return { ...seat, studentId: undefined };
            }
            return seat;
        });

        setLayout({ ...layout, seats: updatedSeats });
        setSelectedSeat(null);
        showNotification('Aluno removido do assento', 'success');
    };

    const handleSaveSeat = (updatedSeat: SeatType) => {
        const updatedSeats = layout.seats.map(seat =>
            seat.id === updatedSeat.id ? updatedSeat : seat
        );
        setLayout({ ...layout, seats: updatedSeats });
        setIsModalOpen(false);
        showNotification('Assento atualizado com sucesso', 'success');
    };

    const getStudentAttendance = (id?: number): number => {
        if (!id) return 0;
        return Math.floor(Math.random() * 100);
    };

    const getAttendanceColor = (attendance: number): string => {
        if (attendance >= 90) return '#4CAF50';
        if (attendance >= 75) return '#FFC107';
        return '#F44336';
    };

    const getStudentName = (studentId?: number): string => {
        if (!studentId) return '';
        const student = studentList.find(s => s.id === studentId);
        return student ? student.name : '';
    };

    const handleSeatVerification = (seatId: string) => {
        setCurrentVerification(prev => {
            const updated = { ...prev };
            if (updated.verifiedSeats.includes(seatId)) {
                updated.verifiedSeats = updated.verifiedSeats.filter(id => id !== seatId);
            } else {
                updated.verifiedSeats = [...updated.verifiedSeats, seatId];
            }
            return updated;
        });

        // Atualizar o assento
        setLayout(prev => ({
            ...prev,
            seats: prev.seats.map(seat =>
                seat.id === seatId ? { ...seat, lastVerified: new Date().toISOString() } : seat
            )
        }));
    };

    const saveDailyVerification = () => {
        setVerificationHistory([...verificationHistory, currentVerification]);
        setCurrentVerification({
            date: new Date().toISOString().split('T')[0],
            verifiedSeats: [],
            mismatchedSeats: [],
        });
        setVerifyMode(false);
    };

    const viewDayDetails = (day: DailyVerification) => {
        setNotification({
            show: true,
            message: `Em ${day.date}: ${day.verifiedSeats.length} alunos verificados`,
            type: 'info'
        });

        // Destacar os assentos verificados naquele dia
        setLayout(prev => ({
            ...prev,
            seats: prev.seats.map(seat => ({
                ...seat,
                isHighlighted: day.verifiedSeats.includes(seat.id)
            }))
        }));
    };

    // Nova função para iniciar conferência
    const startDailyConference = () => {
        setConferenceMode(true);
        setCheckedSeats([]);
        setMismatchedSeats([]);
        setConferenceDate(new Date().toISOString().split('T')[0]);
        showNotification('Modo conferência ativado. Verifique os alunos presentes.', 'info');
    };

    // Função para finalizar conferência
    const finishDailyConference = () => {
        if (checkedSeats.length === 0) {
            showNotification('Nenhum aluno foi verificado. Deseja mesmo finalizar?', 'warning');
            return;
        }

        const newVerification: DailyVerification = {
            date: conferenceDate,
            verifiedSeats: checkedSeats,
            mismatchedSeats: mismatchedSeats
        };

        setVerificationHistory([...verificationHistory, newVerification]);
        setConferenceMode(false);
        showNotification(`Conferência do dia ${conferenceDate} salva com sucesso!`, 'success');
    };

    const handleVerifySeat = useCallback((seatId: string, isCorrect: boolean) => {
        if (isCorrect) {
            setCheckedSeats(prev => [...prev, seatId]);
            setMismatchedSeats(prev => prev.filter(id => id !== seatId));
        } else {
            setMismatchedSeats(prev => [...prev, seatId]);
            setCheckedSeats(prev => prev.filter(id => id !== seatId));
        }
    }, []);

    return (
        <Container>
            <Header>
                <h1>Mapeamento da Sala de Aula</h1>
                <ActionContainer>
                    <ActionButton onClick={toggleView}>
                        {view === 'table' ? <><FaThLarge /> Visualizar Layout</> : <><FaTable /> Visualizar Tabela</>}
                    </ActionButton>
                    <ActionButton onClick={generateAutomaticLayout}>
                        <FaExchangeAlt /> Gerar Layout Automático
                    </ActionButton>
                    <ActionButton onClick={conferenceMode ? finishDailyConference : startDailyConference}>
                        {conferenceMode ? <><FaCheck /> Finalizar Conferência</> : <><FaClipboardCheck /> Iniciar Conferência</>}
                    </ActionButton>
                </ActionContainer>
            </Header>

            <ContentContainer>
                <DndProvider backend={HTML5Backend}>
                    {view === 'table' ? (
                        <TableView>
                            <TableHeader>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Frequência</th>
                                <th>Assento Designado</th>
                                <th>Necessidades Especiais</th>
                            </TableHeader>
                            <tbody>
                                {studentList.map(student => {
                                    const seat = layout.seats.find(s => s.studentId === student.id);
                                    const attendance = getStudentAttendance();

                                    return (
                                        <TableRow key={student.id} onClick={() => setSelectedStudent(student)}>
                                            <td>{student.id}</td>
                                            <td>{student.name}</td>
                                            <td>
                                                <AttendanceBadge color={getAttendanceColor(attendance)}>
                                                    {attendance}%
                                                </AttendanceBadge>
                                            </td>
                                            <td>{seat ? `Fileira ${seat.position.row + 1}, Coluna ${seat.position.column + 1}` : 'Não atribuído'}</td>
                                            <td>
                                                {seat?.priority === 'low_vision' && 'Baixa visão'}
                                                {seat?.priority === 'intellectual_disability' && 'Deficiência intelectual'}
                                                {seat?.priority === 'good_pair' && 'Bom par'}
                                                {!seat?.priority && 'Nenhuma'}
                                            </td>
                                        </TableRow>
                                    );
                                })}
                            </tbody>
                        </TableView>
                    ) : (
                        <LayoutContainer>
                            <StudentsPanel>
                                <h3>Alunos</h3>
                                <StudentList>
                                    {studentList
                                        .filter(student => !layout.seats.some(seat => seat.studentId === student.id))
                                        .map(student => (
                                            <DraggableStudent
                                                key={student.id}
                                                student={student}
                                                setSelectedStudent={setSelectedStudent}
                                                isSelected={selectedStudent?.id === student.id}
                                            />
                                        ))}
                                </StudentList>
                            </StudentsPanel>

                            <ClassroomLayout>
                                <h3>Layout da Sala</h3>
                                <TeacherDesk>
                                    <span>Mesa do Professor</span>
                                </TeacherDesk>
                                <GridContainer>
                                    {layout.seats.map(seat => (
                                        <DroppableSeat
                                            key={seat.id}
                                            seat={seat}
                                            layout={layout}
                                            setLayout={setLayout}
                                            onSeatClick={handleSeatClick}
                                            studentList={studentList}
                                            selectedSeat={selectedSeat}
                                            verifyMode={verifyMode}
                                            getStudentAttendance={getStudentAttendance}
                                            getAttendanceColor={getAttendanceColor}
                                            getStudentName={getStudentName}
                                            getPriorityInfo={(priority?: PriorityType) => {
                                                switch (priority) {
                                                    case 'low_vision':
                                                        return { label: 'Baixa visão', color: '#03A9F4', icon: '👓' };
                                                    case 'intellectual_disability':
                                                        return { label: 'Deficiência intelectual', color: '#9C27B0', icon: '🧠' };
                                                    case 'good_pair':
                                                        return { label: 'Bom par', color: '#FF9800', icon: '👥' };
                                                    default:
                                                        return { label: '', color: '', icon: '' };
                                                }
                                            }}
                                            editMode={false}
                                            showTooltips={true}
                                            compactView={false}

                                            conferenceMode={conferenceMode}
                                            isChecked={checkedSeats.includes(seat.id)}
                                            isMismatched={mismatchedSeats.includes(seat.id)}
                                            onVerify={handleVerifySeat}
                                        />
                                    ))}
                                </GridContainer>
                            </ClassroomLayout>

                            <SettingsPanel>
                                {conferenceMode && (
                                    <ConferenceControlPanel>
                                        <h4>Conferência do Dia: {conferenceDate}</h4>
                                        <ConferenceStats>
                                            <StatItem>
                                                <StatLabel>Verificados:</StatLabel>
                                                <StatValue>{checkedSeats.length}</StatValue>
                                            </StatItem>
                                            <StatItem>
                                                <StatLabel>Divergências:</StatLabel>
                                                <StatValue>{mismatchedSeats.length}</StatValue>
                                            </StatItem>
                                            <StatItem>
                                                <StatLabel>Faltantes:</StatLabel>
                                                <StatValue>{layout.seats.filter(s => s.studentId && !checkedSeats.includes(s.id)).length}</StatValue>
                                            </StatItem>
                                        </ConferenceStats>

                                        <ActionButton
                                            onClick={finishDailyConference}
                                        >
                                            Finalizar Conferência
                                        </ActionButton>

                                        <ActionButton
                                            onClick={() => setConferenceMode(false)}
                                            style={{ marginTop: '8px' }}
                                        >
                                            Cancelar
                                        </ActionButton>
                                    </ConferenceControlPanel>
                                )}
                                <VerificationHistory
                                    history={verificationHistory}
                                    viewDayDetails={viewDayDetails}
                                    seats={layout.seats}
                                    students={studentList}
                                />
                            </SettingsPanel>
                        </LayoutContainer>
                    )}
                </DndProvider>
            </ContentContainer>

            {/* Modal de edição de assento */}
            {selectedSeat && (
                <SeatFormModal
                    isOpen={isModalOpen}
                    seat={selectedSeat}
                    seats={layout.seats}
                    students={studentList}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveSeat}
                    onDelete={() => {
                        removeStudentFromSeat(selectedSeat.id);
                        setIsModalOpen(false);
                    }}
                />
            )}

            {notification.show && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                />
            )}
        </Container>
    );
};

export default ClassroomLayoutPage;
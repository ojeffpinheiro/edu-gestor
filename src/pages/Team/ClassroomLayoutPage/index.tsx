import React, { useState, useEffect } from 'react';
import { FaTable, FaThLarge, FaExchangeAlt, FaCheck, FaExclamationTriangle } from 'react-icons/fa';

import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import { useStudents } from '../../../hooks/useStudent';

import Notification from '../../../components/shared/Notification';
import { Container } from '../../../styles/layoutUtils';
import { ActionButton } from '../../../styles/buttons';


import { LayoutConfig, SeatType } from '../../../utils/types/Team';
import DraggableStudent from '../../../components/Team/DraggableStudent';
import DroppableSeat from '../../../components/Team/DroppableSeat';

import {
    ActionContainer,
    AttendanceIndicator,
    ContentContainer,
    DropHighlight,
    EmptySeatLabel,
    SeatContainer,
    StudentItem,
    StudentName,
    TableHeader,
    TableView,
    AttendanceBadge,
    TableRow,
    LayoutContainer,
    StudentsPanel,
    StudentList,
    LegendItem,
    LegendContainer,
    PriorityLabel,
    PriorityOptions,
    SeatActions,
    SeatDetails,
    SettingsPanel,
    GridContainer,
    ClassroomLayout,
    TeacherDesk,
    Header,
} from './styles';
import { StudentFormData } from '../../../utils/types/BasicUser';
// Componente principal da página
const ClassroomLayoutPage: React.FC = () => {
    // Estado para o layout da sala
    const [layout, setLayout] = useState<LayoutConfig>({
        rows: 5,
        columns: 6,
        seats: [],
    });

    // Estados para gerenciar a interface
    const [view, setView] = useState<'table' | 'layout'>('layout');
    const [selectedStudent, setSelectedStudent] = useState<StudentFormData | null>(null);
    const [selectedSeat, setSelectedSeat] = useState<SeatType | null>(null);
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });
    const [verifyMode, setVerifyMode] = useState(false);

    // Obter lista de alunos
    const { studentList } = useStudents();

    // Inicializar layout
    useEffect(() => {
        initializeLayout(5, 6);
    }, []);

    // Mostrar notificação
    const showNotification = (message: string, type: string) => {
        setNotification({ show: true, message, type });
        setTimeout(() => {
            setNotification({ show: false, message: '', type: '' });
        }, 3000);
    };

    // Inicializar layout da sala
    const initializeLayout = (rows: number, columns: number) => {
        const seats: SeatType[] = [];

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns; col++) {
                seats.push({
                    id: `seat-${row}-${col}`,
                    row,
                    column: col,
                    studentId: undefined,
                    priority: null,
                });
            }
        }

        setLayout({ rows, columns, seats });
    };

    // Gerar layout automático
    const generateAutomaticLayout = () => {
        const newSeats = [...layout.seats];
        const studentsToAssign = [...studentList];

        // Limpar assentos existentes
        newSeats.forEach(seat => {
            seat.studentId = undefined;
        });

        // Distribuir alunos com prioridade primeiro
        const prioritySeats = newSeats.filter(seat => seat.priority);
        prioritySeats.forEach(seat => {
            if (studentsToAssign.length > 0) {
                seat.studentId = studentsToAssign.shift()?.id;
            }
        });

        // Distribuir alunos restantes
        const regularSeats = newSeats.filter(seat => !seat.priority && seat.studentId === undefined);
        regularSeats.forEach(seat => {
            if (studentsToAssign.length > 0) {
                seat.studentId = studentsToAssign.shift()?.id;
            }
        });

        setLayout({ ...layout, seats: newSeats });
        showNotification('Layout gerado automaticamente', 'success');
    };

    // Verificar se alunos estão sentados corretamente
    const verifySeating = () => {
        setVerifyMode(!verifyMode);

        if (!verifyMode) {
            showNotification('Modo de verificação ativado', 'info');
        } else {
            showNotification('Modo de verificação desativado', 'info');
        }
    };

    // Alternar entre visualizações
    const toggleView = () => {
        setView(prev => prev === 'table' ? 'layout' : 'table');
    };

    // Atualizar prioridade de assento
    const updateSeatPriority = (seatId: string, priority: 'low-vision' | 'intellectual-disability' | 'good-pair' | null) => {
        const updatedSeats = layout.seats.map(seat => {
            if (seat.id === seatId) {
                return { ...seat, priority };
            }
            return seat;
        });

        setLayout({ ...layout, seats: updatedSeats });
        showNotification(`Prioridade do assento atualizada: ${priority || 'Nenhuma'}`, 'success');
    };

    // Manipular clique em um assento
    const handleSeatClick = (seat: SeatType) => {
        if (selectedStudent && seat.studentId === undefined) {
            // Atribuir aluno ao assento
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
            // Selecionar assento ou remover aluno
            setSelectedSeat(seat);
        }
    };

    // Remover aluno de um assento
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

    // Obter frequência do aluno (mock)
    const getStudentAttendance = (id?: number | undefined): number => {
        return Math.floor(Math.random() * 100);
    };

    // Obter cor baseada na frequência
    const getAttendanceColor = (attendance: number): string => {
        if (attendance >= 90) return '#4CAF50'; // Verde para frequência alta
        if (attendance >= 75) return '#FFC107'; // Amarelo para frequência média
        return '#F44336'; // Vermelho para frequência baixa
    };

    // Obter nome do aluno pelo ID
    const getStudentName = (studentId?: number): string => {
        if (!studentId) return '';
        const student = studentList.find(s => s.id === studentId);
        return student ? student.name : '';
    };

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
                    <ActionButton onClick={verifySeating}>
                        {verifyMode ? <><FaCheck /> Finalizar Verificação</> : <><FaExclamationTriangle /> Verificar Assentos</>}
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
                                            <td>{seat ? `Fileira ${seat.row + 1}, Coluna ${seat.column + 1}` : 'Não atribuído'}</td>
                                            <td>
                                                {seat?.priority === 'low-vision' && 'Baixa visão'}
                                                {seat?.priority === 'intellectual-disability' && 'Deficiência intelectual'}
                                                {seat?.priority === 'good-pair' && 'Bom par'}
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
                                            handleSeatClick={handleSeatClick}
                                            studentList={studentList}
                                            selectedSeat={selectedSeat}
                                            verifyMode={verifyMode}
                                            getStudentAttendance={getStudentAttendance}
                                            getAttendanceColor={getAttendanceColor}
                                            getStudentName={getStudentName}
                                        />
                                    ))}
                                </GridContainer>
                            </ClassroomLayout>

                            <SettingsPanel>
                                <h3>Configurações</h3>
                                {selectedSeat && (
                                    <SeatDetails>
                                        <h4>Assento Selecionado</h4>
                                        <p>Fileira {selectedSeat.row + 1}, Coluna {selectedSeat.column + 1}</p>
                                        <p>Aluno: {getStudentName(selectedSeat.studentId) || 'Nenhum'}</p>

                                        <SeatActions>
                                            <ActionButton onClick={() => removeStudentFromSeat(selectedSeat.id)}>
                                                Remover Aluno
                                            </ActionButton>

                                            <PriorityOptions>
                                                <h4>Prioridade</h4>
                                                <PriorityLabel>
                                                    <input
                                                        type="radio"
                                                        name="priority"
                                                        checked={selectedSeat.priority === 'low-vision'}
                                                        onChange={() => updateSeatPriority(selectedSeat.id, 'low-vision')}
                                                    />
                                                    Baixa visão
                                                </PriorityLabel>
                                                <PriorityLabel>
                                                    <input
                                                        type="radio"
                                                        name="priority"
                                                        checked={selectedSeat.priority === 'intellectual-disability'}
                                                        onChange={() => updateSeatPriority(selectedSeat.id, 'intellectual-disability')}
                                                    />
                                                    Deficiência intelectual
                                                </PriorityLabel>
                                                <PriorityLabel>
                                                    <input
                                                        type="radio"
                                                        name="priority"
                                                        checked={selectedSeat.priority === 'good-pair'}
                                                        onChange={() => updateSeatPriority(selectedSeat.id, 'good-pair')}
                                                    />
                                                    Bom par
                                                </PriorityLabel>
                                                <PriorityLabel>
                                                    <input
                                                        type="radio"
                                                        name="priority"
                                                        checked={selectedSeat.priority === null}
                                                        onChange={() => updateSeatPriority(selectedSeat.id, null)}
                                                    />
                                                    Nenhuma
                                                </PriorityLabel>
                                            </PriorityOptions>
                                        </SeatActions>
                                    </SeatDetails>
                                )}

                                <LegendContainer>
                                    <h4>Legenda</h4>
                                    <LegendItem color="#4CAF50">Frequência Alta (90%+)</LegendItem>
                                    <LegendItem color="#FFC107">Frequência Média (75-89%)</LegendItem>
                                    <LegendItem color="#F44336">Frequência Baixa (0-74%)</LegendItem>
                                    <LegendItem color="#03A9F4">Baixa visão</LegendItem>
                                    <LegendItem color="#9C27B0">Deficiência intelectual</LegendItem>
                                    <LegendItem color="#FF9800">Bom par</LegendItem>
                                </LegendContainer>
                            </SettingsPanel>
                        </LayoutContainer>
                    )}
                </DndProvider>
            </ContentContainer>

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
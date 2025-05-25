import React, { useState, useEffect } from 'react';
import { FaTable, FaThLarge, FaExchangeAlt, FaCheck, FaClipboardCheck, FaPlus, FaMinus, FaSave, FaFolderOpen } from 'react-icons/fa';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import { useStudents } from '../../../hooks/useStudent';
import { StudentFormData } from '../../../utils/types/BasicUser';
import { PriorityType, SeatType } from '../../../utils/types/Team';
import Notification from '../../../components/shared/Notification';
import DraggableStudent from '../../../components/Team/DraggableStudent';
import DroppableSeat from '../../../components/Team/DroppableSeat';
import SeatFormModal from '../../../components/Team/SeatFormModal';
import VerificationHistory from '../../../components/Team/VerificationHistory';
import { Container } from '../../../styles/layoutUtils';
import { ActionButton } from '../../../styles/buttons';
import { findBestSeatForStudent, initializeLayout } from '../../../utils/classroomUtils';
import { useClassroomLayout } from '../../../hooks/useClassroomLayout';
import { useConferenceMode } from '../../../hooks/useConferenceMode';
import { getAttendanceColor, getStudentAttendance } from '../../../utils/attendanceUtils';
import { getSeatPosition } from '../../../utils/seatUtils';

// Importe os estilos necessários
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
import { useSeatingOperations } from '../../../hooks/useSeatingOperations';

const MAX_COLUMNS = 5;

const ClassroomLayoutPage: React.FC = () => {
    const [saveModalOpen, setSaveModalOpen] = useState(false);
    const [loadModalOpen, setLoadModalOpen] = useState(false);
    const [layoutName, setLayoutName] = useState('');
    const [swapMode, setSwapMode] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [view, setView] = useState<'table' | 'layout'>('layout');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });

    const { studentList } = useStudents();
    const { 
        layout, 
        savedLayouts, 
        editLayoutMode,
        addRow, 
        removeRow, 
        setLayout, 
        setSavedLayouts, 
        toggleEditLayout,
        loadLayout
    } = useClassroomLayout(3, 4);

    const showNotification = (message: string, type: string) => {
        setNotification({ show: true, message, type });
        setTimeout(() => {
            setNotification({ show: false, message: '', type: '' });
        }, 3000);
    };

    const { 
        conferenceMode, 
        finishDailyConference, 
        startDailyConference,
        onVerifySeat,
        viewDayDetails,
        checkedSeats,
        mismatchedSeats,
        verificationHistory
    } = useConferenceMode({ 
        showNotification, 
        setVerifyMode: () => {}, // Adicionado para compatibilidade
        setLayout 
    });

    const {
        selectedStudent,
        setSelectedStudent,
        selectedSeat,
        setSelectedSeat,
        handleSeatClick,
        removeStudentFromSeat,
        handleSaveSeat
    } = useSeatingOperations({
        layout,
        showNotification,
        setLayout,
        setIsModalOpen,
        setCurrentVerification: () => {} // Adicionado para compatibilidade
    });

    useEffect(() => {
        initializeLayout(5, MAX_COLUMNS);
    }, []);

    useEffect(() => {
        const saved = localStorage.getItem('savedLayouts');
        if (saved) {
            setSavedLayouts(JSON.parse(saved));
        }
    }, [setSavedLayouts]);

    const generateAutomaticLayout = () => {
        const newSeats = [...layout.seats];
        const unassignedStudents = [...studentList]
            .filter(student => !newSeats.some(s => s.studentId === student.id));

        const priorityStudents = unassignedStudents.filter(student => student.specialNeeds);
        priorityStudents.forEach(student => {
            const bestSeat = findBestSeatForStudent(student, newSeats);
            if (bestSeat) {
                bestSeat.studentId = student.id;
            }
        });

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

    const toggleView = () => {
        setView(prev => prev === 'table' ? 'layout' : 'table');
    };

    const saveCurrentLayout = () => {
        const newLayout = {
            name: layoutName,
            layout: JSON.parse(JSON.stringify(layout))
        };

        const updatedLayouts = [...savedLayouts, newLayout];
        setSavedLayouts(updatedLayouts);
        localStorage.setItem('savedLayouts', JSON.stringify(updatedLayouts));
        setSaveModalOpen(false);
        showNotification('Layout salvo com sucesso!', 'success');
    };

    const deleteLayout = (name: string) => {
        if (window.confirm(`Tem certeza que deseja excluir o layout "${name}"?`)) {
            const updated = savedLayouts.filter(l => l.name !== name);
            setSavedLayouts(updated);
            localStorage.setItem('savedLayouts', JSON.stringify(updated));
            showNotification(`Layout "${name}" excluído`, 'info');
        }
    };

    return (
        <Container>
            <Header>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <h1>Mapeamento da Sala de Aula</h1>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="text"
                            placeholder="Buscar aluno..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '4px',
                                border: '1px solid #ddd',
                                minWidth: '250px'
                            }}
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                style={{
                                    position: 'absolute',
                                    right: '8px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                ×
                            </button>
                        )}
                    </div>
                </div>
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
                    <ActionButton onClick={toggleEditLayout}>
                        {editLayoutMode ? 'Salvar Layout' : 'Editar Layout'}
                    </ActionButton>
                    <ActionButton onClick={() => setSaveModalOpen(true)}>
                        <FaSave /> Salvar Layout
                    </ActionButton>
                    <ActionButton onClick={() => setLoadModalOpen(true)}>
                        <FaFolderOpen /> Carregar Layout
                    </ActionButton>
                    <ActionButton
                        onClick={() => {
                            setSwapMode(!swapMode);
                            showNotification(
                                swapMode ? 'Modo de troca desativado' : 'Modo de troca ativado - selecione dois assentos',
                                'info'
                            );
                        }}
                        style={swapMode ? { backgroundColor: '#4CAF50', color: 'white' } : {}}
                    >
                        {swapMode ? 'Cancelar Troca' : 'Trocar Assentos'}
                    </ActionButton>
                    {editLayoutMode && (
                        <>
                            <ActionButton onClick={addRow}>
                                <FaPlus /> Adicionar Fileira
                            </ActionButton>
                            <ActionButton onClick={removeRow}>
                                <FaMinus /> Remover Fileira
                            </ActionButton>
                        </>
                    )}
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
                                    const attendance = getStudentAttendance(student.id);

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
                                            verifyMode={conferenceMode}
                                            getStudentAttendance={getStudentAttendance}
                                            getAttendanceColor={getAttendanceColor}
                                            getStudentName={(studentId?: number) => 
                                                studentList.find(s => s.id === studentId)?.name || ''
                                            }
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
                                            editMode={editLayoutMode}
                                            showTooltips={true}
                                            compactView={false}
                                            conferenceMode={conferenceMode}
                                            isChecked={checkedSeats.includes(seat.id)}
                                            isMismatched={mismatchedSeats.includes(seat.id)}
                                            onVerify={(seatId, isCorrect) => onVerifySeat(seatId, isCorrect)}
                                        />
                                    ))}
                                </GridContainer>
                            </ClassroomLayout>

                            <SettingsPanel>
                                {conferenceMode && (
                                    <ConferenceControlPanel>
                                        <h4>Conferência do Dia: {conferenceMode && new Date().toISOString().split('T')[0]}</h4>
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
                                    </ConferenceControlPanel>
                                )}
                                <VerificationHistory
                                    history={verificationHistory}
                                    viewDayDetails={viewDayDetails}
                                    seats={layout.seats}
                                    students={studentList}
                                    getSeatPosition={(seatId: string) => getSeatPosition(seatId, layout.seats)}
                                />
                            </SettingsPanel>
                        </LayoutContainer>
                    )}
                </DndProvider>
            </ContentContainer>

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

            {saveModalOpen && (
                <div className="modal-overlay" onClick={() => setSaveModalOpen(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h3>Salvar Layout</h3>
                        <input
                            type="text"
                            value={layoutName}
                            onChange={(e) => setLayoutName(e.target.value)}
                            placeholder="Nome do layout (ex: Aula 1, Prova)"
                        />
                        <div className="modal-actions">
                            <button onClick={() => setSaveModalOpen(false)}>Cancelar</button>
                            <button onClick={saveCurrentLayout}>Salvar</button>
                        </div>
                    </div>
                </div>
            )}

            {loadModalOpen && (
                <div className="modal-overlay" onClick={() => setLoadModalOpen(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h3>Carregar Layout</h3>
                        {savedLayouts.length === 0 ? (
                            <p>Nenhum layout salvo encontrado</p>
                        ) : (
                            <ul className="layout-list">
                                {savedLayouts.map((saved, index) => (
                                    <li key={index}>
                                        <div>
                                            <strong>{saved.name}</strong>
                                            <span>{saved.layout.rows} fileiras × {saved.layout.columns} colunas</span>
                                        </div>
                                        <div>
                                            <button onClick={() => {
                                                loadLayout(saved.layout, setLoadModalOpen, showNotification);
                                            }}>
                                                Carregar
                                            </button>
                                            <button
                                                onClick={() => deleteLayout(saved.name)}
                                                className="delete-btn"
                                            >
                                                Excluir
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <div className="modal-actions">
                            <button onClick={() => setLoadModalOpen(false)}>Fechar</button>
                        </div>
                    </div>
                </div>
            )}
        </Container>
    );
};

export default ClassroomLayoutPage;
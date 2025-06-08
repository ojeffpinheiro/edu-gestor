import React, { useState, useEffect } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import { useStudents } from '../../../hooks/useStudent';
import { useSeatManagement } from '../../../hooks/useSeatManagement';
import { useClassroomLayout } from '../../../hooks/useClassroomLayout';
import { useConferenceMode } from '../../../hooks/useConferenceMode';
import { useSeatingOperations } from '../../../hooks/useSeatingOperations';

import { findBestSeatForStudent, initializeLayout } from '../../../utils/classroomUtils';
import { getAttendanceColor, getStudentAttendance } from '../../../utils/attendanceUtils';
import { getSeatPosition } from '../../../utils/seatUtils';

import { ClassroomProvider } from '../../../contexts/ClassroomContext';

import Notification from '../../../components/shared/Notification';
import SeatFormModal from '../../../components/Team/SeatFormModal';
import VerificationHistory from '../../../components/Team/VerificationHistory';
import LayoutControls from '../../../components/Team/LayoutControls';
import ConferencePanel from '../../../components/Team/ConferencePanel';
import TableView from '../../../components/Team/TableView';
import LayoutView from '../../../components/Team/LayoutView';

import { Container } from '../../../styles/layoutUtils';
import { ActionButton } from '../../../styles/buttons';

import {
    ContentContainer,
    LayoutContainer,
    SettingsPanel,
    Header,
    ConferenceControlPanel,
    ConferenceStats,
    StatItem,
    StatLabel,
    StatValue,
} from './styles';
import { StudentFormData } from '../../../utils/types/BasicUser';
import SearchBar from '../../../components/Team/SearchBar';

const MAX_COLUMNS = 5;

const ClassroomLayoutPage: React.FC = () => {
    const [saveModalOpen, setSaveModalOpen] = useState(false);
    const [loadModalOpen, setLoadModalOpen] = useState(false);
    const [layoutName, setLayoutName] = useState('');
    const [swapMode, setSwapMode] = useState(false);
    const [view, setView] = useState<'table' | 'layout'>('layout');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filteredStudents, setFilteredStudents] = useState<StudentFormData[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    const [notification, setNotification] = useState({ show: false, message: '', type: '' });

    const { studentList } = useStudents();

    const {
        layout,
        savedLayouts,
        editLayoutMode,
        addRow,
        removeRow,
        addColumn,
        removeColumn,
        applyTemplate,
        setLayout,
        setSavedLayouts,
        toggleEditLayout,
        loadLayout,
        canAddColumn,
        canRemoveColumn,
        canAddRow,
        canRemoveRow
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
        setVerifyMode: () => { },
        setLayout
    });

    const {
        setSelectedStudent,
        selectedSeat,
        handleSeatClick,
        removeStudentFromSeat,
        handleSaveSeat
    } = useSeatingOperations({
        layout,
        showNotification,
        setLayout,
        setIsModalOpen,
        setCurrentVerification: () => { }
    });

    const { getStudentName, getPriorityInfo } = useSeatManagement({
        seats: layout.seats,
        students: studentList,
        onSeatUpdate: (seat) => {
            const updatedSeats = layout.seats.map(s => s.id === seat.id ? seat : s);
            setLayout({ ...layout, seats: updatedSeats });
        },
        onSeatSelect: (seat) => {
            if (seat) { // Adicione esta verificação
                handleSeatClick(seat);
            }
        }
    });

    useEffect(() => {
        const newLayout = initializeLayout(5, MAX_COLUMNS);
        setLayout(newLayout);
    }, []);

    useEffect(() => {
        const saved = localStorage.getItem('savedLayouts');
        if (saved) {
            setSavedLayouts(JSON.parse(saved));
        }
    }, [setSavedLayouts]);

    // Estado inicial - todos os alunos
    useEffect(() => {
        setFilteredStudents(studentList);
    }, [studentList]);

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

    const handleSaveLayout = () => {
        setSwapMode(!swapMode);
        showNotification(
            swapMode ? 'Modo de troca desativado' : 'Modo de troca ativado - selecione dois assentos',
            'info'
        );
    }

    const highlightText = (text: string, term: string) => {
        if (!term) return text;

        const parts = text.split(new RegExp(`(${term})`, 'gi'));
        return parts.map((part, i) =>
            part.toLowerCase() === term.toLowerCase() ?
                <mark key={i}>{part}</mark> :
                part
        );
    };

    const contextValue = {
        layout,
        studentList,
        setLayout,
        getStudentName,
        getStudentAttendance,
    };

    return (
        <ClassroomProvider value={contextValue} >
            <Container>
                <Header>
                    <h1>Gerenciamento de Alunos</h1>
                    <SearchBar
                        students={studentList}
                        onSearchResults={setFilteredStudents}
                    />
                    <LayoutControls
                        view={view}
                        conferenceMode={conferenceMode}
                        editLayoutMode={editLayoutMode}
                        swapMode={swapMode}
                        canAddRow={canAddRow}
                        canRemoveRow={canRemoveRow}
                        canAddColumn={canAddColumn}
                        canRemoveColumn={canRemoveColumn}
                        onApplyTemplate={applyTemplate}
                        onToggleView={toggleView}
                        onAddRow={addRow}
                        onRemoveRow={removeRow}
                        onGenerateLayout={generateAutomaticLayout}
                        onFinishConference={finishDailyConference}
                        onStartConference={startDailyConference}
                        onToggleEditLayout={toggleEditLayout}
                        onToggleSwapMode={handleSaveLayout}
                        onLoadLayout={() => setLoadModalOpen(true)}
                        onSaveLayout={handleSaveLayout}
                        onAddColumn={addColumn}
                        onRemoveColumn={removeColumn}
                    />
                </Header>

                <ContentContainer>
                    <DndProvider backend={HTML5Backend}>
                        {view === 'table' ? (
                            <TableView
                                getAttendanceColor={getAttendanceColor}
                                getStudentAttendance={getStudentAttendance}
                                layout={layout}
                                onSelectStudent={setSelectedStudent}
                                studentList={filteredStudents}
                                highlightText={(text) => highlightText(text, searchTerm)}
                            />
                        ) : (
                            <LayoutContainer>
                                <LayoutView
                                    layout={layout}
                                    studentList={filteredStudents}
                                    selectedSeat={selectedSeat}
                                    onSeatClick={handleSeatClick}
                                    setLayout={setLayout}
                                    conferenceMode={conferenceMode}
                                    editLayoutMode={editLayoutMode}
                                    getPriorityInfo={getPriorityInfo}
                                    getStudentName={getStudentName}
                                    isChecked={checkedSeats.includes(selectedSeat?.id || '')}
                                    isMismatched={mismatchedSeats.includes(selectedSeat?.id || '')}
                                    onVerify={(seatId, isCorrect) => onVerifySeat(seatId, isCorrect)}
                                />

                                <SettingsPanel>
                                    {conferenceMode && (
                                        <>
                                            <ConferencePanel
                                                conferenceDate={new Date().toISOString().split('T')[0]}
                                                checkedSeats={checkedSeats.length}
                                                mismatchedSeats={mismatchedSeats.length}
                                                absentees={layout.seats.filter(s => s.studentId && !checkedSeats.includes(s.id)).length}
                                                onFinish={finishDailyConference}
                                            />
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
                                        </>
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
        </ClassroomProvider>
    );
};

export default ClassroomLayoutPage;
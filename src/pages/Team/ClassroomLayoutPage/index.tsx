import React, { useEffect, useCallback } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import { ClassroomProvider, useClassroom } from '../../../contexts/ClassroomContext';
import { useConferenceMode } from '../../../hooks/useConferenceMode';
import { useLayoutManager } from '../../../hooks/useLayoutManager';
import { useSeatOperations } from '../../../hooks/useSeatingOperations';

import { initializeLayout } from '../../../utils/classroomUtils';
import { getAttendanceColor } from '../../../utils/attendanceUtils';
import { getSeatPosition } from '../../../utils/seatUtils';

import { DailyVerification, PRIORITY_CONFIGS, PriorityConfig, PriorityInfo, PriorityType } from '../../../utils/types/Team';

import Notification from '../../../components/shared/Notification';
import ConferencePanel from '../../../components/Team/ConferencePanel';
import LayoutControls from '../../../components/Team/LayoutControls';
import LayoutView from '../../../components/Team/LayoutView';
import SearchBar from '../../../components/Team/SearchBar';
import SeatFormModal from '../../../components/Team/SeatFormModal';
import TableView from '../../../components/Team/TableView';
import VerificationHistory from '../../../components/Team/VerificationHistory';

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
import { LoadLayoutModal } from '../../../components/Team/LoadLayoutModal';
import { SaveLayoutModal } from '../../../components/Team/SaveLayoutModal';

const MAX_COLUMNS = 5;

const ClassroomLayoutPage: React.FC = () => {
    const {
        state: {
            layout,
            selectedSeat,
            studentList,
            swapMode,
            editMode,
            view,
            notification,
            searchTerm,
            loadModalOpen,
            saveModalOpen
        },
        dispatch,
        actions
    } = useClassroom();

    const {
        canAddRow,
        canRemoveRow,
        canAddColumn,
        canRemoveColumn,
        addRow,
        removeRow,
        addColumn,
        removeColumn,
        applyTemplate,
        toggleEditLayout,
        loadLayout
    } = useLayoutManager();

    const {
        handleSeatClick,
        removeStudentFromSeat,
        handleSaveSeat,
        setSelectedStudent,
    } = useSeatOperations();

    const {
        conferenceMode,
        checkedSeats,
        mismatchedSeats,
        verificationHistory,
        startDailyConference,
        finishDailyConference,
        onVerifySeat,
    } = useConferenceMode();

    const getPriorityInfo = useCallback((priority?: PriorityType): PriorityConfig | PriorityInfo => {
        if (!priority) return { label: 'Normal', color: '#ccc', icon: 'default-icon' };

        return PRIORITY_CONFIGS[priority] || { label: priority, color: '#ccc', icon: 'default-icon' };
    }, []);

    const getStudentName = useCallback((studentId?: number): string => {
        if (!studentId) return '';
        const student = studentList.find(s => s.id === studentId);
        return student ? student.name : 'Aluno não encontrado';
    }, [studentList]);

    const viewDayDetails = useCallback((day: DailyVerification) => {
        console.log('Visualizando detalhes do dia:', day.date);
        // Implementação real viria aqui
    }, []);

    const { showNotification } = actions;

    // Efeitos corrigidos
    useEffect(() => {
        const newLayout = initializeLayout(5, MAX_COLUMNS);
        dispatch({ type: 'SET_LAYOUT', payload: newLayout });
    }, [dispatch]);

    useEffect(() => {
        const saved = localStorage.getItem('savedLayouts');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) {
                    dispatch({ type: 'SET_SAVED_LAYOUTS', payload: parsed });
                }
            } catch (e) {
                console.error('Error parsing saved layouts:', e);
            }
        }
    }, [dispatch]);

    useEffect(() => {
        dispatch({ type: 'SET_FILTERED_STUDENTS', payload: studentList });
    }, [studentList, dispatch]);

    const handleSaveLayout = () => {
        dispatch({ type: 'TOGGLE_SAVE_MODAL', payload: true });
        showNotification(
            swapMode ? 'Modo de troca desativado' : 'Modo de troca ativado - selecione dois assentos',
            'info'
        );
    };

    const handleSwapToggle = () => {
        if (editMode) {
            toggleEditLayout();
        }
        dispatch({ type: 'TOGGLE_SWAP_MODE' });
        showNotification(
            swapMode ? 'Modo de troca desativado' : 'Modo de troca ativado - selecione dois assentos',
            'info'
        );
    };

    const highlightText = (text: string, term: string) => {
        if (!term) return text;
        const parts = text.split(new RegExp(`(${term})`, 'gi'));
        return parts.map((part, i) =>
            part.toLowerCase() === term.toLowerCase() ?
                <mark key={i}>{part}</mark> :
                part
        );
    };

    return (
        <ClassroomProvider>
            <Container>
                <Header>
                    <h1>Gerenciamento de Alunos</h1>
                    <SearchBar
                        students={studentList}
                        onSearchResults={(results) => dispatch({ type: 'SET_FILTERED_STUDENTS', payload: results })}
                    />
                    <LayoutControls
                        conferenceMode={conferenceMode}
                        canAddRow={canAddRow}
                        canRemoveRow={canRemoveRow}
                        canAddColumn={canAddColumn}
                        canRemoveColumn={canRemoveColumn}
                        onApplyTemplate={applyTemplate}
                        onAddRow={addRow}
                        onRemoveRow={removeRow}
                        onFinishConference={finishDailyConference}
                        onStartConference={startDailyConference}
                        onToggleEditLayout={toggleEditLayout}
                        onToggleSwapMode={handleSwapToggle}
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
                                onSelectStudent={setSelectedStudent}
                                highlightText={(text) => highlightText(text, searchTerm)}
                            />
                        ) : (
                            <LayoutContainer>
                                <LayoutView
                                    conferenceMode={conferenceMode}
                                    isChecked={checkedSeats.includes(selectedSeat?.id || '')}
                                    isMismatched={mismatchedSeats.includes(selectedSeat?.id || '')}
                                    onSeatClick={handleSeatClick}
                                    getPriorityInfo={getPriorityInfo}
                                    getStudentName={getStudentName}
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
                        onSave={handleSaveSeat}
                        onDelete={() => {
                            removeStudentFromSeat(selectedSeat.id);
                            dispatch({ type: 'TOGGLE_MODAL', payload: false });
                        }}
                    />
                )}

                {notification.show && (
                    <Notification
                        message={notification.message}
                        type={notification.type}
                    />
                )}

                {saveModalOpen && <SaveLayoutModal /> }

                {loadModalOpen && (
                    <LoadLayoutModal 
                        onClose={() => dispatch({ type: 'TOGGLE_LOAD_MODAL', payload: false })}
                        loadLayout={loadLayout} />
                )}
            </Container>
        </ClassroomProvider>
    );
};

export default ClassroomLayoutPage;
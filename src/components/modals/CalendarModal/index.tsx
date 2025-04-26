import React from "react";

import Calendar, { CalendarEvent } from "../../../components/Calendar";

import { TabButton } from '../../../styles/buttons'
import {
    TabContainer,
    EventIndicator
} from "./style";
import Modal from "../Modal";

interface CalendarModalProps {
    events: CalendarEvent[];
    selectedDate: Date;
    onSelectDate: (date: Date) => void;
    activeTab: string;
    onTabChange: (tab: string) => void;
    onClose: () => void;
}

/**
 * Modal para exibição do calendário
 */
const CalendarModal: React.FC<CalendarModalProps> = ({
    events,
    selectedDate,
    onSelectDate,
    activeTab,
    onTabChange,
    onClose
 }) => {

    const filteredEvents = events.filter(event =>
        activeTab === 'todos' || event.type === activeTab
    ).map(event => ({
        id: event.id,
        date: event.date,
        title: event.title,
        type: event.type
    }));

    return (
        <Modal 
            isOpen={!!events} 
            title='Calendário da Turma'
            onClose={onClose}
            size="sm" >
                <TabContainer>
                    <TabButton active={activeTab === 'todos'} onClick={() => onTabChange('todos')}>Todos</TabButton>
                    <TabButton active={activeTab === 'atividade'} onClick={() => onTabChange('atividade')}>Atividades</TabButton>
                    <TabButton active={activeTab === 'avaliacao'} onClick={() => onTabChange('avaliacao')}>Avaliações</TabButton>
                    <TabButton active={activeTab === 'evento'} onClick={() => onTabChange('evento')}>Eventos</TabButton>
                </TabContainer>

                <Calendar 
                    initialSelectedDate={selectedDate} 
                    onSelectDate={onSelectDate} 
                    events={filteredEvents} 
                    className="calendar-wrapper" />

                <div className="legend" style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                    <div style={{ marginRight: '1rem' }}><EventIndicator className="atividade" /> Atividades</div>
                    <div style={{ marginRight: '1rem' }}><EventIndicator className="avaliacao" /> Avaliações</div>
                    <div><EventIndicator className="evento" /> Eventos</div>
                </div>
        </Modal>
    );
};

export default CalendarModal;

import React, { useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";

import Calendar from "../../../components/Calendar";

import { Button, CloseButton } from '../../../styles/buttons'
import {
    ModalContainer,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    TabContainer,
    TabButton,
    EventIndicator
} from "./style";
import { Event } from "../../../utils/types/Event";


interface CalendarModalProps {
    events: Event[];
    onClose: () => void;
    selectedDate: Date;
    onSelectDate: (date: Date) => void;
    activeTab: string;
    onTabChange: (tab: string) => void;
}

/**
 * Modal para exibição do calendário
 */
const CalendarModal: React.FC<CalendarModalProps> = ({ events, onClose, selectedDate, onSelectDate, activeTab, onTabChange }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    const filteredEvents = events.filter(event =>
        activeTab === 'todos' || event.type === activeTab
    ).map(event => ({
        date: event.date,
        title: event.title
    }));

    /**
        * Detecta cliques fora do modal para fechá-lo
    */
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    /**
        * Fecha o modal ao clicar fora dele
    */
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, [onClose]);


    return (
        <ModalContainer role="dialog" aria-modal="true" data-testid="calendar-modal">
            <ModalContent ref={modalRef} className="large" >
                <ModalHeader>
                    <h3>Calendário da Turma</h3>
                    <CloseButton
                        onClick={onClose}
                        aria-label="Fechar modal"
                        title="Fechar"
                        data-testid="close-modal-btn"
                    >
                        <FaTimes />
                    </CloseButton>
                </ModalHeader>
                <ModalBody>
                    <TabContainer>
                        <TabButton active={activeTab === 'todos'} onClick={() => onTabChange('todos')}>Todos</TabButton>
                        <TabButton active={activeTab === 'atividade'} onClick={() => onTabChange('atividade')}>Atividades</TabButton>
                        <TabButton active={activeTab === 'avaliacao'} onClick={() => onTabChange('avaliacao')}>Avaliações</TabButton>
                        <TabButton active={activeTab === 'evento'} onClick={() => onTabChange('evento')}>Eventos</TabButton>
                    </TabContainer>

                    {/*<Calendar initialSelectedDate={selectedDate} onSelectDate={onSelectDate} events={filteredEvents} className="calendar-wrapper" />*/}

                    <div className="legend" style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                        <div style={{ marginRight: '1rem' }}><EventIndicator className="atividade" /> Atividades</div>
                        <div style={{ marginRight: '1rem' }}><EventIndicator className="avaliacao" /> Avaliações</div>
                        <div><EventIndicator className="evento" /> Eventos</div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button variant="secondary" onClick={onClose}>Fechar</Button>
                </ModalFooter>
            </ModalContent>
        </ModalContainer>
    );
};

export default CalendarModal;

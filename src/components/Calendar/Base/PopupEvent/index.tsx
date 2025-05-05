import React from 'react';
import { constants, EventTypeConfig } from "../../../../utils/consts";
import { CalendarEvent } from "../../../../utils/types/CalendarEvent";
import { CloseButton, PopupContainer, PopupHeader, PopupTitle } from '../../Views/AnnualView/styles';
import { format } from 'date-fns';
import { FaTimes } from 'react-icons/fa';
import EventListItem from '../EventListItem';
import { ptBR } from 'date-fns/locale';

// components/EventPopup.tsx
interface EventPopupProps {
    selectedDay: Date | null;
    onClose: () => void;
    events: CalendarEvent[];
    eventTypes: EventTypeConfig[];
    onEdit: (event: CalendarEvent) => void;
    onDuplicate: (event: CalendarEvent) => void;
    onDelete: (event: CalendarEvent) => void;
}

const EventPopup: React.FC<EventPopupProps> = ({ selectedDay, onClose, events, eventTypes, onEdit, onDuplicate, onDelete }) => {
    if (!selectedDay) return null;

    return (
        <PopupContainer visible={!!selectedDay}>
            <PopupHeader>
                <PopupTitle>
                    {format(selectedDay, 'PPPP', { locale: ptBR })}
                </PopupTitle>
                < CloseButton onClick={onClose} >
                    <FaTimes />
                </CloseButton>
            </PopupHeader>

            {
                events.length > 0 ? (
                    events.map(event => {
                        const eventType = eventTypes.find(c => c.type === event.type);
                        const eventColor = eventType?.color || constants.colors.primary;

                        return (
                            <EventListItem
                                key={event.id}
                                event={event}
                                color={eventColor}
                                onEdit={onEdit}
                                onDuplicate={onDuplicate}
                                onDelete={onDelete}
                            />
                        );
                    })
                ) : (
                    <p>Nenhum evento neste dia </p>
                )}
        </PopupContainer>
    );
};

export default EventPopup;
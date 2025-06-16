import React from 'react';
import Modal from '../../../modals/Modal';
import { Input, Select, Label } from '../../../../styles/inputs';
import { Button } from '../../../../styles/buttons';
import { FormGroup } from '../../../../styles/formControls';

interface AddLessonModalProps {
    isOpen: boolean;
    onClose: () => void;
    newLesson: {
        day: string;
        timeSlot: string;
        discipline: string;
        team: string;
    };
    setNewLesson: React.Dispatch<React.SetStateAction<{
        day: string;
        timeSlot: string;
        discipline: string;
        team: string;
    }>>;
    onSubmit: (e: React.FormEvent) => void;
}

const weekDays = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
const timeSlots = [
    '07:00 - 08:00',
    '08:00 - 09:00',
    '09:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '13:00 - 14:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
    '16:00 - 17:00',
    '17:00 - 18:00',
];

const AddLessonModal: React.FC<AddLessonModalProps> = ({
    isOpen,
    onClose,
    newLesson,
    setNewLesson,
    onSubmit
}) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(e);
    };

    return (
        <Modal
            isOpen={isOpen}
            size='md'
            onClose={onClose}
            title='Adicionar Nova Aula'
        >
            <form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Dia da Semana</Label>
                    <Select
                        value={newLesson.day}
                        onChange={(e) => setNewLesson({ ...newLesson, day: e.target.value })}
                    >
                        {weekDays.map(day => (
                            <option key={day} value={day}>{day}</option>
                        ))}
                    </Select>
                </FormGroup>

                <FormGroup>
                    <Label>Horário</Label>
                    <Select
                        value={newLesson.timeSlot}
                        onChange={(e) => setNewLesson({ ...newLesson, timeSlot: e.target.value })}
                    >
                        {timeSlots.map(time => (
                            <option key={time} value={time}>{time}</option>
                        ))}
                    </Select>
                </FormGroup>

                <FormGroup>
                    <Label>Disciplina</Label>
                    <Input
                        type="text"
                        required
                        placeholder="Ex: Matemática"
                        value={newLesson.discipline}
                        onChange={(e) => setNewLesson({ ...newLesson, discipline: e.target.value })}
                    />
                </FormGroup>

                <FormGroup>
                    <Label>Turma</Label>
                    <Input
                        type="text"
                        required
                        placeholder="Ex: 8º Ano A"
                        value={newLesson.team}
                        onChange={(e) => setNewLesson({ ...newLesson, team: e.target.value })}
                    />
                </FormGroup>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                    <Button type="button" variant="error" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button type="submit" variant="primary">
                        Adicionar Aula
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default AddLessonModal;
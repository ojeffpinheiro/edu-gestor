import React from 'react';
import { Lesson, Team, DayOfWeek } from '../../utils/types/Planning';
import { FormGroup, Label } from '../../styles/formControls';
import { Input, Select } from '../../styles/inputs';
import ValidationFeedback from '../ui/ValidationFeedback';
import Modal from '../modals/Modal';
import { FormGrid } from '../../styles/layoutUtils';
import { ModalBody } from '../../styles/modals';

interface LessonFormProps {
    isOpen: boolean;
    lesson: Lesson;
    errors: Record<string, string>;
    teams: Team[];
    daysOfWeek?: DayOfWeek[];
    timeSlots?: string[];
    selectedCell?: { day: DayOfWeek; time: string } | null;
    onChange: (updatedLesson: Partial<Lesson>) => void;
    onSubmit: (e: React.FormEvent) => void;
    onClose: () => void;
    isLoading?: boolean;
}

const defaultDaysOfWeek: DayOfWeek[] = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
const defaultTimeSlots = [
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

export const LessonForm: React.FC<LessonFormProps> = ({
    isOpen,
    lesson,
    errors,
    teams,
    daysOfWeek = defaultDaysOfWeek,
    timeSlots = defaultTimeSlots,
    selectedCell,
    onChange,
    onSubmit,
    onClose,
    isLoading = false,
}) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(e);
    };

    const modalTitle = selectedCell
        ? `Adicionar Aula - ${selectedCell.day} ${selectedCell.time}`
        : 'Adicionar Nova Aula';

    return (
        <Modal
            isOpen={isOpen}
            size='md'
            title={modalTitle}
            onClose={onClose}
            onSubmit={() => handleSubmit}
            submitText="Salvar Aula"
            closeOnClickOutside={false}
            showFooter={true}
        >
            <ModalBody id="modal-content">
                <form onSubmit={handleSubmit}>
                    <FormGrid>
                        <FormGroup>
                            <Label>Turma</Label>
                            {teams.length > 0 ? (
                                <>
                                    <Select
                                        value={lesson.team}
                                        onChange={(e) => onChange({ team: e.target.value })}
                                        disabled={isLoading}
                                    >
                                        <option value="">Selecione uma turma</option>
                                        {teams.map((team) => (
                                            <option key={team.id} value={team.name}>
                                                {team.name}
                                            </option>
                                        ))}
                                    </Select>
                                    <ValidationFeedback error={errors.team} />
                                </>
                            ) : (
                                <>
                                    <Input
                                        type="text"
                                        placeholder="Ex: 8º Ano A"
                                        value={lesson.team}
                                        onChange={(e) => onChange({ team: e.target.value })}
                                        disabled={isLoading}
                                        required
                                    />
                                    <ValidationFeedback error={errors.team} />
                                </>
                            )}
                        </FormGroup>

                        <FormGroup>
                            <Label>Dia da Semana</Label>
                            <Select
                                value={lesson.day}
                                onChange={(e) => onChange({ day: e.target.value as DayOfWeek })}
                                disabled={isLoading || !!selectedCell?.day}
                                required
                            >
                                {!selectedCell?.day && <option value="">Selecione um dia</option>}
                                {daysOfWeek.map((day) => (
                                    <option key={day} value={day}>
                                        {day}
                                    </option>
                                ))}
                            </Select>
                            <ValidationFeedback error={errors.day} />
                        </FormGroup>

                        <FormGroup>
                            <Label>Horário</Label>
                            <Select
                                value={lesson.timeSlot}
                                onChange={(e) => onChange({ timeSlot: e.target.value })}
                                disabled={isLoading || !!selectedCell?.time}
                                required
                            >
                                {!selectedCell?.time && <option value="">Selecione um horário</option>}
                                {timeSlots.map((time) => (
                                    <option key={time} value={time}>
                                        {time}
                                    </option>
                                ))}
                            </Select>
                            <ValidationFeedback error={errors.timeSlot} />
                        </FormGroup>

                        <FormGroup>
                            <Label>Disciplina</Label>
                            <Input
                                type="text"
                                placeholder="Ex: Matemática"
                                value={lesson.discipline}
                                onChange={(e) => onChange({ discipline: e.target.value })}
                                disabled={isLoading}
                                required
                            />
                            <ValidationFeedback error={errors.discipline} />
                        </FormGroup>
                    </FormGrid>
                </form>
            </ModalBody>
        </Modal>
    );
};

export default LessonForm;
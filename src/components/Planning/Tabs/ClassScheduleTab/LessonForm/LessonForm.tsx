import React from 'react';
import { Lesson, Team } from '../../../../../utils/types/Planning';
import { FormGroup, Label } from '../../../../../styles/formControls';
import { Input, Select } from '../../../../../styles/inputs';
import ValidationFeedback from '../../../../ui/ValidationFeedback';
import Modal from '../../../../modals/Modal';
import { FormGrid } from '../../../../../styles/layoutUtils';

interface LessonFormProps {
    isOpen: boolean;
    lesson: Lesson;
    errors: Record<string, string>;
    teams: Team[];
    daysOfWeek: string[];
    timeSlots: string[];
    selectedCell: {day: string, time: string} | null
    onChange: (updatedLesson: Partial<Lesson>) => void;
    onSubmit: (updatedLesson: Lesson) => void;
    onClose: () => void;
}

export const LessonForm: React.FC<LessonFormProps> = ({
    isOpen,
    lesson,
    errors,
    teams,
    daysOfWeek,
    timeSlots,
    selectedCell,
    onChange,
    onSubmit,
    onClose,
}) => {
    return (
        <Modal 
            isOpen={isOpen}
            size='md'
            title={selectedCell ? `Adicionar Aula - ${selectedCell.day} ${selectedCell.time}` : 'Adicionar Nova Aula'}
            onClose={ onClose }
            onSubmit={() => onSubmit }
            submitText=''
            closeOnClickOutside = { false }
        >
            <FormGrid>
                <FormGroup>
                    <Label>Turma</Label>
                    <Select
                        value={lesson.team}
                        onChange={(e) => onChange({ team: e.target.value })}
                    >
                        <option value="">Selecione uma turma</option>
                        {teams.map((team) => (
                            <option key={team.id} value={team.name}>
                                {team.name}
                            </option>
                        ))}
                    </Select>
                    <ValidationFeedback error={errors.team} />
                </FormGroup>

                <FormGroup>
                    <Label>Dia da Semana</Label>
                    <Select
                        value={lesson.day}
                        onChange={(e) => onChange({ day: e.target.value as Lesson['day'] })}
                    >
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
                        onChange={(e) => onChange({ timeSlot: e.target.value as Lesson['timeSlot'] })}
                    >
                        <option value="">Selecione um horário</option>
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
                    />
                    <ValidationFeedback error={errors.discipline} />
                </FormGroup>
            </FormGrid>
        </Modal>
    );
};
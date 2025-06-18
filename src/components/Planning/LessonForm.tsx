import React from 'react';
import { Lesson, DayOfWeek } from '../../utils/types/Planning';
import { useModal } from '../../contexts/ModalContext';
import { useLessons } from '../../contexts/LessonsContext';
import { useTeams } from '../../contexts/TeamsContext';
import Modal from '../modals/Modal';
import { FormGrid } from '../../styles/layoutUtils';
import { FormGroup, Label } from '../../styles/formControls';
import { ModalBody } from '../../styles/modals';
import { Input, Select } from '../../styles/inputs';

const daysOfWeekOptions: DayOfWeek[] = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
const timeSlotsOptions = [
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

const LessonForm: React.FC = () => {
    const { state: modalState, actions: modalActions } = useModal();
    const { state: teamsState } = useTeams();
    const {
        state: { currentLesson },
        setCurrentLesson,
        addLesson,
        updateLesson
    } = useLessons();

    if (modalState.type !== 'LESSON_FORM') return null;

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();

        // Garante que currentLesson tenha todos os campos obrigatórios
        const completeLesson: Lesson = {
            id: currentLesson.id || Date.now(),
            team: currentLesson.team || '',
            day: currentLesson.day || 'Segunda',
            timeSlot: currentLesson.timeSlot || '',
            discipline: currentLesson.discipline || '',
            shift: currentLesson.shift || 'Manhã'
        };

        if (!currentLesson.id) {
            addLesson(completeLesson);
        } else {
            updateLesson(completeLesson);
        }
        modalActions.closeModal();
    };

    const handleChange = (updated: Partial<Lesson>) => {
        setCurrentLesson({ ...currentLesson, ...updated });
    };

    return (
        <Modal
            isOpen={true}
            size='md'
            title={currentLesson.id ? 'Editar Aula' : 'Nova Aula'}
            onClose={modalActions.closeModal}
            onSubmit={() => handleSubmit()} // Agora compatível com o tipo esperado
            submitText="Salvar Aula"
            closeOnClickOutside={false}
            showFooter={true}
        >
            <ModalBody id="modal-content">
                <form onSubmit={handleSubmit}>
                    <FormGrid>
                        <FormGroup>
                            <Label>Turma</Label>
                            {teamsState.teams.length > 0 ? (
                                <Select
                                    value={currentLesson.team || ''}
                                    onChange={(e) => handleChange({ team: e.target.value })}
                                >
                                    <option value="">Selecione uma turma</option>
                                    {teamsState.teams.map((team) => (
                                        <option key={team.id} value={team.id}>
                                            {team.name}
                                        </option>
                                    ))}
                                </Select>
                            ) : (
                                <Input
                                    type="text"
                                    placeholder="Ex: 8º Ano A"
                                    value={currentLesson.team || ''}
                                    onChange={(e) => handleChange({ team: e.target.value })}
                                    required
                                />
                            )}
                        </FormGroup>

                        <FormGroup>
                            <Label>Dia da Semana</Label>
                            <Select
                                value={currentLesson.day || ''}
                                onChange={(e) => handleChange({ day: e.target.value as DayOfWeek })}
                            >
                                <option value="">Selecione um dia</option>
                                {daysOfWeekOptions.map((day) => (
                                    <option key={day} value={day}>
                                        {day}
                                    </option>
                                ))}
                            </Select>
                        </FormGroup>

                        <FormGroup>
                            <Label>Horário</Label>
                            <Select
                                value={currentLesson.timeSlot || ''}
                                onChange={(e) => handleChange({ timeSlot: e.target.value })}
                                required
                            >
                                <option value="">Selecione um horário</option>
                                {timeSlotsOptions.map((time) => (
                                    <option key={time} value={time}>
                                        {time}
                                    </option>
                                ))}
                            </Select>
                        </FormGroup>

                        <FormGroup>
                            <Label>Disciplina</Label>
                            <Input
                                type="text"
                                placeholder="Ex: Matemática"
                                value={currentLesson.discipline || ''}
                                onChange={(e) => handleChange({ discipline: e.target.value })}
                                required
                            />
                        </FormGroup>
                    </FormGrid>
                </form>
            </ModalBody>
        </Modal>
    );
};

export default LessonForm;
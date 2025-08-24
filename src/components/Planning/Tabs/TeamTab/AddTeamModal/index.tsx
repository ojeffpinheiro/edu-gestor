import React, { useState, useEffect } from 'react';
import { FaUsers, FaGraduationCap, FaClock, FaUpload } from 'react-icons/fa';

import { Session, Team } from '../../../../../types/academic/Planning';
import Modal from '../../../../modals/Modal';
import { ModalBody } from '../../../../../styles/modals';
import { FormGroup } from '../../../../../styles/formControls';

import {
    Label,
    Input,
    TextArea,
    FileUpload,
    FileUploadLabel,
    SessionSelector,
    SessionOption,
    ErrorMessage
} from './styles';

interface TeamModalProps {
    teamData: Omit<Team, 'id'>;
    editingTeam: Team | null;
    onSave: (team: Omit<Team, 'id'>) => void;
    onClose: () => void;
}

const TeamModal: React.FC<TeamModalProps> = ({ teamData, editingTeam, onSave, onClose }) => {
    const [formData, setFormData] = useState<Omit<Team, 'id'>>(teamData);
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        setFormData(teamData);
    }, [teamData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            // Aqui você pode processar o arquivo se necessário
            // Por enquanto, apenas armazenamos o nome do arquivo
            setFormData(prev => ({
                ...prev,
                studentList: e.target.files?.[0]?.name || ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Nome da turma é obrigatório';
        }

        if (formData.numStudent <= 0) {
            newErrors.numStudent = 'Número de alunos deve ser maior que zero';
        }

        if (!(formData.gradeLevel ?? '').trim()) {
            newErrors.gradeLevel = 'Série/Ano é obrigatório';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            onSave(formData);
        }
    };

    return (
        <Modal
            isOpen={true}
            title={editingTeam ? 'Editar Turma' : 'Nova Turma'}
            submitText={editingTeam ? 'Salvar Alterações' : 'Criar Turma'}
            cancelText='Cancelar'
            onClose={onClose} onSubmit={() => handleSubmit}
        >
            <ModalBody>
                <form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="name">
                            <FaUsers /> Nome da Turma
                        </Label>
                        <Input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Ex: 8º Ano A"
                            hasError={!!errors.name}
                        />
                        {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="gradeLevel">
                            <FaGraduationCap /> Série/Ano
                        </Label>
                        <Input
                            type="text"
                            id="gradeLevel"
                            name="gradeLevel"
                            value={formData.gradeLevel}
                            onChange={handleChange}
                            placeholder="Ex: 8º Ano"
                            hasError={!!errors.gradeLevel}
                        />
                        {errors.gradeLevel && <ErrorMessage>{errors.gradeLevel}</ErrorMessage>}
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="numStudent">
                            <FaUsers /> Número de Alunos
                        </Label>
                        <Input
                            type="number"
                            id="numStudent"
                            name="numStudent"
                            value={formData.numStudent || ''}
                            onChange={handleChange}
                            min="1"
                            hasError={!!errors.numStudent}
                        />
                        {errors.numStudent && <ErrorMessage>{errors.numStudent}</ErrorMessage>}
                    </FormGroup>

                    <FormGroup>
                        <Label>Período</Label>
                        <SessionSelector>
                            {Object.values(Session).map(session => (
                                <SessionOption
                                    key={session}
                                    $active={formData.session === session}
                                    onClick={() => setFormData({ ...formData, session })}
                                >
                                    <FaClock /> {session}
                                </SessionOption>
                            ))}
                        </SessionSelector>
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="specificRequirements">
                            Requisitos Específicos
                        </Label>
                        <TextArea
                            id="specificRequirements"
                            name="specificRequirements"
                            value={formData.specificRequirements || ''}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Alguma necessidade especial ou observação importante..."
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>
                            <FaUpload /> Lista de Alunos (Opcional)
                        </Label>
                        <FileUploadLabel htmlFor="studentList">
                            {formData.studentList || 'Selecionar arquivo...'}
                            <FileUpload
                                type="file"
                                id="studentList"
                                accept=".csv,.xlsx,.xls"
                                onChange={handleFileChange}
                            />
                        </FileUploadLabel>
                    </FormGroup>
                </form>
            </ModalBody>
        </Modal>
    );
};

export default TeamModal;
import React, { useState } from 'react';
import { RecoveryActivity } from '../../types/evaluation/AssessmentEvaluation';
import { ModalBody, ModalContainer, ModalFooter, ModalHeader } from '../../styles/modals';
import { ModalContent } from '../../styles/baseComponents';
import { Button } from '../../styles/buttons';

interface RecoveryActivityModalProps {
    onSave: (activity: RecoveryActivity) => void;
    onClose: () => void;
}

const RecoveryActivityModal: React.FC<RecoveryActivityModalProps> = ({ onSave, onClose }) => {
    const [activity, setActivity] = useState<Omit<RecoveryActivity, 'id'>>({
        class: '',
        name: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        status: 'pending',
        targetStudents: [],
        evaluationParts: []
    });

    const handleSubmit = () => {
        onSave({
            ...activity,
            id: Date.now() // Temporary ID
        });
    };

    return (
        <ModalContainer>
            <ModalContent>
                <ModalHeader>
                    <h3>Nova Atividade de Recuperação</h3>
                    <button onClick={onClose}>&times;</button>
                </ModalHeader>
                <ModalBody>
                    <div>
                        <label>Turma:</label>
                        <select 
                            value={activity.class}
                            onChange={(e) => setActivity({...activity, class: e.target.value})}
                        >
                            <option value="">Selecione</option>
                            <option value="Ensino Médio 1 ano">1º Ano do Médio</option>
                            <option value="Ensino Médio 2 ano">2º Ano do Médio</option>
                            <option value="Ensino Médio 3 ano">3º Ano do Médio</option>
                        </select>
                    </div>
                    <div>
                        <label>Nome da Atividade:</label>
                        <input 
                            type="text" 
                            value={activity.name}
                            onChange={(e) => setActivity({...activity, name: e.target.value})}
                        />
                    </div>
                    <div>
                        <label>Descrição:</label>
                        <textarea 
                            value={activity.description}
                            onChange={(e) => setActivity({...activity, description: e.target.value})}
                        />
                    </div>
                    <div>
                        <label>Data:</label>
                        <input 
                            type="date" 
                            value={activity.date}
                            onChange={(e) => setActivity({...activity, date: e.target.value})}
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose}>Cancelar</Button>
                    <Button onClick={handleSubmit}>Salvar</Button>
                </ModalFooter>
            </ModalContent>
        </ModalContainer>
    );
};

export default RecoveryActivityModal;
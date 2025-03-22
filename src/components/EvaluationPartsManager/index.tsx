import React, { useEffect, useState } from "react";

import { EvaluationPart } from '../../utils/types'

import { Table, TableHeader, TableRow, Td } from "../../styles/table";
import { Input } from "../../styles/inputs";

import { Button, CloseButton } from "../../styles/buttons";
import { ModalOverlay, ModalContent } from "./styles";
import { FaTrash } from "react-icons/fa";

const AddNewPartModal: React.FC<{ isOpen: boolean; onClose: () => void; onSave: (part: EvaluationPart) => void }> = ({ isOpen, onClose, onSave }) => {
    const [newPart, setNewPart] = useState<EvaluationPart>({ id: '', name: '', weight: 0, maxScore: 10 });

    if (!isOpen) return null;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewPart(prev => ({ ...prev, [name]: name === 'weight' || name === 'maxScore' ? Number(value) : value }));
    };

    const handleSave = () => {
        onSave(newPart);
        setNewPart({ id: '', name: '', weight: 0, maxScore: 10 }); // Reset form
    };

    return (
        <ModalOverlay>
            <ModalContent>
                <CloseButton onClick={onClose} />
                <h2>Adicionar Nova Parte</h2>
                <Input type="text" name="name" placeholder="Nome da Parte" value={newPart.name} onChange={handleInputChange} />
                <Input type="number" name="weight" min='0' max='100' placeholder="Peso (%)" value={newPart.weight} onChange={handleInputChange} />
                <Input type="number" name="maxScore" min='0' placeholder="Nota Máxima" value={newPart.maxScore} onChange={handleInputChange} />
                <Button variant="primary" onClick={handleSave}>Adicionar</Button>
                <Button variant="secondary" onClick={onClose}>Cancelar</Button>
            </ModalContent>
        </ModalOverlay>
    );
};

const EvaluationPartsManager: React.FC<{
    evaluationId: string;
    parts: EvaluationPart[];
    onUpdate: (parts: EvaluationPart[]) => void;
}> = ({ evaluationId, parts, onUpdate }) => {
    const [editParts, setEditParts] = useState<EvaluationPart[]>([...parts]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setEditParts([...parts]);
    }, [parts]);

    const handleAddPart = (part: EvaluationPart) => {
        setEditParts(prev => [...prev, part]);
        onUpdate([...editParts, part]);
    };

    const handleDeletePart = (id: string) => {
        const updated = editParts.filter(part => part.id !== id);
        setEditParts(updated);
        onUpdate(updated);
    };

    return (
        <>
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>Adicionar Parte</Button>
            <Table>
                <thead>
                    <TableRow>
                        <TableHeader>Nome da Parte</TableHeader>
                        <TableHeader>Peso (%)</TableHeader>
                        <TableHeader>Nota Máxima</TableHeader>
                        <TableHeader>Ações</TableHeader>
                    </TableRow>
                </thead>
                <tbody>
                    {editParts.map((part) => (
                        <TableRow key={part.id}>
                            <Td>{part.name}</Td>
                            <Td>{part.weight}</Td>
                            <Td>{part.maxScore}</Td>
                            <Td>
                                <Button onClick={() => handleDeletePart(part.id)}>
                                   <FaTrash /> 
                                </Button>
                            </Td>
                        </TableRow>
                    ))}
                </tbody>
            </Table>
            { isModalOpen && (
                <AddNewPartModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleAddPart} />
            )}
        </>
    );
};


export default EvaluationPartsManager;
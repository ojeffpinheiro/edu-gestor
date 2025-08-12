import React from 'react'
import { Modal } from "../Modal";
import LoadingSpinner from '../shared/LoadingSpinner';
import { ConfirmationDialog } from './ConfirmationDialog';

interface Props {
    isOpen: boolean;
    count: number;
    isCombining: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const CombineQuestionsModal: React.FC<Props> = ({
    isOpen,
    count,
    isCombining,
    onConfirm,
    onCancel
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onCancel} title="Combinar Questões" size="md">
            {isCombining ? (
                <LoadingSpinner message="Combinando questões..." />
            ) : (
                <ConfirmationDialog
                    title="Combinar Questões"
                    message={`Você está prestes a combinar ${count} questões em uma nova questão composta.`}
                    additionalMessage="Esta ação criará uma nova questão que referencia as questões selecionadas."
                    confirmText="Combinar"
                    onConfirm={onConfirm}
                    onCancel={onCancel}
                />
            )}
        </Modal>
    );
};

export default CombineQuestionsModal;
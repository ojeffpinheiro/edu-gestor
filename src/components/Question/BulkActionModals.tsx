import React from 'react'
import { QuestionStatus } from "../../types/evaluation/Question";
import { CategoryWithId } from "./QuestionForm/type";
import ConfirmationModal from './ConfirmationModal';
import { BulkMoveModal } from './BulkMoveModal';

interface BulkActionModalsProps {
  showStatusModal: boolean;
  showMoveModal: boolean;
  showCombineModal: boolean;
  selectedQuestionsCount: number;
  newStatus: QuestionStatus;
  categories: CategoryWithId[];
  isCombining: boolean;
  onStatusConfirm: () => void;
  onStatusCancel: () => void;
  onMoveConfirm: (discipline: string) => void;
  onMoveCancel: () => void;
  onCombineConfirm: () => void;
  onCombineCancel: () => void;
  setSelectedDiscipline?: (discipline: string) => void;
}

const BulkActionModals: React.FC<BulkActionModalsProps> = ({ ...props }) => (
  <>
    <ConfirmationModal
      isOpen={props.showStatusModal}
      title="Alterar status"
      message={`Deseja alterar o status de ${props.selectedQuestionsCount} questão(ões)?`}
      onConfirm={props.onStatusConfirm}
      onCancel={props.onStatusCancel}
    />

    <BulkMoveModal
      isOpen={props.showMoveModal}
      onClose={props.onMoveCancel}
      onConfirm={props.onMoveConfirm}
      categories={props.categories}
      count={props.selectedQuestionsCount}
    />

    <ConfirmationModal
      isOpen={props.showCombineModal}
      title="Combinar questões"
      message={`Deseja combinar ${props.selectedQuestionsCount} questão(ões) em uma nova?`}
      confirmText="Combinar"
      onConfirm={props.onCombineConfirm}
      onCancel={props.onCombineCancel}
      isLoading={props.isCombining}
    />
  </>
);

export default BulkActionModals;
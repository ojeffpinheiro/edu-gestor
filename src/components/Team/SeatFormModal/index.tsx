import React, { useState, useEffect, useMemo, useCallback } from 'react';

import { SeatType, PriorityType, PRIORITY_CONFIGS } from '../../../utils/types/Team';
import {
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ActionButton,
  FormGroup,
  FormLabel,
  FormSelect,
  ValidationMessage,
  PriorityCard,
  FormTextarea,
  ModalFooter,
  PriorityOptions
} from './styles';
import { FiUser } from 'react-icons/fi';
import { useClassroom } from '../../../contexts/ClassroomContext';

interface SeatFormModalProps {
  onSave: (seat: SeatType) => void;
  onDelete?: (seatId: string) => void;
}

interface FormDataProps {
  studentId: number | undefined;
  priority: PriorityType | null;
  notes: string;
}

/**
 * Modal para edição de assentos
 * Permite atribuir alunos, definir prioridades e adicionar observações
 * @param {SeatType} seat - Assento sendo editado
 * @param {SeatType[]} seats - Lista de todos os assentos
 * @param {StudentFormData[]} students - Lista de alunos disponíveis
 * @param {function} onClose - Fecha o modal
 * @param {function} onSave - Salva alterações no assento
 * @param {function} [onDelete] - Remove aluno do assento (opcional)
 */
const SeatFormModal: React.FC<SeatFormModalProps> = ({
  onSave,
  onDelete
}) => {
  const { state:
    { isModalOpen, selectedSeat, layout: { seats }, studentList },
    dispatch
  } = useClassroom();

  const [formData, setFormData] = useState<FormDataProps>({
    studentId: undefined,
    priority: null,
    notes: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Reset form when seat changes
  useEffect(() => {
    if (selectedSeat) {
      setFormData({
        studentId: selectedSeat.studentId,
        priority: selectedSeat.priority || null,
        notes: selectedSeat.notes || ''
      });
    } else {
      setFormData({
        studentId: undefined,
        priority: null,
        notes: ''
      });
    }
    setErrors({});
  }, [selectedSeat]);

  // Available students (not assigned to other seats)
  const availableStudents = useMemo(() =>
    studentList.filter(student => {
      if (selectedSeat?.studentId === student.id) return true;
      return !seats.some(s => s.studentId === student.id && s.id !== selectedSeat?.id);
    }),
    [studentList, seats, selectedSeat?.id, selectedSeat?.studentId]
  );

  const selectedStudent = useMemo(() =>
    formData.studentId ? studentList.find(s => s.id === formData.studentId) : null,
    [formData.studentId, studentList]
  );

  const validateForm = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};

    if (formData.studentId) {
      const student = studentList.find(s => s.id === formData.studentId);
      if (!student) {
        newErrors.studentId = 'Aluno não encontrado';
      }
    }

    if (formData.priority && !formData.studentId) {
      newErrors.priority = 'Não é possível definir prioridade para assento vazio';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, studentList]);

  useEffect(() => {
    if (formData.studentId && formData.priority) {
      validateForm();
    }
  }, [formData.studentId, formData.priority, validateForm]);

  const handleCloseModal = useCallback(() => {
    dispatch({ type: 'TOGGLE_MODAL', payload: false });
  }, [dispatch]);


  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !selectedSeat) return;

    setIsLoading(true);

    try {
      const updatedSeat: SeatType = {
        ...selectedSeat,
        studentId: formData.studentId,
        priority: formData.priority,
        notes: formData.notes,
        updatedAt: new Date()
      };

      await onSave(updatedSeat);
      handleCloseModal()
    } catch (error) {
      setErrors({ submit: 'Erro ao salvar assento' });
    } finally {
      setIsLoading(false);
    }
  }, [validateForm, selectedSeat, formData, onSave, handleCloseModal, setErrors, setIsLoading]);

  const handleDelete = useCallback(async () => {
    if (!selectedSeat || !onDelete) return;

    if (window.confirm('Tem certeza que deseja remover este aluno do assento?')) {
      setIsLoading(true);
      try {
        await onDelete(selectedSeat.id);
        handleCloseModal();
      } catch (error) {
        setErrors({ submit: 'Erro ao remover aluno' });
      } finally {
        setIsLoading(false);
      }
    }
  }, [selectedSeat, onDelete, handleCloseModal]);

  const handleClearSeat = useCallback(() => {
    setFormData({
      studentId: undefined,
      priority: null,
      notes: ''
    });
  }, []);

  // Render priority icon based on the icon component from config
  const renderPriorityIcon = (priorityKey: PriorityType) => {
    const config = PRIORITY_CONFIGS[priorityKey];
    const IconComponent = config.icon;
    return <IconComponent size={20} color={config.color} />;
  };

  if (!isModalOpen || !selectedSeat) return null;

  return (
    <ModalOverlay onClick={handleCloseModal}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <h2>
            {selectedSeat.studentId ? 'Editar' : 'Configurar'} Assento
          </h2>
          <span>
            Posição: Fileira {selectedSeat.position.row}, Coluna {selectedSeat.position.column}
          </span>
        </ModalHeader>

        <form onSubmit={handleSubmit}>
          <ModalBody>
            {/* Seleção de Aluno */}
            <FormGroup>
              <FormLabel>
                Aluno
                <span style={{ color: '#666', fontWeight: 'normal' }}>
                  {formData.studentId ? '' : ' (deixe vazio para assento vazio)'}
                </span>
              </FormLabel>
              <FormSelect
                value={formData.studentId || ''}
                onChange={e => setFormData(prev => ({
                  ...prev,
                  studentId: e.target.value ? Number(e.target.value) : undefined
                }))}
                hasError={!!errors.studentId}
              >
                <option value="">Assento vazio</option>
                {availableStudents.map(student => (
                  <option key={student.id} value={student.id}>
                    {student.name}
                  </option>
                ))}
              </FormSelect>
              {errors.studentId && (
                <ValidationMessage>{errors.studentId}</ValidationMessage>
              )}
            </FormGroup>

            {/* Informações do Aluno Selecionado */}
            {selectedStudent && (
              <div style={{
                padding: '12px',
                background: '#f8f9fa',
                borderRadius: '8px',
                marginBottom: '16px'
              }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>
                  {selectedStudent.name}
                </h4>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  <div>Email: {selectedStudent.email}</div>
                  {selectedStudent.attendance && (
                    <div>Frequência: {selectedStudent.attendance}%</div>
                  )}
                  {selectedStudent.className && (
                    <div>Turma: {selectedStudent.className}</div>
                  )}
                  {selectedStudent.specialNeeds && (
                    <div>Necessidades especiais: {PRIORITY_CONFIGS[selectedStudent.specialNeeds]?.label}</div>
                  )}
                </div>
              </div>
            )}

            {/* Seleção de Prioridade */}
            {formData.studentId && (
              <FormGroup>
                <FormLabel>Prioridade Especial</FormLabel>
                <PriorityOptions>
                  <PriorityCard
                    selected={!formData.priority}
                    onClick={() => setFormData(prev => ({ ...prev, priority: null }))}
                  >
                    <FiUser size={20} />
                    <strong>Normal</strong>
                    <p>Sem prioridade especial</p>
                  </PriorityCard>

                  {Object.entries(PRIORITY_CONFIGS).map(([key, config]) => (
                    <PriorityCard
                      key={key}
                      selected={formData.priority === key}
                      color={config.color}
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        priority: key as PriorityType
                      }))}
                    >
                      {renderPriorityIcon(key as PriorityType)}
                      <strong>{config.label}</strong>
                      <p>{config.description}</p>
                    </PriorityCard>
                  ))}
                </PriorityOptions>
                {errors.priority && (
                  <ValidationMessage>{errors.priority}</ValidationMessage>
                )}
              </FormGroup>
            )}

            {/* Observações */}
            <FormGroup>
              <FormLabel>Observações</FormLabel>
              <FormTextarea
                value={formData.notes}
                onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Observações adicionais sobre este assento..."
                rows={3}
              />
            </FormGroup>

            {errors.submit && (
              <ValidationMessage>{errors.submit}</ValidationMessage>
            )}
          </ModalBody>

          <ModalFooter>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <div>
                {selectedSeat.studentId && (
                  <>
                    <ActionButton
                      type="button"
                      variant="secondary"
                      onClick={handleClearSeat}
                      disabled={isLoading}
                    >
                      Esvaziar Assento
                    </ActionButton>
                    {onDelete && (
                      <ActionButton
                        type="button"
                        variant="danger"
                        onClick={handleDelete}
                        disabled={isLoading}
                        style={{ marginLeft: '8px' }}
                      >
                        Remover Aluno
                      </ActionButton>
                    )}
                  </>
                )}
              </div>

              <div>
                <ActionButton
                  type="button"
                  variant="secondary"
                  onClick={handleCloseModal}
                  disabled={isLoading}
                >
                  Cancelar
                </ActionButton>
                <ActionButton
                  type="submit"
                  variant="primary"
                  disabled={isLoading}
                  style={{ marginLeft: '8px' }}
                >
                  {isLoading ? 'Salvando...' : 'Salvar'}
                </ActionButton>
              </div>
            </div>
          </ModalFooter>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default SeatFormModal;
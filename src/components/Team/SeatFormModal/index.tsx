import React, { useState, useEffect, useMemo, useCallback } from 'react';

import { SeatType, PriorityType, PRIORITY_CONFIGS } from '../../../utils/types/Team';
import { StudentFormData } from '../../../utils/types/BasicUser';
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

interface SeatFormModalProps {
  isOpen: boolean;
  seat: SeatType | null;
  seats: SeatType[];
  students: StudentFormData[];
  onClose: () => void;
  onSave: (seat: SeatType) => void;
  onDelete?: (seatId: string) => void;
}

interface FormDataProps {
  studentId: number | undefined;
  priority: PriorityType | null;
  notes: string;
}

const SeatFormModal: React.FC<SeatFormModalProps> = ({
  isOpen,
  seat,
  seats,
  students,
  onClose,
  onSave,
  onDelete
}) => {
  const [formData, setFormData] = useState<FormDataProps>({
    studentId: undefined,
    priority: null,
    notes: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Reset form when seat changes
  useEffect(() => {
    if (seat) {
      setFormData({
        studentId: seat.studentId,
        priority: seat.priority || null,
        notes: seat.notes || ''
      });
    } else {
      setFormData({
        studentId: undefined,
        priority: null,
        notes: ''
      });
    }
    setErrors({});
  }, [seat]);

  // Available students (not assigned to other seats)
  const availableStudents = useMemo(() =>
    students.filter(student => {
      if (seat?.studentId === student.id) return true;
      return !seats.some(s => s.studentId === student.id && s.id !== seat?.id);
    }),
    [students, seats, seat?.id, seat?.studentId]
  );

  const selectedStudent = useMemo(() =>
    formData.studentId ? students.find(s => s.id === formData.studentId) : null,
    [formData.studentId, students]
  );

  const validateForm = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};

    if (formData.studentId) {
      const student = students.find(s => s.id === formData.studentId);
      if (!student) {
        newErrors.studentId = 'Aluno não encontrado';
      }
    }

    if (formData.priority && !formData.studentId) {
      newErrors.priority = 'Não é possível definir prioridade para assento vazio';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, students]);

  useEffect(() => {
    if (formData.studentId && formData.priority) {
      validateForm();
    }
  }, [formData.studentId, formData.priority, validateForm]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !seat) return;

    setIsLoading(true);

    try {
      const updatedSeat: SeatType = {
        ...seat,
        studentId: formData.studentId,
        priority: formData.priority,
        notes: formData.notes,
        updatedAt: new Date()
      };

      await onSave(updatedSeat);
      onClose();
    } catch (error) {
      setErrors({ submit: 'Erro ao salvar assento' });
    } finally {
      setIsLoading(false);
    }
  }, [validateForm, seat, formData, onSave, onClose]);

  const handleDelete = useCallback(async () => {
    if (!seat || !onDelete) return;

    if (window.confirm('Tem certeza que deseja remover este aluno do assento?')) {
      setIsLoading(true);
      try {
        await onDelete(seat.id);
        onClose();
      } catch (error) {
        setErrors({ submit: 'Erro ao remover aluno' });
      } finally {
        setIsLoading(false);
      }
    }
  }, [seat, onDelete, onClose]);

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

  if (!isOpen || !seat) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <h2>
            {seat.studentId ? 'Editar' : 'Configurar'} Assento
          </h2>
          <span>
            Posição: Fileira {seat.position.row}, Coluna {seat.position.column}
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
                {seat.studentId && (
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
                  onClick={onClose}
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
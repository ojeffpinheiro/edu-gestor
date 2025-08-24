import React, { useState, useEffect, useCallback } from "react";
import { FaCheck, FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";

import { Input, Label } from "../../../styles/formControls";
import { InputGroup, StyledInputGroup } from "../../../styles/inputs";
import { useStudents } from "../../../hooks/student/useStudent";
import { Grid, InfoBox } from "../../../styles/layoutUtils";
import { FormCard } from "../../../styles/containers";
import { Select, InlineErrorMessage } from "./styles";
import Modal from "../Modal";
import { ErrorMessage, SuccessMessage } from "../../../styles/feedback";

interface StudentFormModalProps {
  isOpen: boolean;
  onSave: () => Promise<boolean> | boolean;
  onClose: () => void;
  defaultClass?: string;
}

const StudentFormModal: React.FC<StudentFormModalProps> = ({ 
  isOpen, 
  onSave, 
  onClose, 
  defaultClass = "" 
}) => {
  const { formData, setFormData, validateForm } = useStudents();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [feedback, setFeedback] = useState({
    errorMessage: "",
    successMessage: "",
    hasChanges: false,
  });

  // Atualiza a turma quando o defaultClass muda
  useEffect(() => {
    if (defaultClass && (!formData.className || formData.className === "")) {
      setFormData((prev) => ({ ...prev, className: defaultClass }));
      setFeedback(prev => ({ ...prev, hasChanges: false }));
    }
  }, [defaultClass, setFormData, formData.className]);

  // Reseta o formulário quando o modal é aberto/fechado
  useEffect(() => {
    if (!isOpen) {
      setErrors({});
      setFeedback({
        errorMessage: "",
        successMessage: "",
        hasChanges: false,
      });
    }
  }, [isOpen]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Tratamento especial para o número de chamada
    if (name === "rollNumber") {
      const numericValue = value === "" ? undefined : parseInt(value);
      setFormData((prev) => ({
        ...prev,
        [name]: isNaN(numericValue as number) ? undefined : numericValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Limpa o erro do campo que está sendo editado
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    setFeedback((prev) => ({ ...prev, hasChanges: true }));
  }, [errors, setFormData]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    // Valida o formulário
    const validation = validateForm();
    if (!validation.isValid) {
      setErrors(validation.errors);
      setFeedback({
        errorMessage: "Por favor, corrija os erros no formulário antes de enviar.",
        successMessage: "",
        hasChanges: true,
      });
      return;
    }

    setIsSubmitting(true);
    setFeedback(prev => ({ ...prev, errorMessage: "", successMessage: "" }));

    try {
      const success = await Promise.resolve(onSave());

      if (success) {
        setFeedback({
          errorMessage: "",
          successMessage: "Aluno cadastrado com sucesso!",
          hasChanges: false,
        });

        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setFeedback({
          errorMessage: "Ocorreu um erro ao salvar os dados. Verifique e tente novamente.",
          successMessage: "",
          hasChanges: true,
        });
      }
    } catch (error) {
      console.error("Erro ao salvar aluno:", error);
      setFeedback({
        errorMessage: "Ocorreu um erro ao cadastrar o aluno. Por favor, tente novamente.",
        successMessage: "",
        hasChanges: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [onSave, onClose, validateForm]);

  const handleCloseModal = useCallback(() => {
    if (!feedback.hasChanges || window.confirm("Existem mudanças não salvas. Deseja realmente sair?")) {
      onClose();
    }
  }, [feedback.hasChanges, onClose]);

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      size='sm'
      title='Cadastro de Aluno'
      onClose={handleCloseModal}
      onSubmit={() => handleSubmit(new Event('submit') as unknown as React.FormEvent)}
      submitText={isSubmitting ? "Salvando..." : "Salvar Aluno"}
      closeOnClickOutside={false}
    >
      <FormCard>
        <InfoBox>
          <FaInfoCircle />
          <div>Preencha os dados cadastrais do aluno.</div>
        </InfoBox>

        {/* Mensagens de Feedback */}
        {feedback.errorMessage && (
          <ErrorMessage role="alert">
            <FaExclamationTriangle />
            {feedback.errorMessage}
          </ErrorMessage>
        )}
        {feedback.successMessage && (
          <SuccessMessage role="status">
            <FaCheck />
            {feedback.successMessage}
          </SuccessMessage>
        )}

        <Grid columns={2} gap='md'>
          <InputGroup>
            <Label htmlFor="name">
              Nome <span className="required">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name || ""}
              onChange={handleInputChange}
              placeholder="Nome completo do aluno"
              className={errors.name ? "error" : ""}
              aria-required="true"
              aria-invalid={!!errors.name}
            />
            {errors.name && <InlineErrorMessage role="alert">{errors.name}</InlineErrorMessage>}
          </InputGroup>

          <InputGroup>
            <Label htmlFor="birthDate">Data de Nascimento</Label>
            <Input
              id="birthDate"
              name="birthDate"
              type="date"
              value={formData.birthDate || ""}
              onChange={handleInputChange}
              aria-invalid={!!errors.birthDate}
            />
            {errors.birthDate && <InlineErrorMessage role="alert">{errors.birthDate}</InlineErrorMessage>}
          </InputGroup>
        </Grid>

        <InputGroup>
          <Label htmlFor="email">
            E-mail <span className="required">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email || ""}
            onChange={handleInputChange}
            placeholder="email@exemplo.com"
            className={errors.email ? "error" : ""}
            aria-required="true"
            aria-invalid={!!errors.email}
          />
          {errors.email && <InlineErrorMessage role="alert">{errors.email}</InlineErrorMessage>}
        </InputGroup>

        <Grid columns={2} gap='md'>
          <InputGroup>
            <Label htmlFor="className">
              Turma <span className="required">*</span>
            </Label>
            <Input
              id="className"
              name="className"
              type="text"
              value={formData.className || ""}
              onChange={handleInputChange}
              placeholder="Turma do aluno"
              className={errors.className ? "error" : ""}
              aria-required="true"
              aria-invalid={!!errors.className}
            />
            {errors.className && <InlineErrorMessage role="alert">{errors.className}</InlineErrorMessage>}
          </InputGroup>

          <InputGroup>
            <Label htmlFor="rollNumber">
              Número da Chamada <span className="required">*</span>
            </Label>
            <Input
              id="rollNumber"
              name="rollNumber"
              type="number"
              min="1"
              value={formData.rollNumber || ""}
              onChange={handleInputChange}
              placeholder="Número da chamada"
              className={errors.rollNumber ? "error" : ""}
              aria-required="true"
              aria-invalid={!!errors.rollNumber}
            />
            {errors.rollNumber && <InlineErrorMessage role="alert">{errors.rollNumber}</InlineErrorMessage>}
          </InputGroup>
        </Grid>

        <Grid columns={2} gap='md'>
          <StyledInputGroup>
            <InputGroup>
              <Label htmlFor="status">
                Situação <span className="required">*</span>
              </Label>
              <Select
                id="status"
                name="status"
                value={formData.status || "Ativo"}
                onChange={handleInputChange}
                className={errors.status ? "error" : ""}
                aria-required="true"
                aria-invalid={!!errors.status}
              >
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
                <option value="Transferido">Transferido</option>
                <option value="Trancado">Trancado</option>
              </Select>
              {errors.status && <InlineErrorMessage role="alert">{errors.status}</InlineErrorMessage>}
            </InputGroup>
          </StyledInputGroup>

          <StyledInputGroup>
            <InputGroup>
              <Label htmlFor="gender">
                Sexo <span className="required">*</span>
              </Label>
              <Select
                id="gender"
                name="gender"
                value={formData.gender || ""}
                onChange={handleInputChange}
                className={errors.gender ? "error" : ""}
                aria-required="true"
                aria-invalid={!!errors.gender}
              >
                <option value="">Selecione...</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Outro">Outro</option>
                <option value="Não informado">Não informado</option>
              </Select>
              {errors.gender && <InlineErrorMessage role="alert">{errors.gender}</InlineErrorMessage>}
            </InputGroup>
          </StyledInputGroup>
        </Grid>
      </FormCard>
    </Modal>
  );
};

export default StudentFormModal;
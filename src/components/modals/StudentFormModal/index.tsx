import React, { useState, useEffect } from "react";
import { FaTimes, FaCheck, FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";
import { ErrorMessage, SuccessMessage } from "../../../styles/errorMessages";
import { Input, Label } from "../../../styles/formControls";
import { InputGroup } from "../../../styles/inputs";
import { useStudents } from "../../../hooks/useStudent";
import { InfoBox, ModalBody, ModalContainer, ModalContent, ModalFooter, ModalHeader, StyledInputGroup } from "../../../styles/modals";
import { CancelButton, CloseButton, PrimaryActionButton } from "../../../styles/buttons";
import { Grid } from "../../../styles/layoutUtils";
import { FormCard } from "../../../styles/containers";
import { Select, InlineErrorMessage } from "./styles"; // Importando o Select do arquivo de estilos

interface StudentFormModalProps {
  onSave: () => boolean; // Now returns a boolean to indicate success/failure
  onClose: () => void;
  defaultClass?: string;
}

const StudentFormModal: React.FC<StudentFormModalProps> = ({ onSave, onClose, defaultClass = "" }) => {
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
      // Mark this change as "system default" not a user change
      setFeedback(prev => ({ ...prev, hasChanges: false }));
    }
  }, [defaultClass, setFormData, formData.className]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Tratamento especial para o número de chamada (deve ser um número)
    if (name === "rollNumber") {
      const numericValue = parseInt(value);
      setFormData((prev) => ({
        ...prev,
        [name]: isNaN(numericValue) ? 0 : numericValue,
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

    // Marca que há mudanças não salvas
    setFeedback((prev) => ({ ...prev, hasChanges: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
    setFeedback({
      errorMessage: "",
      successMessage: "",
      hasChanges: true,
    });

    try {
      // Call onSave and check if it succeeded
      const success = onSave();
      
      if (success) {
        setFeedback({
          errorMessage: "",
          successMessage: "Aluno cadastrado com sucesso!",
          hasChanges: false,
        });

        // Aguarda um pouco para mostrar a mensagem de sucesso antes de fechar
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        // If onSave returned false, there was an error
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
  };

  // Verifica se há mudanças não salvas para confirmar antes de fechar
  const handleCloseModal = () => {
    if (feedback.hasChanges) {
      if (window.confirm("Existem mudanças não salvas. Deseja realmente sair?")) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  return (
    <ModalContainer>
      <ModalContent>
        <ModalHeader>
          <h3>Cadastro de Aluno</h3>
          <CloseButton onClick={handleCloseModal}>
            <FaTimes />
          </CloseButton>
        </ModalHeader>

        <form onSubmit={handleSubmit}>
          <ModalBody>
            <FormCard>
              <InfoBox>
                <FaInfoCircle />
                <div>
                  Preencha os dados cadastrais do aluno.
                </div>
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

              <Grid columns={2} gap='md' >
                <InputGroup>
                  <Label htmlFor="name">
                    Nome <span className="required">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Nome completo do aluno"
                    className={errors.name ? "error" : ""}
                    aria-required="true"
                  />
                  {errors.name && <InlineErrorMessage>{errors.name}</InlineErrorMessage>}
                </InputGroup>

                <InputGroup>
                  <Label htmlFor="birthDate">
                    Data de Nascimento
                  </Label>
                  <Input
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    value={formData.birthDate || ""}
                    onChange={handleInputChange}
                  />
                </InputGroup>
              </Grid>

              {/* E-mail */}
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
                />
                {errors.email && <InlineErrorMessage>{errors.email}</InlineErrorMessage>}
              </InputGroup>

              <Grid columns={2} gap='md' >
                {/* Turma */}
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
                  />
                  {errors.className && <InlineErrorMessage>{errors.className}</InlineErrorMessage>}
                </InputGroup>

                {/* Número da Chamada */}
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
                  />
                  {errors.rollNumber && <InlineErrorMessage>{errors.rollNumber}</InlineErrorMessage>}
                </InputGroup>
              </Grid>

              <Grid columns={2} gap='md' >
                <StyledInputGroup>
                  {/* Situação */}
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
                    >
                      <option value="Ativo">Ativo</option>
                      <option value="Inativo">Inativo</option>
                      <option value="Transferido">Transferido</option>
                      <option value="Trancado">Trancado</option>
                    </Select>
                    {errors.status && <InlineErrorMessage>{errors.status}</InlineErrorMessage>}
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
                    >
                      <option value="">Selecione...</option>
                      <option value="Masculino">Masculino</option>
                      <option value="Feminino">Feminino</option>
                      <option value="Outro">Outro</option>
                      <option value="Não informado">Não informado</option>
                    </Select>
                    {errors.gender && <InlineErrorMessage>{errors.gender}</InlineErrorMessage>}
                  </InputGroup>
                </StyledInputGroup>
              </Grid>
            </FormCard>

            <ModalFooter>
              <CancelButton
                type="button" onClick={handleCloseModal} disabled={isSubmitting}>
                Cancelar
              </CancelButton>

              <PrimaryActionButton
                type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Salvando..." : "Salvar Aluno"}
              </PrimaryActionButton>
            </ModalFooter>
          </ModalBody>
        </form>
      </ModalContent>
    </ModalContainer>
  );
};

export default StudentFormModal;
import React, { useState, useEffect } from "react";
import { FaTimes, FaCheck, FaExclamationTriangle } from "react-icons/fa";
import { ErrorMessage, SuccessMessage } from "../../../styles/errorMessages";
import { FormSection, FormSectionDescription, FormSectionTitle, Input, Label } from "../../../styles/formControls";
import { InputGroup } from "../../../styles/inputs";



interface StudentFormProps {
  onSave: (student: Student) => Promise<void>;
  onClose: () => void;
  defaultClass?: string; // Turma opcional que pode vir do componente pai
}

export interface Student {
  id?: string;
  name: string;
  className: string;
  birthDate: string;
  gender: string;
  rollNumber: number;
  status: string;
  email: string;
}

const StudentForm: React.FC<StudentFormProps> = ({ onSave, onClose, defaultClass = "" }) => {
  const [student, setStudent] = useState<Student>({
    name: "",
    className: defaultClass,
    birthDate: "",
    gender: "",
    rollNumber: 0,
    status: "Ativo",
    email: "",
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof Student, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [feedback, setFeedback] = useState({
    errorMessage: "",
    successMessage: "",
    hasChanges: false,
  });

  // Atualiza a turma quando o defaultClass muda
  useEffect(() => {
    if (defaultClass) {
      setStudent((prev) => ({ ...prev, className: defaultClass }));
    }
  }, [defaultClass]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Tratamento especial para o número de chamada (deve ser um número)
    if (name === "rollNumber") {
      const numericValue = parseInt(value);
      setStudent((prev) => ({
        ...prev,
        [name]: isNaN(numericValue) ? 0 : numericValue,
      }));
    } else {
      setStudent((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    
    // Limpa o erro do campo que está sendo editado
    if (errors[name as keyof Student]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    
    // Marca que há mudanças não salvas
    setFeedback((prev) => ({ ...prev, hasChanges: true }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof Student, string>> = {};
    
    // Validação do nome (obrigatório)
    if (!student.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }
    
    // Validação da turma (obrigatório)
    if (!student.className.trim()) {
      newErrors.className = "Turma é obrigatória";
    }
    
    // Validação do sexo (obrigatório)
    if (!student.gender) {
      newErrors.gender = "Sexo é obrigatório";
    }
    
    // Validação do número de chamada (obrigatório e deve ser positivo)
    if (!student.rollNumber) {
      newErrors.rollNumber = "Número de chamada é obrigatório";
    } else if (student.rollNumber <= 0) {
      newErrors.rollNumber = "Número de chamada deve ser maior que zero";
    }
    
    // Validação da situação (obrigatório)
    if (!student.status) {
      newErrors.status = "Situação é obrigatória";
    }
    
    // Validação do e-mail (obrigatório e formato válido)
    if (!student.email.trim()) {
      newErrors.email = "E-mail é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(student.email)) {
      newErrors.email = "Formato de e-mail inválido";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
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
      await onSave(student);
      setFeedback({
        errorMessage: "",
        successMessage: "Aluno cadastrado com sucesso!",
        hasChanges: false,
      });
      
      // Aguarda um pouco para mostrar a mensagem de sucesso antes de fechar
      setTimeout(() => {
        onClose();
      }, 1500);
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
    <div className="modal-container">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Cadastro de Aluno</h3>
          <button 
            className="close-button" 
            onClick={handleCloseModal} 
            aria-label="Fechar modal"
          >
            <FaTimes />
          </button>
        </div>

        <div className="modal-body">
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

          <form onSubmit={handleSubmit}>
            <FormSection>
              <FormSectionTitle>Dados do Aluno</FormSectionTitle>
              <FormSectionDescription>
                Preencha os dados cadastrais do aluno.
              </FormSectionDescription>

              {/* Nome do Aluno */}
              <InputGroup>
                <Label htmlFor="name">
                  Nome <span className="required">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={student.name}
                  onChange={handleInputChange}
                  placeholder="Nome completo do aluno"
                  className={errors.name ? "error" : ""}
                  aria-required="true"
                />
                {errors.name && <div className="error-message">{errors.name}</div>}
              </InputGroup>

              {/* Turma */}
              <InputGroup>
                <Label htmlFor="className">
                  Turma <span className="required">*</span>
                </Label>
                <Input
                  id="className"
                  name="className"
                  type="text"
                  value={student.className}
                  onChange={handleInputChange}
                  placeholder="Turma do aluno"
                  className={errors.className ? "error" : ""}
                  aria-required="true"
                />
                {errors.className && <div className="error-message">{errors.className}</div>}
              </InputGroup>

              {/* Data de Nascimento (opcional) */}
              <InputGroup>
                <Label htmlFor="birthDate">
                  Data de Nascimento
                </Label>
                <Input
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  value={student.birthDate}
                  onChange={handleInputChange}
                />
              </InputGroup>

              {/* Sexo */}
              <InputGroup>
                <Label htmlFor="gender">
                  Sexo <span className="required">*</span>
                </Label>
                <select
                  id="gender"
                  name="gender"
                  value={student.gender}
                  onChange={handleInputChange}
                  className={errors.gender ? "error" : ""}
                  aria-required="true"
                >
                  <option value="">Selecione...</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                  <option value="Outro">Outro</option>
                  <option value="Não informado">Não informado</option>
                </select>
                {errors.gender && <div className="error-message">{errors.gender}</div>}
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
                  value={student.rollNumber || ""}
                  onChange={handleInputChange}
                  placeholder="Número da chamada"
                  className={errors.rollNumber ? "error" : ""}
                  aria-required="true"
                />
                {errors.rollNumber && <div className="error-message">{errors.rollNumber}</div>}
              </InputGroup>

              {/* Situação */}
              <InputGroup>
                <Label htmlFor="status">
                  Situação <span className="required">*</span>
                </Label>
                <select
                  id="status"
                  name="status"
                  value={student.status}
                  onChange={handleInputChange}
                  className={errors.status ? "error" : ""}
                  aria-required="true"
                >
                  <option value="Ativo">Ativo</option>
                  <option value="Inativo">Inativo</option>
                  <option value="Transferido">Transferido</option>
                  <option value="Trancado">Trancado</option>
                </select>
                {errors.status && <div className="error-message">{errors.status}</div>}
              </InputGroup>

              {/* E-mail */}
              <InputGroup>
                <Label htmlFor="email">
                  E-mail <span className="required">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={student.email}
                  onChange={handleInputChange}
                  placeholder="email@exemplo.com"
                  className={errors.email ? "error" : ""}
                  aria-required="true"
                />
                {errors.email && <div className="error-message">{errors.email}</div>}
              </InputGroup>
            </FormSection>

            <div className="modal-footer">
              <button
                type="button"
                className="button secondary"
                onClick={handleCloseModal}
                disabled={isSubmitting}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="button primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Salvando..." : "Salvar Aluno"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentForm;
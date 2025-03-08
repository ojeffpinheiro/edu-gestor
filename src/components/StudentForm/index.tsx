import React from "react";
import { FaSave, FaTimes } from "react-icons/fa";
import { Student } from "../../utils/types";
import { FormContainer, Input, FormActions, Button, Icon } from "./styles";

interface StudentFormProps {
    formData: Omit<Student, "id">;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSave: () => void;
    onCancel: () => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ formData, onChange, onSave, onCancel }) => {
    return (
        <FormContainer>
            <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={onChange}
                placeholder="Nome do aluno"
            />
            <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={onChange}
                placeholder="Email do aluno"
            />
            <FormActions>
                <Button onClick={onSave} variant="primary">
                    <Icon><FaSave /></Icon> Salvar
                </Button>
                <Button onClick={onCancel} variant="secondary">
                    <Icon><FaTimes /></Icon> Cancelar
                </Button>
            </FormActions>
        </FormContainer>
    );
};

export default StudentForm;

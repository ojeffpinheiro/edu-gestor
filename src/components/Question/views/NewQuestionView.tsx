import React from 'react';
import { 
  QuestionFormContainer, 
  QuestionFormHeader, 
  QuestionFormTitle, 
  QuestionFormDescription, 
  QuestionFormContent 
} from '../../../styles/questionsForm';
import { QuestionForm } from '../../../components/Question/QuestionForm/QuestionForm';
import { FormField } from '../../../components/Question/QuestionForm/type';

interface NewQuestionViewProps {
  fields: FormField[];
  onSubmit: (values: Record<string, unknown>) => void;
}

const NewQuestionView: React.FC<NewQuestionViewProps> = ({ fields, onSubmit }) => {
  return (
    <QuestionFormContainer>
      <QuestionFormHeader>
        <QuestionFormTitle>Criar Nova Questão</QuestionFormTitle>
        <QuestionFormDescription>
          Preencha os campos abaixo para adicionar uma nova questão ao banco
        </QuestionFormDescription>
      </QuestionFormHeader>

      <QuestionFormContent>
        <QuestionForm
          title="Criar Nova Questão"
          description="Preencha os campos abaixo"
          fields={fields}
          onSubmit={onSubmit}
        />
      </QuestionFormContent>
    </QuestionFormContainer>
  );
};

export default NewQuestionView;
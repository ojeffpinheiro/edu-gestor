export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'select' | 'textarea' | 'number';
  options?: { value: string; label: string }[];
  required?: boolean;
  placeholder?: string;
}

export interface QuestionFormProps {
  title: string;
  description?: string;
  fields: FormField[];
  initialValues?: Record<string, any>;
  onSubmit: (values: Record<string, any>) => void;
  onCancel?: () => void;
  submitText?: string;
  cancelText?: string;
  className?: string;
}
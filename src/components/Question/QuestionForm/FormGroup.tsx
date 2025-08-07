import React from 'react'
import { 
  FormInput, 
  FormSelect, 
  FormTextarea,
  ErrorMessage 
} from './styles';

interface FormGroupProps {
  field: {
    name: string;
    label: string;
    type: 'text' | 'select' | 'textarea' | 'number';
    options?: { value: string; label: string }[];
    required?: boolean;
    placeholder?: string;
  };
  value: any;
  onChange: (name: string, value: any) => void;
  error?: string;
  className?: string;
}

export const FormGroup = ({ 
  field, 
  value, 
  onChange, 
  error,
  className 
}: FormGroupProps) => {
  const renderInput = () => {
    switch (field.type) {
      case 'select':
        return (
          <FormSelect
            value={value || ''}
            onChange={(e) => onChange(field.name, e.target.value)}
          >
            <option value="">{field.placeholder || 'Selecione...'}</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </FormSelect>
        );
      case 'textarea':
        return (
          <FormTextarea
            value={value || ''}
            onChange={(e) => onChange(field.name, e.target.value)}
            placeholder={field.placeholder}
          />
        );
      default:
        return (
          <FormInput
            type={field.type}
            value={value || ''}
            onChange={(e) => onChange(field.name, e.target.value)}
            placeholder={field.placeholder}
          />
        );
    }
  };

  return (
    <div className={className}>
      <label>
        {field.label}
        {field.required && <span style={{ color: 'red' }}> *</span>}
      </label>
      {renderInput()}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};
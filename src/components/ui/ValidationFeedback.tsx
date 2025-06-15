import React from 'react';
import { ErrorMessage } from '../../styles/feedback';

interface ValidationFeedbackProps {
  error?: string;
  touched?: boolean;
}

const ValidationFeedback: React.FC<ValidationFeedbackProps> = ({ error, touched }) => (
  <ErrorMessage data-show={!!error && !!touched}>
    {error}
  </ErrorMessage>
);

export default ValidationFeedback;
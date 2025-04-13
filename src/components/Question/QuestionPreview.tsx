import React, { useState, useEffect } from 'react';
import { FaRandom, FaDownload } from 'react-icons/fa';

import { Variable } from '../../utils/types/Question';
import { PreviewActions, PreviewContainer, PreviewHeader, PreviewTitle, QuestionContent, RenderedEquation, VariablesTable } from './QuestionPreviewStyles';
import { Button } from '../../styles/buttons';
import { formatUnits, parseQuestion, substituteVariables } from '../../utils/questionHelpers';
import { Question } from '../../pages/Question/QuestionEditor';

interface QuestionPreviewProps {
  question: Question;
  onRegenerateValues: () => void;
  onExport?: () => void;
}

// Component
const QuestionPreview: React.FC<QuestionPreviewProps> = ({
  question,
  onRegenerateValues,
  onExport,
}) => {
  const { content, variables, equations } = question;
  const [renderedQuestion, setRenderedQuestion] = useState<string>('');
  const [isRendered, setIsRendered] = useState<boolean>(false);

  useEffect(() => {
    // Parse and substitute variables in the question text
    const parsedQuestion = parseQuestion(content, variables, equations);
    setRenderedQuestion(parsedQuestion);
    setIsRendered(true);
  }, [content, variables, equations]);

  const renderLaTeX = (latex: string, variables: Variable[]): string => {
    // In a real implementation, this would render the LaTeX with actual values
    // For now, we'll do a simple substituteVariables
    return substituteVariables(latex, variables);
  };

  return (
    <PreviewContainer>
      <PreviewHeader>
        <PreviewTitle>Prévia da Questão</PreviewTitle>
        <PreviewActions>
          <Button variant="secondary" onClick={onRegenerateValues}>
            <FaRandom />
            Gerar Novos Valores
          </Button>
          {onExport && (
            <Button variant="primary" onClick={onExport}>
              <FaDownload />
              Exportar
            </Button>
          )}
        </PreviewActions>
      </PreviewHeader>

      {isRendered ? (
        <>
          <QuestionContent dangerouslySetInnerHTML={{ __html: renderedQuestion }} />

          {equations.length > 0 && (
            <>
              <h4>Equações Utilizadas:</h4>
              {equations.map((eq) => (
                <RenderedEquation key={eq.id}>
                  <strong>{eq.name}:</strong> {renderLaTeX(eq.latex, variables)}
                </RenderedEquation>
              ))}
            </>
          )}

          {variables.length > 0 && (
            <>
              <h4>Valores das Variáveis:</h4>
              <VariablesTable>
                <thead>
                  <tr>
                    <th>Variável</th>
                    <th>Valor</th>
                    <th>Unidade</th>
                    <th>Intervalo</th>
                  </tr>
                </thead>
                <tbody>
                  {variables.map((variable) => (
                    <tr key={variable.name}>
                      <td>{variable.name}</td>
                      <td>
                        {variable.currentValue !== undefined
                          ? variable.currentValue.toFixed(
                              variable.precision !== undefined ? variable.precision : 2
                            )
                          : 'N/A'}
                      </td>
                      <td>{formatUnits(variable.unit || '')}</td>
                      <td>
                        {variable.min} a {variable.max}
                        {variable.step ? ` (passo: ${variable.step})` : ''}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </VariablesTable>
            </>
          )}
        </>
      ) : (
        <div>Carregando prévia...</div>
      )}
    </PreviewContainer>
  );
};

export default QuestionPreview;
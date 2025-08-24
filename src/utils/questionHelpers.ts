/**
 * Utility functions for handling questions, variables, and equations
 */

import { Variable } from "../types/evaluation/Question";

/**
 * Generates a random value within a specified range
 * @param min - Minimum value
 * @param max - Maximum value
 * @param step - Step between values (optional)
 * @returns Random value within the range
 */
export const generateRandomValue = (min: number, max: number, step?: number): number => {
  if (step) {
    // Calculate how many steps fit in the range
    const steps = Math.floor((max - min) / step);
    // Generate random step index
    const randomStepIndex = Math.floor(Math.random() * (steps + 1));
    // Calculate value based on step
    return min + randomStepIndex * step;
  } else {
    // Generate continuous random value
    return min + Math.random() * (max - min);
  }
};

/**
 * Generates values for all variables based on their ranges
 * @param variables - Array of variable definitions
 * @returns Updated array with currentValue set for each variable
 */
export const generateVariableValues = (variables: Variable[]): Variable[] => {
  return variables.map(variable => {
    const value = generateRandomValue(variable.min, variable.max, variable.step);
    const precision = variable.precision !== undefined ? variable.precision : 2;
    
    // Round to specified precision
    const roundedValue = Number(value.toFixed(precision));
    
    return {
      ...variable,
      currentValue: roundedValue
    };
  });
};

/**
 * Replaces variable placeholders in a string with their actual values
 * @param text - Text containing variable placeholders like {varName}
 * @param variables - Array of variables with their values
 * @returns Text with variables substituted
 */
export const substituteVariables = (text: string, variables: Variable[]): string => {
  let result = text;
  
  variables.forEach(variable => {
    if (variable.currentValue !== undefined) {
      // Create formatted value string with proper precision
      const precision = variable.precision !== undefined ? variable.precision : 2;
      const formattedValue = variable.currentValue.toFixed(precision);
      
      // Create unit string if it exists
      const unitStr = variable.unit ? ` ${formatUnits(variable.unit)}` : '';
      
      // Replace all occurrences of {varName} with formattedValue + unitStr
      const regex = new RegExp(`\\{${variable.name}\\}`, 'g');
      result = result.replace(regex, `${formattedValue}${unitStr}`);
      
      // Also replace occurrences of {varName:value} (without unit)
      const valueOnlyRegex = new RegExp(`\\{${variable.name}:value\\}`, 'g');
      result = result.replace(valueOnlyRegex, formattedValue);
      
      // Replace occurrences of {varName:unit} (unit only)
      const unitOnlyRegex = new RegExp(`\\{${variable.name}:unit\\}`, 'g');
      result = result.replace(unitOnlyRegex, formatUnits(variable.unit || ''));
    }
  });
  
  return result;
};

/**
 * Formats units with proper superscripts and subscripts
 * @param unit - Unit string (e.g., "m/s^2")
 * @returns Formatted unit string with HTML for superscripts/subscripts
 */
export const formatUnits = (unit: string): string => {
  if (!unit) return '';
  
  // Replace superscripts (^2, ^3, etc.)
  let formatted = unit.replace(/\^(\d+)/g, '<sup>$1</sup>');
  
  // Replace subscripts (_2, _3, etc.)
  formatted = formatted.replace(/_(\d+)/g, '<sub>$1</sub>');
  
  return formatted;
};

/**
 * Parses question text, replacing variables and rendering equations
 * @param questionText - Raw question text with variable placeholders and equation references
 * @param variables - Array of variables with their values
 * @param equations - Array of equations that might be referenced
 * @returns Processed HTML with variables and equations rendered
 */
export const parseQuestion = (
  questionText: string,
  variables: Variable[],
  equations: Array<{ id: string; latex: string; name: string }>
): string => {
  let processed = questionText;
  
  // First, substitute variables
  processed = substituteVariables(processed, variables);
  
  // Handle equation references - format: [equation:id]
  equations.forEach(equation => {
    const equationRegex = new RegExp(`\\[equation:${equation.id}\\]`, 'g');
    const renderedEquation = substituteVariables(equation.latex, variables);
    processed = processed.replace(
      equationRegex,
      `<div class="math">${renderedEquation}</div>`
    );
  });
  
  // Handle inline math - format: $formula$
  processed = processed.replace(/\$(.*?)\$/g, '<span class="math">$1</span>');
  
  // Convert line breaks to HTML
  processed = processed.replace(/\n/g, '<br>');
  
  return processed;
};

/**
 * Validates a question to ensure all referenced variables are defined
 * @param questionText - The raw question text
 * @param variables - Array of defined variables
 * @returns Object with isValid and any undefined variables
 */
export const validateQuestion = (
  questionText: string,
  variables: Variable[]
): { isValid: boolean; undefinedVars: string[] } => {
  // Find all variable references in the format {varName}
  const variableRegex = /\{([^:}]+)(?::(?:value|unit))?\}/g;
  const matches = [...questionText.matchAll(variableRegex)];
  const referencedVars = matches.map(match => match[1]);
  
  // Find all variable names that are referenced but not defined
  const definedVarNames = variables.map(v => v.name);
  const undefinedVars = Array.from(new Set(referencedVars)).filter(
    varName => !definedVarNames.includes(varName)
  );
  
  return {
    isValid: undefinedVars.length === 0,
    undefinedVars
  };
};

/**
 * Exports the question in a format suitable for saving or sharing
 * @param questionText - The processed question text
 * @param variables - Array of variables with their definitions
 * @param equations - Array of equations used in the question
 * @returns Exportable question object
 */
export const exportQuestion = (
  questionText: string,
  variables: Variable[],
  equations: Array<{ id: string; latex: string; name: string }>
) => {
  return {
    text: questionText,
    variables: variables.map(({ name, min, max, step, precision, unit }) => ({
      name,
      min,
      max,
      step,
      precision,
      unit
    })),
    equations: equations.map(({ id, latex, name }) => ({
      id,
      latex,
      name
    })),
    createdAt: new Date().toISOString()
  };
};

/**
 * Creates variations of a question with different sets of random values
 * @param questionText - The raw question text
 * @param variables - Array of variable definitions
 * @param equations - Array of equations used
 * @param count - Number of variations to generate
 * @returns Array of question variations
 */
export const createQuestionVariations = (
  questionText: string,
  variables: Variable[],
  equations: Array<{ id: string; latex: string; name: string }>,
  count: number
) => {
  const variations = [];
  
  for (let i = 0; i < count; i++) {
    // Generate new random values for variables
    const variablesWithValues = generateVariableValues(variables);
    
    // Parse question with these values
    const parsedQuestion = parseQuestion(questionText, variablesWithValues, equations);
    
    variations.push({
      id: `var-${i + 1}`,
      parsedText: parsedQuestion,
      variables: [...variablesWithValues]
    });
  }
  
  return variations;
};

/**
 * Extracts variable placeholders from text to help build the variable list
 * @param text - Text containing variable placeholders
 * @returns Array of unique variable names found
 */
export const extractVariablePlaceholders = (text: string): string[] => {
  const regex = /\{([^:}]+)(?::(?:value|unit))?\}/g;
  const matches = [...text.matchAll(regex)];
  const varNames = matches.map(match => match[1]);
  
  // Return unique variable names
  return Array.from(new Set(varNames));
};

/**
 * Creates default variable definitions based on variable names
 * @param variableNames - Array of variable names
 * @returns Array of variable definitions with default ranges
 */
export const createDefaultVariables = (variableNames: string[]): Variable[] => {
  return variableNames.map(name => ({
    name,
    min: 1,
    max: 10,
    step: 0.1,
    precision: 1,
    unit: ''
  }));
};
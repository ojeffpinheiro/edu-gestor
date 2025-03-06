import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: var(--color-background);
  transition: background-color 0.3s ease-in-out;
  font-family: 'Poppins', sans-serif;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: var(--color-background-secondary);
  padding: 4rem;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const FormColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  gap: 3rem;
  align-items: center;
`;

export const SocialColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FormContainer = styled.form`
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
`;

export const Title = styled.h1`
  text-align: center;
  margin-bottom: .5rem;
  color: var(--color-text);
`;

/**
 * Campos de entrada
 */
export const Input = styled.input`
  width: 23.4rem;
  background: var(--color-input);
  color: var(--color-text);
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 5px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: var(--color-border-dark);
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.8rem;
  background-color: var(--color-primary);
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: var(--color-primary-hover);
    color: var(--color-input);
  }

  &:disabled {
    background: var(--color-background-third);
    color: var(--color-text-third);
    cursor: not-allowed;
  }
`;

export const StyledSocial = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  align-items: center;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

export const SocialButton = styled.button`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  margin: 8px 0;
  background-color: var(--color-secondary);
  border: 1px solid var(--color-border-light);
  border-radius: 1rem;
  font-size: 16px;
  cursor: pointer;
  width: 18rem;
  gap: 2rem;
  transition: background-color 0.3s, border-color 0.3s;

  &:hover {
    background-color: var(--color-secondary-hover);
  }

  &:disabled {
    background-color: var(--color-button-disabled);
    cursor: not-allowed;
  }
`;

export const SocialButtonIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  color: inherit;
  font-size: 20px;
`;

export const CircleDivider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  margin: 20px 0;
  text-align: center;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 45%;
    border-top: 1px solid var(--color-border-light);
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }

  span {
    background-color: var(--color-text-on-primary);
    padding: 0 10px;
    z-index: 1;
    color: var(--color-text-button);
    font-weight: bold;
  }
`;

export const ErrorMessage = styled.div`
  color: var(--color-error);
  font-size: 0.9rem;
  text-align: center;
  margin-top: 0.5rem;
`;

export const SocialIcons = {
  google: "#DB4437",
  facebook: "#3b5998",
  github: "#333",
  apple: "#000000",  // Cor para o ícone da Apple
};

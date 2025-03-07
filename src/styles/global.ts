import { createGlobalStyle } from "styled-components";
import { getTheme } from "./colors";

export const GlobalStyles = createGlobalStyle`
  :root {
    ${({ theme }) => {
      // Se `theme.mode` existe e é 'light' ou 'dark', use ele. Caso contrário, use 'light' como fallback.
      const currentTheme = getTheme(theme.mode || "light");

      return `
        --color-background: ${currentTheme.background.primary};
        --color-background-secondary: ${currentTheme.background.secondary};
        --color-background-third: ${currentTheme.background.third};
        
        --color-text: ${currentTheme.text.primary};
        --color-text-secondary: ${currentTheme.text.secondary};
        --color-title-card: ${currentTheme.text.card};
        --color-text-third: ${currentTheme.text.third};
        --color-text-on-primary: ${currentTheme.text.onPrimary};
        
        --color-border-light: ${currentTheme.border.light};
        --color-border: ${currentTheme.border.medium};
        --color-border-dark: ${currentTheme.border.dark};

        --color-primary: ${currentTheme.component.primaryButton};
        --color-primary-hover: ${currentTheme.component.primaryButtonHover};
        --color-secondary: ${currentTheme.component.secondaryButton};
        --color-secondary-hover: ${currentTheme.component.secondaryButtonHover};
        --color-card: ${currentTheme.component.card};

        --color-text-button: ${currentTheme.component.text};

        --color-button-disabled: ${currentTheme.component.disabled};
        --color-button: rgba(0, 0, 0, 0.05);

        --color-input: ${currentTheme.component.input};
        --color-input-border: ${currentTheme.component.inputBorder};
        --color-input-focus: ${currentTheme.component.inputFocus};
        
        --color-success: ${currentTheme.feedback.success};
        --color-success-hover: #389E0D;
        --color-error: ${currentTheme.feedback.error};
        --color-error-hover: #d32f2f;
        --color-warning: ${currentTheme.feedback.warning};
        --color-warning-hover: #f57c00;
        --color-info: ${currentTheme.feedback.info};
        --color-info-hover: #096DD9;

        --color-google: ${currentTheme.icons.google};
        --color-facebook: ${currentTheme.icons.facebook};
        --color-github: ${currentTheme.icons.github};
        --color-apple: ${currentTheme.icons.apple};

        --font-family: 'Poppins', sans-serif;
        --font-size-xs: 0.75rem;
        --font-size-sm: 0.875rem;
        --font-size-md: 1rem;
        --font-size-lg: 1.125rem;
        --font-size-xl: 1.25rem;
        --font-size-2xl: 1.5rem;
        --font-size-3xl: 1.875rem;

        --space-xs: 0.25rem;
        --space-sm: 0.5rem;
        --space-md: 1rem;
        --space-lg: 1.5rem;
        --space-xl: 2rem;
        --space-2xl: 3rem;
        
        --border-radius-sm: 0.25rem;
        --border-radius-md: 0.5rem;
        --border-radius-lg: 1rem;
        --border-radius-xl: 1.5rem;
        --border-radius-full: 50%;

        --shadow-sm: ${currentTheme.shadow.sm};
        --shadow-md: ${currentTheme.shadow.md};
        --shadow-lg: ${currentTheme.shadow.lg};
        --shadow-focus: 0 0 0 2px rgba(24, 144, 255, 0.2);
        
        --breakpoint-sm: 576px;
        --breakpoint-md: 768px;
        --breakpoint-lg: 992px;
        --breakpoint-xl: 1200px;
      `;
    }}
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    height: 100%;
  }

  body {
    background-color: var(--color-background);
    color: var(--color-text);
    font-family: var(--font-family);
    font-size: var(--font-size-md);
    line-height: 1.5;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 0.5em;
    font-weight: 600;
    line-height: 1.2;
  }

  button, input, select, textarea {
    font-family: inherit;
    font-size: inherit;
  }

  /* For better mobile responsiveness */
  @media (max-width: 768px) {
    html {
      font-size: 14px;
    }
  }
`;
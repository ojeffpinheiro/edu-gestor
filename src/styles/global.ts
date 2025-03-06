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
        --color-button: rgba(0, 0, 0, 0.05)

        --color-icons: ${currentTheme.icons};
        
        --color-input: ${currentTheme.component.input};
        --color-input-border: ${currentTheme.component.inputBorder};
        --color-input-focus: ${currentTheme.component.inputFocus};
        
        --color-success: ${currentTheme.feedback.success};
        --color-error: ${currentTheme.feedback.error};
        --color-warning: ${currentTheme.feedback.warning};
        --color-info: ${currentTheme.feedback.info};

        --color-google: ${currentTheme.icons.google};
        --color-facebook: ${currentTheme.icons.facebook};
        --color-github: ${currentTheme.icons.github};
        --color-apple: ${currentTheme.icons.apple};

        --font-family: 'Poppins', sans-serif;
        --font-size-md: 1rem;
        --font-size-sm: 0.875rem;
        --font-size-lg: 1.125rem;
        --font-size-xl: 1.25rem;
        --font-size-2xl: 1.5rem;

        --space-sm: 0.5rem;
        --space-md: 1rem;
        --space-lg: 1.5rem;
        
        --border-radius-sm: 0.25rem;
        --border-radius-md: 0.5rem;
        --border-radius-lg: 1rem;

        --shadow-sm: ${currentTheme.shadow.sm};
        --shadow-md: ${currentTheme.shadow.md};
        --shadow-lg: ${currentTheme.shadow.lg};
      `;
    }}
  }

  body {
    background-color: var(--color-background);
    color: var(--color-text);
    font-family: var(--font-family);
  }
`;

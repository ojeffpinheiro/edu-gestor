import { createGlobalStyle } from "styled-components";
import { darken, transparentize } from 'polished';

import { getTheme } from "./colors";

export const GlobalStyles = createGlobalStyle`
  :root {
    ${({ theme }) => {
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
        
        --color-primary-light: ${transparentize(0.8, currentTheme.component.primaryButton)};
        --color-border-light: ${currentTheme.border.light};
        --color-primary: ${currentTheme.component.primaryButton};
        --color-primary-hover: ${currentTheme.component.primaryButtonHover};
         --color-primary-dark: ${darken(0.15, currentTheme.component.primaryButton)};
        --color-secondary: ${currentTheme.component.secondaryButton};
        --color-secondary-hover: ${currentTheme.component.secondaryButtonHover};
        --color-card: ${currentTheme.component.card};

        --color-text-button: ${currentTheme.component.text};

        --color-button-disabled: ${currentTheme.component.disabled};
        --color-button: rgba(0, 0, 0, 0.05);

        --color-input: ${currentTheme.component.input};
        --color-input-border: ${currentTheme.component.inputBorder};
        --color-input-focus: ${currentTheme.component.inputFocus};

        --color-primary-active: ${darken(0.1, currentTheme.component.primaryButton)};
        --color-secondary-active: ${darken(0.1, currentTheme.component.secondaryButton)};
        --color-error-active: ${darken(0.1, currentTheme.feedback.error)};

        --color-focus-ring: ${transparentize(0.7, currentTheme.component.primaryButton)};
        --color-disabled-text: ${currentTheme.text.third};
        
        /* Glassmorphism effects */
        --glass-background-rgb: ${theme.mode === 'dark' ? '17, 25, 40' : '255, 255, 255'};
        --glass-border: ${theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};

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

         --color-surface: ${theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)'};
        --color-surface-elevated: ${theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.95)'};
        --gradient-surface: linear-gradient(135deg, ${theme.mode === 'dark' ? 'rgba(17, 25, 40, 0.8)' : 'rgba(255, 255, 255, 0.8)'}, ${theme.mode === 'dark' ? 'rgba(17, 25, 40, 0.4)' : 'rgba(255, 255, 255, 0.4)'});

        /* New color additions (keep these) */
        --glass-background: ${theme.mode === 'dark'
        ? 'rgba(17, 25, 40, 0.75)'
        : 'rgba(255, 255, 255, 0.25)'};
        --glass-border: ${theme.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.18)'
        : 'rgba(255, 255, 255, 0.18)'};
        --gradient-primary: linear-gradient(135deg, ${currentTheme.component.primaryButton}, ${darken(0.1, currentTheme.component.primaryButton)});
        --gradient-secondary: linear-gradient(135deg, ${currentTheme.component.secondaryButton}, ${darken(0.05, currentTheme.component.secondaryButton)});

        --line-height-sm: 1.25;
        --line-height-md: 1.5;
        --line-height-lg: 1.75;
        
        --font-weight-normal: 400;
        --font-weight-medium: 500;
        --font-weight-semibold: 600;
        --font-weight-bold: 700;

        --font-family: 'Poppins', sans-serif;
        --font-family-secondary: 'Inter', sans-serif;
        --font-size-xs: 0.75rem;
        --font-size-sm: 0.875rem;
        --font-size-md: 1rem;
        --font-size-lg: 1.125rem;
        --font-size-xl: 1.25rem;
        --font-size-2xl: 1.5rem;
        --font-size-3xl: 1.875rem;
        --font-size-4xl: 2.25rem;

        --space-xs: 0.25rem;
        --space-sm: 0.5rem;
        --space-md: 1rem;
        --space-lg: 1.5rem;
        --space-xl: 2rem;
        --space-2xl: 3rem;
        --space-3xl: 4rem;
        --space-4xl: 6rem;
        
        --border-radius-sm: 0.25rem;
        --border-radius-md: 0.5rem;
        --border-radius-lg: 1rem;
        --border-radius-xl: 1.5rem;
        --border-radius-full: 50%;

        --shadow-sm: ${currentTheme.shadow.sm};
        --shadow-md: ${currentTheme.shadow.md};
        --shadow-lg: ${currentTheme.shadow.lg};
        --shadow-focus: 0 0 0 3px rgba(24, 144, 255, 0.3);
        
        --breakpoint-sm: 576px;
        --breakpoint-md: 768px;
        --breakpoint-lg: 992px;
        --breakpoint-xl: 1200px;
        --breakpoint-2xl: 1440px;
        --breakpoint-3xl: 1920px;

         /* Transições modernas com curvas de bezier */
        --transition-none: none;
        --transition-all: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
        --transition-colors: color 150ms cubic-bezier(0.4, 0, 0.2, 1), background-color 150ms cubic-bezier(0.4, 0, 0.2, 1), border-color 150ms cubic-bezier(0.4, 0, 0.2, 1);
        --transition-opacity: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
        --transition-shadow: box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1);
        --transition-transform: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
        --transition-bounce: all 300ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
        --transition-elastic: all 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
        --transition-fast: 0.2s ease;
        --transition-normal: 0.3s ease;
        --transition-slow: 0.5s ease;
        
        /* Z-index system */
        --z-dropdown: 1000;
        --z-sticky: 1020;
        --z-fixed: 1030;
        --z-modal-backdrop: 1040;
        --z-modal: 1050;
        --z-popover: 1060;
        --z-tooltip: 1070;
        --z-toast: 1080;
        --z-index-modal: 2000;
        --z-index-tooltip: 3000;
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
    scroll-behavior: smooth;
  }

  body {
    background-color: var(--color-background);
    color: var(--color-text);
    font-family: var(--font-family);
    font-size: var(--font-size-md);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 0.5em;
    font-weight: 600;
    line-height: 1.3;
    color: var(--color-title-card);
  }
  
  h1 {
    font-size: var(--font-size-3xl);
    letter-spacing: -0.01em;
  }
  
  h2 {
    font-size: var(--font-size-2xl);
    letter-spacing: -0.01em;
  }
  
  h3 {
    font-size: var(--font-size-xl);
  }

  a {
    color: var(--color-primary);
    text-decoration: none;
    transition: color var(--transition-fast);
    
    &:hover {
      color: var(--color-primary-hover);
    }
  }

  button, input, select, textarea {
    padding: var(--space-md);
    border: 1px solid var(--color-input-border);
    border-radius: var(--border-radius-md);
    font-family: inherit;
    font-size: var(--font-size-md);
    background-color: var(--color-input);
    color: var(--color-text);
    transition: all var(--transition-fast);
  }

  input:focus, select:focus, textarea:focus {
    border-color: var(--color-primary);
    outline: none;
    box-shadow: var(--shadow-focus);
  }
  
  input::placeholder, textarea::placeholder {
    color: var(--color-text-third);
    opacity: 0.7;
  }

  button {
    cursor: pointer;
    border: none;
    border-radius: var(--border-radius-md);
    padding: var(--space-sm) var(--space-md);
    transition: all var(--transition-normal);
    font-weight: 500;
  }
  
  /* Componentes animados */
  .fade-in {
    animation: fadeIn var(--transition-normal);
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .slide-up {
    animation: slideUp var(--transition-normal);
  }
  
  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  /* Adiciona mudanças suaves para tema claro/escuro */
  .theme-transition {
    transition: background-color var(--transition-slow),
                color var(--transition-slow),
                border-color var(--transition-slow);
  }

  /* Tornar a interface acessível para leitores de tela */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: auto;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  /* Para melhor responsividade em dispositivos móveis */
  @media (max-width: 768px) {
    html {
      font-size: 14px;
    }
    
    h1 {
      font-size: var(--font-size-2xl);
    }
    
    h2 {
      font-size: var(--font-size-xl);
    }
    
    input, select, textarea, button {
      font-size: 16px; /* Evita zoom automático em iOS */
    }
  }
  
  /* Scrollbar personalizada para melhorar a experiência do usuário */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: var(--color-background-secondary);
  }
  
  ::-webkit-scrollbar-thumb {
    background: var(--color-text-third);
    border-radius: 2rem;
  
  ::-webkit-scrollbar-thumb:hover {
    background: var(--color-text-secondary);
  }

  *:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
  
  // Melhorias para mobile
  @media (max-width: 768px) {
    :root {
      --font-size-xs: 0.7rem;
      --font-size-sm: 0.8rem;
      --font-size-md: 0.9rem;
      --space-md: 0.75rem;
    }
  }
`;
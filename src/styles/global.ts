import { createGlobalStyle } from "styled-components";
import { darken, transparentize } from 'polished';

import { getTheme } from "./colors";

export const GlobalStyles = createGlobalStyle`
  :root {
    ${({ theme }) => {
      const currentTheme = getTheme(theme.mode || "light");

      return `
        /* Cores principais com melhor contraste */
        --color-background: ${currentTheme.background.primary};
        --color-background-secondary: ${currentTheme.background.secondary};
        --color-background-third: ${currentTheme.background.third};
        --color-surface: ${theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)'};
        --color-surface-elevated: ${theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.95)'};
        
        --color-text: ${currentTheme.text.primary};
        --color-text-secondary: ${currentTheme.text.secondary};
        --color-title-card: ${currentTheme.text.card};
        --color-text-third: ${currentTheme.text.third};
        --color-text-on-primary: ${currentTheme.text.onPrimary};
        
        /* Bordas modernas com gradientes sutis */
        --color-border-light: ${currentTheme.border.light};
        --color-border: ${currentTheme.border.medium};
        --color-border-dark: ${currentTheme.border.dark};
        --color-border-gradient: linear-gradient(135deg, ${transparentize(0.9, currentTheme.component.primaryButton)}, ${transparentize(0.95, currentTheme.component.primaryButton)});

        /* Sistema de cores primárias com variações */
        --color-primary: ${currentTheme.component.primaryButton};
        --color-primary-hover: ${currentTheme.component.primaryButtonHover};
        --color-primary-light: ${transparentize(0.9, currentTheme.component.primaryButton)};
        --color-primary-dark: ${darken(0.15, currentTheme.component.primaryButton)};
        
        --color-secondary: ${currentTheme.component.secondaryButton};
        --color-secondary-hover: ${currentTheme.component.secondaryButtonHover};
        --color-card: ${currentTheme.component.card};

        /* Glassmorphism effects */
        --glass-background: ${theme.mode === 'dark' 
          ? 'rgba(17, 25, 40, 0.75)' 
          : 'rgba(255, 255, 255, 0.25)'};
        --glass-border: ${theme.mode === 'dark' 
          ? 'rgba(255, 255, 255, 0.18)' 
          : 'rgba(255, 255, 255, 0.18)'};
        --glass-shadow: ${theme.mode === 'dark'
          ? '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
          : '0 8px 32px 0 rgba(31, 38, 135, 0.37)'};

        /* Gradientes modernos */
        --gradient-primary: linear-gradient(135deg, ${currentTheme.component.primaryButton}, ${darken(0.1, currentTheme.component.primaryButton)});
        --gradient-secondary: linear-gradient(135deg, ${currentTheme.component.secondaryButton}, ${darken(0.05, currentTheme.component.secondaryButton)});
        --gradient-surface: linear-gradient(135deg, ${theme.mode === 'dark' ? 'rgba(17, 25, 40, 0.8)' : 'rgba(255, 255, 255, 0.8)'}, ${theme.mode === 'dark' ? 'rgba(17, 25, 40, 0.4)' : 'rgba(255, 255, 255, 0.4)'});

        /* Sombras modernas em camadas */
        --shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
        --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
        --shadow-focus: 0 0 0 3px ${transparentize(0.7, currentTheme.component.primaryButton)};
        --shadow-glow: 0 0 20px ${transparentize(0.8, currentTheme.component.primaryButton)};

        /* Tipografia melhorada */
        --font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        --font-family-display: 'Cal Sans', 'Inter', sans-serif;
        --font-family-mono: 'JetBrains Mono', 'Fira Code', monospace;
        
        --font-size-xs: 0.75rem;
        --font-size-sm: 0.875rem;
        --font-size-base: 1rem;
        --font-size-lg: 1.125rem;
        --font-size-xl: 1.25rem;
        --font-size-2xl: 1.5rem;
        --font-size-3xl: 1.875rem;
        --font-size-4xl: 2.25rem;
        --font-size-5xl: 3rem;

        --font-weight-thin: 100;
        --font-weight-light: 300;
        --font-weight-normal: 400;
        --font-weight-medium: 500;
        --font-weight-semibold: 600;
        --font-weight-bold: 700;
        --font-weight-extrabold: 800;
        --font-weight-black: 900;

        /* Sistema de espaçamento consistente */
        --space-px: 1px;
        --space-0: 0;
        --space-0_5: 0.125rem;
        --space-1: 0.25rem;
        --space-1_5: 0.375rem;
        --space-2: 0.5rem;
        --space-2_5: 0.625rem;
        --space-3: 0.75rem;
        --space-3_5: 0.875rem;
        --space-4: 1rem;
        --space-5: 1.25rem;
        --space-6: 1.5rem;
        --space-7: 1.75rem;
        --space-8: 2rem;
        --space-9: 2.25rem;
        --space-10: 2.5rem;
        --space-12: 3rem;
        --space-16: 4rem;
        --space-20: 5rem;
        --space-24: 6rem;
        --space-32: 8rem;

        /* Border radius moderno */
        --radius-none: 0;
        --radius-sm: 0.125rem;
        --radius-base: 0.25rem;
        --radius-md: 0.375rem;
        --radius-lg: 0.5rem;
        --radius-xl: 0.75rem;
        --radius-2xl: 1rem;
        --radius-3xl: 1.5rem;
        --radius-full: 9999px;

        /* Transições modernas com curvas de bezier */
        --transition-none: none;
        --transition-all: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
        --transition-colors: color 150ms cubic-bezier(0.4, 0, 0.2, 1), background-color 150ms cubic-bezier(0.4, 0, 0.2, 1), border-color 150ms cubic-bezier(0.4, 0, 0.2, 1);
        --transition-opacity: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
        --transition-shadow: box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1);
        --transition-transform: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
        --transition-bounce: all 300ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
        --transition-elastic: all 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275);

        /* Z-index system */
        --z-dropdown: 1000;
        --z-sticky: 1020;
        --z-fixed: 1030;
        --z-modal-backdrop: 1040;
        --z-modal: 1050;
        --z-popover: 1060;
        --z-tooltip: 1070;
        --z-toast: 1080;

        /* Breakpoints */
        --breakpoint-xs: 475px;
        --breakpoint-sm: 640px;
        --breakpoint-md: 768px;
        --breakpoint-lg: 1024px;
        --breakpoint-xl: 1280px;
        --breakpoint-2xl: 1536px;

        /* Cores de estado */
        --color-success: #10b981;
        --color-success-light: #d1fae5;
        --color-success-dark: #047857;
        
        --color-error: #ef4444;
        --color-error-light: #fee2e2;
        --color-error-dark: #dc2626;
        
        --color-warning: #f59e0b;
        --color-warning-light: #fef3c7;
        --color-warning-dark: #d97706;
        
        --color-info: #3b82f6;
        --color-info-light: #dbeafe;
        --color-info-dark: #2563eb;

        /* Backdrop filters para glassmorphism */
        --backdrop-blur: blur(16px);
        --backdrop-saturate: saturate(180%);
      `;
    }}
  }

  /* Reset moderno e melhorado */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
    scroll-behavior: smooth;
    font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11';
  }

  body {
    background: var(--color-background);
    color: var(--color-text);
    font-family: var(--font-family);
    font-size: var(--font-size-base);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    font-variant-ligatures: common-ligatures;
    font-variation-settings: 'wght' 400;
  }

  /* Tipografia moderna */
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-family-display);
    font-weight: var(--font-weight-bold);
    line-height: 1.2;
    letter-spacing: -0.025em;
    color: var(--color-title-card);
    margin-bottom: var(--space-4);
  }

  h1 {
    font-size: clamp(2rem, 4vw, var(--font-size-4xl));
    font-weight: var(--font-weight-extrabold);
  }

  h2 {
    font-size: clamp(1.5rem, 3vw, var(--font-size-3xl));
    font-weight: var(--font-weight-bold);
  }

  h3 {
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-semibold);
  }

  /* Links com hover animado */
  a {
    color: var(--color-primary);
    text-decoration: none;
    transition: var(--transition-colors);
    position: relative;
    
    &:hover {
      color: var(--color-primary-hover);
    }
    
    &:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
      border-radius: var(--radius-sm);
    }
  }

  /* Inputs modernos com foco aprimorado */
  input, select, textarea {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-3) var(--space-4);
    font-family: inherit;
    font-size: var(--font-size-base);
    color: var(--color-text);
    transition: var(--transition-all);
    backdrop-filter: var(--backdrop-blur);
    
    &:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: var(--shadow-focus), var(--shadow-md);
      background: var(--color-surface-elevated);
    }
    
    &::placeholder {
      color: var(--color-text-third);
      opacity: 0.7;
    }
  }

  /* Botões com estados modernos */
  button {
    background: var(--gradient-primary);
    color: var(--color-text-on-primary);
    border: none;
    border-radius: var(--radius-lg);
    padding: var(--space-3) var(--space-6);
    font-family: inherit;
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-medium);
    cursor: pointer;
    transition: var(--transition-all);
    position: relative;
    overflow: hidden;
    
    &:hover {
      transform: translateY(-1px);
      box-shadow: var(--shadow-lg), var(--shadow-glow);
    }
    
    &:active {
      transform: translateY(0);
      box-shadow: var(--shadow-md);
    }
    
    &:focus-visible {
      outline: none;
      box-shadow: var(--shadow-focus), var(--shadow-lg);
    }
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }
  }

  /* Scrollbar personalizada moderna */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--color-text-third);
    border-radius: var(--radius-full);
    border: 2px solid transparent;
    background-clip: content-box;
    
    &:hover {
      background: var(--color-text-secondary);
      background-clip: content-box;
    }
  }

  /* Seleção de texto personalizada */
  ::selection {
    background: var(--color-primary-light);
    color: var(--color-primary-dark);
  }

  /* Animações modernas */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes shimmer {
    0% {
      background-position: -200px 0;
    }
    100% {
      background-position: calc(200px + 100%) 0;
    }
  }

  /* Classes utilitárias */
  .fade-in {
    animation: fadeIn 0.3s var(--transition-all);
  }

  .slide-up {
    animation: slideUp 0.4s var(--transition-all);
  }

  .scale-in {
    animation: scaleIn 0.2s var(--transition-all);
  }

  .glass {
    background: var(--glass-background);
    backdrop-filter: var(--backdrop-blur);
    -webkit-backdrop-filter: var(--backdrop-blur);
    border: 1px solid var(--glass-border);
  }

  .shimmer {
    background: linear-gradient(
      90deg,
      var(--color-surface) 0%,
      var(--color-surface-elevated) 50%,
      var(--color-surface) 100%
    );
    background-size: 200px 100%;
    animation: shimmer 1.5s infinite;
  }

  /* Responsividade aprimorada */
  @media (max-width: 768px) {
    html {
      font-size: 14px;
    }
    
    input, select, textarea, button {
      font-size: 16px; /* Evita zoom automático em iOS */
      padding: var(--space-3);
    }
    
    :root {
      --space-4: 0.75rem;
      --space-6: 1rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
    
    html {
      scroll-behavior: auto;
    }
  }

  /* Modo escuro aprimorado */
  @media (prefers-color-scheme: dark) {
    :root {
      color-scheme: dark;
    }
  }

  /* Focus visible para acessibilidade */
  *:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
    border-radius: var(--radius-sm);
  }
`;
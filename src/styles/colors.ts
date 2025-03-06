// Definição da paleta de cores do sistema
// colors.ts

/**
 * Paleta de cores principal da aplicação
 * Usado como referência para os temas claro e escuro
 */
export const colorPalette = {
    // Cores primárias
    primary: {
      100: '#E6F7FF',
      200: '#BAE7FF',
      300: '#91D5FF',
      400: '#69C0FF',
      500: '#40A9FF', // Cor principal
      600: '#1890FF',
      700: '#096DD9',
      800: '#0050B3',
      850: "#0056b3",
      900: '#003A8C',
    },
    
    // Cores secundárias
    secondary: {
      100: '#F6FFED',
      200: '#D9F7BE',
      300: '#B7EB8F',
      400: '#95DE64',
      500: '#73D13D', // Cor secundária principal
      600: '#52C41A',
      700: '#389E0D',
      800: '#237804',
      900: '#135200',
    },
    
    // Tons de cinza
    gray: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      150: '#E0E0E0',
      200: '#E8E8E8',
      300: '#D9D9D9',
      400: '#BFBFBF',
      500: '#8C8C8C',
      600: '#595959',
      700: '#434343',
      750: '#333333',
      800: '#262626',
      900: '#141414',
    },
    
    // Cores para feedback
    feedback: {
      success: '#52C41A',
      warning: '#FAAD14',
      error: '#F5222D',
      info: '#1890FF',
    },
    icons: {
      google: '#DB4437',
      facebook: '#4267B2',
      github: '#333',
      apple: '#000',
    }
  };
  
  /**
   * Definição do tema claro
   */
  export const lightTheme = {
    // Cores de superfície
    background: {
      primary: '#eeeeee',
      secondary: colorPalette.gray[50],
      third: colorPalette.primary[850],
    },
    // Cores de texto
    text: {
      primary: colorPalette.gray[900],
      secondary: colorPalette.gray[600],
      card: colorPalette.gray[500],
      third: colorPalette.gray[50],
      onPrimary: '#939393',
    },
    // Cores de borda
    border: {
      light: colorPalette.gray[200],
      medium: colorPalette.gray[300],
      dark: colorPalette.gray[400],
    },
    // Cores de componentes
    component: {
      primaryButton: colorPalette.primary[500],
      primaryButtonHover: colorPalette.primary[850],
      secondaryButton: colorPalette.gray[50],
      secondaryButtonHover: 'rgba(224, 224, 224, 0.419)',
      card: '#f0f0f0',
      text: colorPalette.gray[500],
      disabled: colorPalette.gray[200],
      input: colorPalette.gray[100],
      inputBorder: colorPalette.gray[300],
      inputFocus: colorPalette.primary[500],
    },
    // Cores de feedback
    feedback: colorPalette.feedback,

    // Cores de ícones
    icons: colorPalette.icons,

    // Sombras
    shadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    },
  };
  
  /**
   * Definição do tema escuro
   */
  export const darkTheme = {
    // Cores de superfície
    background: {
      primary: colorPalette.gray[900],
      secondary: colorPalette.gray[800],
      third: colorPalette.gray[700],
    },
    // Cores de texto
    text: {
      primary: colorPalette.gray[150],
      secondary: colorPalette.gray[200],
      third: colorPalette.gray[400],
      card: colorPalette.gray[750],
      onPrimary: '#FFFFFF',
    },
    // Cores de borda
    border: {
      light: colorPalette.gray[700],
      medium: colorPalette.gray[600],
      dark: colorPalette.gray[500],
    },
    // Cores de componentes
    component: {
      primaryButton: colorPalette.primary[600],
      primaryButtonHover: colorPalette.primary[200],
      secondaryButton: colorPalette.gray[50],
      secondaryButtonHover: colorPalette.gray[300],
      card: colorPalette.gray[800],
      text: colorPalette.gray[500],
      disabled: colorPalette.gray[800],
      input: colorPalette.gray[800],
      inputBorder: colorPalette.gray[600],
      inputFocus: colorPalette.primary[400],
    },
    // Cores de feedback
    feedback: {
      ...colorPalette.feedback,
      info: colorPalette.primary[400], // Um pouco mais claro no tema escuro
    },

    // Cores de ícones
    icons: colorPalette.icons,
    
    // Sombras
    shadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.9)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    },
  };
  
  /**
   * Função auxiliar para obter o tema correto baseado no modo atual
   * @param mode Modo atual (light ou dark)
   */
  export const getTheme = (mode: 'light' | 'dark') => {
    return mode === 'light' ? lightTheme : darkTheme;
  };

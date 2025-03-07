// Definição da paleta de cores do sistema
// colors.ts

/**
 * Paleta de cores principal da aplicação
 * Usado como referência para os temas claro e escuro
 */
export const colorPalette = {
  // Cores primárias
  primary: {
    50: '#E6F7FF',
    100: '#BAE7FF',
    200: '#91D5FF',
    300: '#69C0FF',
    400: '#40A9FF', 
    500: '#1890FF', // Cor principal
    600: '#096DD9',
    700: '#0050B3',
    800: '#003A8C',
    900: '#002766',
  },
  
  // Cores secundárias
  secondary: {
    50: '#F6FFED',
    100: '#D9F7BE',
    200: '#B7EB8F',
    300: '#95DE64',
    400: '#73D13D',
    500: '#52C41A', // Cor secundária principal
    600: '#389E0D',
    700: '#237804',
    800: '#135200',
    900: '#092B00',
  },
  
  // Tons de cinza
  gray: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
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
    primary: '#f8f9fa',
    secondary: '#ffffff',
    third: '#f0f2f5',
  },
  // Cores de texto
  text: {
    primary: colorPalette.gray[900],
    secondary: colorPalette.gray[700],
    third: colorPalette.gray[500],
    card: colorPalette.gray[800],
    onPrimary: '#ffffff',
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
    primaryButtonHover: colorPalette.primary[600],
    secondaryButton: colorPalette.gray[100],
    secondaryButtonHover: colorPalette.gray[200],
    card: '#ffffff',
    text: colorPalette.gray[800],
    disabled: colorPalette.gray[300],
    input: '#ffffff',
    inputBorder: colorPalette.gray[300],
    inputFocus: colorPalette.primary[400],
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
    primary: '#121212',
    secondary: '#1e1e1e',
    third: '#2d2d2d',
  },
  // Cores de texto
  text: {
    primary: '#e0e0e0',
    secondary: '#bdbdbd',
    third: '#9e9e9e',
    card: '#e0e0e0',
    onPrimary: '#ffffff',
  },
  // Cores de borda
  border: {
    light: '#383838',
    medium: '#424242',
    dark: '#5c5c5c',
  },
  // Cores de componentes
  component: {
    primaryButton: colorPalette.primary[500],
    primaryButtonHover: colorPalette.primary[400],
    secondaryButton: '#333333',
    secondaryButtonHover: '#444444',
    card: '#1e1e1e',
    text: '#bdbdbd',
    disabled: '#333333',
    input: '#2d2d2d',
    inputBorder: '#424242',
    inputFocus: colorPalette.primary[400],
  },
  // Cores de feedback
  feedback: {
    ...colorPalette.feedback,
    info: colorPalette.primary[400],
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
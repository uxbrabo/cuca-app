// Em: src/theme/theme.ts

import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

// A palavra 'export' aqui é a parte mais importante.
export const theme = {
  ...DefaultTheme, // Copia todas as propriedades do tema padrão
  colors: {
    ...DefaultTheme.colors, // Copia todas as cores padrão
    primary: '#0052cc',     // Cor primária do seu app (azul escuro)
    background: '#FFFFFF',  // Fundo branco
    
    // Cores customizadas que usamos nas telas
    splashBackground: '#dbe9ff',
    brand: '#0052cc',
    footerText: '#6a85a6',
  },
  spacing: {
    medium: 16,
    xxlarge: 40,
  },
  fontSizes: {
    brand: 48,
    footer: 14,
  },
  logoSize: 150,
};
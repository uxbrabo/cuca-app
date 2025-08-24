// Em: src/theme/theme.ts

import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

// A palavra 'export' aqui é a parte mais importante.
export const theme = {
  ...DefaultTheme, // Copia todas as propriedades do tema padrão
  colors: {
    ...DefaultTheme.colors, // Copia todas as cores padrão
    primary: '#30628C',     // Cor primária do seu app (azul escuro)
    secundary: '#CDE5FF',  // Cor secundária (ciano)
    background: '#FFFFFF',  // Fundo branco
    
    // Cores customizadas que usamos nas telas
    splashBackground: '#CDE5FF',
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
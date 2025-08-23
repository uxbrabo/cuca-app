import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme, // Copia todas as propriedades do tema padrão
  colors: {
    ...DefaultTheme.colors, // Copia todas as cores padrão
    primary: '#0052cc',     // Cor primária do seu app (azul escuro)
    background: '#FFFFFF',  // Fundo branco
    // Adicione outras cores do seu Figma aqui se precisar
  },
};
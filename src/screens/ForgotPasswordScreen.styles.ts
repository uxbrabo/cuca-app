// Em: src/screens/ForgotPasswordScreen.styles.ts

import { StyleSheet } from 'react-native';
import { theme } from '~/theme/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 24,
  },
  instructionText: {
    fontSize: 16,
    color: 'dimgrey',
    marginBottom: 24,
    lineHeight: 24, // Melhora a legibilidade do texto
  },
  input: {
    marginBottom: 24,
  },
  button: {
    paddingVertical: 4,
  },
});

export default styles;
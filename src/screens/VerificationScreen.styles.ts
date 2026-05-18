// Em: src/screens/VerificationScreen.styles.ts

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
    marginBottom: 32,
    lineHeight: 24,
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  // Estilo ajustado para o TextInput do Paper
  otpInput: {
    width: '22%', // Usa porcentagem para ser mais responsivo
    textAlign: 'center',
  },
  resendContainer: {
    alignItems: 'center',
    marginVertical: 24, // Adicionado marginVertical
  },
  resendInfoText: {
    fontSize: 14,
    color: 'dimgrey',
  },
  resendTimerText: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: 'bold',
    marginTop: 8,
  },
  button: {
    paddingVertical: 4,
  },
});

export default styles;
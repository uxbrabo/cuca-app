import { StyleSheet } from 'react-native';
import { theme } from '~/theme/theme'; // O caminho para o tema

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 16,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkboxContainer: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginLeft: -10, // Ajuste para alinhar o texto
  },
  checkboxLabel: {
    fontSize: 14,
    color: 'dimgrey',
  },
  forgotPasswordText: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  button: {
    marginBottom: 16,
    paddingVertical: 4,
  },
  separator: {
    marginVertical: 16,
    color: 'grey',
    textAlign: 'center',
  },
  socialButton: {
    marginBottom: 16,
    borderColor: 'lightgrey',
  },
  socialButtonLabel: {
    color: 'dimgrey',
  },
  socialButtonContent: {
    height: 48,
  },
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto', // Empurra para o final do espaço disponível
    paddingBottom: 16,
  },
  registerTextRegular: {
    fontSize: 14,
  },
  registerTextBold: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
});

export default styles;
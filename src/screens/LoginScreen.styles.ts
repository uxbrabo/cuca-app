import { StyleSheet } from 'react-native';
import { theme } from '~/theme/theme'; // O caminho para o tema

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    alignItems: 'center', // <-- A LINHA DECISIVA
  },
  // NOVO ESTILO PARA O CONTAINER DE CONTEÚDO
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 180,
    height: 120,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 48,
  },
  button: {
    marginBottom: 16,
    width: 320,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 16,
  },
  registerButton: {
    backgroundColor: '#e6e5e5ff',
  },
  registerButtonLabel: {
    color: theme.colors.primary,
  },
  separator: {
    marginVertical: 16,
    color: 'grey',
    textAlign: 'center',
  },
  socialButton: {
    marginBottom: 16,
    borderColor: 'lightgrey',
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    paddingTop: 4,
    paddingBottom: 4,
  },
  socialButtonLabel: {
    color: 'dimgrey',
  },
  socialButtonContent: {
    height: 48,
  },
});

export default styles;
import { StyleSheet } from 'react-native';

// OS ESTILOS SÃO QUASE IDÊNTICOS AOS DA TELA DE SIGNIN
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8, // Pequeno ajuste de espaço
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
});

export default styles;
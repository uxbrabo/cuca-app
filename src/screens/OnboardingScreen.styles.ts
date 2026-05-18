// Em: src/screens/OnboardingScreen.styles.ts

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  // GARANTA QUE ESTE BLOCO 'gradient' ESTEJA AQUI E CORRETO:
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '60%',
  },
  contentContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'flex-end',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 8,
  },
  button: {
    borderRadius: 100,
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 40,
    opacity: 0.8,
  },
});

export default styles;
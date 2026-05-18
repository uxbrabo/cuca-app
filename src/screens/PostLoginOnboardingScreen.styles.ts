// Em: src/screens/PostLoginOnboardingScreen.styles.ts

import { StyleSheet } from 'react-native';
import { theme } from '~/theme/theme';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  pagerView: {
    flex: 1,
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: theme.colors.primary,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: 'dimgrey',
    lineHeight: 24,
  },
  footer: {
    padding: 24,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#dbe9ff',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: theme.colors.primary,
  },
  button: {
    paddingVertical: 8,
  },
});

export default styles;
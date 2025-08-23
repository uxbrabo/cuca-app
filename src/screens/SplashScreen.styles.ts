import { StyleSheet } from 'react-native';
import { theme } from '~/theme/theme';

const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  conteudoCentro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: theme.logoSize,
    height: theme.logoSize,
    resizeMode: 'contain',
  },
  textoMarca: {
    fontSize: theme.fontSizes.brand,
    fontWeight: 'bold',
    color: theme.colors.brand,
    marginTop: theme.spacing.medium,
  },
  textoRodape: {
    fontSize: theme.fontSizes.footer,
    color: theme.colors.footerText,
    textAlign: 'center',
    paddingBottom: theme.spacing.xxlarge,
  },
});

export default styles;
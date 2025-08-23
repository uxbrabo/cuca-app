import React, { useEffect } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App'; // Agora este import vai funcionar!

// Seus tokens de design
const theme = {
  colors: {
    background: '#dbe9ff',
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
  logoSize: 200,
};

// Define o tipo das propriedades da nossa tela
type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

function SplashScreen({ navigation }: Props): React.JSX.Element {
  useEffect(() => {
    const timer = setTimeout(() => {
    navigation.replace('Onboarding');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.containerPrincipal}>
      <View style={styles.conteudoCentro}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
        />
      </View>
      <Text style={styles.textoRodape}>Todos os direitos reservados.</Text>
    </SafeAreaView>
  );
}

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

export default SplashScreen;
import React, { useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '~/screens/SplashScreen.styles';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '~/navigation/RootNavigator';

// tipo das propriedades da nossa tela
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

export default SplashScreen;
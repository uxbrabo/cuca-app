import React, { useEffect } from 'react';
import { View, Image, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '~/navigation/types';
import styles from '~/screens/SplashScreen.styles';
import { useAuth } from '~/context/AuthContext';
import { useProfile } from '~/context/ProfileContext';
import { Colors } from '~/theme/theme';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

function SplashScreen(): React.JSX.Element {
  const navigation = useNavigation<Nav>();
  const { authState } = useAuth();
  const { setProfile } = useProfile();

  useEffect(() => {
    if (authState.status === 'loading') {
      // Firebase ainda verificando — fallback de 5s evita tela travada se não configurado
      const fallback = setTimeout(() => navigation.replace('Onboarding'), 5000);
      return () => clearTimeout(fallback);
    }

    if (authState.status === 'authenticated') {
      setProfile(authState.user.perfil);
      navigation.replace('MainTabs');
    } else {
      const timer = setTimeout(() => navigation.replace('Onboarding'), 1500);
      return () => clearTimeout(timer);
    }
  }, [authState.status]);

  return (
    <SafeAreaView style={styles.containerPrincipal}>
      <View style={styles.conteudoCentro}>
        <Image source={require('~/assets/logo.png')} style={styles.logo} />
        {authState.status === 'loading' && (
          <ActivityIndicator color={Colors.primary} style={{ marginTop: 24 }} />
        )}
      </View>
      <Text style={styles.textoRodape}>Todos os direitos reservados.</Text>
    </SafeAreaView>
  );
}

export default SplashScreen;

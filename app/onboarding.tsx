import React from 'react';
import { ImageBackground, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '~/navigation/types';
import styles from '~/screens/OnboardingScreen.styles';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;

function OnboardingScreen(): React.JSX.Element {
  const navigation = useNavigation<Nav>();

  return (
    <ImageBackground
      source={require('~/assets/background.png')}
      resizeMode="cover"
      style={styles.background}
    >
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.gradient}
      />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Seja Bem-vindo!</Text>
            <Text style={styles.subtitle}>
              Como o Cuca a gestão está nas suas mãos
            </Text>
          </View>

          <Button
            mode="contained"
            onPress={() => navigation.navigate('Login')}
            style={styles.button}
            labelStyle={styles.buttonLabel}
          >
            Iniciar
          </Button>

          <Text style={styles.footerText}>
            Todos os diretos reservados CUCA 2025
          </Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

export default OnboardingScreen;

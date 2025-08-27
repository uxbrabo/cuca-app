// Em: src/screens/OnboardingScreen.tsx

import React from 'react';
import { ImageBackground, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '~/navigation/types';

// ADICIONE ESTA LINHA QUE FALTAVA:
import styles from './OnboardingScreen.styles';


// 2. Criamos o "contrato" que descreve as propriedades desta tela
type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;
// --- FIM DAS ADIÇÕES ---


// 3. AQUI RECEBEMOS A PROPRIEDADE 'navigation'
function OnboardingScreen({ navigation }: Props): React.JSX.Element {
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

          {/* 4. AQUI USAMOS A PROPRIEDADE 'navigation' */}
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Login')} // A ação agora navega para a tela 'Login'
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
// Em: src/screens/OnboardingScreen.tsx

import React from 'react';
import { StyleSheet, ImageBackground, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from 'react-native-paper';

// --- ADIÇÕES IMPORTANTES ---
// 1. Importamos as ferramentas de "tipagem" da navegação
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App'; // Nosso mapa de telas

// 2. Criamos o "contrato" que descreve as propriedades desta tela
type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;
// --- FIM DAS ADIÇÕES ---


// 3. AQUI RECEBEMOS A PROPRIEDADE 'navigation'
function OnboardingScreen({ navigation }: Props): React.JSX.Element {
  return (
    <ImageBackground
      source={require('../../assets/background.png')}
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

// Seus estilos continuam os mesmos aqui
const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
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
    borderRadius: 16,
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

export default OnboardingScreen;
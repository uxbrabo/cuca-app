// Em: src/navigation/RootNavigator.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '~/screens/SplashScreen';
import OnboardingScreen from '~/screens/OnboardingScreen';
import LoginScreen from '~/screens/LoginScreen';
import SignInScreen from '~/screens/SignInScreen';
import RegisterScreen from '~/screens/RegisterScreen';
import ForgotPasswordScreen from '~/screens/ForgotPasswordScreen';
import VerificationScreen from '~/screens/VerificationScreen';

// O mapa de telas continua o mesmo
export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  SignIn: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  Verification: undefined;
}
const Stack = createNativeStackNavigator<RootStackParamList>();

// Este é o nosso componente de navegação
function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }} // Aplicando globalmente por enquanto
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />

        <Stack.Screen name="SignIn" component={SignInScreen}
            options={{
                headerShown: true,
                title: 'Login',
                headerBackTitle: 'Voltar',
            }}
        />

        <Stack.Screen name="Register" component={RegisterScreen}
            options={{
                headerShown: true,
                title: 'Cadastro',
                headerBackTitle: 'Voltar',
            }}
        />

        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}
            options={{
                headerShown: true,
                title: 'Recuperar Senha',
                headerBackTitle: 'Voltar',
            }}
        />

         <Stack.Screen name="Verification" component={VerificationScreen}
            options={{
                headerShown: true,
                title: 'Verificação',
                headerBackTitle: 'Voltar',
            }}
/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
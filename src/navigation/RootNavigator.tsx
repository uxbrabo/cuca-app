// Em: src/navigation/RootNavigator.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '~/screens/SplashScreen';
import OnboardingScreen from '~/screens/OnboardingScreen';
import LoginScreen from '~/screens/LoginScreen';
import SignInScreen from '~/screens/SignInScreen';

// O mapa de telas continua o mesmo
export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  SignIn: undefined;
};

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
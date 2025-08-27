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
import PostLoginOnboardingScreen from '~/screens/PostLoginOnboardingScreen';
import MainTabNavigator from './MainTabNavigator';
import PerformanceScreen from '~/screens/PerformanceScreen';
import SubjectsScreen from '~/screens/SubjectsScreen';
import ContentHubScreen from '~/screens/ContentHubScreen';
import QuizArenaScreen from '~/screens/QuizArenaScreen';
import CollaborativeStudyScreen from '~/screens/CollaborativeStudyScreen';
import FamilyPortalScreen from '~/screens/FamilyPortalScreen';
import { RootStackParamList } from '~/navigation/types'; // CORREÇÃO: Importa os tipos do local correto

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

        <Stack.Screen name="PostLoginOnboarding" component={PostLoginOnboardingScreen}
            options={{
                headerShown: true,
                title: 'Boas-vindas',
                headerBackTitle: 'Voltar',
            }}
        />

        <Stack.Screen name="Performance" component={PerformanceScreen}
            options={{
                headerShown: true,
                title: 'Meu Desempenho',
                headerBackTitle: 'Voltar',
            }}
        />

        {/* Telas do menu da Home que ainda não foram desenvolvidas */}
        <Stack.Screen name="Subjects" component={SubjectsScreen}
            options={{ headerShown: true, title: 'Minhas Disciplinas', headerBackTitle: 'Voltar' }}
        />
        <Stack.Screen name="ContentHub" component={ContentHubScreen}
            options={{ headerShown: true, title: 'HUB de Conteúdo', headerBackTitle: 'Voltar' }}
        />
        <Stack.Screen name="QuizArena" component={QuizArenaScreen}
            options={{ headerShown: true, title: 'Arena de Quizzes', headerBackTitle: 'Voltar' }}
        />
        <Stack.Screen name="CollaborativeStudy" component={CollaborativeStudyScreen}
            options={{ headerShown: true, title: 'Estudo Colaborativo', headerBackTitle: 'Voltar' }}
        />
        <Stack.Screen name="FamilyPortal" component={FamilyPortalScreen}
            options={{ headerShown: true, title: 'Portal da Família', headerBackTitle: 'Voltar' }}
        />

        {/* Adicionando o navegador de abas como uma tela no stack principal */}
        <Stack.Screen
            name="MainTabs"
            component={MainTabNavigator}
            options={{ headerShown: false }} // Garante que o header do Stack não apareça para as abas
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
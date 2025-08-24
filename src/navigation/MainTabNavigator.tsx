// Em: src/navigation/MainTabNavigator.tsx

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '~/theme/theme';

// Importa as nossas novas telas
import HomeScreen from '~/screens/HomeScreen';
import NewsScreen from '~/screens/NewsScreen';
import MessagesScreen from '~/screens/MessagesScreen';
import ProfileScreen from '~/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary, // Cor do ícone ativo
        tabBarInactiveTintColor: 'grey', // Cor do ícone inativo
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Novidades"
        component={NewsScreen}
        options={{
          tabBarLabel: 'Novidades',
          tabBarIcon: ({ color, size }) => (
            <Icon name="newspaper-variant-multiple" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Mensagens"
        component={MessagesScreen}
        options={{
          tabBarLabel: 'Mensagem',
          tabBarIcon: ({ color, size }) => (
            <Icon name="message-text" color={color} size={size} />
          ),
          tabBarBadge: 2, // Exemplo de notificação
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <Icon name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTabNavigator;
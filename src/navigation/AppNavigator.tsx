import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Typography } from '~/theme/theme';
import type { RootStackParamList, TabParamList, HomeStackParamList, MessagesStackParamList, ForumStackParamList } from './types';

import SplashScreen from '../../app/index';
import OnboardingScreen from '../../app/onboarding';
import LoginScreen from '../../app/login';
import SignInScreen from '../../app/sign-in';
import RegisterScreen from '../../app/register';
import ForgotPasswordScreen from '../../app/forgot-password';
import VerificationScreen from '../../app/verification';
import PostLoginOnboardingScreen from '../../app/post-login-onboarding';
import HomeScreen from '../../app/(tabs)/home';
import NewsScreen from '../../app/(tabs)/news';
import MessagesScreen from '../../app/(tabs)/messages';
import ProfileScreen from '../../app/(tabs)/profile';
import NotificationsScreen from '../../app/notifications';
import PerformanceScreen from '../../app/(tabs)/performance';
import SubjectsScreen from '../../app/(tabs)/subjects';
import ContentHubScreen from '../../app/(tabs)/content-hub';
import QuizArenaScreen from '../../app/(tabs)/quiz-arena';
import CollaborativeStudyScreen from '../../app/(tabs)/collaborative-study';
import FamilyPortalScreen from '../../app/(tabs)/family-portal';
import ForumScreen from '../../app/(tabs)/forum';
import ForumDetailScreen from '../../app/forum-detail';
import ConversationDetailScreen from '../../app/conversation-detail';
import ArticleDetailScreen from '../../app/article-detail';
import VideoPlayerScreen from '../../app/video-player';
import LearningTrailScreen from '../../app/learning-trail';
import SchoolPortalScreen from '../../app/school-portal';
import TutorVirtualScreen from '../../app/tutor-virtual';
import DiagnosticQuizScreen from '../../app/diagnostic-quiz';
import AchievementsScreen from '../../app/achievements';
import PomodoroScreen from '../../app/pomodoro';
import FlashcardsScreen from '../../app/flashcards';
import EssayAIScreen from '../../app/essay-ai';
import SchoolCalendarScreen from '../../app/school-calendar';
import OfflineContentScreen from '../../app/offline-content';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const MessagesStack = createNativeStackNavigator<MessagesStackParamList>();
const ForumStack = createNativeStackNavigator<ForumStackParamList>();

function BackBtn({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 8 }}
      hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
    >
      <Icon name="chevron-left" size={26} color={Colors.primary} />
      <Text style={{ color: Colors.primary, fontSize: 17 }}>Voltar</Text>
    </TouchableOpacity>
  );
}

const authHeaderStyle = {
  headerStyle: { backgroundColor: Colors.white },
  headerTintColor: Colors.primary,
  headerTitleStyle: { ...Typography.h4, color: Colors.textPrimary },
  headerShadowVisible: true,
  headerBackTitle: 'Voltar',
};

const innerHeaderStyle = {
  headerStyle: { backgroundColor: Colors.white },
  headerTintColor: Colors.primary,
  headerTitleStyle: { ...Typography.h4, color: Colors.textPrimary },
  headerShadowVisible: true,
  headerBackTitle: 'Voltar',
};

const tabHeaderStyle = {
  headerStyle: { backgroundColor: Colors.white },
  headerTitleStyle: { ...Typography.h4, color: Colors.textPrimary },
  headerShadowVisible: true,
};

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={innerHeaderStyle}>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="Notifications" component={NotificationsScreen} options={{ headerShown: true, headerBackTitle: 'Voltar', title: 'Notificações' }} />
      <HomeStack.Screen name="LearningTrail" component={LearningTrailScreen} options={{ headerShown: true, headerBackTitle: 'Voltar', title: 'Minha Trilha' }} />
      <HomeStack.Screen name="Performance" component={PerformanceScreen} options={{ headerShown: true, headerBackTitle: 'Voltar', title: 'Meu Desempenho' }} />
      <HomeStack.Screen name="Subjects" component={SubjectsScreen} options={{ headerShown: true, headerBackTitle: 'Voltar', title: 'Minhas Disciplinas' }} />
      <HomeStack.Screen name="ContentHub" component={ContentHubScreen} options={{ headerShown: true, headerBackTitle: 'Voltar', title: 'HUB de Conteúdo' }} />
      <HomeStack.Screen name="ArticleDetail" component={ArticleDetailScreen} options={({ route }) => ({ headerShown: true, headerBackTitle: 'Voltar', title: route.params.subject })} />
      <HomeStack.Screen name="VideoPlayer" component={VideoPlayerScreen} options={({ route }) => ({ headerShown: true, headerBackTitle: 'Voltar', title: route.params.subject })} />
      <HomeStack.Screen name="QuizArena" component={QuizArenaScreen} options={{ headerShown: true, headerBackTitle: 'Voltar', title: 'Arena de Quizzes' }} />
      <HomeStack.Screen name="CollaborativeStudy" component={CollaborativeStudyScreen} options={{ headerShown: true, headerBackTitle: 'Voltar', title: 'Estudo Colaborativo' }} />
      <HomeStack.Screen name="FamilyPortal" component={FamilyPortalScreen} options={{ headerShown: true, headerBackTitle: 'Voltar', title: 'Portal da Família' }} />
      <HomeStack.Screen name="SchoolPortal" component={SchoolPortalScreen} options={{ headerShown: true, headerBackTitle: 'Voltar', title: 'Portal da Escola' }} />
      <HomeStack.Screen name="TutorVirtual" component={TutorVirtualScreen} options={{ headerShown: true, headerBackTitle: 'Voltar', title: 'Tutor Virtual' }} />
      <HomeStack.Screen name="Achievements" component={AchievementsScreen} options={{ headerShown: true, headerBackTitle: 'Voltar', title: 'Conquistas' }} />
      <HomeStack.Screen name="Pomodoro" component={PomodoroScreen} options={{ headerShown: true, headerBackTitle: 'Voltar', title: 'Pomodoro' }} />
      <HomeStack.Screen name="Flashcards" component={FlashcardsScreen} options={{ headerShown: true, headerBackTitle: 'Voltar', title: 'Flashcards' }} />
      <HomeStack.Screen name="EssayAI" component={EssayAIScreen} options={{ headerShown: true, headerBackTitle: 'Voltar', title: 'Redação com IA' }} />
      <HomeStack.Screen name="SchoolCalendar" component={SchoolCalendarScreen} options={{ headerShown: true, headerBackTitle: 'Voltar', title: 'Calendário Escolar' }} />
      <HomeStack.Screen name="OfflineContent" component={OfflineContentScreen} options={{ headerShown: true, headerBackTitle: 'Voltar', title: 'Conteúdo Offline' }} />
    </HomeStack.Navigator>
  );
}

function MessagesStackNavigator() {
  return (
    <MessagesStack.Navigator screenOptions={innerHeaderStyle}>
      <MessagesStack.Screen
        name="MessagesList"
        component={MessagesScreen}
        options={({ navigation }) => ({
          title: 'Mensagens',
          headerLeft: () => <BackBtn onPress={() => navigation.getParent()?.navigate('Inicio')} />,
        })}
      />
      <MessagesStack.Screen
        name="ConversationDetail"
        component={ConversationDetailScreen}
        options={({ route }) => ({ headerShown: true, headerBackTitle: 'Voltar', title: route.params.name })}
      />
    </MessagesStack.Navigator>
  );
}

function ForumStackNavigator() {
  return (
    <ForumStack.Navigator screenOptions={innerHeaderStyle}>
      <ForumStack.Screen
        name="ForumList"
        component={ForumScreen}
        options={({ navigation }) => ({
          title: 'Fórum',
          headerLeft: () => <BackBtn onPress={() => navigation.getParent()?.navigate('Inicio')} />,
        })}
      />
      <ForumStack.Screen
        name="ForumDetail"
        component={ForumDetailScreen}
        options={({ route }) => ({
          headerShown: true,
          headerBackTitle: 'Voltar',
          title: route.params.title.length > 30
            ? route.params.title.slice(0, 30) + '…'
            : route.params.title,
        })}
      />
    </ForumStack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textDisabled,
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopColor: Colors.divider,
          borderTopWidth: 1,
          paddingTop: 4,
          paddingBottom: 4,
          height: 60,
        },
        tabBarLabelStyle: { ...Typography.caption, marginBottom: 2 },
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={HomeStackNavigator}
        options={{
          headerShown: false,
          title: 'Início',
          tabBarIcon: ({ color, size }) => <Icon name="home" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Novidades"
        component={NewsScreen}
        options={({ navigation }) => ({
          ...tabHeaderStyle,
          headerShown: true,
          title: 'Novidades',
          headerLeft: () => <BackBtn onPress={() => navigation.navigate('Inicio' as never)} />,
          tabBarIcon: ({ color, size }) => (
            <Icon name="newspaper-variant-multiple" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="Forum"
        component={ForumStackNavigator}
        options={{
          headerShown: false,
          title: 'Fórum',
          tabBarIcon: ({ color, size }) => (
            <Icon name="forum-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Mensagens"
        component={MessagesStackNavigator}
        options={{
          headerShown: false,
          title: 'Mensagens',
          tabBarIcon: ({ color, size }) => (
            <Icon name="message-text" color={color} size={size} />
          ),
          tabBarBadge: 2,
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={({ navigation }) => ({
          ...tabHeaderStyle,
          headerShown: true,
          title: 'Meu Perfil',
          headerLeft: () => <BackBtn onPress={() => navigation.navigate('Inicio' as never)} />,
          tabBarIcon: ({ color, size }) => (
            <Icon name="account" color={color} size={size} />
          ),
        })}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
      <RootStack.Screen name="Splash" component={SplashScreen} />
      <RootStack.Screen name="Onboarding" component={OnboardingScreen} />
      <RootStack.Screen name="Login" component={LoginScreen} />
      <RootStack.Screen name="PostLoginOnboarding" component={PostLoginOnboardingScreen} />

      <RootStack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ ...authHeaderStyle, headerShown: true, title: 'Entrar' }}
      />
      <RootStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ ...authHeaderStyle, headerShown: true, title: 'Criar conta' }}
      />
      <RootStack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{ ...authHeaderStyle, headerShown: true, title: 'Recuperar senha' }}
      />
      <RootStack.Screen
        name="Verification"
        component={VerificationScreen}
        options={{ ...authHeaderStyle, headerShown: true, title: 'Verificação' }}
      />

      <RootStack.Screen
        name="DiagnosticQuiz"
        component={DiagnosticQuizScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen name="MainTabs" component={MainTabs} />
    </RootStack.Navigator>
  );
}

import type { NavigatorScreenParams } from '@react-navigation/native';

export type ForumStackParamList = {
  ForumList: undefined;
  ForumDetail: { id: string; title: string };
};

export type HomeStackParamList = {
  Home: undefined;
  Notifications: undefined;
  LearningTrail: undefined;
  Performance: undefined;
  Subjects: undefined;
  ContentHub: undefined;
  ArticleDetail: { id: string; title: string; subject: string };
  VideoPlayer: { id: string; title: string; subject: string };
  QuizArena: undefined;
  CollaborativeStudy: undefined;
  FamilyPortal: undefined;
  SchoolPortal: undefined;
  TutorVirtual: undefined;
  Achievements: undefined;
  Pomodoro: undefined;
  Flashcards: undefined;
  EssayAI: undefined;
  SchoolCalendar: undefined;
  OfflineContent: undefined;
};

export type MessagesStackParamList = {
  MessagesList: undefined;
  ConversationDetail: { id: string; name: string; avatar: string };
};

export type TabParamList = {
  Inicio: NavigatorScreenParams<HomeStackParamList>;
  Novidades: undefined;
  Forum: NavigatorScreenParams<ForumStackParamList>;
  Mensagens: NavigatorScreenParams<MessagesStackParamList>;
  Perfil: undefined;
};

export type UserProfile = 'aluno' | 'familia' | 'escola' | 'professor';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  SignIn: { profile: UserProfile };
  Register: undefined;
  ForgotPassword: undefined;
  Verification: undefined;
  PostLoginOnboarding: { profile: UserProfile };
  DiagnosticQuiz: undefined;
  MainTabs: undefined;
};

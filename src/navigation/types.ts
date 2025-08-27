// Em: src/navigation/types.ts

/**
 * Este tipo define os parâmetros para cada tela no Root Stack.
 * Usamos `undefined` quando uma tela não espera parâmetros.
 * Adicionamos as telas do menu da HomeScreen para garantir a segurança de tipos.
 */
export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  SignIn: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  Verification: undefined;
  PostLoginOnboarding: undefined;
  MainTabs: undefined;
  Performance: undefined;
  // Adicionando outras telas do menu para segurança de tipos
  Subjects: undefined;
  ContentHub: undefined;
  QuizArena: undefined;
  CollaborativeStudy: undefined;
  FamilyPortal: undefined;
};
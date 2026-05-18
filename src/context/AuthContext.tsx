import React, { createContext, useContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import type { UserProfile } from '~/navigation/types';

export type FirebaseUser = {
  uid: string;
  email: string | null;
  nome: string;
  perfil: UserProfile;
  escolaId: string;
  alunoId?: string;
  filhoId?: string;
};

type AuthState =
  | { status: 'loading' }
  | { status: 'unauthenticated' }
  | { status: 'authenticated'; user: FirebaseUser };

type AuthContextType = {
  authState: AuthState;
  user: FirebaseUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<FirebaseUser>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  authState: { status: 'loading' },
  user: null,
  loading: true,
  signIn: async () => { throw new Error('AuthProvider não inicializado'); },
  signOut: async () => {},
});

async function fetchUsuario(uid: string, email: string | null): Promise<FirebaseUser> {
  const snap = await firestore().collection('usuarios').doc(uid).get();
  if (!snap.exists) throw new Error('Perfil não encontrado. Contate a escola.');
  return { uid, email, ...snap.data() } as FirebaseUser;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({ status: 'loading' });

  useEffect(() => {
    let unsub: (() => void) | undefined;
    try {
      unsub = auth().onAuthStateChanged(async fbUser => {
        if (fbUser) {
          try {
            const user = await fetchUsuario(fbUser.uid, fbUser.email);
            setAuthState({ status: 'authenticated', user });
          } catch {
            setAuthState({ status: 'unauthenticated' });
          }
        } else {
          setAuthState({ status: 'unauthenticated' });
        }
      });
    } catch {
      // Firebase não configurado (GoogleService-Info.plist ausente) — vai ao Onboarding
      setAuthState({ status: 'unauthenticated' });
    }
    return () => unsub?.();
  }, []);

  const signIn = async (email: string, password: string): Promise<FirebaseUser> => {
    try {
      const { user: fbUser } = await auth().signInWithEmailAndPassword(email, password);
      const user = await fetchUsuario(fbUser.uid, fbUser.email);
      setAuthState({ status: 'authenticated', user });
      return user;
    } catch (err: any) {
      if (err?.message?.includes('No Firebase App')) {
        throw new Error('Firebase não configurado. Adicione o GoogleService-Info.plist.');
      }
      throw err;
    }
  };

  const signOut = async () => {
    try {
      await auth().signOut();
    } catch {}
    setAuthState({ status: 'unauthenticated' });
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        user: authState.status === 'authenticated' ? authState.user : null,
        loading: authState.status === 'loading',
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

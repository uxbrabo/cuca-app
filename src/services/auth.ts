import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import type { UserProfile } from '~/navigation/types';

export type UsuarioDoc = {
  uid: string;
  nome: string;
  email: string | null;
  perfil: UserProfile;
  escolaId: string;
  alunoId?: string;   // preenchido quando perfil === 'aluno'
  filhoId?: string;   // preenchido quando perfil === 'familia'
};

export async function signInWithEmail(
  email: string,
  password: string,
): Promise<UsuarioDoc> {
  const { user } = await auth().signInWithEmailAndPassword(email, password);
  const snap = await firestore().collection('usuarios').doc(user.uid).get();
  if (!snap.exists) throw new Error('Usuário não encontrado no banco de dados.');
  return { uid: user.uid, email: user.email, ...snap.data() } as UsuarioDoc;
}

export async function signOut(): Promise<void> {
  await auth().signOut();
}

// Cria usuário no Firebase Auth + documento em /usuarios
export async function createUser(params: {
  email: string;
  password: string;
  nome: string;
  perfil: UserProfile;
  escolaId: string;
  alunoId?: string;
  filhoId?: string;
}): Promise<string> {
  const { user } = await auth().createUserWithEmailAndPassword(
    params.email,
    params.password,
  );
  await firestore()
    .collection('usuarios')
    .doc(user.uid)
    .set({
      nome: params.nome,
      email: params.email,
      perfil: params.perfil,
      escolaId: params.escolaId,
      alunoId: params.alunoId ?? null,
      filhoId: params.filhoId ?? null,
      criadoEm: firestore.FieldValue.serverTimestamp(),
    });
  return user.uid;
}

export async function sendPasswordReset(email: string): Promise<void> {
  await auth().sendPasswordResetEmail(email);
}

export function onAuthStateChanged(
  callback: (uid: string | null) => void,
): () => void {
  return auth().onAuthStateChanged(user => callback(user?.uid ?? null));
}

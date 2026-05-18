import firestore from '@react-native-firebase/firestore';
import { ESCOLA_ID } from '~/config/app';

// Helper: coleção dentro da escola
function col(path: string) {
  return firestore().collection('escolas').doc(ESCOLA_ID).collection(path);
}

const ts = () => firestore.FieldValue.serverTimestamp();

// ─── TIPOS ────────────────────────────────────────────────────────────────────

export type Aluno = {
  id?: string;
  nome: string;
  serie: string;
  turma: string;
  unidade: string;
  status: 'ativo' | 'inativo';
  matricula: string;
  dataNasc?: string;
  sexo?: string;
  plano?: string;
  responsavel: { nome: string; email: string; telefone: string };
  uid?: string;
};

export type Professor = {
  id?: string;
  nome: string;
  email: string;
  telefone?: string;
  disciplinas: string[];
  turmas: string[];
  unidade: string;
  tipo?: string;
  status: 'ativo' | 'licenca' | 'inativo';
  uid?: string;
};

export type Turma = {
  id?: string;
  nome: string;
  serie: string;
  professor: string;
  unidade: string;
  horario: string;
  students?: number;
  freq?: number;
};

export type Aula = {
  id?: string;
  titulo: string;
  disciplina: string;
  turmas: string[];
  data: string;
  status: 'publicada' | 'rascunho';
  descricao?: string;
  professorId?: string;
};

export type Material = {
  id?: string;
  titulo: string;
  tipo: 'PDF' | 'Vídeo' | 'Áudio' | 'Imagem' | 'Slides' | 'Link';
  url: string;
  disciplina: string;
  turma?: string;
  tamanho?: string;
  aulaId?: string;
};

// ─── ALUNOS ───────────────────────────────────────────────────────────────────

export function listenAlunos(cb: (data: Aluno[]) => void) {
  return col('alunos')
    .orderBy('nome')
    .onSnapshot(snap =>
      cb(snap.docs.map(d => ({ id: d.id, ...d.data() } as Aluno))),
    );
}

export async function addAluno(aluno: Omit<Aluno, 'id'>): Promise<string> {
  const ref = await col('alunos').add({ ...aluno, criadoEm: ts() });
  return ref.id;
}

export async function updateAluno(id: string, data: Partial<Aluno>) {
  return col('alunos').doc(id).update(data);
}

export async function deleteAluno(id: string) {
  return col('alunos').doc(id).delete();
}

// ─── PROFESSORES ─────────────────────────────────────────────────────────────

export function listenProfessores(cb: (data: Professor[]) => void) {
  return col('professores')
    .orderBy('nome')
    .onSnapshot(snap =>
      cb(snap.docs.map(d => ({ id: d.id, ...d.data() } as Professor))),
    );
}

export async function addProfessor(prof: Omit<Professor, 'id'>): Promise<string> {
  const ref = await col('professores').add({ ...prof, criadoEm: ts() });
  return ref.id;
}

export async function updateProfessor(id: string, data: Partial<Professor>) {
  return col('professores').doc(id).update(data);
}

// ─── TURMAS ──────────────────────────────────────────────────────────────────

export function listenTurmas(cb: (data: Turma[]) => void) {
  return col('turmas')
    .orderBy('nome')
    .onSnapshot(snap =>
      cb(snap.docs.map(d => ({ id: d.id, ...d.data() } as Turma))),
    );
}

export async function addTurma(turma: Omit<Turma, 'id'>): Promise<string> {
  const ref = await col('turmas').add(turma);
  return ref.id;
}

// ─── AULAS ───────────────────────────────────────────────────────────────────

export function listenAulas(cb: (data: Aula[]) => void) {
  return col('aulas')
    .orderBy('criadoEm', 'desc')
    .onSnapshot(snap =>
      cb(snap.docs.map(d => ({ id: d.id, ...d.data() } as Aula))),
    );
}

export async function addAula(aula: Omit<Aula, 'id'>): Promise<string> {
  const ref = await col('aulas').add({ ...aula, criadoEm: ts() });
  return ref.id;
}

export async function updateAula(id: string, data: Partial<Aula>) {
  return col('aulas').doc(id).update(data);
}

export async function deleteAula(id: string) {
  return col('aulas').doc(id).delete();
}

// ─── MATERIAIS ────────────────────────────────────────────────────────────────

export function listenMateriais(
  cb: (data: Material[]) => void,
  aulaId?: string,
) {
  const query = aulaId
    ? col('materiais').where('aulaId', '==', aulaId).orderBy('criadoEm', 'desc')
    : col('materiais').orderBy('criadoEm', 'desc');

  return query.onSnapshot(snap =>
    cb(snap.docs.map(d => ({ id: d.id, ...d.data() } as Material))),
  );
}

export async function addMaterial(mat: Omit<Material, 'id'>): Promise<string> {
  const ref = await col('materiais').add({ ...mat, criadoEm: ts() });
  return ref.id;
}

export async function deleteMaterial(id: string) {
  return col('materiais').doc(id).delete();
}

// ─── ESTUDO (StudyPlan do aluno) ─────────────────────────────────────────────

export async function saveStudyPlan(uid: string, plan: object) {
  return firestore().collection('usuarios').doc(uid).update({ studyPlan: plan });
}

export async function getStudyPlan(uid: string) {
  const snap = await firestore().collection('usuarios').doc(uid).get();
  return (snap.data()?.studyPlan ?? null) as object | null;
}

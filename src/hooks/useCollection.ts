import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { ESCOLA_ID } from '~/config/app';
import {
  listenAlunos, listenProfessores, listenTurmas,
  listenAulas, listenMateriais,
  type Aluno, type Professor, type Turma, type Aula, type Material,
} from '~/services/db';

type CollectionState<T> = {
  data: T[];
  loading: boolean;
  error: string | null;
};

function useListener<T>(
  subscribe: (cb: (data: T[]) => void) => () => void,
): CollectionState<T> {
  const [state, setState] = useState<CollectionState<T>>({
    data: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const unsub = subscribe(data => setState({ data, loading: false, error: null }));
    return unsub;
  }, [subscribe]);

  return state;
}

// Hooks prontos para uso nos componentes

export function useAlunos() {
  return useListener<Aluno>(listenAlunos);
}

export function useProfessores() {
  return useListener<Professor>(listenProfessores);
}

export function useTurmas() {
  return useListener<Turma>(listenTurmas);
}

export function useAulas() {
  return useListener<Aula>(listenAulas);
}

export function useMateriais(aulaId?: string) {
  const [state, setState] = useState<CollectionState<Material>>({
    data: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const unsub = listenMateriais(
      data => setState({ data, loading: false, error: null }),
      aulaId,
    );
    return unsub;
  }, [aulaId]);

  return state;
}

// Hook genérico para qualquer coleção dentro da escola
export function useEscolaCollection<T>(
  collectionName: string,
  orderByField = 'criadoEm',
  direction: 'asc' | 'desc' = 'desc',
): CollectionState<T> {
  const [state, setState] = useState<CollectionState<T>>({
    data: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const unsub = firestore()
      .collection('escolas')
      .doc(ESCOLA_ID)
      .collection(collectionName)
      .orderBy(orderByField, direction)
      .onSnapshot(
        snap => {
          const data = snap.docs.map(d => ({ id: d.id, ...d.data() } as T));
          setState({ data, loading: false, error: null });
        },
        err => setState(s => ({ ...s, loading: false, error: err.message })),
      );
    return unsub;
  }, [collectionName, orderByField, direction]);

  return state;
}

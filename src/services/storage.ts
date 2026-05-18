import storage from '@react-native-firebase/storage';
import { ESCOLA_ID, APP_CONFIG } from '~/config/app';

type MaterialTipo = 'PDF' | 'Vídeo' | 'Áudio' | 'Imagem' | 'Slides' | 'Link';

function folderFor(tipo: MaterialTipo): string {
  switch (tipo) {
    case 'PDF':
    case 'Slides': return 'pdfs';
    case 'Vídeo':  return 'videos';
    case 'Áudio':  return 'audios';
    case 'Imagem': return 'imagens';
    default:       return 'outros';
  }
}

export async function uploadMaterial(params: {
  localUri: string;
  tipo: MaterialTipo;
  filename: string;
  onProgress?: (pct: number) => void;
}): Promise<string> {
  const { localUri, tipo, filename, onProgress } = params;
  const ext = localUri.split('.').pop() ?? 'bin';
  const folder = folderFor(tipo);
  const path = `escolas/${ESCOLA_ID}/materiais/${folder}/${filename}.${ext}`;
  const ref = storage().ref(path);

  const task = ref.putFile(localUri);

  if (onProgress) {
    task.on('state_changed', snap => {
      const pct = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
      onProgress(pct);
    });
  }

  await task;
  return ref.getDownloadURL();
}

export async function deleteMaterialFile(downloadUrl: string): Promise<void> {
  try {
    await storage().refFromURL(downloadUrl).delete();
  } catch {
    // arquivo pode já não existir — ignora silenciosamente
  }
}

export function maxSizeMB(tipo: MaterialTipo): number {
  switch (tipo) {
    case 'PDF':
    case 'Slides': return APP_CONFIG.maxUploadMB.pdf;
    case 'Vídeo':  return APP_CONFIG.maxUploadMB.video;
    case 'Áudio':  return APP_CONFIG.maxUploadMB.audio;
    case 'Imagem': return APP_CONFIG.maxUploadMB.image;
    default:       return 50;
  }
}

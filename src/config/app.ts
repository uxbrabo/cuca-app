// ID da escola no Firestore — fixo para o piloto com uma única escola.
// Quando o app suportar múltiplas escolas, virá do AuthContext (usuario.escolaId).
export const ESCOLA_ID = 'escola_piloto';

export const APP_CONFIG = {
  version: '0.1.0',
  maxUploadMB: { pdf: 50, video: 500, audio: 100, image: 10, slides: 50 },
} as const;

import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Spacing, Typography, Radius, Shadows } from '~/theme/theme';

type Screen = 'home' | 'write' | 'result';

const THEMES = [
  { id: '1', title: 'Desafios da saúde mental na era digital', level: 'ENEM 2024', color: Colors.primary },
  { id: '2', title: 'Invisibilidade e registro civil da população de rua', level: 'ENEM 2023', color: '#7B1FA2' },
  { id: '3', title: 'Democratização do acesso ao cinema no Brasil', level: 'ENEM 2022', color: Colors.info },
  { id: '4', title: 'Estigmas associados às doenças mentais na sociedade brasileira', level: 'ENEM 2021', color: '#E91E63' },
];

const COMPETENCIES = [
  { label: 'C1 — Domínio da norma culta', score: 160, max: 200, color: Colors.success },
  { label: 'C2 — Compreensão do tema', score: 180, max: 200, color: Colors.primary },
  { label: 'C3 — Seleção de argumentos', score: 140, max: 200, color: Colors.warning },
  { label: 'C4 — Coesão e coerência', score: 160, max: 200, color: Colors.info },
  { label: 'C5 — Proposta de intervenção', score: 120, max: 200, color: Colors.error },
];

const PREVIOUS_ESSAYS = [
  { theme: 'Desafios da saúde mental na era digital', date: '14 Mai 2026', score: 760, submitted: true },
  { theme: 'Democratização do acesso ao cinema', date: '5 Mai 2026', score: 840, submitted: true },
];

export default function EssayAIScreen() {
  const [screen, setScreen] = useState<Screen>('home');
  const [selectedTheme, setSelectedTheme] = useState(THEMES[0]);
  const [essayText, setEssayText] = useState('');
  const [analyzing, setAnalyzing] = useState(false);

  const wordCount = essayText.trim() === '' ? 0 : essayText.trim().split(/\s+/).length;
  const charCount = essayText.length;
  const totalScore = COMPETENCIES.reduce((acc, c) => acc + c.score, 0);

  const handleSubmit = () => {
    if (wordCount < 10) return;
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setScreen('result');
    }, 2200);
  };

  if (screen === 'write') {
    return (
      <SafeAreaView style={s.container} edges={['bottom']}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
          {/* HEADER */}
          <View style={s.writeHeader}>
            <TouchableOpacity onPress={() => setScreen('home')} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Icon name="arrow-left" size={24} color={Colors.textPrimary} />
            </TouchableOpacity>
            <View style={{ flex: 1, paddingHorizontal: Spacing.md }}>
              <Text style={s.writeThemeLabel} numberOfLines={2}>{selectedTheme.title}</Text>
            </View>
            <TouchableOpacity
              style={[s.submitBtn, wordCount < 10 && s.submitBtnDisabled]}
              onPress={handleSubmit}
              disabled={wordCount < 10 || analyzing}
            >
              <Text style={s.submitBtnText}>{analyzing ? 'Analisando...' : 'Enviar'}</Text>
            </TouchableOpacity>
          </View>

          {/* TIPS */}
          <View style={s.tipsRow}>
            {['Introdução', 'Desenvolvimento', 'Conclusão'].map((t, i) => (
              <View key={i} style={s.tipChip}>
                <Text style={s.tipChipText}>{t}</Text>
              </View>
            ))}
          </View>

          {/* INPUT */}
          <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled">
            <TextInput
              style={s.essayInput}
              multiline
              placeholder="Escreva sua redação aqui. Lembre-se: introdução com tese, dois parágrafos de desenvolvimento com argumentos e dados, e conclusão com proposta de intervenção detalhada."
              placeholderTextColor={Colors.textDisabled}
              value={essayText}
              onChangeText={setEssayText}
              textAlignVertical="top"
              autoFocus
            />
          </ScrollView>

          {/* COUNTER */}
          <View style={s.counterRow}>
            <Text style={s.counterText}>{wordCount} palavras · {charCount} caracteres</Text>
            <Text style={[s.counterText, wordCount >= 250 && wordCount <= 350 ? { color: Colors.success } : wordCount > 0 ? { color: Colors.warning } : {}]}>
              {wordCount < 250 ? `Min. 250 palavras (faltam ${250 - wordCount})` : wordCount > 350 ? `Max. 350 palavras` : 'Tamanho ideal!'}
            </Text>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  if (screen === 'result') {
    return (
      <SafeAreaView style={s.container} edges={['bottom']}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
          {/* HEADER RESULT */}
          <View style={s.resultHeader}>
            <TouchableOpacity onPress={() => setScreen('home')} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Icon name="arrow-left" size={24} color={Colors.white} />
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={s.resultScoreLabel}>Sua nota estimada</Text>
              <Text style={s.resultScore}>{totalScore}</Text>
              <Text style={s.resultScoreMax}>de 1000 pontos</Text>
            </View>
            <View style={{ width: 24 }} />
          </View>

          {/* COMPETENCES */}
          <View style={s.compCard}>
            <Text style={s.compTitle}>Notas por competência</Text>
            {COMPETENCIES.map((c, i) => (
              <View key={i} style={s.compRow}>
                <Text style={s.compLabel} numberOfLines={1}>{c.label}</Text>
                <View style={s.compBarWrap}>
                  <View style={s.compBarBg}>
                    <View style={[s.compBarFill, { width: `${(c.score / c.max) * 100}%`, backgroundColor: c.color }]} />
                  </View>
                  <Text style={[s.compScore, { color: c.color }]}>{c.score}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* FEEDBACK */}
          <Text style={s.sectionTitle}>Feedback da IA</Text>

          <View style={[s.feedbackCard, { borderLeftColor: Colors.success }]}>
            <Icon name="check-circle-outline" size={20} color={Colors.success} />
            <View style={{ flex: 1 }}>
              <Text style={s.feedbackTitle}>Pontos fortes</Text>
              <Text style={s.feedbackText}>Boa compreensão do tema e argumentação consistente. A conexão entre dados e argumentos está bem estruturada no 2º parágrafo.</Text>
            </View>
          </View>

          <View style={[s.feedbackCard, { borderLeftColor: Colors.warning }]}>
            <Icon name="alert-outline" size={20} color={Colors.warning} />
            <View style={{ flex: 1 }}>
              <Text style={s.feedbackTitle}>Para melhorar</Text>
              <Text style={s.feedbackText}>A proposta de intervenção precisa ser mais detalhada — inclua agente executor, ação concreta, meio/modo, finalidade e detalhamento.</Text>
            </View>
          </View>

          <View style={[s.feedbackCard, { borderLeftColor: Colors.error }]}>
            <Icon name="pencil-outline" size={20} color={Colors.error} />
            <View style={{ flex: 1 }}>
              <Text style={s.feedbackTitle}>Erros gramaticais detectados</Text>
              <Text style={s.feedbackText}>2 problemas de concordância verbal e 1 uso inadequado de vírgula identificados. Revise com atenção antes de uma prova real.</Text>
            </View>
          </View>

          {/* ACTIONS */}
          <TouchableOpacity style={s.actionBtn} onPress={() => { setEssayText(''); setScreen('write'); }}>
            <Icon name="pencil-plus" size={20} color={Colors.white} />
            <Text style={s.actionBtnText}>Escrever nova versão</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[s.actionBtn, { backgroundColor: Colors.white, borderWidth: 1.5, borderColor: Colors.primary }]} onPress={() => setScreen('home')}>
            <Icon name="home-outline" size={20} color={Colors.primary} />
            <Text style={[s.actionBtnText, { color: Colors.primary }]}>Voltar ao início</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>

        {/* BANNER */}
        <View style={s.banner}>
          <View style={s.bannerIcon}>
            <Icon name="robot-excited-outline" size={32} color={Colors.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.bannerTitle}>Redação com IA</Text>
            <Text style={s.bannerSub}>Corrija sua redação ENEM com feedback completo por inteligência artificial</Text>
          </View>
        </View>

        {/* TEMAS */}
        <Text style={s.sectionTitle}>Temas disponíveis</Text>
        {THEMES.map(t => (
          <TouchableOpacity
            key={t.id}
            style={[s.themeCard, selectedTheme.id === t.id && s.themeCardActive]}
            onPress={() => setSelectedTheme(t)}
            activeOpacity={0.85}
          >
            <View style={[s.themeIconWrap, { backgroundColor: t.color + '18' }]}>
              <Icon name="pencil-box-outline" size={22} color={t.color} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.themeTitle}>{t.title}</Text>
              <Text style={s.themeLevel}>{t.level}</Text>
            </View>
            {selectedTheme.id === t.id && <Icon name="check-circle" size={22} color={Colors.primary} />}
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={s.startBtn} onPress={() => setScreen('write')} activeOpacity={0.85}>
          <Icon name="pencil" size={20} color={Colors.white} />
          <Text style={s.startBtnText}>Escrever redação</Text>
        </TouchableOpacity>

        {/* ANTERIORES */}
        {PREVIOUS_ESSAYS.length > 0 && (
          <>
            <Text style={s.sectionTitle}>Redações anteriores</Text>
            {PREVIOUS_ESSAYS.map((e, i) => (
              <TouchableOpacity key={i} style={s.prevCard} onPress={() => setScreen('result')} activeOpacity={0.85}>
                <View style={s.prevScoreBadge}>
                  <Text style={s.prevScore}>{e.score}</Text>
                  <Text style={s.prevScoreLabel}>pts</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={s.prevTheme} numberOfLines={2}>{e.theme}</Text>
                  <Text style={s.prevDate}>{e.date}</Text>
                </View>
                <Icon name="chevron-right" size={20} color={Colors.textDisabled} />
              </TouchableOpacity>
            ))}
          </>
        )}

        <View style={{ height: Spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surfaceVariant },
  scroll: { padding: Spacing.md, paddingBottom: Spacing.xl, gap: Spacing.sm },
  sectionTitle: { ...Typography.label, color: Colors.textSecondary, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5, marginTop: Spacing.sm },

  banner: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    backgroundColor: Colors.primaryLight, borderRadius: Radius.md,
    padding: Spacing.md, borderLeftWidth: 4, borderLeftColor: Colors.primary,
  },
  bannerIcon: { width: 56, height: 56, borderRadius: Radius.md, backgroundColor: Colors.white, justifyContent: 'center', alignItems: 'center' },
  bannerTitle: { ...Typography.h4, color: Colors.textPrimary },
  bannerSub: { ...Typography.caption, color: Colors.textSecondary, lineHeight: 18, marginTop: 2 },

  themeCard: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    backgroundColor: Colors.white, borderRadius: Radius.md,
    padding: Spacing.md, ...Shadows.sm,
    borderWidth: 1.5, borderColor: 'transparent',
  },
  themeCardActive: { borderColor: Colors.primary, backgroundColor: Colors.primaryLight },
  themeIconWrap: { width: 44, height: 44, borderRadius: Radius.sm, justifyContent: 'center', alignItems: 'center' },
  themeTitle: { ...Typography.body2, color: Colors.textPrimary, lineHeight: 20 },
  themeLevel: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },

  startBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: Spacing.sm, backgroundColor: Colors.primary, borderRadius: Radius.md,
    paddingVertical: 14, marginTop: Spacing.sm,
  },
  startBtnText: { ...Typography.label, color: Colors.white, fontWeight: '700' },

  prevCard: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md, ...Shadows.sm,
  },
  prevScoreBadge: { alignItems: 'center', backgroundColor: Colors.primaryLight, borderRadius: Radius.sm, padding: Spacing.sm, minWidth: 52 },
  prevScore: { ...Typography.h4, color: Colors.primary },
  prevScoreLabel: { ...Typography.caption, color: Colors.primary },
  prevTheme: { ...Typography.body2, color: Colors.textPrimary, lineHeight: 20 },
  prevDate: { ...Typography.caption, color: Colors.textDisabled, marginTop: 2 },

  // WRITE SCREEN
  writeHeader: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.md,
    backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.divider,
  },
  writeThemeLabel: { ...Typography.caption, color: Colors.textPrimary, fontWeight: '600', lineHeight: 18 },
  submitBtn: { backgroundColor: Colors.primary, borderRadius: Radius.md, paddingHorizontal: Spacing.md, paddingVertical: 8 },
  submitBtnDisabled: { backgroundColor: Colors.textDisabled },
  submitBtnText: { ...Typography.label, color: Colors.white, fontWeight: '700' },
  tipsRow: { flexDirection: 'row', gap: Spacing.sm, padding: Spacing.md, backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.divider },
  tipChip: { paddingHorizontal: Spacing.md, paddingVertical: 5, backgroundColor: Colors.primaryLight, borderRadius: Radius.full },
  tipChipText: { ...Typography.caption, color: Colors.primary, fontWeight: '600' },
  essayInput: {
    flex: 1, margin: Spacing.md, padding: Spacing.md,
    ...Typography.body1, color: Colors.textPrimary, lineHeight: 28,
    minHeight: 400,
  },
  counterRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, backgroundColor: Colors.white, borderTopWidth: 1, borderTopColor: Colors.divider },
  counterText: { ...Typography.caption, color: Colors.textDisabled },

  // RESULT SCREEN
  resultHeader: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.primary, paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl, borderBottomLeftRadius: Radius.lg, borderBottomRightRadius: Radius.lg,
    marginBottom: Spacing.md,
  },
  resultScoreLabel: { ...Typography.caption, color: 'rgba(255,255,255,0.8)' },
  resultScore: { fontSize: 64, fontWeight: '800', color: Colors.white, lineHeight: 72 },
  resultScoreMax: { ...Typography.body2, color: 'rgba(255,255,255,0.7)' },
  compCard: { backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md, ...Shadows.sm, gap: Spacing.md, marginBottom: Spacing.sm },
  compTitle: { ...Typography.label, color: Colors.textPrimary, fontWeight: '700' },
  compRow: { gap: 5 },
  compLabel: { ...Typography.caption, color: Colors.textSecondary },
  compBarWrap: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  compBarBg: { flex: 1, height: 6, backgroundColor: Colors.surfaceVariant, borderRadius: Radius.full, overflow: 'hidden' },
  compBarFill: { height: 6, borderRadius: Radius.full },
  compScore: { ...Typography.caption, fontWeight: '700', minWidth: 30, textAlign: 'right' },
  feedbackCard: {
    flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm,
    backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md,
    borderLeftWidth: 4, ...Shadows.sm,
  },
  feedbackTitle: { ...Typography.label, color: Colors.textPrimary, marginBottom: 3 },
  feedbackText: { ...Typography.body2, color: Colors.textSecondary, lineHeight: 20 },
  actionBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: Spacing.sm, backgroundColor: Colors.primary, borderRadius: Radius.md, paddingVertical: 14,
  },
  actionBtnText: { ...Typography.label, color: Colors.white, fontWeight: '700' },
});

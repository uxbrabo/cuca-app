import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Spacing, Typography, Radius, Shadows } from '~/theme/theme';

type Filter = 'todas' | 'conquistadas' | 'bloqueadas';

const BADGES = [
  { id: '1', icon: 'fire', color: '#FF6B35', title: 'Semana em Chamas', desc: '7 dias seguidos de estudo', xp: 200, unlocked: true, progress: null },
  { id: '2', icon: 'trophy', color: '#FFD700', title: 'Campeão da Arena', desc: 'Vencer 10 quizzes seguidos', xp: 500, unlocked: true, progress: null },
  { id: '3', icon: 'star-shooting', color: '#7B1FA2', title: 'Primeira Estrela', desc: 'Completar a primeira trilha de estudos', xp: 100, unlocked: true, progress: null },
  { id: '4', icon: 'book-open-page-variant', color: Colors.primary, title: 'Leitor Voraz', desc: 'Ler 20 artigos no HUB de Conteúdo', xp: 300, unlocked: true, progress: null },
  { id: '5', icon: 'robot-excited', color: Colors.info, title: 'Amigo da IA', desc: 'Usar o Tutor Virtual por 5 dias', xp: 150, unlocked: true, progress: null },
  { id: '6', icon: 'lightning-bolt', color: Colors.warning, title: 'Velocidade da Luz', desc: 'Responder 20 questões em menos de 1 min cada', xp: 250, unlocked: false, progress: { current: 13, total: 20 } },
  { id: '7', icon: 'medal', color: '#E91E63', title: 'Top 3 Nacional', desc: 'Entrar no top 3 do ranking geral', xp: 1000, unlocked: false, progress: { current: 47, total: 3 } },
  { id: '8', icon: 'calendar-check', color: Colors.success, title: 'Mês Perfeito', desc: '30 dias consecutivos de acesso', xp: 800, unlocked: false, progress: { current: 14, total: 30 } },
  { id: '9', icon: 'microphone', color: '#FF6B35', title: 'Podcaster', desc: 'Ouvir 10 podcasts completos', xp: 200, unlocked: false, progress: { current: 4, total: 10 } },
  { id: '10', icon: 'pencil', color: '#7B1FA2', title: 'Escritor ENEM', desc: 'Submeter 5 redações para correção', xp: 400, unlocked: false, progress: { current: 1, total: 5 } },
  { id: '11', icon: 'cards', color: Colors.info, title: 'Mestre dos Flashcards', desc: 'Revisar 100 flashcards', xp: 300, unlocked: false, progress: { current: 28, total: 100 } },
  { id: '12', icon: 'account-group', color: Colors.primary, title: 'Colaborador', desc: 'Participar de 5 sessões de estudo colaborativo', xp: 250, unlocked: false, progress: { current: 2, total: 5 } },
];

const XP_HISTORY = [
  { icon: 'trophy', color: '#FFD700', desc: 'Quiz de Matemática — 1º lugar', xp: '+120 XP', time: 'Hoje, 14h32' },
  { icon: 'book-open', color: Colors.primary, desc: 'Artigo lido: Física Quântica', xp: '+30 XP', time: 'Hoje, 11h10' },
  { icon: 'fire', color: '#FF6B35', desc: 'Streak de 7 dias', xp: '+200 XP', time: 'Ontem' },
  { icon: 'video', color: Colors.info, desc: 'Videoaula assistida: Álgebra Linear', xp: '+50 XP', time: 'Ontem' },
  { icon: 'cards', color: '#7B1FA2', desc: 'Sessão de flashcards concluída', xp: '+40 XP', time: '2 dias atrás' },
];

export default function AchievementsScreen() {
  const [filter, setFilter] = useState<Filter>('todas');
  const [tab, setTab] = useState<'badges' | 'historico'>('badges');

  const unlocked = BADGES.filter(b => b.unlocked).length;
  const totalXP = 4833;
  const level = 12;
  const nextLevelXP = 5500;
  const progressPct = Math.round((totalXP / nextLevelXP) * 100);

  const filtered = BADGES.filter(b => {
    if (filter === 'conquistadas') return b.unlocked;
    if (filter === 'bloqueadas') return !b.unlocked;
    return true;
  });

  return (
    <SafeAreaView style={s.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* XP CARD */}
        <View style={s.xpCard}>
          <View style={s.xpTop}>
            <View style={s.levelBadge}>
              <Icon name="shield-star" size={28} color={Colors.white} />
              <Text style={s.levelText}>Nível {level}</Text>
            </View>
            <View style={{ flex: 1, paddingLeft: Spacing.md }}>
              <Text style={s.xpTotal}>{totalXP.toLocaleString('pt-BR')} XP</Text>
              <Text style={s.xpNext}>Faltam {(nextLevelXP - totalXP).toLocaleString('pt-BR')} XP para o nível {level + 1}</Text>
              <View style={s.xpBarBg}>
                <View style={[s.xpBarFill, { width: `${progressPct}%` }]} />
              </View>
            </View>
          </View>

          <View style={s.statsRow}>
            <View style={s.statItem}>
              <Icon name="fire" size={18} color="#FF6B35" />
              <Text style={s.statValue}>14</Text>
              <Text style={s.statLabel}>dias seguidos</Text>
            </View>
            <View style={s.statDivider} />
            <View style={s.statItem}>
              <Icon name="medal" size={18} color="#FFD700" />
              <Text style={s.statValue}>{unlocked}</Text>
              <Text style={s.statLabel}>conquistas</Text>
            </View>
            <View style={s.statDivider} />
            <View style={s.statItem}>
              <Icon name="chart-line" size={18} color={Colors.success} />
              <Text style={s.statValue}>#47</Text>
              <Text style={s.statLabel}>ranking</Text>
            </View>
          </View>
        </View>

        {/* TABS */}
        <View style={s.tabRow}>
          {(['badges', 'historico'] as const).map(t => (
            <TouchableOpacity key={t} style={[s.tabBtn, tab === t && s.tabBtnActive]} onPress={() => setTab(t)}>
              <Text style={[s.tabBtnText, tab === t && s.tabBtnTextActive]}>
                {t === 'badges' ? 'Conquistas' : 'Histórico de XP'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {tab === 'badges' ? (
          <>
            {/* FILTRO */}
            <View style={s.filterRow}>
              {(['todas', 'conquistadas', 'bloqueadas'] as Filter[]).map(f => (
                <TouchableOpacity key={f} style={[s.filterChip, filter === f && s.filterChipActive]} onPress={() => setFilter(f)}>
                  <Text style={[s.filterChipText, filter === f && s.filterChipTextActive]}>
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* GRID DE BADGES */}
            <View style={s.badgesGrid}>
              {filtered.map(b => (
                <View key={b.id} style={[s.badgeCard, !b.unlocked && s.badgeCardLocked]}>
                  <View style={[s.badgeIconWrap, { backgroundColor: b.unlocked ? b.color + '20' : Colors.surfaceVariant }]}>
                    <Icon name={b.icon} size={32} color={b.unlocked ? b.color : Colors.textDisabled} />
                    {!b.unlocked && (
                      <View style={s.lockOverlay}>
                        <Icon name="lock" size={14} color={Colors.textDisabled} />
                      </View>
                    )}
                  </View>
                  <Text style={[s.badgeTitle, !b.unlocked && s.badgeTitleLocked]} numberOfLines={2}>{b.title}</Text>
                  <Text style={s.badgeDesc} numberOfLines={2}>{b.desc}</Text>
                  {b.progress && !b.unlocked ? (
                    <View style={s.badgeProgressWrap}>
                      <View style={s.badgeProgressBg}>
                        <View style={[s.badgeProgressFill, { width: `${Math.min((b.progress.current / b.progress.total) * 100, 100)}%` }]} />
                      </View>
                      <Text style={s.badgeProgressText}>{b.progress.current}/{b.progress.total}</Text>
                    </View>
                  ) : (
                    <View style={s.xpPill}>
                      <Icon name="star" size={11} color="#FFD700" />
                      <Text style={s.xpPillText}>+{b.xp} XP</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </>
        ) : (
          <View style={s.historyList}>
            {XP_HISTORY.map((h, i) => (
              <View key={i} style={s.historyRow}>
                <View style={[s.historyIcon, { backgroundColor: h.color + '20' }]}>
                  <Icon name={h.icon} size={20} color={h.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={s.historyDesc}>{h.desc}</Text>
                  <Text style={s.historyTime}>{h.time}</Text>
                </View>
                <Text style={s.historyXp}>{h.xp}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={{ height: Spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surfaceVariant },

  xpCard: {
    backgroundColor: Colors.primary,
    margin: Spacing.md,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    gap: Spacing.md,
  },
  xpTop: { flexDirection: 'row', alignItems: 'center' },
  levelBadge: {
    alignItems: 'center', gap: 4,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: Radius.md,
    padding: Spacing.sm,
    minWidth: 72,
  },
  levelText: { ...Typography.caption, color: Colors.white, fontWeight: '700' },
  xpTotal: { ...Typography.h3, color: Colors.white },
  xpNext: { ...Typography.caption, color: 'rgba(255,255,255,0.75)', marginBottom: 6 },
  xpBarBg: { height: 6, backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: Radius.full, overflow: 'hidden' },
  xpBarFill: { height: 6, backgroundColor: Colors.white, borderRadius: Radius.full },
  statsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: Radius.md, padding: Spacing.md },
  statItem: { alignItems: 'center', gap: 3 },
  statValue: { ...Typography.h4, color: Colors.white },
  statLabel: { ...Typography.caption, color: 'rgba(255,255,255,0.75)' },
  statDivider: { width: 1, height: 32, backgroundColor: 'rgba(255,255,255,0.2)' },

  tabRow: { flexDirection: 'row', backgroundColor: Colors.white, marginHorizontal: Spacing.md, borderRadius: Radius.md, padding: 4, ...Shadows.sm },
  tabBtn: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: Radius.sm },
  tabBtnActive: { backgroundColor: Colors.primary },
  tabBtnText: { ...Typography.label, color: Colors.textSecondary },
  tabBtnTextActive: { color: Colors.white },

  filterRow: { flexDirection: 'row', gap: Spacing.sm, paddingHorizontal: Spacing.md, paddingTop: Spacing.md },
  filterChip: { paddingHorizontal: Spacing.md, paddingVertical: 6, borderRadius: Radius.full, backgroundColor: Colors.white, borderWidth: 1.5, borderColor: Colors.divider },
  filterChipActive: { backgroundColor: Colors.primaryLight, borderColor: Colors.primary },
  filterChipText: { ...Typography.caption, color: Colors.textSecondary, fontWeight: '500' },
  filterChipTextActive: { color: Colors.primary, fontWeight: '700' },

  badgesGrid: { flexDirection: 'row', flexWrap: 'wrap', padding: Spacing.md, gap: Spacing.sm },
  badgeCard: {
    width: '47%', backgroundColor: Colors.white, borderRadius: Radius.md,
    padding: Spacing.md, alignItems: 'center', gap: 6, ...Shadows.sm,
  },
  badgeCardLocked: { opacity: 0.7 },
  badgeIconWrap: { width: 64, height: 64, borderRadius: 32, justifyContent: 'center', alignItems: 'center', position: 'relative' },
  lockOverlay: { position: 'absolute', bottom: 0, right: 0, backgroundColor: Colors.white, borderRadius: 10, padding: 2 },
  badgeTitle: { ...Typography.label, color: Colors.textPrimary, textAlign: 'center' },
  badgeTitleLocked: { color: Colors.textSecondary },
  badgeDesc: { ...Typography.caption, color: Colors.textSecondary, textAlign: 'center', lineHeight: 16 },
  badgeProgressWrap: { width: '100%', gap: 3 },
  badgeProgressBg: { height: 4, backgroundColor: Colors.surfaceVariant, borderRadius: Radius.full, overflow: 'hidden' },
  badgeProgressFill: { height: 4, backgroundColor: Colors.primary, borderRadius: Radius.full },
  badgeProgressText: { ...Typography.caption, color: Colors.textDisabled, textAlign: 'center', fontSize: 10 },
  xpPill: { flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: '#FFF8E1', paddingHorizontal: 8, paddingVertical: 3, borderRadius: Radius.full },
  xpPillText: { ...Typography.caption, color: '#F57F17', fontWeight: '700', fontSize: 11 },

  historyList: { padding: Spacing.md, gap: Spacing.sm },
  historyRow: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md, ...Shadows.sm,
  },
  historyIcon: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  historyDesc: { ...Typography.body2, color: Colors.textPrimary },
  historyTime: { ...Typography.caption, color: Colors.textDisabled, marginTop: 2 },
  historyXp: { ...Typography.label, color: Colors.success, fontWeight: '700' },
});

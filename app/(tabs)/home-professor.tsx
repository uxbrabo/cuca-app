import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { HomeStackParamList, TabParamList } from '~/navigation/types';
import { Colors, Spacing, Typography, Radius, Shadows } from '~/theme/theme';
import { useAuth } from '~/context/AuthContext';
import { useTurmas, useAulas } from '~/hooks/useCollection';

type Nav = CompositeNavigationProp<
  NativeStackNavigationProp<HomeStackParamList>,
  BottomTabNavigationProp<TabParamList>
>;

const QUICK_ACTIONS = [
  { icon: 'view-dashboard-outline', label: 'Portal\nEscolar', color: Colors.primary, screen: 'SchoolPortal' as keyof HomeStackParamList },
  { icon: 'book-plus-outline',      label: 'Nova\nAula',     color: Colors.success,  screen: 'SchoolPortal' as keyof HomeStackParamList },
  { icon: 'file-upload-outline',    label: 'Adicionar\nMaterial', color: Colors.info, screen: 'SchoolPortal' as keyof HomeStackParamList },
  { icon: 'school-outline',         label: 'HUB de\nConteúdo', color: Colors.warning, screen: 'ContentHub' as keyof HomeStackParamList },
];

export default function HomeProfessorScreen() {
  const navigation = useNavigation<Nav>();
  const { user } = useAuth();
  const { data: turmasData, loading: turmasLoading } = useTurmas();
  const { data: aulasData, loading: aulasLoading } = useAulas();

  const primeiroNome = user?.nome?.split(' ')[0] ?? 'Professor';

  // Turmas deste professor (por nome, campo do Firestore)
  const minhasTurmas = turmasData.filter(t => t.professor === user?.nome);

  // Aulas deste professor — prioriza professorId, mas mostra recentes se ainda sem vínculo
  const minhasAulas = aulasData
    .filter(a => !a.professorId || a.professorId === user?.uid)
    .slice(0, 4);

  // Contagem de alunos nas turmas (campo students, opcional)
  const totalAlunos = minhasTurmas.reduce((sum, t) => sum + (t.students ?? 0), 0);

  return (
    <SafeAreaView style={s.container} edges={['top', 'left', 'right']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>

        {/* HEADER */}
        <View style={s.header}>
          <View style={s.headerLeft}>
            <Avatar.Icon size={48} icon="account-tie" style={s.avatar} color={Colors.white} />
            <View style={s.headerTexts}>
              <Text style={s.greeting}>Olá, {primeiroNome}</Text>
              <Text style={s.headerSub}>Bem-vindo ao seu painel</Text>
            </View>
          </View>
          <View style={{ position: 'relative' }}>
            <IconButton
              icon="bell-outline"
              size={24}
              style={s.iconBtn}
              onPress={() => navigation.navigate('Notifications')}
            />
            <View style={s.notifDot} />
          </View>
        </View>

        {/* STATS */}
        <View style={s.statsRow}>
          <StatCard
            icon="google-classroom"
            value={turmasLoading ? '…' : String(minhasTurmas.length)}
            label="Turmas"
            color={Colors.primary}
          />
          <StatCard
            icon="account-group-outline"
            value={turmasLoading ? '…' : String(totalAlunos || minhasTurmas.length * 28)}
            label="Alunos"
            color={Colors.success}
          />
          <StatCard
            icon="book-open-variant"
            value={aulasLoading ? '…' : String(minhasAulas.length)}
            label="Aulas"
            color={Colors.info}
          />
        </View>

        {/* AÇÕES RÁPIDAS */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Acesso rápido</Text>
          <View style={s.actionsGrid}>
            {QUICK_ACTIONS.map(a => (
              <TouchableOpacity
                key={a.label}
                style={s.actionCard}
                activeOpacity={0.75}
                onPress={() => navigation.navigate(a.screen as any)}
              >
                <View style={[s.actionIcon, { backgroundColor: a.color + '18' }]}>
                  <Icon name={a.icon} size={26} color={a.color} />
                </View>
                <Text style={s.actionLabel}>{a.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* MINHAS TURMAS */}
        <View style={s.section}>
          <View style={s.sectionHeader}>
            <Text style={s.sectionTitle}>Minhas turmas</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SchoolPortal' as any)}>
              <Icon name="arrow-right" size={22} color={Colors.primary} />
            </TouchableOpacity>
          </View>

          {turmasLoading ? (
            <ActivityIndicator color={Colors.primary} style={{ marginVertical: Spacing.lg }} />
          ) : minhasTurmas.length === 0 ? (
            <EmptyState icon="google-classroom" text="Nenhuma turma vinculada ainda." />
          ) : (
            minhasTurmas.map(t => (
              <TouchableOpacity
                key={t.id}
                style={s.turmaCard}
                activeOpacity={0.82}
                onPress={() => navigation.navigate('SchoolPortal' as any)}
              >
                <View style={[s.turmaSerie, { backgroundColor: serieColor(t.serie) + '20' }]}>
                  <Text style={[s.turmaSerieText, { color: serieColor(t.serie) }]}>{t.nome}</Text>
                </View>
                <View style={s.turmaInfo}>
                  <Text style={s.turmaNome}>{t.serie}</Text>
                  <View style={s.turmaMeta}>
                    <Icon name="clock-outline" size={13} color={Colors.textSecondary} />
                    <Text style={s.turmaMetaText}>{t.horario}</Text>
                    {t.freq != null && (
                      <>
                        <Icon name="chart-bar" size={13} color={Colors.textSecondary} style={{ marginLeft: 8 }} />
                        <Text style={s.turmaMetaText}>Freq. {t.freq}%</Text>
                      </>
                    )}
                  </View>
                </View>
                <Icon name="chevron-right" size={20} color={Colors.textDisabled} />
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* ÚLTIMAS AULAS */}
        <View style={s.section}>
          <View style={s.sectionHeader}>
            <Text style={s.sectionTitle}>Últimas aulas</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SchoolPortal' as any)}>
              <Icon name="arrow-right" size={22} color={Colors.primary} />
            </TouchableOpacity>
          </View>

          {aulasLoading ? (
            <ActivityIndicator color={Colors.primary} style={{ marginVertical: Spacing.lg }} />
          ) : minhasAulas.length === 0 ? (
            <EmptyState icon="book-plus-outline" text="Nenhuma aula criada ainda." />
          ) : (
            minhasAulas.map(a => (
              <View key={a.id} style={s.aulaCard}>
                <View style={[s.aulaStatus, { backgroundColor: a.status === 'publicada' ? Colors.success : Colors.warning }]} />
                <View style={s.aulaInfo}>
                  <Text style={s.aulaTitulo} numberOfLines={1}>{a.titulo}</Text>
                  <View style={s.aulaMeta}>
                    <Text style={s.aulaDisc}>{a.disciplina}</Text>
                    <Text style={s.aulaMetaSep}>·</Text>
                    <Text style={s.aulaData}>{a.data}</Text>
                    <Text style={s.aulaMetaSep}>·</Text>
                    <Text style={[s.aulaStatusText, { color: a.status === 'publicada' ? Colors.success : Colors.warning }]}>
                      {a.status === 'publicada' ? 'Publicada' : 'Rascunho'}
                    </Text>
                  </View>
                  {a.turmas.length > 0 && (
                    <View style={s.aulatumasPills}>
                      {a.turmas.map(turma => (
                        <View key={turma} style={s.turmaPill}>
                          <Text style={s.turmaPillText}>{turma}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              </View>
            ))
          )}
        </View>

        {/* KIT DO PROFESSOR */}
        <TouchableOpacity
          style={s.kitBanner}
          activeOpacity={0.82}
          onPress={() => navigation.navigate('ContentHub')}
        >
          <View style={s.kitLeft}>
            <Icon name="briefcase-outline" size={28} color={Colors.white} />
          </View>
          <View style={s.kitTexts}>
            <Text style={s.kitTitle}>Kit do Professor</Text>
            <Text style={s.kitSub}>Modelos de plano de aula, recursos e materiais</Text>
          </View>
          <Icon name="chevron-right" size={22} color="rgba(255,255,255,0.7)" />
        </TouchableOpacity>

        <View style={{ height: Spacing.xxl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function serieColor(serie: string): string {
  if (serie.startsWith('1')) return Colors.primary;
  if (serie.startsWith('2')) return Colors.success;
  return Colors.warning;
}

function StatCard({ icon, value, label, color }: { icon: string; value: string; label: string; color: string }) {
  return (
    <View style={s.statCard}>
      <View style={[s.statIcon, { backgroundColor: color + '18' }]}>
        <Icon name={icon} size={22} color={color} />
      </View>
      <Text style={s.statValue}>{value}</Text>
      <Text style={s.statLabel}>{label}</Text>
    </View>
  );
}

function EmptyState({ icon, text }: { icon: string; text: string }) {
  return (
    <View style={s.emptyState}>
      <Icon name={icon} size={32} color={Colors.textDisabled} />
      <Text style={s.emptyText}>{text}</Text>
    </View>
  );
}

// ─── ESTILOS ─────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingBottom: Spacing.lg },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  avatar: { backgroundColor: Colors.primary },
  headerTexts: { gap: 2 },
  greeting: { ...Typography.h4, color: Colors.textPrimary },
  headerSub: { ...Typography.caption, color: Colors.textSecondary },
  iconBtn: { backgroundColor: Colors.surfaceVariant },
  notifDot: {
    position: 'absolute',
    top: 8, right: 8,
    width: 10, height: 10,
    borderRadius: 5,
    backgroundColor: Colors.error,
    borderWidth: 2,
    borderColor: Colors.white,
  },

  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
    marginTop: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    padding: Spacing.sm,
    alignItems: 'center',
    gap: 4,
    ...Shadows.sm,
  },
  statIcon: {
    width: 40, height: 40,
    borderRadius: Radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statValue: { ...Typography.h3, color: Colors.textPrimary },
  statLabel: { ...Typography.caption, color: Colors.textSecondary, textAlign: 'center' },

  section: { marginBottom: Spacing.md },
  sectionTitle: {
    ...Typography.h4,
    color: Colors.textPrimary,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
  },

  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  actionCard: {
    width: '22%',
    alignItems: 'center',
    gap: 6,
  },
  actionIcon: {
    width: 56, height: 56,
    borderRadius: Radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 15,
  },

  turmaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    padding: Spacing.md,
    gap: Spacing.sm,
    ...Shadows.sm,
  },
  turmaSerie: {
    width: 48, height: 48,
    borderRadius: Radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  turmaSerieText: { ...Typography.h4, fontWeight: '700' as const },
  turmaInfo: { flex: 1, gap: 3 },
  turmaNome: { ...Typography.label, color: Colors.textPrimary },
  turmaMeta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  turmaMetaText: { ...Typography.caption, color: Colors.textSecondary },

  aulaCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    padding: Spacing.md,
    gap: Spacing.sm,
    ...Shadows.sm,
  },
  aulaStatus: {
    width: 4,
    borderRadius: 2,
    alignSelf: 'stretch',
    minHeight: 40,
  },
  aulaInfo: { flex: 1, gap: 4 },
  aulaTitulo: { ...Typography.label, color: Colors.textPrimary },
  aulaMeta: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 4 },
  aulaDisc: { ...Typography.caption, color: Colors.primary, fontWeight: '600' as const },
  aulaMetaSep: { ...Typography.caption, color: Colors.textDisabled },
  aulaData: { ...Typography.caption, color: Colors.textSecondary },
  aulaStatusText: { ...Typography.caption, fontWeight: '600' as const },
  aulatumasPills: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: 2 },
  turmaPill: {
    backgroundColor: Colors.primaryLight,
    borderRadius: Radius.full,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  turmaPillText: { ...Typography.caption, color: Colors.primary, fontWeight: '600' as const },

  kitBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.xs,
    backgroundColor: Colors.primary,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    gap: Spacing.sm,
    ...Shadows.sm,
  },
  kitLeft: {
    width: 48, height: 48,
    borderRadius: Radius.sm,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  kitTexts: { flex: 1, gap: 3 },
  kitTitle: { ...Typography.h4, color: Colors.white },
  kitSub: { ...Typography.caption, color: 'rgba(255,255,255,0.8)', lineHeight: 16 },

  emptyState: {
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  emptyText: { ...Typography.body2, color: Colors.textDisabled, textAlign: 'center' },
});

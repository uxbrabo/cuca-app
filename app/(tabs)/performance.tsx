import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LineChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '~/navigation/types';
import { Colors, Spacing, Typography, Radius, Shadows } from '~/theme/theme';

const { width: SCREEN_W } = Dimensions.get('window');
type Nav = NativeStackNavigationProp<HomeStackParamList>;
type FilterTab = 'periodo' | 'disciplina' | 'atividades';

// ─── DADOS ───────────────────────────────────────────────────────────────────

const DISCIPLINES = [
  { name: 'Matemática',  grade: 8.5, goal: 8.0, icon: 'calculator-variant',      color: Colors.primary,  trend: +0.4 },
  { name: 'Português',   grade: 9.1, goal: 8.0, icon: 'book-open-page-variant',  color: '#E91E63',       trend: +0.2 },
  { name: 'Física',      grade: 6.7, goal: 7.5, icon: 'atom',                    color: '#7B1FA2',       trend: -0.3 },
  { name: 'Química',     grade: 7.2, goal: 7.5, icon: 'flask',                   color: Colors.warning,  trend: +0.8 },
  { name: 'Biologia',    grade: 7.8, goal: 7.5, icon: 'dna',                     color: Colors.success,  trend: +0.1 },
  { name: 'História',    grade: 6.5, goal: 7.5, icon: 'bank',                    color: '#FF6B35',       trend: -0.5 },
];

const CHART_DATA: Record<FilterTab, { labels: string[]; data: number[]; title: string; sub: string }> = {
  periodo: {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    data:   [6.0,   7.0,   6.5,  8.5,  7.5,  8.8],
    title: 'Evolução da média geral',
    sub:   'Últimos 6 meses',
  },
  disciplina: {
    labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6'],
    data:   [7.5, 7.8, 8.0, 8.2, 8.8, 9.0],
    title: 'Evolução em Matemática',
    sub:   'Últimas 6 semanas',
  },
  atividades: {
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    data:   [5, 8, 6, 10, 7, 9],
    title: 'Atividades concluídas por dia',
    sub:   'Última semana',
  },
};

const INSIGHTS: Record<FilterTab, { type: 'good' | 'warn' | 'tip'; icon: string; color: string; title: string; desc: string; action?: string }[]> = {
  periodo: [
    { type: 'good', icon: 'trending-up',        color: Colors.success, title: 'Crescimento consistente', desc: 'Sua média subiu 2,8 pontos nos últimos 6 meses. Você está no caminho certo!', action: 'Ver detalhes' },
    { type: 'warn', icon: 'alert-circle-outline', color: Colors.error,  title: 'Atenção em Física e História', desc: 'Essas 2 disciplinas estão abaixo da sua meta. O Tutor Virtual tem trilhas específicas para recuperar.', action: 'Abrir Tutor IA' },
    { type: 'tip',  icon: 'lightbulb-on-outline', color: Colors.warning, title: 'Dica da IA', desc: 'Estudar 30 min extra por semana em Física pode elevar sua nota para 7,5 em 4 semanas.', action: 'Criar trilha' },
  ],
  disciplina: [
    { type: 'good', icon: 'star-circle',         color: Colors.success, title: 'Destaque em Português', desc: '9,1 de média — você está no top 5% dos alunos nessa disciplina.' },
    { type: 'warn', icon: 'target',              color: Colors.error,   title: 'Meta não atingida em Física', desc: 'Você precisa de mais 0,8 ponto para bater a meta. Revise Eletrostática.', action: 'Revisar agora' },
  ],
  atividades: [
    { type: 'good', icon: 'fire',               color: '#FF6B35', title: '14 dias de streak!', desc: 'Você não perdeu um único dia de estudo nas últimas 2 semanas. Incrível!' },
    { type: 'tip',  icon: 'clock-outline',       color: Colors.info,   title: 'Melhor horário detectado', desc: 'Você tem 23% mais acertos quando estuda entre 19h e 21h.', action: 'Ver análise' },
  ],
};

const ACTIVITY_SUMMARY: Record<FilterTab, { icon: string; color: string; value: string; label: string }[]> = {
  periodo: [
    { icon: 'chart-line',           color: Colors.primary,  value: '7,9',  label: 'Média geral' },
    { icon: 'clock-check-outline',  color: Colors.info,     value: '48h',  label: 'Horas estudadas' },
    { icon: 'check-decagram',       color: Colors.success,  value: '87',   label: 'Atividades feitas' },
    { icon: 'fire',                 color: '#FF6B35',       value: '14',   label: 'Dias de streak' },
  ],
  disciplina: [
    { icon: 'trophy',               color: '#FFD700',       value: '#47',  label: 'Ranking geral' },
    { icon: 'flag-checkered',       color: Colors.success,  value: '4/6',  label: 'Disciplinas na meta' },
    { icon: 'arrow-up-circle',      color: Colors.primary,  value: '+1,2', label: 'Pontos ganhos' },
    { icon: 'alert-circle',         color: Colors.error,    value: '2',    label: 'Abaixo da meta' },
  ],
  atividades: [
    { icon: 'frequently-asked-questions', color: Colors.primary,  value: '88%',  label: 'Acertos quizzes' },
    { icon: 'file-document-outline',      color: Colors.success,  value: '95%',  label: 'Acertos leituras' },
    { icon: 'pencil-ruler',               color: Colors.warning,  value: '75%',  label: 'Acertos exercícios' },
    { icon: 'trophy-outline',             color: '#FFD700',       value: '12',   label: 'Quizzes feitos' },
  ],
};

// ─── COMPONENTES ─────────────────────────────────────────────────────────────

function HeroCard() {
  const avg = 7.9;
  const maxGrade = 10;
  const pct = (avg / maxGrade) * 100;

  return (
    <View style={s.heroCard}>
      {/* BG decorativo */}
      <View style={s.heroBgCircle} />

      <View style={s.heroLeft}>
        <View style={s.heroAiBadge}>
          <Icon name="robot-outline" size={13} color={Colors.white} />
          <Text style={s.heroAiBadgeText}>Análise da IA</Text>
        </View>
        <Text style={s.heroLabel}>Média geral</Text>
        <View style={s.heroScoreRow}>
          <Text style={s.heroScore}>{avg.toFixed(1)}</Text>
          <Text style={s.heroScoreMax}>/10</Text>
        </View>
        <View style={s.heroTrend}>
          <Icon name="trending-up" size={14} color="rgba(255,255,255,0.9)" />
          <Text style={s.heroTrendText}>+0,4 pts este mês</Text>
        </View>
        <View style={s.heroProgressBg}>
          <View style={[s.heroProgressFill, { width: `${pct}%` as `${number}%` }]} />
        </View>
      </View>

      <View style={s.heroRight}>
        <View style={s.heroRing}>
          <Text style={s.heroRingValue}>{Math.round(pct)}%</Text>
          <Text style={s.heroRingLabel}>da meta</Text>
        </View>
        <View style={s.heroStats}>
          <View style={s.heroStat}>
            <Icon name="fire" size={14} color="#FFD700" />
            <Text style={s.heroStatText}>14 dias</Text>
          </View>
          <View style={s.heroStat}>
            <Icon name="shield-star" size={14} color="#FFD700" />
            <Text style={s.heroStatText}>Nível 12</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function StatCards({ data }: { data: typeof ACTIVITY_SUMMARY['periodo'] }) {
  return (
    <View style={s.statGrid}>
      {data.map((item, i) => (
        <View key={i} style={s.statCard}>
          <View style={[s.statIconWrap, { backgroundColor: item.color + '18' }]}>
            <Icon name={item.icon} size={20} color={item.color} />
          </View>
          <Text style={[s.statValue, { color: item.color }]}>{item.value}</Text>
          <Text style={s.statLabel}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
}

function DisciplinesSection() {
  const avg = DISCIPLINES.reduce((acc, d) => acc + d.grade, 0) / DISCIPLINES.length;

  return (
    <View style={s.section}>
      <View style={s.sectionHeader}>
        <Text style={s.sectionTitle}>Notas por disciplina</Text>
        <Text style={s.sectionSub}>Meta: 7,5</Text>
      </View>
      <View style={s.disciplinesCard}>
        {DISCIPLINES.map((d, i) => {
          const aboveMeta = d.grade >= d.goal;
          return (
            <View key={i} style={[s.discRow, i < DISCIPLINES.length - 1 && s.discRowBorder]}>
              <View style={[s.discIcon, { backgroundColor: d.color + '18' }]}>
                <Icon name={d.icon} size={18} color={d.color} />
              </View>
              <View style={{ flex: 1, gap: 4 }}>
                <View style={s.discHeader}>
                  <Text style={s.discName}>{d.name}</Text>
                  <View style={s.discRight}>
                    <View style={[s.trendPill, { backgroundColor: (d.trend >= 0 ? Colors.success : Colors.error) + '18' }]}>
                      <Icon
                        name={d.trend >= 0 ? 'trending-up' : 'trending-down'}
                        size={12}
                        color={d.trend >= 0 ? Colors.success : Colors.error}
                      />
                      <Text style={[s.trendText, { color: d.trend >= 0 ? Colors.success : Colors.error }]}>
                        {d.trend >= 0 ? '+' : ''}{d.trend.toFixed(1)}
                      </Text>
                    </View>
                    <Text style={[s.discGrade, { color: aboveMeta ? d.color : Colors.error }]}>
                      {d.grade.toFixed(1)}
                    </Text>
                  </View>
                </View>
                <View style={s.discBarBg}>
                  <View style={[s.discBarFill, {
                    width: `${(d.grade / 10) * 100}%` as `${number}%`,
                    backgroundColor: d.color,
                  }]} />
                  {/* linha de meta */}
                  <View style={[s.discMetaLine, { left: `${d.goal * 10}%` as `${number}%` }]} />
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

function ChartSection({ tab }: { tab: FilterTab }) {
  const data = CHART_DATA[tab];
  const maxVal = Math.max(...data.data);
  const minVal = Math.min(...data.data);
  const change = data.data[data.data.length - 1] - data.data[0];
  const isPositive = change >= 0;

  return (
    <View style={s.section}>
      <View style={s.sectionHeader}>
        <View>
          <Text style={s.sectionTitle}>{data.title}</Text>
          <Text style={s.sectionSub}>{data.sub}</Text>
        </View>
        <View style={[s.changePill, { backgroundColor: (isPositive ? Colors.success : Colors.error) + '18' }]}>
          <Icon name={isPositive ? 'trending-up' : 'trending-down'} size={14} color={isPositive ? Colors.success : Colors.error} />
          <Text style={[s.changePillText, { color: isPositive ? Colors.success : Colors.error }]}>
            {isPositive ? '+' : ''}{change.toFixed(1)}
          </Text>
        </View>
      </View>
      <View style={s.chartCard}>
        <LineChart
          data={{ labels: data.labels, datasets: [{ data: data.data }] }}
          width={SCREEN_W - Spacing.lg * 2 - Spacing.md * 2}
          height={180}
          chartConfig={{
            backgroundGradientFrom: Colors.white,
            backgroundGradientTo: Colors.white,
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(48, 98, 140, ${opacity})`,
            labelColor: () => Colors.textSecondary,
            propsForDots: { r: '5', strokeWidth: '2', stroke: Colors.primary },
            propsForBackgroundLines: { stroke: Colors.divider, strokeDasharray: '4' },
          }}
          bezier
          withInnerLines
          withOuterLines={false}
          style={{ borderRadius: Radius.md, marginLeft: -Spacing.sm }}
          key={`chart-${tab}`}
        />
        <View style={s.chartFooter}>
          <View style={s.chartStat}>
            <Text style={s.chartStatLabel}>Mínimo</Text>
            <Text style={[s.chartStatValue, { color: Colors.error }]}>{minVal.toFixed(1)}</Text>
          </View>
          <View style={s.chartStatDivider} />
          <View style={s.chartStat}>
            <Text style={s.chartStatLabel}>Máximo</Text>
            <Text style={[s.chartStatValue, { color: Colors.success }]}>{maxVal.toFixed(1)}</Text>
          </View>
          <View style={s.chartStatDivider} />
          <View style={s.chartStat}>
            <Text style={s.chartStatLabel}>Variação</Text>
            <Text style={[s.chartStatValue, { color: isPositive ? Colors.success : Colors.error }]}>
              {isPositive ? '+' : ''}{change.toFixed(1)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function InsightsSection({ tab }: { tab: FilterTab }) {
  const navigation = useNavigation<Nav>();
  const items = INSIGHTS[tab];

  const TYPE_CONFIG = {
    good: { bg: Colors.success + '12', border: Colors.success, labelColor: Colors.success, label: 'Ótimo' },
    warn: { bg: Colors.error   + '12', border: Colors.error,   labelColor: Colors.error,   label: 'Atenção' },
    tip:  { bg: Colors.warning + '12', border: Colors.warning, labelColor: Colors.warning, label: 'Dica' },
  };

  return (
    <View style={s.section}>
      <View style={s.sectionHeader}>
        <Text style={s.sectionTitle}>Insights do Tutor IA</Text>
        <View style={s.aiPill}>
          <Icon name="robot-outline" size={12} color={Colors.primary} />
          <Text style={s.aiPillText}>IA</Text>
        </View>
      </View>
      {items.map((item, i) => {
        const cfg = TYPE_CONFIG[item.type];
        return (
          <View key={i} style={[s.insightCard, { backgroundColor: cfg.bg, borderLeftColor: cfg.border }]}>
            <View style={s.insightTop}>
              <View style={[s.insightIconWrap, { backgroundColor: item.color + '20' }]}>
                <Icon name={item.icon} size={22} color={item.color} />
              </View>
              <View style={{ flex: 1 }}>
                <View style={s.insightTitleRow}>
                  <View style={[s.insightTypePill, { backgroundColor: cfg.border + '25' }]}>
                    <Text style={[s.insightTypeText, { color: cfg.labelColor }]}>{cfg.label}</Text>
                  </View>
                </View>
                <Text style={s.insightTitle}>{item.title}</Text>
              </View>
            </View>
            <Text style={s.insightDesc}>{item.desc}</Text>
            {item.action && (
              <TouchableOpacity
                style={[s.insightAction, { borderColor: cfg.border }]}
                onPress={() => navigation.navigate('TutorVirtual')}
              >
                <Text style={[s.insightActionText, { color: cfg.border }]}>{item.action}</Text>
                <Icon name="arrow-right" size={14} color={cfg.border} />
              </TouchableOpacity>
            )}
          </View>
        );
      })}
    </View>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

export default function PerformanceScreen() {
  const navigation = useNavigation<Nav>();
  const [tab, setTab] = useState<FilterTab>('periodo');

  const TABS: { id: FilterTab; label: string; icon: string }[] = [
    { id: 'periodo',    label: 'Período',    icon: 'calendar-month-outline' },
    { id: 'disciplina', label: 'Disciplina', icon: 'book-open-variant' },
    { id: 'atividades', label: 'Atividades', icon: 'format-list-checks' },
  ];

  return (
    <SafeAreaView style={s.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>

        {/* HERO */}
        <HeroCard />

        {/* TABS */}
        <View style={s.tabRow}>
          {TABS.map(t => (
            <TouchableOpacity
              key={t.id}
              style={[s.tabBtn, tab === t.id && s.tabBtnActive]}
              onPress={() => setTab(t.id)}
            >
              <Icon name={t.icon} size={15} color={tab === t.id ? Colors.primary : Colors.textSecondary} />
              <Text style={[s.tabBtnText, tab === t.id && s.tabBtnTextActive]}>{t.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* KPIs */}
        <StatCards data={ACTIVITY_SUMMARY[tab]} />

        {/* GRÁFICO */}
        <ChartSection tab={tab} />

        {/* NOTAS POR DISCIPLINA */}
        {tab === 'disciplina' && <DisciplinesSection />}

        {/* TODOS: gráfico de disciplinas sem o detalhe */}
        {tab !== 'disciplina' && (
          <View style={s.section}>
            <View style={s.sectionHeader}>
              <Text style={s.sectionTitle}>Notas por disciplina</Text>
              <TouchableOpacity onPress={() => setTab('disciplina')}>
                <Text style={s.seeAll}>Ver detalhes</Text>
              </TouchableOpacity>
            </View>
            <View style={s.quickGradesRow}>
              {DISCIPLINES.map((d, i) => (
                <View key={i} style={s.quickGrade}>
                  <View style={[s.quickGradeBar, { height: `${(d.grade / 10) * 64}%` as `${number}%`, backgroundColor: d.grade >= d.goal ? d.color : Colors.error }]} />
                  <Text style={[s.quickGradeValue, { color: d.grade >= d.goal ? d.color : Colors.error }]}>{d.grade.toFixed(1)}</Text>
                  <Text style={s.quickGradeName}>{d.name.substring(0, 4)}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* INSIGHTS */}
        <InsightsSection tab={tab} />

        {/* AÇÕES */}
        <View style={s.actionsRow}>
          <TouchableOpacity style={s.actionBtn} onPress={() => navigation.navigate('TutorVirtual')} activeOpacity={0.85}>
            <Icon name="robot-excited-outline" size={20} color={Colors.white} />
            <Text style={s.actionBtnText}>Tutor Virtual</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.actionBtn, s.actionBtnOutline]} onPress={() => navigation.navigate('Achievements')} activeOpacity={0.85}>
            <Icon name="trophy-award" size={20} color={Colors.primary} />
            <Text style={[s.actionBtnText, { color: Colors.primary }]}>Conquistas</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: Spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── ESTILOS ──────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surfaceVariant },
  scroll: { paddingBottom: Spacing.xl },

  // HERO
  heroCard: {
    backgroundColor: Colors.primary,
    margin: Spacing.md,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    ...Shadows.md,
  },
  heroBgCircle: {
    position: 'absolute', width: 200, height: 200, borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.06)', top: -60, right: -40,
  },
  heroLeft: { flex: 1, gap: 6 },
  heroAiBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: 'rgba(255,255,255,0.18)', alignSelf: 'flex-start',
    paddingHorizontal: 8, paddingVertical: 3, borderRadius: Radius.full,
  },
  heroAiBadgeText: { ...Typography.caption, color: Colors.white, fontWeight: '700', fontSize: 10 },
  heroLabel: { ...Typography.caption, color: 'rgba(255,255,255,0.75)' },
  heroScoreRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 3 },
  heroScore: { fontSize: 52, fontWeight: '800', color: Colors.white, lineHeight: 58 },
  heroScoreMax: { ...Typography.body1, color: 'rgba(255,255,255,0.6)', marginBottom: 8 },
  heroTrend: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  heroTrendText: { ...Typography.caption, color: 'rgba(255,255,255,0.9)', fontWeight: '600' },
  heroProgressBg: { height: 4, backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: Radius.full, overflow: 'hidden', marginTop: 4 },
  heroProgressFill: { height: 4, backgroundColor: Colors.white, borderRadius: Radius.full },
  heroRight: { alignItems: 'center', gap: Spacing.md, paddingLeft: Spacing.lg },
  heroRing: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 3, borderColor: 'rgba(255,255,255,0.4)',
    justifyContent: 'center', alignItems: 'center',
  },
  heroRingValue: { fontSize: 22, fontWeight: '800', color: Colors.white },
  heroRingLabel: { ...Typography.caption, color: 'rgba(255,255,255,0.7)', fontSize: 10 },
  heroStats: { gap: 5 },
  heroStat: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  heroStatText: { ...Typography.caption, color: 'rgba(255,255,255,0.85)', fontWeight: '600' },

  // TABS
  tabRow: {
    flexDirection: 'row', backgroundColor: Colors.white,
    marginHorizontal: Spacing.md, borderRadius: Radius.md,
    padding: 4, ...Shadows.sm,
  },
  tabBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, paddingVertical: 9, borderRadius: Radius.sm },
  tabBtnActive: { backgroundColor: Colors.primaryLight },
  tabBtnText: { ...Typography.caption, color: Colors.textSecondary, fontWeight: '600' },
  tabBtnTextActive: { color: Colors.primary, fontWeight: '700' },

  // STAT GRID
  statGrid: { flexDirection: 'row', paddingHorizontal: Spacing.md, paddingTop: Spacing.md, gap: Spacing.sm },
  statCard: { flex: 1, backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md, alignItems: 'center', gap: 5, ...Shadows.sm },
  statIconWrap: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  statValue: { ...Typography.label, fontWeight: '800' },
  statLabel: { ...Typography.caption, color: Colors.textSecondary, textAlign: 'center', fontSize: 10, lineHeight: 14 },

  // SECTION
  section: { paddingHorizontal: Spacing.md, marginTop: Spacing.md, gap: Spacing.sm },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sectionTitle: { ...Typography.label, color: Colors.textPrimary, fontWeight: '700' },
  sectionSub: { ...Typography.caption, color: Colors.textSecondary },
  seeAll: { ...Typography.caption, color: Colors.primary, fontWeight: '700' },

  // CHART
  changePill: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 9, paddingVertical: 4, borderRadius: Radius.full },
  changePillText: { ...Typography.caption, fontWeight: '700' },
  chartCard: { backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md, ...Shadows.sm, gap: Spacing.md },
  chartFooter: { flexDirection: 'row', justifyContent: 'space-around', paddingTop: Spacing.sm, borderTopWidth: 1, borderTopColor: Colors.divider },
  chartStat: { alignItems: 'center', gap: 3 },
  chartStatLabel: { ...Typography.caption, color: Colors.textDisabled, fontSize: 10 },
  chartStatValue: { ...Typography.label, fontWeight: '700' },
  chartStatDivider: { width: 1, backgroundColor: Colors.divider },

  // DISCIPLINES
  disciplinesCard: { backgroundColor: Colors.white, borderRadius: Radius.md, ...Shadows.sm, overflow: 'hidden' },
  discRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, paddingHorizontal: Spacing.md, paddingVertical: 10 },
  discRowBorder: { borderBottomWidth: 1, borderBottomColor: Colors.divider },
  discIcon: { width: 36, height: 36, borderRadius: Radius.sm, justifyContent: 'center', alignItems: 'center' },
  discHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 },
  discName: { ...Typography.body2, color: Colors.textPrimary },
  discRight: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  trendPill: { flexDirection: 'row', alignItems: 'center', gap: 3, paddingHorizontal: 6, paddingVertical: 2, borderRadius: Radius.full },
  trendText: { ...Typography.caption, fontWeight: '700', fontSize: 11 },
  discGrade: { ...Typography.label, fontWeight: '800', minWidth: 28, textAlign: 'right' },
  discBarBg: { height: 6, backgroundColor: Colors.surfaceVariant, borderRadius: Radius.full, overflow: 'visible', position: 'relative' },
  discBarFill: { height: 6, borderRadius: Radius.full },
  discMetaLine: { position: 'absolute', top: -3, width: 2, height: 12, backgroundColor: Colors.textDisabled, borderRadius: 1 },

  // QUICK GRADES
  quickGradesRow: {
    backgroundColor: Colors.white, borderRadius: Radius.md,
    padding: Spacing.md, ...Shadows.sm,
    flexDirection: 'row', alignItems: 'flex-end',
    justifyContent: 'space-around', height: 120,
  },
  quickGrade: { alignItems: 'center', gap: 4, flex: 1 },
  quickGradeBar: { width: 18, borderRadius: Radius.sm, minHeight: 8 },
  quickGradeValue: { ...Typography.caption, fontWeight: '800', fontSize: 11 },
  quickGradeName: { ...Typography.caption, color: Colors.textDisabled, fontSize: 9 },

  // INSIGHTS
  aiPill: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: Colors.primaryLight, paddingHorizontal: 8, paddingVertical: 3, borderRadius: Radius.full },
  aiPillText: { ...Typography.caption, color: Colors.primary, fontWeight: '700', fontSize: 10 },
  insightCard: {
    borderRadius: Radius.md, padding: Spacing.md, gap: Spacing.sm,
    borderLeftWidth: 4, ...Shadows.sm,
  },
  insightTop: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm },
  insightIconWrap: { width: 44, height: 44, borderRadius: Radius.md, justifyContent: 'center', alignItems: 'center' },
  insightTitleRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs, marginBottom: 3 },
  insightTypePill: { paddingHorizontal: 7, paddingVertical: 2, borderRadius: Radius.full },
  insightTypeText: { fontSize: 10, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.5 },
  insightTitle: { ...Typography.label, color: Colors.textPrimary },
  insightDesc: { ...Typography.body2, color: Colors.textSecondary, lineHeight: 20 },
  insightAction: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5,
    borderWidth: 1.5, borderRadius: Radius.md, paddingVertical: 8,
  },
  insightActionText: { ...Typography.caption, fontWeight: '700' },

  // ACTIONS
  actionsRow: { flexDirection: 'row', gap: Spacing.sm, paddingHorizontal: Spacing.md, marginTop: Spacing.md },
  actionBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: Spacing.sm, backgroundColor: Colors.primary, borderRadius: Radius.md, paddingVertical: 13,
  },
  actionBtnOutline: { backgroundColor: Colors.white, borderWidth: 1.5, borderColor: Colors.primary },
  actionBtnText: { ...Typography.label, color: Colors.white, fontWeight: '700' },
});

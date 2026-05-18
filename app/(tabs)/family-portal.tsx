import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Spacing, Typography, Radius, Shadows } from '~/theme/theme';

type FamilyTab = 'desempenho' | 'tarefas' | 'frequencia' | 'comunicados';

type StatRow = { label: string; value: string; icon: string; color: string };
type Activity = { id: string; icon: string; text: string; time: string; color: string };
type Guardian = { id: string; name: string; relation: string; avatar: string; lastSeen: string };
type Task = { id: string; title: string; subject: string; subjectColor: string; due: string; status: 'pendente' | 'entregue' | 'atrasado' };
type AttendanceDay = { date: string; day: string; present: boolean };
type Notice = { id: string; title: string; from: string; time: string; read: boolean; icon: string; color: string };

const STATS: StatRow[] = [
  { label: 'Frequência', value: '94%', icon: 'calendar-check', color: Colors.success },
  { label: 'Média geral', value: '7,6', icon: 'chart-bar', color: Colors.primary },
  { label: 'Quizzes feitos', value: '47', icon: 'frequently-asked-questions', color: Colors.info },
  { label: 'Horas de estudo', value: '38h', icon: 'clock-check-outline', color: Colors.warning },
];

const ACTIVITIES: Activity[] = [
  { id: '1', icon: 'trophy', text: 'João subiu para o 2º lugar no ranking', time: '2h atrás', color: Colors.warning },
  { id: '2', icon: 'school', text: 'Quiz de Física concluído com 90% de acertos', time: 'Hoje, 14h30', color: Colors.primary },
  { id: '3', icon: 'book-check', text: 'Leitura: "Leis de Newton" — 8 min', time: 'Hoje, 10h15', color: Colors.info },
  { id: '4', icon: 'star-circle', text: 'Nova conquista: 7 dias de estudo seguidos!', time: 'Ontem', color: Colors.success },
  { id: '5', icon: 'alert-circle-outline', text: 'Desempenho em História abaixo da meta', time: '2 dias atrás', color: Colors.error },
];

const GUARDIANS: Guardian[] = [
  { id: '1', name: 'Maria Silva', relation: 'Mãe', avatar: 'https://i.pravatar.cc/150?img=20', lastSeen: 'Online agora' },
  { id: '2', name: 'Carlos Silva', relation: 'Pai', avatar: 'https://i.pravatar.cc/150?img=21', lastSeen: 'Há 2 dias' },
];

const TASKS: Task[] = [
  { id: '1', title: 'Trabalho sobre Revolução Industrial', subject: 'História', subjectColor: Colors.warning, due: '20 Mai', status: 'pendente' },
  { id: '2', title: 'Lista de exercícios — Funções', subject: 'Matemática', subjectColor: Colors.primary, due: '18 Mai', status: 'entregue' },
  { id: '3', title: 'Redação temática: Meio ambiente', subject: 'Português', subjectColor: '#7B1FA2', due: '15 Mai', status: 'atrasado' },
  { id: '4', title: 'Relatório de experimento', subject: 'Química', subjectColor: '#AD1457', due: '22 Mai', status: 'pendente' },
  { id: '5', title: 'Questões de cinemática', subject: 'Física', subjectColor: Colors.info, due: '19 Mai', status: 'entregue' },
];

const ATTENDANCE_WEEK: AttendanceDay[] = [
  { date: '12', day: 'Seg', present: true },
  { date: '13', day: 'Ter', present: true },
  { date: '14', day: 'Qua', present: false },
  { date: '15', day: 'Qui', present: true },
  { date: '16', day: 'Sex', present: true },
];

const NOTICES: Notice[] = [
  { id: '1', title: 'Reunião de pais — 3º Ano A', from: 'Diretoria', time: 'Hoje, 08h00', read: false, icon: 'account-group-outline', color: Colors.primary },
  { id: '2', title: 'Resultado da avaliação bimestral disponível', from: 'Secretaria', time: 'Ontem', read: false, icon: 'clipboard-check-outline', color: Colors.success },
  { id: '3', title: 'Semana Cultural — 20 a 24 de maio', from: 'Coordenação', time: '2 dias atrás', read: true, icon: 'calendar-star', color: Colors.warning },
  { id: '4', title: 'Lembrete: entrega de documentos pendentes', from: 'Secretaria', time: '3 dias atrás', read: true, icon: 'file-alert-outline', color: Colors.error },
];

const TASK_STATUS_CONFIG = {
  pendente: { color: Colors.warning, label: 'Pendente', icon: 'clock-outline' },
  entregue: { color: Colors.success, label: 'Entregue', icon: 'check-circle' },
  atrasado: { color: Colors.error, label: 'Atrasado', icon: 'alert-circle' },
};

function StatCard({ item }: { item: StatRow }) {
  return (
    <View style={styles.statCard}>
      <Icon name={item.icon} size={24} color={item.color} />
      <Text style={[styles.statValue, { color: item.color }]}>{item.value}</Text>
      <Text style={styles.statLabel}>{item.label}</Text>
    </View>
  );
}

function ActivityItem({ item }: { item: Activity }) {
  return (
    <View style={styles.activityRow}>
      <View style={[styles.activityIcon, { backgroundColor: item.color + '22' }]}>
        <Icon name={item.icon} size={18} color={item.color} />
      </View>
      <View style={styles.activityBody}>
        <Text style={styles.activityText}>{item.text}</Text>
        <Text style={styles.activityTime}>{item.time}</Text>
      </View>
    </View>
  );
}

function DesempenhoTab() {
  return (
    <>
      <Text style={styles.sectionLabel}>Resumo do mês</Text>
      <View style={styles.statsGrid}>
        {STATS.map((s, i) => <StatCard key={i} item={s} />)}
      </View>

      <Text style={styles.sectionLabel}>Progresso por disciplina</Text>
      <View style={styles.progressCard}>
        {[
          { name: 'Matemática', val: 72, color: Colors.primary },
          { name: 'Física', val: 80, color: Colors.info },
          { name: 'Português', val: 58, color: '#7B1FA2' },
          { name: 'História', val: 45, color: Colors.warning },
        ].map((s, i) => (
          <View key={i} style={styles.progressRow}>
            <Text style={styles.progressLabel}>{s.name}</Text>
            <View style={styles.progressBarWrap}>
              <View style={[styles.progressFill, { width: `${s.val}%` as any, backgroundColor: s.color }]} />
            </View>
            <Text style={[styles.progressPct, { color: s.color }]}>{s.val}%</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionLabel}>Atividades recentes</Text>
      <View style={styles.activityCard}>
        {ACTIVITIES.map((a, i) => (
          <React.Fragment key={a.id}>
            <ActivityItem item={a} />
            {i < ACTIVITIES.length - 1 && <View style={styles.activityDivider} />}
          </React.Fragment>
        ))}
      </View>

      <Text style={styles.sectionLabel}>Responsáveis com acesso</Text>
      <View style={styles.guardiansCard}>
        {GUARDIANS.map((g, i) => (
          <React.Fragment key={g.id}>
            <View style={styles.guardianRow}>
              <Avatar.Image size={44} source={{ uri: g.avatar }} />
              <View style={styles.guardianInfo}>
                <Text style={styles.guardianName}>{g.name}</Text>
                <Text style={styles.guardianRelation}>{g.relation} · {g.lastSeen}</Text>
              </View>
              <TouchableOpacity style={styles.messageBtn}>
                <Icon name="message-text-outline" size={18} color={Colors.primary} />
              </TouchableOpacity>
            </View>
            {i < GUARDIANS.length - 1 && <View style={styles.activityDivider} />}
          </React.Fragment>
        ))}
      </View>
    </>
  );
}

function TarefasTab() {
  const pending = TASKS.filter(t => t.status === 'pendente' || t.status === 'atrasado');
  const done = TASKS.filter(t => t.status === 'entregue');

  return (
    <>
      <View style={styles.taskSummaryRow}>
        <View style={[styles.taskSummaryCard, { borderLeftColor: Colors.warning }]}>
          <Text style={[styles.taskSummaryNum, { color: Colors.warning }]}>{pending.length}</Text>
          <Text style={styles.taskSummaryLabel}>Pendentes</Text>
        </View>
        <View style={[styles.taskSummaryCard, { borderLeftColor: Colors.success }]}>
          <Text style={[styles.taskSummaryNum, { color: Colors.success }]}>{done.length}</Text>
          <Text style={styles.taskSummaryLabel}>Entregues</Text>
        </View>
        <View style={[styles.taskSummaryCard, { borderLeftColor: Colors.error }]}>
          <Text style={[styles.taskSummaryNum, { color: Colors.error }]}>
            {TASKS.filter(t => t.status === 'atrasado').length}
          </Text>
          <Text style={styles.taskSummaryLabel}>Atrasadas</Text>
        </View>
      </View>

      <Text style={styles.sectionLabel}>Todas as tarefas</Text>
      {TASKS.map(t => {
        const cfg = TASK_STATUS_CONFIG[t.status];
        return (
          <TouchableOpacity
            key={t.id}
            style={styles.taskCard}
            activeOpacity={0.85}
            onPress={() => Alert.alert(t.title, `Disciplina: ${t.subject}\nEntrega: ${t.due}\nStatus: ${cfg.label}`)}
          >
            <View style={[styles.taskSubjectDot, { backgroundColor: t.subjectColor }]} />
            <View style={{ flex: 1 }}>
              <Text style={styles.taskTitle}>{t.title}</Text>
              <View style={styles.taskMeta}>
                <Text style={[styles.taskSubject, { color: t.subjectColor }]}>{t.subject}</Text>
                <Icon name="calendar" size={12} color={Colors.textDisabled} />
                <Text style={styles.taskDue}>{t.due}</Text>
              </View>
            </View>
            <View style={[styles.taskStatusPill, { backgroundColor: cfg.color + '18' }]}>
              <Icon name={cfg.icon} size={12} color={cfg.color} />
              <Text style={[styles.taskStatusText, { color: cfg.color }]}>{cfg.label}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </>
  );
}

function FrequenciaTab() {
  const presences = ATTENDANCE_WEEK.filter(d => d.present).length;
  const total = ATTENDANCE_WEEK.length;
  const rate = Math.round((presences / total) * 100);

  return (
    <>
      <View style={styles.attendanceSummaryCard}>
        <View style={styles.attendanceSummaryLeft}>
          <Text style={styles.attendanceBigNum}>{rate}%</Text>
          <Text style={styles.attendanceBigLabel}>frequência esta semana</Text>
          <Text style={styles.attendanceSub}>{presences} de {total} dias presentes</Text>
        </View>
        <View style={styles.attendanceCircle}>
          <Icon name="calendar-check" size={36} color={rate >= 80 ? Colors.success : Colors.warning} />
        </View>
      </View>

      <Text style={styles.sectionLabel}>Últimos 5 dias</Text>
      <View style={styles.attendanceWeekCard}>
        {ATTENDANCE_WEEK.map((d, i) => (
          <View key={i} style={styles.attendanceDayWrap}>
            <Text style={styles.attendanceDayName}>{d.day}</Text>
            <View style={[
              styles.attendanceDayCircle,
              { backgroundColor: d.present ? Colors.success : Colors.error }
            ]}>
              <Icon name={d.present ? 'check' : 'close'} size={16} color={Colors.white} />
            </View>
            <Text style={styles.attendanceDayDate}>{d.date}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionLabel}>Frequência por disciplina</Text>
      <View style={styles.progressCard}>
        {[
          { name: 'Matemática', val: 96 }, { name: 'Física', val: 92 },
          { name: 'Português', val: 88 }, { name: 'História', val: 96 },
          { name: 'Química', val: 84 },
        ].map((s, i) => (
          <View key={i} style={styles.progressRow}>
            <Text style={styles.progressLabel}>{s.name}</Text>
            <View style={styles.progressBarWrap}>
              <View style={[styles.progressFill, {
                width: `${s.val}%` as any,
                backgroundColor: s.val >= 90 ? Colors.success : s.val >= 75 ? Colors.warning : Colors.error,
              }]} />
            </View>
            <Text style={[styles.progressPct, {
              color: s.val >= 90 ? Colors.success : s.val >= 75 ? Colors.warning : Colors.error,
            }]}>{s.val}%</Text>
          </View>
        ))}
      </View>
    </>
  );
}

function ComunicadosTab() {
  const [notices, setNotices] = useState(NOTICES);
  const unread = notices.filter(n => !n.read).length;

  const markRead = (id: string) => {
    setNotices(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <>
      {unread > 0 && (
        <View style={styles.unreadBanner}>
          <Icon name="bell-outline" size={18} color={Colors.primary} />
          <Text style={styles.unreadBannerText}>
            Você tem <Text style={{ fontWeight: '700' }}>{unread} comunicado{unread > 1 ? 's' : ''}</Text> não lido{unread > 1 ? 's' : ''}
          </Text>
        </View>
      )}

      <Text style={styles.sectionLabel}>Comunicados da escola</Text>
      {notices.map((n, i) => (
        <TouchableOpacity
          key={n.id}
          style={[styles.noticeCard, !n.read && styles.noticeCardUnread]}
          activeOpacity={0.85}
          onPress={() => {
            markRead(n.id);
            Alert.alert(n.title, `De: ${n.from}\n${n.time}`);
          }}
        >
          <View style={[styles.noticeIconWrap, { backgroundColor: n.color + '18' }]}>
            <Icon name={n.icon} size={20} color={n.color} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.noticeTitle, !n.read && styles.noticeTitleUnread]}>{n.title}</Text>
            <Text style={styles.noticeMeta}>{n.from} · {n.time}</Text>
          </View>
          {!n.read && <View style={styles.unreadDot} />}
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={styles.contactSchoolBtn}
        onPress={() => Alert.alert('Falar com a escola', 'Abrindo chat com a secretaria...')}
      >
        <Icon name="message-text-outline" size={18} color={Colors.white} />
        <Text style={styles.contactSchoolText}>Falar com a escola</Text>
      </TouchableOpacity>
    </>
  );
}

const FAMILY_TABS: { id: FamilyTab; icon: string; label: string }[] = [
  { id: 'desempenho', icon: 'chart-line-variant', label: 'Desempenho' },
  { id: 'tarefas', icon: 'clipboard-list-outline', label: 'Tarefas' },
  { id: 'frequencia', icon: 'calendar-check', label: 'Frequência' },
  { id: 'comunicados', icon: 'bell-outline', label: 'Comunicados' },
];

export default function FamilyPortalScreen() {
  const [activeTab, setActiveTab] = useState<FamilyTab>('desempenho');
  const unreadNotices = NOTICES.filter(n => !n.read).length;

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {/* STUDENT CARD */}
      <View style={styles.studentCard}>
        <Avatar.Image size={52} source={{ uri: 'https://i.pravatar.cc/150' }} />
        <View style={styles.studentInfo}>
          <Text style={styles.studentName}>João Silva</Text>
          <Text style={styles.studentDetail}>3º Ano · Ensino Médio</Text>
          <View style={styles.levelRow}>
            <Icon name="star-circle" size={16} color={Colors.warning} />
            <Text style={styles.levelText}>Nível 12 · 4.833 XP</Text>
          </View>
        </View>
        <View style={styles.rankBadge}>
          <Icon name="trophy" size={18} color={Colors.warning} />
          <Text style={styles.rankText}>#2</Text>
        </View>
      </View>

      {/* TABS */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabScrollWrap}
        contentContainerStyle={styles.tabScrollContent}
      >
        {FAMILY_TABS.map(t => (
          <TouchableOpacity
            key={t.id}
            style={[styles.tab, activeTab === t.id && styles.tabActive]}
            onPress={() => setActiveTab(t.id)}
          >
            <Icon name={t.icon} size={15} color={activeTab === t.id ? Colors.primary : Colors.textSecondary} />
            <Text style={[styles.tabLabel, activeTab === t.id && styles.tabLabelActive]}>{t.label}</Text>
            {t.id === 'comunicados' && unreadNotices > 0 && (
              <View style={styles.tabBadge}>
                <Text style={styles.tabBadgeText}>{unreadNotices}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* CONTENT */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {activeTab === 'desempenho' && <DesempenhoTab />}
        {activeTab === 'tarefas' && <TarefasTab />}
        {activeTab === 'frequencia' && <FrequenciaTab />}
        {activeTab === 'comunicados' && <ComunicadosTab />}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surfaceVariant },

  studentCard: {
    backgroundColor: Colors.white,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  studentInfo: { flex: 1 },
  studentName: { ...Typography.h4, color: Colors.textPrimary },
  studentDetail: { ...Typography.body2, color: Colors.textSecondary, marginBottom: 4 },
  levelRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  levelText: { ...Typography.caption, color: Colors.textSecondary, fontWeight: '600' },
  rankBadge: { alignItems: 'center', gap: 2 },
  rankText: { ...Typography.label, color: Colors.warning, fontWeight: '700' },

  tabScrollWrap: { backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.divider, flexGrow: 0 },
  tabScrollContent: { paddingHorizontal: Spacing.xs },
  tab: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.md,
    borderBottomWidth: 2, borderBottomColor: 'transparent',
  },
  tabActive: { borderBottomColor: Colors.primary },
  tabLabel: { ...Typography.caption, color: Colors.textSecondary, fontWeight: '500' },
  tabLabelActive: { color: Colors.primary, fontWeight: '700' },
  tabBadge: {
    backgroundColor: Colors.error, borderRadius: Radius.full,
    minWidth: 16, height: 16, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 3,
  },
  tabBadgeText: { fontSize: 10, fontWeight: '700', color: Colors.white },

  scroll: { padding: Spacing.md, paddingBottom: Spacing.xl, gap: Spacing.md },
  sectionLabel: { ...Typography.overline, color: Colors.textSecondary, textTransform: 'uppercase' },

  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  statCard: { flex: 1, minWidth: '45%', backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md, alignItems: 'center', gap: 6, ...Shadows.sm },
  statValue: { ...Typography.h3 },
  statLabel: { ...Typography.caption, color: Colors.textSecondary, textAlign: 'center' },

  progressCard: { backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md, gap: Spacing.sm, ...Shadows.sm },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  progressLabel: { ...Typography.body2, color: Colors.textPrimary, width: 88 },
  progressBarWrap: { flex: 1, height: 8, backgroundColor: Colors.surfaceVariant, borderRadius: Radius.full, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: Radius.full },
  progressPct: { ...Typography.caption, fontWeight: '600', minWidth: 36, textAlign: 'right' },

  activityCard: { backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md, ...Shadows.sm },
  activityRow: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.md, paddingVertical: Spacing.sm },
  activityIcon: { width: 36, height: 36, borderRadius: Radius.sm, justifyContent: 'center', alignItems: 'center', flexShrink: 0 },
  activityBody: { flex: 1 },
  activityText: { ...Typography.body2, color: Colors.textPrimary },
  activityTime: { ...Typography.caption, color: Colors.textDisabled, marginTop: 2 },
  activityDivider: { height: 1, backgroundColor: Colors.divider },

  guardiansCard: { backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md, ...Shadows.sm },
  guardianRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, paddingVertical: Spacing.xs },
  guardianInfo: { flex: 1 },
  guardianName: { ...Typography.label, color: Colors.textPrimary },
  guardianRelation: { ...Typography.caption, color: Colors.textSecondary },
  messageBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.primaryLight, justifyContent: 'center', alignItems: 'center' },

  taskSummaryRow: { flexDirection: 'row', gap: Spacing.sm },
  taskSummaryCard: { flex: 1, backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md, alignItems: 'center', borderLeftWidth: 4, ...Shadows.sm },
  taskSummaryNum: { ...Typography.h3 },
  taskSummaryLabel: { ...Typography.caption, color: Colors.textSecondary },
  taskCard: {
    backgroundColor: Colors.white, borderRadius: Radius.md,
    padding: Spacing.md, flexDirection: 'row',
    alignItems: 'center', gap: Spacing.md, ...Shadows.sm,
  },
  taskSubjectDot: { width: 10, height: 10, borderRadius: 5, flexShrink: 0 },
  taskTitle: { ...Typography.label, color: Colors.textPrimary, marginBottom: 4 },
  taskMeta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  taskSubject: { ...Typography.caption, fontWeight: '700' },
  taskDue: { ...Typography.caption, color: Colors.textDisabled },
  taskStatusPill: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: Spacing.sm, paddingVertical: 4, borderRadius: Radius.full },
  taskStatusText: { ...Typography.caption, fontWeight: '700' },

  attendanceSummaryCard: {
    backgroundColor: Colors.white, borderRadius: Radius.md,
    padding: Spacing.lg, flexDirection: 'row',
    alignItems: 'center', gap: Spacing.md, ...Shadows.sm,
  },
  attendanceSummaryLeft: { flex: 1 },
  attendanceBigNum: { ...Typography.h1, color: Colors.success },
  attendanceBigLabel: { ...Typography.label, color: Colors.textPrimary },
  attendanceSub: { ...Typography.caption, color: Colors.textSecondary, marginTop: 4 },
  attendanceCircle: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center', alignItems: 'center',
  },
  attendanceWeekCard: {
    backgroundColor: Colors.white, borderRadius: Radius.md,
    padding: Spacing.md, flexDirection: 'row',
    justifyContent: 'space-around', ...Shadows.sm,
  },
  attendanceDayWrap: { alignItems: 'center', gap: 6 },
  attendanceDayName: { ...Typography.caption, color: Colors.textSecondary },
  attendanceDayCircle: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  attendanceDayDate: { ...Typography.caption, color: Colors.textDisabled },

  unreadBanner: {
    backgroundColor: Colors.primaryLight, borderRadius: Radius.md,
    padding: Spacing.md, flexDirection: 'row',
    alignItems: 'center', gap: Spacing.sm,
    borderLeftWidth: 4, borderLeftColor: Colors.primary,
  },
  unreadBannerText: { ...Typography.body2, color: Colors.textPrimary },
  noticeCard: {
    backgroundColor: Colors.white, borderRadius: Radius.md,
    padding: Spacing.md, flexDirection: 'row',
    alignItems: 'center', gap: Spacing.md, ...Shadows.sm,
  },
  noticeCardUnread: { borderWidth: 1, borderColor: Colors.primaryLight },
  noticeIconWrap: { width: 40, height: 40, borderRadius: Radius.sm, justifyContent: 'center', alignItems: 'center', flexShrink: 0 },
  noticeTitle: { ...Typography.label, color: Colors.textPrimary },
  noticeTitleUnread: { fontWeight: '700' },
  noticeMeta: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },
  unreadDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.primary },
  contactSchoolBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: Spacing.sm, backgroundColor: Colors.primary,
    borderRadius: Radius.md, padding: Spacing.md, marginTop: Spacing.sm,
  },
  contactSchoolText: { ...Typography.label, color: Colors.white },
});

import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { HomeStackParamList, TabParamList } from '~/navigation/types';
import { Colors, Spacing, Typography, Radius, Shadows } from '~/theme/theme';

type Nav = CompositeNavigationProp<
  NativeStackNavigationProp<HomeStackParamList>,
  BottomTabNavigationProp<TabParamList>
>;

const UPCOMING_EVENTS = [
  { date: '19 Mai', title: 'Prova de Matemática', type: 'prova', color: Colors.error },
  { date: '22 Mai', title: 'Entrega — Trabalho de História', type: 'entrega', color: Colors.warning },
  { date: '26 Mai', title: 'Prova de Física', type: 'prova', color: Colors.error },
  { date: '29 Mai', title: 'Feira de Ciências', type: 'evento', color: Colors.primary },
];

const COMUNICADOS = [
  { icon: 'bullhorn', color: Colors.primary, title: 'Reunião de Pais — 3ºA', time: 'Amanhã, 19h', unread: true },
  { icon: 'file-alert', color: Colors.warning, title: 'Entrega de notas do 2º bimestre', time: 'Hoje', unread: true },
  { icon: 'calendar-star', color: Colors.info, title: 'Semana Cultural — 20 a 24/06', time: '2 dias atrás', unread: false },
];

const SUBJECTS_PERF = [
  { name: 'Matemática', grade: 8.2, color: Colors.success },
  { name: 'Física', grade: 6.7, color: Colors.warning },
  { name: 'Português', grade: 9.1, color: Colors.success },
  { name: 'História', grade: 7.5, color: Colors.primary },
];

export default function HomeFamiliaScreen() {
  const navigation = useNavigation<Nav>();

  return (
    <SafeAreaView style={s.container} edges={['top', 'left', 'right']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>

        {/* HEADER */}
        <View style={s.header}>
          <View style={s.headerLeft}>
            <Avatar.Image size={48} source={{ uri: 'https://i.pravatar.cc/150?img=5' }} />
            <View style={s.headerTexts}>
              <Text style={s.greeting}>Olá, família!</Text>
              <Text style={s.greetingSub}>Acompanhando João Silva · 3º ano A</Text>
            </View>
          </View>
          <View style={{ position: 'relative' }}>
            <IconButton icon="bell-outline" size={24} style={s.iconBtn} onPress={() => navigation.navigate('Notifications')} />
            <View style={s.notifDot} />
          </View>
        </View>

        {/* FILHO CARD */}
        <View style={s.filhoCard}>
          <View style={s.filhoHeader}>
            <Avatar.Image size={52} source={{ uri: 'https://i.pravatar.cc/150?img=12' }} />
            <View style={{ flex: 1 }}>
              <Text style={s.filhoName}>João Silva</Text>
              <Text style={s.filhoClass}>3º Ano A · Período Matutino</Text>
              <View style={s.streakRow}>
                <Icon name="fire" size={14} color="#FF6B35" />
                <Text style={s.streakText}>14 dias de estudo seguidos</Text>
              </View>
            </View>
            <TouchableOpacity style={s.verMaisBtn} onPress={() => navigation.navigate('FamilyPortal')}>
              <Text style={s.verMaisText}>Ver tudo</Text>
              <Icon name="chevron-right" size={16} color={Colors.primary} />
            </TouchableOpacity>
          </View>

          <View style={s.statsRow}>
            <View style={s.statBox}>
              <Icon name="chart-line" size={18} color={Colors.success} />
              <Text style={s.statValue}>7,9</Text>
              <Text style={s.statLabel}>Média geral</Text>
            </View>
            <View style={s.statDivider} />
            <View style={s.statBox}>
              <Icon name="calendar-check" size={18} color={Colors.primary} />
              <Text style={s.statValue}>93%</Text>
              <Text style={s.statLabel}>Frequência</Text>
            </View>
            <View style={s.statDivider} />
            <View style={s.statBox}>
              <Icon name="trophy" size={18} color="#FFD700" />
              <Text style={s.statValue}>#47</Text>
              <Text style={s.statLabel}>Ranking</Text>
            </View>
            <View style={s.statDivider} />
            <View style={s.statBox}>
              <Icon name="star-circle" size={18} color="#FFD700" />
              <Text style={s.statValue}>4.833</Text>
              <Text style={s.statLabel}>XP total</Text>
            </View>
          </View>
        </View>

        {/* ACESSO RÁPIDO */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Acesso rápido</Text>
          <View style={s.quickGrid}>
            {[
              { icon: 'account-child-outline', label: 'Portal da\nFamília', color: Colors.primary, screen: 'FamilyPortal' },
              { icon: 'calendar-month-outline', label: 'Calendário\nEscolar', color: Colors.info, screen: 'SchoolCalendar' },
              { icon: 'message-text-outline', label: 'Mensagens', color: Colors.success, tab: 'Mensagens' },
              { icon: 'cash-multiple', label: 'Financeiro', color: Colors.warning, screen: 'FamilyPortal' },
            ].map((item, i) => (
              <TouchableOpacity
                key={i}
                style={s.quickItem}
                onPress={() => item.tab ? navigation.navigate(item.tab as any) : navigation.navigate(item.screen as any)}
                activeOpacity={0.8}
              >
                <View style={[s.quickIcon, { backgroundColor: item.color + '18' }]}>
                  <Icon name={item.icon} size={26} color={item.color} />
                </View>
                <Text style={s.quickLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* DESEMPENHO POR DISCIPLINA */}
        <View style={s.section}>
          <View style={s.sectionHeader}>
            <Text style={s.sectionTitle}>Notas por disciplina</Text>
            <TouchableOpacity onPress={() => navigation.navigate('FamilyPortal')}>
              <Icon name="arrow-right" size={22} color={Colors.primary} />
            </TouchableOpacity>
          </View>
          <View style={s.card}>
            {SUBJECTS_PERF.map((sub, i) => (
              <View key={i} style={[s.gradeRow, i < SUBJECTS_PERF.length - 1 && s.gradeRowBorder]}>
                <View style={[s.gradeDot, { backgroundColor: sub.color }]} />
                <Text style={s.gradeName}>{sub.name}</Text>
                <View style={s.gradeBarWrap}>
                  <View style={s.gradeBarBg}>
                    <View style={[s.gradeBarFill, { width: `${(sub.grade / 10) * 100}%`, backgroundColor: sub.color }]} />
                  </View>
                </View>
                <Text style={[s.gradeValue, { color: sub.color }]}>{sub.grade.toFixed(1)}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* PRÓXIMOS EVENTOS */}
        <View style={s.section}>
          <View style={s.sectionHeader}>
            <Text style={s.sectionTitle}>Próximos eventos</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SchoolCalendar')}>
              <Icon name="arrow-right" size={22} color={Colors.primary} />
            </TouchableOpacity>
          </View>
          {UPCOMING_EVENTS.map((ev, i) => (
            <TouchableOpacity key={i} style={s.eventRow} onPress={() => navigation.navigate('SchoolCalendar')} activeOpacity={0.85}>
              <View style={[s.eventDateBox, { borderColor: ev.color }]}>
                <Text style={[s.eventDate, { color: ev.color }]}>{ev.date.split(' ')[0]}</Text>
                <Text style={[s.eventMonth, { color: ev.color }]}>{ev.date.split(' ')[1]}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.eventTitle}>{ev.title}</Text>
                <View style={[s.eventTypePill, { backgroundColor: ev.color + '18' }]}>
                  <Text style={[s.eventTypeText, { color: ev.color }]}>{ev.type}</Text>
                </View>
              </View>
              <Icon name="chevron-right" size={18} color={Colors.textDisabled} />
            </TouchableOpacity>
          ))}
        </View>

        {/* COMUNICADOS */}
        <View style={s.section}>
          <View style={s.sectionHeader}>
            <Text style={s.sectionTitle}>Comunicados da escola</Text>
            <TouchableOpacity onPress={() => navigation.navigate('FamilyPortal')}>
              <Icon name="arrow-right" size={22} color={Colors.primary} />
            </TouchableOpacity>
          </View>
          {COMUNICADOS.map((c, i) => (
            <TouchableOpacity key={i} style={[s.comunicadoRow, c.unread && s.comunicadoUnread]} activeOpacity={0.85}>
              <View style={[s.comunicadoIcon, { backgroundColor: c.color + '18' }]}>
                <Icon name={c.icon} size={20} color={c.color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.comunicadoTitle}>{c.title}</Text>
                <Text style={s.comunicadoTime}>{c.time}</Text>
              </View>
              {c.unread && <View style={s.unreadDot} />}
            </TouchableOpacity>
          ))}
        </View>

        {/* CTA FALAR COM ESCOLA */}
        <TouchableOpacity style={s.ctaBtn} onPress={() => navigation.navigate('Mensagens' as any)} activeOpacity={0.85}>
          <Icon name="message-text-outline" size={20} color={Colors.white} />
          <Text style={s.ctaBtnText}>Falar com a escola</Text>
        </TouchableOpacity>

        <View style={{ height: Spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surfaceVariant },
  scroll: { paddingBottom: Spacing.xl },

  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg, paddingTop: Spacing.md, paddingBottom: Spacing.sm,
    backgroundColor: Colors.white,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  headerTexts: { gap: 2 },
  greeting: { ...Typography.h4, color: Colors.textPrimary },
  greetingSub: { ...Typography.caption, color: Colors.textSecondary },
  iconBtn: { margin: 0 },
  notifDot: { position: 'absolute', top: 8, right: 8, width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.error, borderWidth: 2, borderColor: Colors.white },

  filhoCard: {
    backgroundColor: Colors.white, margin: Spacing.md,
    borderRadius: Radius.lg, padding: Spacing.md, ...Shadows.sm, gap: Spacing.md,
  },
  filhoHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  filhoName: { ...Typography.label, color: Colors.textPrimary, fontWeight: '700' },
  filhoClass: { ...Typography.caption, color: Colors.textSecondary, marginTop: 1 },
  streakRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 3 },
  streakText: { ...Typography.caption, color: '#FF6B35', fontWeight: '600' },
  verMaisBtn: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  verMaisText: { ...Typography.caption, color: Colors.primary, fontWeight: '700' },
  statsRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surfaceVariant, borderRadius: Radius.md, padding: Spacing.md, justifyContent: 'space-around' },
  statBox: { alignItems: 'center', gap: 4 },
  statValue: { ...Typography.label, color: Colors.textPrimary, fontWeight: '700' },
  statLabel: { ...Typography.caption, color: Colors.textSecondary },
  statDivider: { width: 1, height: 32, backgroundColor: Colors.divider },

  section: { paddingHorizontal: Spacing.md, marginBottom: Spacing.md, gap: Spacing.sm },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sectionTitle: { ...Typography.label, color: Colors.textPrimary, fontWeight: '700' },
  card: { backgroundColor: Colors.white, borderRadius: Radius.md, ...Shadows.sm, overflow: 'hidden' },

  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  quickItem: { width: '47%', backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md, alignItems: 'center', gap: 8, ...Shadows.sm },
  quickIcon: { width: 52, height: 52, borderRadius: Radius.md, justifyContent: 'center', alignItems: 'center' },
  quickLabel: { ...Typography.caption, color: Colors.textPrimary, textAlign: 'center', fontWeight: '600', lineHeight: 18 },

  gradeRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.md, paddingVertical: 10, gap: Spacing.sm },
  gradeRowBorder: { borderBottomWidth: 1, borderBottomColor: Colors.divider },
  gradeDot: { width: 8, height: 8, borderRadius: 4 },
  gradeName: { ...Typography.body2, color: Colors.textPrimary, width: 90 },
  gradeBarWrap: { flex: 1 },
  gradeBarBg: { height: 6, backgroundColor: Colors.surfaceVariant, borderRadius: Radius.full, overflow: 'hidden' },
  gradeBarFill: { height: 6, borderRadius: Radius.full },
  gradeValue: { ...Typography.label, fontWeight: '700', minWidth: 32, textAlign: 'right' },

  eventRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md, ...Shadows.sm },
  eventDateBox: { width: 46, height: 46, borderRadius: Radius.sm, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  eventDate: { ...Typography.label, fontWeight: '700', fontSize: 15 },
  eventMonth: { ...Typography.caption, fontWeight: '600', fontSize: 10 },
  eventTitle: { ...Typography.body2, color: Colors.textPrimary, marginBottom: 4 },
  eventTypePill: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: Radius.full, alignSelf: 'flex-start' },
  eventTypeText: { fontSize: 10, fontWeight: '700', textTransform: 'uppercase' },

  comunicadoRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md, ...Shadows.sm },
  comunicadoUnread: { borderLeftWidth: 3, borderLeftColor: Colors.primary },
  comunicadoIcon: { width: 40, height: 40, borderRadius: Radius.sm, justifyContent: 'center', alignItems: 'center' },
  comunicadoTitle: { ...Typography.label, color: Colors.textPrimary },
  comunicadoTime: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.primary },

  ctaBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm, backgroundColor: Colors.primary, borderRadius: Radius.md, paddingVertical: 14, marginHorizontal: Spacing.md },
  ctaBtnText: { ...Typography.label, color: Colors.white, fontWeight: '700' },
});

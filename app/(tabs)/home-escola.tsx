import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconButton } from 'react-native-paper';
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

const ALERTS = [
  { level: 'danger', color: Colors.error, icon: 'alert-circle', text: '14 alunos com desempenho crítico em Matemática', action: 'Ver lista' },
  { level: 'warn', color: Colors.warning, icon: 'alert', text: '8 alunos com frequência abaixo de 75%', action: 'Ver detalhes' },
  { level: 'info', color: Colors.info, icon: 'information', text: 'Turma 2ºB melhorou 12% em Física este mês', action: 'Ver relatório' },
];

const RECENT_ACTIVITY = [
  { icon: 'file-document-check', color: Colors.success, text: 'Plano de aula de Física — 2ºA criado por Prof. Silva', time: '1h atrás' },
  { icon: 'account-plus', color: Colors.primary, text: '3 novos alunos matriculados', time: 'Hoje, 09h12' },
  { icon: 'cash-check', color: Colors.success, text: '47 boletos pagos hoje — R$ 35.250', time: 'Hoje, 08h00' },
  { icon: 'clipboard-check', color: Colors.info, text: 'Avaliação de Matemática corrigida: 28 alunos', time: 'Ontem, 10h15' },
];

export default function HomeEscolaScreen() {
  const navigation = useNavigation<Nav>();

  return (
    <SafeAreaView style={s.container} edges={['top', 'left', 'right']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>

        {/* HEADER */}
        <View style={s.header}>
          <View style={s.schoolBrand}>
            <View style={s.schoolLogo}>
              <Icon name="domain" size={24} color={Colors.white} />
            </View>
            <View>
              <Text style={s.schoolName}>Colégio Integrado CUCA</Text>
              <Text style={s.schoolSub}>Portal de Gestão · Painel principal</Text>
            </View>
          </View>
          <View style={{ position: 'relative' }}>
            <IconButton icon="bell-outline" size={24} style={s.iconBtn} onPress={() => navigation.navigate('Notifications')} />
            <View style={s.notifDot} />
          </View>
        </View>

        {/* KPI CARDS */}
        <View style={s.kpiGrid}>
          {[
            { icon: 'account-group', value: '1.247', label: 'Alunos ativos', color: Colors.primary, trend: '+12 este mês' },
            { icon: 'chart-bar', value: '7,4', label: 'Média geral', color: Colors.success, trend: '+0,3 vs mês anterior' },
            { icon: 'calendar-check', value: '91%', label: 'Frequência', color: Colors.info, trend: 'Meta: 95%' },
            { icon: 'fire', value: '78%', label: 'Engajamento', color: Colors.warning, trend: '+5% esta semana' },
          ].map((k, i) => (
            <View key={i} style={s.kpiCard}>
              <View style={[s.kpiIcon, { backgroundColor: k.color + '18' }]}>
                <Icon name={k.icon} size={20} color={k.color} />
              </View>
              <Text style={[s.kpiValue, { color: k.color }]}>{k.value}</Text>
              <Text style={s.kpiLabel}>{k.label}</Text>
              <Text style={s.kpiTrend}>{k.trend}</Text>
            </View>
          ))}
        </View>

        {/* RESUMO FINANCEIRO */}
        <View style={s.section}>
          <View style={s.sectionHeader}>
            <Text style={s.sectionTitle}>Financeiro — hoje</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SchoolPortal')}>
              <Icon name="arrow-right" size={22} color={Colors.primary} />
            </TouchableOpacity>
          </View>
          <View style={s.finRow}>
            <View style={[s.finCard, { borderTopColor: Colors.success }]}>
              <Icon name="cash-check" size={22} color={Colors.success} />
              <Text style={[s.finValue, { color: Colors.success }]}>R$ 35.250</Text>
              <Text style={s.finLabel}>Recebido hoje</Text>
            </View>
            <View style={[s.finCard, { borderTopColor: Colors.error }]}>
              <Icon name="alert-circle-outline" size={22} color={Colors.error} />
              <Text style={[s.finValue, { color: Colors.error }]}>R$ 12.300</Text>
              <Text style={s.finLabel}>Inadimplência</Text>
            </View>
            <View style={[s.finCard, { borderTopColor: Colors.warning }]}>
              <Icon name="calendar-clock" size={22} color={Colors.warning} />
              <Text style={[s.finValue, { color: Colors.warning }]}>5 dias</Text>
              <Text style={s.finLabel}>Próx. vencimento</Text>
            </View>
          </View>
        </View>

        {/* ACESSO RÁPIDO */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Acesso rápido</Text>
          <View style={s.quickGrid}>
            {[
              { icon: 'view-dashboard-outline', label: 'Dashboard\nCompleto', color: Colors.primary, screen: 'SchoolPortal' },
              { icon: 'briefcase-account-outline', label: 'Kit do\nProfessor', color: '#7B1FA2', screen: 'SchoolPortal' },
              { icon: 'calendar-month-outline', label: 'Calendário\nEscolar', color: Colors.info, screen: 'SchoolCalendar' },
              { icon: 'hub-outline', label: 'Comunicação', color: Colors.warning, screen: 'SchoolPortal' },
              { icon: 'cash-multiple', label: 'Financeiro', color: Colors.success, screen: 'SchoolPortal' },
              { icon: 'school-outline', label: 'Acadêmico', color: Colors.error, screen: 'SchoolPortal' },
            ].map((item, i) => (
              <TouchableOpacity
                key={i}
                style={s.quickItem}
                onPress={() => navigation.navigate(item.screen as any)}
                activeOpacity={0.8}
              >
                <View style={[s.quickIcon, { backgroundColor: item.color + '18' }]}>
                  <Icon name={item.icon} size={24} color={item.color} />
                </View>
                <Text style={s.quickLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ALERTAS IA */}
        <View style={s.section}>
          <View style={s.sectionHeader}>
            <Text style={s.sectionTitle}>Alertas da IA</Text>
            <View style={s.aiPill}>
              <Icon name="robot-outline" size={12} color={Colors.primary} />
              <Text style={s.aiPillText}>Sistema de Alerta Precoce</Text>
            </View>
          </View>
          {ALERTS.map((a, i) => (
            <View key={i} style={[s.alertCard, { borderLeftColor: a.color }]}>
              <Icon name={a.icon} size={20} color={a.color} />
              <Text style={s.alertText}>{a.text}</Text>
              <TouchableOpacity onPress={() => Alert.alert('Alerta', a.text)}>
                <Text style={[s.alertAction, { color: a.color }]}>{a.action}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* AÇÕES RÁPIDAS */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Ações rápidas</Text>
          <View style={s.actionsRow}>
            {[
              { icon: 'message-plus-outline', color: Colors.primary, label: 'Nova mensagem', tab: 'Mensagens' },
              { icon: 'video-plus-outline', color: Colors.info, label: 'Agendar reunião', screen: 'SchoolPortal' },
              { icon: 'file-chart-outline', color: Colors.success, label: 'Gerar relatório', screen: 'SchoolPortal' },
            ].map((a, i) => (
              <TouchableOpacity
                key={i}
                style={s.actionBtn}
                onPress={() => a.tab ? navigation.navigate(a.tab as any) : navigation.navigate(a.screen as any)}
                activeOpacity={0.85}
              >
                <View style={[s.actionIcon, { backgroundColor: a.color + '18' }]}>
                  <Icon name={a.icon} size={22} color={a.color} />
                </View>
                <Text style={s.actionLabel}>{a.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ATIVIDADE RECENTE */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Atividade recente</Text>
          {RECENT_ACTIVITY.map((a, i) => (
            <View key={i} style={s.activityRow}>
              <View style={[s.activityIcon, { backgroundColor: a.color + '18' }]}>
                <Icon name={a.icon} size={18} color={a.color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.activityText}>{a.text}</Text>
                <Text style={s.activityTime}>{a.time}</Text>
              </View>
            </View>
          ))}
        </View>

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
    paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md,
    backgroundColor: Colors.primary,
  },
  schoolBrand: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, flex: 1 },
  schoolLogo: { width: 44, height: 44, borderRadius: Radius.sm, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  schoolName: { ...Typography.label, color: Colors.white, fontWeight: '700' },
  schoolSub: { ...Typography.caption, color: 'rgba(255,255,255,0.75)', marginTop: 1 },
  iconBtn: { margin: 0 },
  notifDot: { position: 'absolute', top: 8, right: 8, width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.error, borderWidth: 2, borderColor: Colors.primary },

  kpiGrid: { flexDirection: 'row', flexWrap: 'wrap', padding: Spacing.md, gap: Spacing.sm },
  kpiCard: {
    width: '47%', backgroundColor: Colors.white, borderRadius: Radius.md,
    padding: Spacing.md, alignItems: 'center', gap: 5, ...Shadows.sm,
  },
  kpiIcon: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  kpiValue: { ...Typography.h3, fontWeight: '800' },
  kpiLabel: { ...Typography.caption, color: Colors.textSecondary, textAlign: 'center' },
  kpiTrend: { ...Typography.caption, color: Colors.textDisabled, textAlign: 'center', fontSize: 10 },

  section: { paddingHorizontal: Spacing.md, marginBottom: Spacing.md, gap: Spacing.sm },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sectionTitle: { ...Typography.label, color: Colors.textPrimary, fontWeight: '700' },

  finRow: { flexDirection: 'row', gap: Spacing.sm },
  finCard: {
    flex: 1, backgroundColor: Colors.white, borderRadius: Radius.md,
    padding: Spacing.md, alignItems: 'center', gap: 5,
    borderTopWidth: 3, ...Shadows.sm,
  },
  finValue: { ...Typography.label, fontWeight: '800', fontSize: 15 },
  finLabel: { ...Typography.caption, color: Colors.textSecondary, textAlign: 'center' },

  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  quickItem: { width: '30.5%', backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md, alignItems: 'center', gap: 7, ...Shadows.sm },
  quickIcon: { width: 48, height: 48, borderRadius: Radius.md, justifyContent: 'center', alignItems: 'center' },
  quickLabel: { ...Typography.caption, color: Colors.textPrimary, textAlign: 'center', fontWeight: '600', lineHeight: 16 },

  aiPill: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: Colors.primaryLight, paddingHorizontal: 8, paddingVertical: 3, borderRadius: Radius.full },
  aiPillText: { ...Typography.caption, color: Colors.primary, fontWeight: '600', fontSize: 10 },

  alertCard: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.sm,
    backgroundColor: Colors.white, borderRadius: Radius.md,
    padding: Spacing.md, borderLeftWidth: 4, ...Shadows.sm,
  },
  alertText: { ...Typography.body2, color: Colors.textPrimary, flex: 1 },
  alertAction: { ...Typography.caption, fontWeight: '700' },

  actionsRow: { flexDirection: 'row', gap: Spacing.sm },
  actionBtn: { flex: 1, backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md, alignItems: 'center', gap: 8, ...Shadows.sm },
  actionIcon: { width: 44, height: 44, borderRadius: Radius.full, justifyContent: 'center', alignItems: 'center' },
  actionLabel: { ...Typography.caption, color: Colors.textPrimary, textAlign: 'center', fontWeight: '600' },

  activityRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md, ...Shadows.sm },
  activityIcon: { width: 36, height: 36, borderRadius: Radius.sm, justifyContent: 'center', alignItems: 'center' },
  activityText: { ...Typography.body2, color: Colors.textPrimary },
  activityTime: { ...Typography.caption, color: Colors.textDisabled, marginTop: 2 },
});

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
import { Avatar, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { RootStackParamList, TabParamList, HomeStackParamList } from '~/navigation/types';
import { Colors, Spacing, Typography, Radius, Shadows } from '~/theme/theme';

type Nav = CompositeNavigationProp<BottomTabNavigationProp<TabParamList, 'Perfil'>, NativeStackNavigationProp<RootStackParamList>>;

type StatItem = { label: string; value: string; icon: string };
type SettingItem = { id: string; icon: string; label: string; value?: string; onPress: () => void; danger?: boolean };

export default function ProfileScreen() {
  const navigation = useNavigation<Nav>();
  const [notificationsOn, setNotificationsOn] = useState(true);

  const stats: StatItem[] = [
    { label: 'XP Total', value: '4.833', icon: 'star-circle' },
    { label: 'Ranking', value: '#2', icon: 'trophy' },
    { label: 'Quizzes', value: '47', icon: 'frequently-asked-questions' },
    { label: 'Sequência', value: '7d', icon: 'fire' },
  ];

  const sections: { title: string; items: SettingItem[] }[] = [
    {
      title: 'Aprendizado',
      items: [
        { id: 's1', icon: 'chart-line-variant', label: 'Meu Desempenho', onPress: () => navigation.navigate('Inicio', { screen: 'Performance' }) },
        { id: 's2', icon: 'book-open-variant', label: 'Minhas Disciplinas', onPress: () => navigation.navigate('Inicio', { screen: 'Subjects' }) },
        { id: 's3', icon: 'trophy-outline', label: 'Arena de Quizzes', onPress: () => navigation.navigate('Inicio', { screen: 'QuizArena' }) },
      ],
    },
    {
      title: 'Conta',
      items: [
        { id: 'a1', icon: 'account-edit-outline', label: 'Editar Perfil', onPress: () => Alert.alert('Em breve', 'Essa funcionalidade estará disponível em breve.') },
        { id: 'a2', icon: 'lock-outline', label: 'Alterar Senha', onPress: () => Alert.alert('Em breve', 'Essa funcionalidade estará disponível em breve.') },
        { id: 'a3', icon: 'bell-outline', label: 'Notificações', value: notificationsOn ? 'Ativadas' : 'Desativadas', onPress: () => setNotificationsOn(v => !v) },
      ],
    },
    {
      title: 'Suporte',
      items: [
        { id: 'sp1', icon: 'help-circle-outline', label: 'Central de Ajuda', onPress: () => Alert.alert('Ajuda', 'Acesse nossa central de ajuda.') },
        { id: 'sp2', icon: 'information-outline', label: 'Sobre o Cuca', onPress: () => Alert.alert('Cuca App', 'Versão 1.0.0') },
        { id: 'sp3', icon: 'logout', label: 'Sair', danger: true, onPress: () => Alert.alert('Sair', 'Deseja sair da sua conta?', [{ text: 'Cancelar', style: 'cancel' }, { text: 'Sair', style: 'destructive', onPress: () => navigation.getParent<NativeStackNavigationProp<RootStackParamList>>()?.reset({ index: 0, routes: [{ name: 'Login' }] }) }]) },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.avatarWrap}>
            <Avatar.Image size={88} source={{ uri: 'https://i.pravatar.cc/150' }} />
            <TouchableOpacity style={styles.editAvatarBtn}>
              <Icon name="camera-outline" size={16} color={Colors.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>João Silva</Text>
          <Text style={styles.email}>joao.silva@email.com</Text>
          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <Icon name="school" size={14} color={Colors.primary} />
              <Text style={styles.badgeText}>3º Ano · Ensino Médio</Text>
            </View>
          </View>
        </View>

        {/* STATS */}
        <View style={styles.statsRow}>
          {stats.map((s, i) => (
            <View key={i} style={styles.statItem}>
              <Icon name={s.icon} size={22} color={Colors.primary} />
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* LEVEL PROGRESS */}
        <View style={styles.levelCard}>
          <View style={styles.levelHeader}>
            <Text style={styles.levelLabel}>Nível 12 — Mestre dos Estudos</Text>
            <Text style={styles.levelXp}>4.833 / 5.000 XP</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '96.7%' }]} />
          </View>
          <Text style={styles.levelHint}>Faltam 167 XP para o próximo nível</Text>
        </View>

        {/* SECTIONS */}
        {sections.map(section => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionCard}>
              {section.items.map((item, idx) => (
                <React.Fragment key={item.id}>
                  <TouchableOpacity
                    style={styles.settingRow}
                    onPress={item.onPress}
                    activeOpacity={0.7}
                  >
                    <View style={[styles.settingIcon, item.danger && styles.settingIconDanger]}>
                      <Icon name={item.icon} size={20} color={item.danger ? Colors.error : Colors.primary} />
                    </View>
                    <Text style={[styles.settingLabel, item.danger && styles.settingLabelDanger]}>
                      {item.label}
                    </Text>
                    {item.value ? (
                      <Text style={styles.settingValue}>{item.value}</Text>
                    ) : (
                      <Icon name="chevron-right" size={20} color={Colors.textDisabled} />
                    )}
                  </TouchableOpacity>
                  {idx < section.items.length - 1 && <Divider style={styles.divider} />}
                </React.Fragment>
              ))}
            </View>
          </View>
        ))}

        <Text style={styles.version}>Cuca App · v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surfaceVariant },
  header: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  avatarWrap: { position: 'relative', marginBottom: Spacing.md },
  editAvatarBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  name: { ...Typography.h3, color: Colors.textPrimary, marginBottom: 4 },
  email: { ...Typography.body2, color: Colors.textSecondary, marginBottom: Spacing.sm },
  badgeRow: { flexDirection: 'row', gap: Spacing.xs },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  badgeText: { ...Typography.caption, color: Colors.primary, fontWeight: '600' },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  statItem: { flex: 1, alignItems: 'center', paddingVertical: Spacing.md, gap: 4 },
  statValue: { ...Typography.h4, color: Colors.textPrimary },
  statLabel: { ...Typography.caption, color: Colors.textSecondary },
  levelCard: {
    margin: Spacing.md,
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    padding: Spacing.md,
    ...Shadows.sm,
  },
  levelHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.sm },
  levelLabel: { ...Typography.label, color: Colors.textPrimary },
  levelXp: { ...Typography.label, color: Colors.primary },
  progressBar: {
    height: 8,
    backgroundColor: Colors.surfaceVariant,
    borderRadius: Radius.full,
    overflow: 'hidden',
    marginBottom: Spacing.xs,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: Radius.full,
  },
  levelHint: { ...Typography.caption, color: Colors.textDisabled },
  section: { paddingHorizontal: Spacing.md, marginBottom: Spacing.md },
  sectionTitle: {
    ...Typography.overline,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    marginBottom: Spacing.sm,
  },
  sectionCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    overflow: 'hidden',
    ...Shadows.sm,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: Radius.sm,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  settingIconDanger: { backgroundColor: Colors.errorLight },
  settingLabel: { ...Typography.body1, color: Colors.textPrimary, flex: 1 },
  settingLabelDanger: { color: Colors.error },
  settingValue: { ...Typography.body2, color: Colors.textSecondary },
  divider: { marginLeft: 52 + Spacing.md },
  version: {
    ...Typography.caption,
    color: Colors.textDisabled,
    textAlign: 'center',
    paddingVertical: Spacing.xl,
  },
});

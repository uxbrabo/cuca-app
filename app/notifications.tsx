import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Spacing, Typography, Radius } from '~/theme/theme';

type Notification = {
  id: string;
  type: 'aula' | 'mensagem' | 'ranking' | 'lembrete' | 'conquista';
  title: string;
  description: string;
  time: string;
  group: 'hoje' | 'ontem' | 'semana';
  read: boolean;
};

const ICON_MAP = {
  aula: { name: 'school-outline', color: Colors.info, bg: Colors.infoLight },
  mensagem: { name: 'message-text-outline', color: Colors.primary, bg: Colors.primaryLight },
  ranking: { name: 'trophy-outline', color: Colors.warning, bg: Colors.warningLight },
  lembrete: { name: 'calendar-check-outline', color: Colors.success, bg: Colors.successLight },
  conquista: { name: 'star-circle-outline', color: '#7B1FA2', bg: '#F3E5F5' },
};

const NOTIFICATIONS: Notification[] = [
  { id: '1', type: 'mensagem', title: "Nova mensagem de 'Prof. Silva'", description: 'Sobre as notas da última prova...', time: 'Agora', group: 'hoje', read: false },
  { id: '2', type: 'ranking', title: 'Você subiu no Ranking!', description: 'Parabéns! Você está em 2º lugar na Arena.', time: '1h atrás', group: 'hoje', read: false },
  { id: '3', type: 'lembrete', title: 'Prova de Biologia amanhã', description: 'Não se esqueça de revisar o Capítulo 7.', time: '3h atrás', group: 'hoje', read: true },
  { id: '4', type: 'conquista', title: 'Nova conquista desbloqueada!', description: 'Você completou 10 quizzes seguidos. Incrível!', time: '5h atrás', group: 'hoje', read: true },
  { id: '5', type: 'aula', title: 'Aula de Matemática cancelada', description: 'Prof. Fernanda cancelou a aula das 14h.', time: 'Ontem, 16:30', group: 'ontem', read: true },
  { id: '6', type: 'mensagem', title: 'Turma de Física', description: 'João: Alguém tem a resolução do exercício 5?', time: 'Ontem, 10:15', group: 'ontem', read: true },
  { id: '7', type: 'lembrete', title: 'Entrega do trabalho de História', description: 'O prazo de entrega é em 2 dias.', time: 'Seg, 09:00', group: 'semana', read: true },
  { id: '8', type: 'conquista', title: '7 dias de estudo seguidos!', description: 'Você é consistente! Continue assim.', time: 'Dom, 22:00', group: 'semana', read: true },
];

const GROUP_LABELS = { hoje: 'Hoje', ontem: 'Ontem', semana: 'Esta semana' };

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const markAllRead = () =>
    setNotifications(n => n.map(item => ({ ...item, read: true })));

  const toggleRead = (id: string) =>
    setNotifications(n =>
      n.map(item => item.id === id ? { ...item, read: !item.read } : item)
    );

  const unreadCount = notifications.filter(n => !n.read).length;

  const grouped = (['hoje', 'ontem', 'semana'] as const).map(group => ({
    group,
    data: notifications.filter(n => n.group === group),
  })).filter(g => g.data.length > 0);

  const renderItem = ({ item }: { item: Notification }) => {
    const icon = ICON_MAP[item.type];
    return (
      <TouchableOpacity
        style={[styles.item, item.read && styles.itemRead]}
        onPress={() => toggleRead(item.id)}
        activeOpacity={0.7}
      >
        <View style={[styles.iconWrap, { backgroundColor: icon.bg }]}>
          <Icon name={icon.name} size={22} color={icon.color} />
        </View>
        <View style={styles.itemBody}>
          <Text style={[styles.itemTitle, item.read && styles.itemTitleRead]}>
            {item.title}
          </Text>
          <Text style={styles.itemDesc} numberOfLines={2}>{item.description}</Text>
          <Text style={styles.itemTime}>{item.time}</Text>
        </View>
        {!item.read && <View style={styles.unreadDot} />}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {unreadCount > 0 && (
        <TouchableOpacity style={styles.markAllRow} onPress={markAllRead}>
          <Text style={styles.markAllText}>Marcar todas como lidas ({unreadCount})</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={grouped}
        keyExtractor={g => g.group}
        renderItem={({ item: g }) => (
          <View>
            <Text style={styles.groupLabel}>{GROUP_LABELS[g.group]}</Text>
            {g.data.map(n => renderItem({ item: n }))}
          </View>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Icon name="bell-off-outline" size={48} color={Colors.textDisabled} />
            <Text style={styles.emptyText}>Nenhuma notificação</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surfaceVariant },
  markAllRow: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    backgroundColor: Colors.white,
    alignItems: 'flex-end',
  },
  markAllText: { ...Typography.label, color: Colors.primary },
  list: { paddingBottom: Spacing.xl },
  groupLabel: {
    ...Typography.overline,
    color: Colors.textSecondary,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.sm,
    textTransform: 'uppercase',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  itemRead: { backgroundColor: Colors.surfaceVariant },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: Radius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
    flexShrink: 0,
  },
  itemBody: { flex: 1 },
  itemTitle: { ...Typography.label, color: Colors.textPrimary, marginBottom: 2 },
  itemTitleRead: { fontWeight: '400' },
  itemDesc: { ...Typography.body2, color: Colors.textSecondary, marginBottom: 4 },
  itemTime: { ...Typography.caption, color: Colors.textDisabled },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginTop: 6,
    marginLeft: Spacing.sm,
    flexShrink: 0,
  },
  empty: { alignItems: 'center', paddingTop: Spacing.xxl },
  emptyText: { ...Typography.body1, color: Colors.textDisabled, marginTop: Spacing.md },
});

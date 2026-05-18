import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { MessagesStackParamList } from '~/navigation/types';
import { Colors, Spacing, Typography, Radius } from '~/theme/theme';

type Nav = NativeStackNavigationProp<MessagesStackParamList>;

type Conversation = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  isGroup: boolean;
};

const CONVERSATIONS: Conversation[] = [
  { id: '1', name: 'Prof. Silva', avatar: 'https://i.pravatar.cc/150?img=11', lastMessage: 'Sobre as notas da última prova...', time: 'Agora', unread: 2, online: true, isGroup: false },
  { id: '2', name: 'Turma de Física', avatar: 'https://i.pravatar.cc/150?img=12', lastMessage: 'João: Alguém tem a resolução do exercício 5?', time: '10 min', unread: 0, online: false, isGroup: true },
  { id: '3', name: 'Maria Eduarda', avatar: 'https://i.pravatar.cc/150?img=1', lastMessage: 'Vamos estudar juntos amanhã?', time: '1h', unread: 1, online: true, isGroup: false },
  { id: '4', name: 'Grupo de Matemática', avatar: 'https://i.pravatar.cc/150?img=14', lastMessage: 'Alana: Exercício 3 foi muito difícil', time: '2h', unread: 5, online: false, isGroup: true },
  { id: '5', name: 'Prof. Fernanda', avatar: 'https://i.pravatar.cc/150?img=15', lastMessage: 'A aula de amanhã foi cancelada.', time: 'Ontem', unread: 0, online: false, isGroup: false },
  { id: '6', name: 'João Pedro', avatar: 'https://i.pravatar.cc/150?img=2', lastMessage: 'Valeu pelo resumo!', time: 'Ontem', unread: 0, online: false, isGroup: false },
  { id: '7', name: 'Grupo de Redação', avatar: 'https://i.pravatar.cc/150?img=17', lastMessage: 'Lembrem da entrega na sexta', time: 'Seg', unread: 0, online: false, isGroup: true },
  { id: '8', name: 'Paulo André', avatar: 'https://i.pravatar.cc/150?img=3', lastMessage: 'Show, até amanhã!', time: 'Dom', unread: 0, online: false, isGroup: false },
];

export default function MessagesScreen() {
  const navigation = useNavigation<Nav>();
  const [query, setQuery] = useState('');

  const filtered = query.trim()
    ? CONVERSATIONS.filter(c => c.name.toLowerCase().includes(query.toLowerCase()))
    : CONVERSATIONS;

  const renderItem = ({ item }: { item: Conversation }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('ConversationDetail', { id: item.id, name: item.name, avatar: item.avatar })}
      activeOpacity={0.7}
    >
      <View style={styles.avatarWrap}>
        <Avatar.Image size={52} source={{ uri: item.avatar }} />
        {item.isGroup && (
          <View style={styles.groupBadge}>
            <Icon name="account-group" size={10} color={Colors.white} />
          </View>
        )}
        {item.online && !item.isGroup && <View style={styles.onlineDot} />}
      </View>
      <View style={styles.body}>
        <View style={styles.bodyTop}>
          <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
          <Text style={[styles.time, item.unread > 0 && styles.timeUnread]}>{item.time}</Text>
        </View>
        <View style={styles.bodyBottom}>
          <Text
            style={[styles.lastMsg, item.unread > 0 && styles.lastMsgUnread]}
            numberOfLines={1}
          >
            {item.lastMessage}
          </Text>
          {item.unread > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.unread > 9 ? '9+' : item.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Icon name="magnify" size={20} color={Colors.textDisabled} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar conversa..."
            placeholderTextColor={Colors.textDisabled}
            value={query}
            onChangeText={setQuery}
            returnKeyType="search"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Icon name="close-circle" size={18} color={Colors.textDisabled} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={styles.newChatBtn}>
          <Icon name="pencil-plus-outline" size={22} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Icon name="message-off-outline" size={48} color={Colors.textDisabled} />
            <Text style={styles.emptyText}>Nenhuma conversa encontrada</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    gap: Spacing.sm,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceVariant,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.md,
    height: 40,
  },
  searchIcon: { marginRight: Spacing.xs },
  searchInput: {
    flex: 1,
    ...Typography.body2,
    color: Colors.textPrimary,
    paddingVertical: 0,
  },
  newChatBtn: {
    width: 40,
    height: 40,
    borderRadius: Radius.full,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
  },
  avatarWrap: { position: 'relative', marginRight: Spacing.md },
  onlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.success,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  groupBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.white,
  },
  body: { flex: 1 },
  bodyTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  name: { ...Typography.label, color: Colors.textPrimary, flex: 1, marginRight: Spacing.sm },
  time: { ...Typography.caption, color: Colors.textDisabled },
  timeUnread: { color: Colors.primary, fontWeight: '600' },
  bodyBottom: { flexDirection: 'row', alignItems: 'center' },
  lastMsg: { ...Typography.body2, color: Colors.textSecondary, flex: 1 },
  lastMsgUnread: { color: Colors.textPrimary, fontWeight: '500' },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    marginLeft: Spacing.sm,
  },
  badgeText: { fontSize: 11, fontWeight: '700', color: Colors.white },
  separator: { height: 1, backgroundColor: Colors.divider, marginLeft: 72 + Spacing.md },
  empty: { alignItems: 'center', paddingTop: 80 },
  emptyText: { ...Typography.body1, color: Colors.textDisabled, marginTop: Spacing.md },
});

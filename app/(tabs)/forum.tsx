import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { ForumStackParamList } from '~/navigation/types';
import { Colors, Spacing, Typography, Radius, Shadows } from '~/theme/theme';

type Nav = NativeStackNavigationProp<ForumStackParamList>;

type FilterType = 'em-alta' | 'recentes' | 'professor' | 'seguindo';

type TopicAuthor = {
  name: string;
  avatar: string;
  isTeacher: boolean;
};

type Topic = {
  id: string;
  title: string;
  preview: string;
  subject: string;
  subjectColor: string;
  author: TopicAuthor;
  timeAgo: string;
  replies: number;
  likes: number;
  views: number;
  isPinned?: boolean;
  isHot?: boolean;
  tags: string[];
};

const TOPICS: Topic[] = [
  {
    id: '1',
    title: 'Como a Revolução Industrial transformou as relações de trabalho até hoje?',
    preview: 'Pessoal, estudando para o ENEM percebi que esse tema aparece muito. Alguém consegue traçar um paralelo com a situação atual do mercado de trabalho?',
    subject: 'História',
    subjectColor: Colors.warning,
    author: { name: 'Prof. Carlos Mendes', avatar: 'https://i.pravatar.cc/150?img=11', isTeacher: true },
    timeAgo: 'há 2h',
    replies: 34,
    likes: 87,
    views: 412,
    isPinned: true,
    isHot: true,
    tags: ['ENEM', 'Atualidades'],
  },
  {
    id: '2',
    title: 'Dúvida: Diferença entre função exponencial e logarítmica',
    preview: 'Sempre confundo os gráficos dessas duas funções. Alguém pode me ajudar com uma explicação visual?',
    subject: 'Matemática',
    subjectColor: Colors.primary,
    author: { name: 'Ana Beatriz', avatar: 'https://i.pravatar.cc/150?img=5', isTeacher: false },
    timeAgo: 'há 4h',
    replies: 18,
    likes: 42,
    views: 198,
    isHot: true,
    tags: ['Funções', 'Dúvida'],
  },
  {
    id: '3',
    title: 'Interpretação de textos: estratégias que realmente funcionam',
    preview: 'Vou compartilhar as técnicas que me ajudaram a melhorar 40 pontos em interpretação. Quero saber o que vocês usam também!',
    subject: 'Português',
    subjectColor: '#6A1B9A',
    author: { name: 'Profa. Renata Lima', avatar: 'https://i.pravatar.cc/150?img=9', isTeacher: true },
    timeAgo: 'há 6h',
    replies: 51,
    likes: 103,
    views: 876,
    isPinned: true,
    tags: ['Redação', 'Estratégia'],
  },
  {
    id: '4',
    title: 'Mitose vs Meiose — como memorizar de vez?',
    preview: 'Criei um mnemônico que funcionou pra mim. Compartilhem os de vocês também!',
    subject: 'Biologia',
    subjectColor: Colors.success,
    author: { name: 'Lucas Ferreira', avatar: 'https://i.pravatar.cc/150?img=7', isTeacher: false },
    timeAgo: 'há 1d',
    replies: 29,
    likes: 65,
    views: 340,
    tags: ['Célula', 'Memorização'],
  },
  {
    id: '5',
    title: 'Qual a melhor ordem de estudos para o ENEM?',
    preview: 'Semana passada o prof falou sobre essa estratégia. Quero entender a opinião de quem já fez a prova.',
    subject: 'Geral',
    subjectColor: Colors.info,
    author: { name: 'Juliana Costa', avatar: 'https://i.pravatar.cc/150?img=3', isTeacher: false },
    timeAgo: 'há 2d',
    replies: 47,
    likes: 89,
    views: 521,
    isHot: true,
    tags: ['ENEM', 'Planejamento'],
  },
  {
    id: '6',
    title: 'Leis de Newton aplicadas no cotidiano — exemplos práticos',
    preview: 'Trouxe 10 exemplos do dia a dia que ilustram cada lei de Newton. Confiram e adicionem mais!',
    subject: 'Física',
    subjectColor: Colors.info,
    author: { name: 'Prof. Marcos Silva', avatar: 'https://i.pravatar.cc/150?img=15', isTeacher: true },
    timeAgo: 'há 3d',
    replies: 22,
    likes: 58,
    views: 267,
    tags: ['Newton', 'Cotidiano'],
  },
];

const FILTERS: { key: FilterType; label: string; color: string; icon: string }[] = [
  { key: 'em-alta',   label: 'Em Alta',   color: '#E53935', icon: 'fire' },
  { key: 'recentes',  label: 'Recentes',  color: Colors.primary, icon: 'clock-outline' },
  { key: 'professor', label: 'Professor', color: '#7B1FA2', icon: 'school' },
  { key: 'seguindo',  label: 'Seguindo',  color: Colors.success, icon: 'bookmark' },
];


function TopicCard({ topic, onPress }: { topic: Topic; onPress: () => void }) {
  const [liked, setLiked] = useState(false);

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.87} onPress={onPress}>
      {/* cabeçalho do card */}
      <View style={styles.cardHeader}>
        <View style={[styles.subjectPill, { backgroundColor: topic.subjectColor + '18' }]}>
          <View style={[styles.subjectDot, { backgroundColor: topic.subjectColor }]} />
          <Text style={[styles.subjectText, { color: topic.subjectColor }]}>{topic.subject}</Text>
        </View>
        <View style={styles.badges}>
          {topic.isPinned && (
            <View style={styles.pinnedBadge}>
              <Icon name="pin" size={11} color={Colors.primary} />
              <Text style={styles.pinnedText}>Fixado</Text>
            </View>
          )}
          {topic.isHot && (
            <View style={styles.hotBadge}>
              <Icon name="fire" size={11} color={Colors.error} />
              <Text style={styles.hotText}>Em alta</Text>
            </View>
          )}
        </View>
      </View>

      {/* título e preview */}
      <Text style={styles.topicTitle} numberOfLines={2}>{topic.title}</Text>
      <Text style={styles.topicPreview} numberOfLines={2}>{topic.preview}</Text>

      {/* tags */}
      {topic.tags.length > 0 && (
        <View style={styles.tagsRow}>
          {topic.tags.map(tag => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>#{tag}</Text>
            </View>
          ))}
        </View>
      )}

      {/* rodapé: autor + stats */}
      <View style={styles.cardFooter}>
        <View style={styles.authorRow}>
          <Avatar.Image size={24} source={{ uri: topic.author.avatar }} />
          <Text style={styles.authorName} numberOfLines={1}>{topic.author.name}</Text>
          {topic.author.isTeacher && (
            <View style={styles.teacherBadge}>
              <Icon name="school" size={10} color={Colors.white} />
              <Text style={styles.teacherBadgeText}>Prof</Text>
            </View>
          )}
          <Text style={styles.timeAgo}>{topic.timeAgo}</Text>
        </View>
        <View style={styles.statsRow}>
          <TouchableOpacity style={styles.stat} onPress={() => setLiked(v => !v)}>
            <Icon
              name={liked ? 'heart' : 'heart-outline'}
              size={14}
              color={liked ? Colors.error : Colors.textDisabled}
            />
            <Text style={styles.statText}>{topic.likes + (liked ? 1 : 0)}</Text>
          </TouchableOpacity>
          <View style={styles.stat}>
            <Icon name="comment-outline" size={14} color={Colors.textDisabled} />
            <Text style={styles.statText}>{topic.replies}</Text>
          </View>
          <View style={styles.stat}>
            <Icon name="eye-outline" size={14} color={Colors.textDisabled} />
            <Text style={styles.statText}>{topic.views}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function TeacherSpotlight({ topic, onPress }: { topic: Topic; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.spotlight} activeOpacity={0.88} onPress={onPress}>
      <View style={styles.spotlightHeader}>
        <View style={styles.spotlightBadge}>
          <Icon name="school" size={13} color={Colors.white} />
          <Text style={styles.spotlightBadgeText}>Tópico do Professor</Text>
        </View>
        <Icon name="pin" size={16} color={Colors.primary} />
      </View>
      <Text style={styles.spotlightTitle} numberOfLines={2}>{topic.title}</Text>
      <Text style={styles.spotlightPreview} numberOfLines={2}>{topic.preview}</Text>
      <View style={styles.spotlightFooter}>
        <View style={styles.authorRow}>
          <Avatar.Image size={22} source={{ uri: topic.author.avatar }} />
          <Text style={styles.spotlightAuthor}>{topic.author.name}</Text>
        </View>
        <View style={styles.spotlightStats}>
          <Icon name="comment-outline" size={13} color={Colors.primary} />
          <Text style={styles.spotlightStatText}>{topic.replies} respostas</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function ForumScreen() {
  const navigation = useNavigation<Nav>();
  const [filter, setFilter] = useState<FilterType>('em-alta');
  const [search, setSearch] = useState('');

  const pinnedTeacherTopics = TOPICS.filter(t => t.isPinned && t.author.isTeacher);

  const filtered = TOPICS.filter(t => {
    if (filter === 'professor') return t.author.isTeacher;
    if (filter === 'seguindo') return t.isPinned;
    if (filter === 'em-alta') return t.isHot;
    return true;
  }).filter(t =>
    search.length === 0 ||
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {/* barra de busca */}
      <View style={styles.searchBar}>
        <Icon name="magnify" size={20} color={Colors.textDisabled} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar discussões..."
          placeholderTextColor={Colors.textDisabled}
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Icon name="close-circle" size={18} color={Colors.textDisabled} />
          </TouchableOpacity>
        )}
      </View>

      {/* filtros */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ height: 52 }}
        contentContainerStyle={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: Spacing.md,
          paddingVertical: Spacing.sm,
        }}
      >
        {FILTERS.map((f, i) => {
          const isActive = filter === f.key;
          return (
            <TouchableOpacity
              key={f.key}
              onPress={() => setFilter(f.key)}
              activeOpacity={0.8}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 14,
                paddingVertical: 8,
                borderRadius: 100,
                borderWidth: 1.5,
                backgroundColor: isActive ? f.color : f.color + '18',
                borderColor: isActive ? f.color : f.color + '40',
                marginRight: i < FILTERS.length - 1 ? Spacing.sm : 0,
              }}
            >
              <Icon
                name={f.icon}
                size={13}
                color={isActive ? Colors.white : f.color}
              />
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '700',
                  color: isActive ? Colors.white : f.color,
                  marginLeft: 5,
                }}
              >
                {f.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>

        {/* destaque do professor (só quando não está filtrando por busca) */}
        {search.length === 0 && filter !== 'professor' && pinnedTeacherTopics.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Em destaque</Text>
            {pinnedTeacherTopics.map(t => (
              <TeacherSpotlight
                key={t.id}
                topic={t}
                onPress={() => navigation.navigate('ForumDetail', { id: t.id, title: t.title })}
              />
            ))}
          </View>
        )}

        {/* lista de tópicos */}
        <View style={styles.section}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionLabel}>
              {filter === 'professor' ? 'Tópicos dos professores' :
               filter === 'em-alta' ? 'Discussões em alta' :
               filter === 'seguindo' ? 'Que estou seguindo' : 'Mais recentes'}
            </Text>
            <Text style={styles.countText}>{filtered.length} tópicos</Text>
          </View>

          {filtered.length === 0 ? (
            <View style={styles.empty}>
              <Icon name="forum-outline" size={48} color={Colors.textDisabled} />
              <Text style={styles.emptyText}>Nenhum tópico encontrado</Text>
            </View>
          ) : (
            filtered.map(t => (
              <TopicCard
                key={t.id}
                topic={t}
                onPress={() => navigation.navigate('ForumDetail', { id: t.id, title: t.title })}
              />
            ))
          )}
        </View>

      </ScrollView>

      {/* FAB novo tópico */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.85}>
        <Icon name="plus" size={24} color={Colors.white} />
        <Text style={styles.fabText}>Novo tópico</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surfaceVariant },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.md,
    marginTop: Spacing.md,
    marginBottom: Spacing.xs,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    gap: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  searchInput: {
    flex: 1,
    ...Typography.body2,
    color: Colors.textPrimary,
    padding: 0,
  },


  list: { paddingBottom: 100 },

  section: { marginBottom: Spacing.sm },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
  },
  sectionLabel: {
    ...Typography.overline,
    color: Colors.textDisabled,
    textTransform: 'uppercase',
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
  },
  countText: { ...Typography.caption, color: Colors.textDisabled },

  // spotlight do professor
  spotlight: {
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
    backgroundColor: Colors.primaryLight,
    borderRadius: Radius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.primary + '30',
    gap: Spacing.sm,
  },
  spotlightHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  spotlightBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.full,
  },
  spotlightBadgeText: { ...Typography.caption, color: Colors.white, fontWeight: '700' },
  spotlightTitle: { ...Typography.label, color: Colors.primaryDark, fontWeight: '700' },
  spotlightPreview: { ...Typography.body2, color: Colors.textSecondary },
  spotlightFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  spotlightAuthor: { ...Typography.caption, color: Colors.primary, fontWeight: '600' },
  spotlightStats: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  spotlightStatText: { ...Typography.caption, color: Colors.primary },

  // card de tópico
  card: {
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    padding: Spacing.md,
    gap: Spacing.sm,
    ...Shadows.sm,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  subjectPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.full,
  },
  subjectDot: { width: 7, height: 7, borderRadius: 4 },
  subjectText: { ...Typography.caption, fontWeight: '700' },
  badges: { flexDirection: 'row', gap: Spacing.xs },
  pinnedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: Radius.full,
  },
  pinnedText: { ...Typography.caption, color: Colors.primary, fontWeight: '600' },
  hotBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: Colors.errorLight,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: Radius.full,
  },
  hotText: { ...Typography.caption, color: Colors.error, fontWeight: '600' },

  topicTitle: { ...Typography.label, color: Colors.textPrimary },
  topicPreview: { ...Typography.body2, color: Colors.textSecondary },

  tagsRow: { flexDirection: 'row', gap: Spacing.xs, flexWrap: 'wrap' },
  tag: {
    backgroundColor: Colors.surfaceVariant,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Radius.full,
  },
  tagText: { ...Typography.caption, color: Colors.textSecondary },

  cardFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: Spacing.xs },
  authorRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs, flex: 1 },
  authorName: { ...Typography.caption, color: Colors.textSecondary, flex: 1 },
  teacherBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: Colors.primary,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: Radius.full,
  },
  teacherBadgeText: { fontSize: 9, fontWeight: '700', color: Colors.white },
  timeAgo: { ...Typography.caption, color: Colors.textDisabled },
  statsRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  stat: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  statText: { ...Typography.caption, color: Colors.textDisabled },

  empty: { alignItems: 'center', paddingVertical: Spacing.xxl, gap: Spacing.sm },
  emptyText: { ...Typography.body2, color: Colors.textDisabled },

  // FAB
  fab: {
    position: 'absolute',
    right: Spacing.md,
    bottom: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: 14,
    borderRadius: Radius.full,
    ...Shadows.md,
  },
  fabText: { ...Typography.label, color: Colors.white, fontWeight: '700' },
});

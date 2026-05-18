import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { ForumStackParamList } from '~/navigation/types';
import { Colors, Spacing, Typography, Radius, Shadows } from '~/theme/theme';

type RouteP = RouteProp<ForumStackParamList, 'ForumDetail'>;

type Reply = {
  id: string;
  author: string;
  avatar: string;
  isTeacher: boolean;
  text: string;
  timeAgo: string;
  likes: number;
};

const ORIGINAL_POST = {
  author: 'Prof. Carlos Mendes',
  avatar: 'https://i.pravatar.cc/150?img=11',
  isTeacher: true,
  timeAgo: 'há 2h',
  subject: 'História',
  subjectColor: Colors.warning,
  views: 412,
  content: `A Revolução Industrial (séc. XVIII–XIX) transformou radicalmente as relações de trabalho: surgiu o proletariado urbano, a jornada de trabalho passou a ser controlada pelo relógio (e não pelo sol), e o trabalho infantil tornou-se sistêmico.

Quero propor uma reflexão para a turma: **quais dessas transformações ainda sentimos hoje?**

Pense no trabalho por aplicativo (uberização), no home office monitorado digitalmente, na automação de funções repetitivas... Será que as leis trabalhistas do século XXI realmente romperam com a lógica do século XIX ou apenas a atualizaram?

Compartilhem suas análises! Quem trouxer exemplos concretos (com fontes!) ganha participação extra.`,
  likes: 87,
  tags: ['ENEM', 'Atualidades', 'Trabalho'],
};

const REPLIES: Reply[] = [
  {
    id: '1',
    author: 'Ana Beatriz',
    avatar: 'https://i.pravatar.cc/150?img=5',
    isTeacher: false,
    text: 'Acho que a uberização é o exemplo mais claro! O trabalhador tem "liberdade" mas sem direitos trabalhistas. É quase como os trabalhadores livres da Revolução Industrial que precisavam vender sua força de trabalho sem garantias.',
    timeAgo: 'há 1h',
    likes: 24,
  },
  {
    id: '2',
    author: 'Pedro Alves',
    avatar: 'https://i.pravatar.cc/150?img=8',
    isTeacher: false,
    text: 'Li um artigo da FGV que mostra que a jornada média de trabalho no Brasil ainda é uma das maiores do mundo. Colocando isso no contexto que o prof falou, parece que a lógica do "tempo é dinheiro" do séc. XIX persiste.',
    timeAgo: 'há 58min',
    likes: 18,
  },
  {
    id: '3',
    author: 'Profa. Renata Lima',
    avatar: 'https://i.pravatar.cc/150?img=9',
    isTeacher: true,
    text: 'Ótima análise Ana e Pedro! Para complementar: a Consolidação das Leis do Trabalho (CLT) de 1943 foi uma tentativa de ruptura, mas a reforma trabalhista de 2017 flexibilizou muito. Isso é argumento de ouro para a redação do ENEM quando o tema é trabalho e tecnologia.',
    timeAgo: 'há 45min',
    likes: 41,
  },
  {
    id: '4',
    author: 'Lucas Ferreira',
    avatar: 'https://i.pravatar.cc/150?img=7',
    isTeacher: false,
    text: 'Mas e a automação? Lembro que o ENEM 2023 trouxe um texto sobre isso. A IA vai eliminar empregos assim como as máquinas a vapor fizeram com os artesãos?',
    timeAgo: 'há 30min',
    likes: 15,
  },
  {
    id: '5',
    author: 'Prof. Carlos Mendes',
    avatar: 'https://i.pravatar.cc/150?img=11',
    isTeacher: true,
    text: 'Excelente questão Lucas! Isso é exatamente o tipo de conexão interdisciplinar que o ENEM exige. Dica: pesquisem o conceito de "desemprego estrutural" — é a chave para responder isso. Quem trouxer uma análise sobre isso na próxima aula recebe 0,5 de bônus!',
    timeAgo: 'há 15min',
    likes: 67,
  },
];

function ReplyCard({ reply, onLike }: { reply: Reply; onLike: (id: string) => void }) {
  return (
    <View style={[styles.replyCard, reply.isTeacher && styles.replyCardTeacher]}>
      <View style={styles.replyHeader}>
        <Avatar.Image size={36} source={{ uri: reply.avatar }} />
        <View style={styles.replyAuthorInfo}>
          <View style={styles.replyAuthorRow}>
            <Text style={styles.replyAuthorName}>{reply.author}</Text>
            {reply.isTeacher && (
              <View style={styles.teacherBadge}>
                <Icon name="school" size={10} color={Colors.white} />
                <Text style={styles.teacherBadgeText}>Professor</Text>
              </View>
            )}
          </View>
          <Text style={styles.replyTime}>{reply.timeAgo}</Text>
        </View>
      </View>
      <Text style={styles.replyText}>{reply.text}</Text>
      <View style={styles.replyActions}>
        <TouchableOpacity style={styles.replyAction} onPress={() => onLike(reply.id)}>
          <Icon name="heart-outline" size={15} color={Colors.textDisabled} />
          <Text style={styles.replyActionText}>{reply.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.replyAction}>
          <Icon name="reply-outline" size={15} color={Colors.textDisabled} />
          <Text style={styles.replyActionText}>Responder</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function ForumDetailScreen() {
  const route = useRoute<RouteP>();
  const [replies, setReplies] = useState<Reply[]>(REPLIES);
  const [postLiked, setPostLiked] = useState(false);
  const [replyText, setReplyText] = useState('');
  const scrollRef = useRef<ScrollView>(null);

  const handleLike = (id: string) => {
    setReplies(prev =>
      prev.map(r => r.id === id ? { ...r, likes: r.likes + 1 } : r)
    );
  };

  const handleSendReply = () => {
    if (replyText.trim().length === 0) return;
    const newReply: Reply = {
      id: String(Date.now()),
      author: 'Você',
      avatar: 'https://i.pravatar.cc/150',
      isTeacher: false,
      text: replyText.trim(),
      timeAgo: 'agora',
      likes: 0,
    };
    setReplies(prev => [...prev, newReply]);
    setReplyText('');
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* post original */}
          <View style={styles.originalPost}>
            {/* disciplina */}
            <View style={[styles.subjectPill, { backgroundColor: ORIGINAL_POST.subjectColor + '20' }]}>
              <View style={[styles.subjectDot, { backgroundColor: ORIGINAL_POST.subjectColor }]} />
              <Text style={[styles.subjectText, { color: ORIGINAL_POST.subjectColor }]}>
                {ORIGINAL_POST.subject}
              </Text>
            </View>

            {/* título */}
            <Text style={styles.postTitle}>{route.params.title}</Text>

            {/* autor */}
            <View style={styles.postAuthorRow}>
              <Avatar.Image size={40} source={{ uri: ORIGINAL_POST.avatar }} />
              <View style={{ flex: 1 }}>
                <View style={styles.authorNameRow}>
                  <Text style={styles.postAuthorName}>{ORIGINAL_POST.author}</Text>
                  <View style={styles.teacherBadge}>
                    <Icon name="school" size={10} color={Colors.white} />
                    <Text style={styles.teacherBadgeText}>Professor</Text>
                  </View>
                </View>
                <View style={styles.postMeta}>
                  <Icon name="clock-outline" size={12} color={Colors.textDisabled} />
                  <Text style={styles.postMetaText}>{ORIGINAL_POST.timeAgo}</Text>
                  <Text style={styles.postMetaDot}>·</Text>
                  <Icon name="eye-outline" size={12} color={Colors.textDisabled} />
                  <Text style={styles.postMetaText}>{ORIGINAL_POST.views} visualizações</Text>
                </View>
              </View>
            </View>

            {/* conteúdo */}
            <Text style={styles.postContent}>{ORIGINAL_POST.content}</Text>

            {/* tags */}
            <View style={styles.tagsRow}>
              {ORIGINAL_POST.tags.map(tag => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>#{tag}</Text>
                </View>
              ))}
            </View>

            {/* ações */}
            <View style={styles.postActions}>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => setPostLiked(v => !v)}
              >
                <Icon
                  name={postLiked ? 'heart' : 'heart-outline'}
                  size={18}
                  color={postLiked ? Colors.error : Colors.textSecondary}
                />
                <Text style={[styles.actionText, postLiked && { color: Colors.error }]}>
                  {ORIGINAL_POST.likes + (postLiked ? 1 : 0)} curtidas
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}>
                <Icon name="share-outline" size={18} color={Colors.textSecondary} />
                <Text style={styles.actionText}>Compartilhar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}>
                <Icon name="bookmark-outline" size={18} color={Colors.textSecondary} />
                <Text style={styles.actionText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* separador respostas */}
          <View style={styles.repliesHeader}>
            <Text style={styles.repliesTitle}>{replies.length} respostas</Text>
            <TouchableOpacity style={styles.sortBtn}>
              <Icon name="sort" size={15} color={Colors.textSecondary} />
              <Text style={styles.sortText}>Mais curtidas</Text>
            </TouchableOpacity>
          </View>

          {/* respostas */}
          {replies.map(r => (
            <ReplyCard key={r.id} reply={r} onLike={handleLike} />
          ))}

          <View style={{ height: Spacing.xl }} />
        </ScrollView>

        {/* campo de resposta */}
        <View style={styles.replyBar}>
          <Avatar.Image size={34} source={{ uri: 'https://i.pravatar.cc/150' }} />
          <TextInput
            style={styles.replyInput}
            placeholder="Escreva sua resposta..."
            placeholderTextColor={Colors.textDisabled}
            value={replyText}
            onChangeText={setReplyText}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[styles.sendBtn, replyText.trim().length === 0 && styles.sendBtnDisabled]}
            onPress={handleSendReply}
            disabled={replyText.trim().length === 0}
          >
            <Icon name="send" size={18} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surfaceVariant },
  scrollContent: { paddingBottom: Spacing.md },

  // post original
  originalPost: {
    backgroundColor: Colors.white,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    gap: Spacing.sm,
  },
  subjectPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.full,
    alignSelf: 'flex-start',
  },
  subjectDot: { width: 7, height: 7, borderRadius: 4 },
  subjectText: { ...Typography.caption, fontWeight: '700' },
  postTitle: { ...Typography.h3, color: Colors.textPrimary },
  postAuthorRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  authorNameRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs },
  postAuthorName: { ...Typography.label, color: Colors.textPrimary },
  teacherBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: Colors.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: Radius.full,
  },
  teacherBadgeText: { fontSize: 9, fontWeight: '700', color: Colors.white },
  postMeta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  postMetaText: { ...Typography.caption, color: Colors.textDisabled },
  postMetaDot: { ...Typography.caption, color: Colors.textDisabled },
  postContent: { ...Typography.body1, color: Colors.textPrimary, lineHeight: 24 },
  tagsRow: { flexDirection: 'row', gap: Spacing.xs, flexWrap: 'wrap' },
  tag: {
    backgroundColor: Colors.surfaceVariant,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Radius.full,
  },
  tagText: { ...Typography.caption, color: Colors.textSecondary },
  postActions: {
    flexDirection: 'row',
    gap: Spacing.md,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  actionText: { ...Typography.caption, color: Colors.textSecondary },

  // separador respostas
  repliesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  repliesTitle: { ...Typography.label, color: Colors.textPrimary },
  sortBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  sortText: { ...Typography.caption, color: Colors.textSecondary },

  // card de resposta
  replyCard: {
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
    borderRadius: Radius.md,
    padding: Spacing.md,
    gap: Spacing.sm,
    ...Shadows.sm,
  },
  replyCardTeacher: {
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
  },
  replyHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm },
  replyAuthorInfo: { flex: 1 },
  replyAuthorRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs },
  replyAuthorName: { ...Typography.label, color: Colors.textPrimary },
  replyTime: { ...Typography.caption, color: Colors.textDisabled, marginTop: 2 },
  replyText: { ...Typography.body2, color: Colors.textPrimary, lineHeight: 20 },
  replyActions: { flexDirection: 'row', gap: Spacing.md, paddingTop: Spacing.xs },
  replyAction: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  replyActionText: { ...Typography.caption, color: Colors.textDisabled },

  // barra de resposta
  replyBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.sm,
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },
  replyInput: {
    flex: 1,
    ...Typography.body2,
    color: Colors.textPrimary,
    backgroundColor: Colors.surfaceVariant,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    maxHeight: 100,
  },
  sendBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendBtnDisabled: { backgroundColor: Colors.textDisabled },
});

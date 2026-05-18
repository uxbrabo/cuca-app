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

type ArenaTab = 'ranking' | 'quizzes' | 'simulado';

type RankingPlayer = {
  id: string;
  name: string;
  avatar: string;
  xp: number;
  position: number;
};

type Quiz = {
  id: string;
  title: string;
  subject: string;
  questions: number;
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
  subjectColor: string;
  icon: string;
  completed: boolean;
  score?: number;
};

type Simulado = {
  id: string;
  title: string;
  year?: number;
  questions: number;
  duration: string;
  subjects: string[];
  taken: boolean;
  score?: number;
};

const RANKING: RankingPlayer[] = [
  { id: '1', name: 'Maria Eduarda', avatar: 'https://i.pravatar.cc/150?img=1', xp: 4833, position: 1 },
  { id: '2', name: 'Você (João)', avatar: 'https://i.pravatar.cc/150?img=5', xp: 4203, position: 2 },
  { id: '3', name: 'Paulo André', avatar: 'https://i.pravatar.cc/150?img=3', xp: 3933, position: 3 },
  { id: '4', name: 'Ana Clara', avatar: 'https://i.pravatar.cc/150?img=4', xp: 3720, position: 4 },
  { id: '5', name: 'Lucas Brabo', avatar: 'https://i.pravatar.cc/150?img=6', xp: 3510, position: 5 },
];

const QUIZZES: Quiz[] = [
  { id: '1', title: 'Funções do 2º Grau', subject: 'Matemática', questions: 10, difficulty: 'Médio', subjectColor: Colors.primary, icon: 'calculator-variant', completed: true, score: 90 },
  { id: '2', title: 'Leis de Newton', subject: 'Física', questions: 8, difficulty: 'Difícil', subjectColor: Colors.info, icon: 'atom', completed: false },
  { id: '3', title: 'Literatura Brasileira', subject: 'Português', questions: 12, difficulty: 'Fácil', subjectColor: '#7B1FA2', icon: 'book-open-variant', completed: true, score: 75 },
  { id: '4', title: 'Reações Químicas', subject: 'Química', questions: 10, difficulty: 'Médio', subjectColor: '#AD1457', icon: 'flask-outline', completed: false },
  { id: '5', title: 'Segunda Guerra Mundial', subject: 'História', questions: 15, difficulty: 'Fácil', subjectColor: Colors.warning, icon: 'bank', completed: false },
];

const SIMULADOS: Simulado[] = [
  {
    id: '1', title: 'Simulado ENEM 2024', year: 2024,
    questions: 45, duration: '3h30', subjects: ['Mat', 'Port', 'Hist', 'Geo', 'Bio'],
    taken: true, score: 72,
  },
  {
    id: '2', title: 'Simulado ENEM 2023', year: 2023,
    questions: 45, duration: '3h30', subjects: ['Mat', 'Fís', 'Quím', 'Port', 'Hist'],
    taken: true, score: 65,
  },
  {
    id: '3', title: 'Simulado Vestibular USP',
    questions: 30, duration: '2h00', subjects: ['Mat', 'Port', 'Fís', 'Quím'],
    taken: false,
  },
  {
    id: '4', title: 'Simulado Temático — Ciências da Natureza',
    questions: 20, duration: '1h20', subjects: ['Fís', 'Quím', 'Bio'],
    taken: false,
  },
  {
    id: '5', title: 'Simulado Temático — Ciências Humanas',
    questions: 20, duration: '1h20', subjects: ['Hist', 'Geo', 'Fil', 'Soc'],
    taken: false,
  },
];

const DIFFICULTY_COLORS = {
  Fácil: Colors.success,
  Médio: Colors.warning,
  Difícil: Colors.error,
};

const MEDAL_COLORS = ['#FFD700', '#C0C0C0', '#CD7F32'];

function PodiumCard({ player }: { player: RankingPlayer }) {
  const isTop3 = player.position <= 3;
  return (
    <View style={[styles.rankRow, player.name.includes('Você') && styles.rankRowMe]}>
      <View style={styles.rankPos}>
        {isTop3 ? (
          <Icon name="medal" size={22} color={MEDAL_COLORS[player.position - 1]} />
        ) : (
          <Text style={styles.rankPosText}>{player.position}</Text>
        )}
      </View>
      <Avatar.Image size={40} source={{ uri: player.avatar }} />
      <Text style={[styles.rankName, player.name.includes('Você') && styles.rankNameMe]} numberOfLines={1}>
        {player.name}
      </Text>
      <View style={styles.rankXpWrap}>
        <Icon name="star-circle" size={14} color={Colors.warning} />
        <Text style={styles.rankXp}>{player.xp.toLocaleString('pt-BR')} XP</Text>
      </View>
    </View>
  );
}

function QuizCard({ item }: { item: Quiz }) {
  return (
    <TouchableOpacity
      style={styles.quizCard}
      activeOpacity={0.85}
      onPress={() => Alert.alert('Quiz', `Iniciando: ${item.title}`)}
    >
      <View style={[styles.quizIconWrap, { backgroundColor: item.subjectColor + '22' }]}>
        <Icon name={item.icon} size={28} color={item.subjectColor} />
      </View>
      <View style={styles.quizBody}>
        <Text style={[styles.quizSubject, { color: item.subjectColor }]}>{item.subject}</Text>
        <Text style={styles.quizTitle} numberOfLines={1}>{item.title}</Text>
        <View style={styles.quizMeta}>
          <Icon name="frequently-asked-questions" size={13} color={Colors.textDisabled} />
          <Text style={styles.quizMetaText}>{item.questions} questões</Text>
          <View style={[styles.diffPill, { backgroundColor: DIFFICULTY_COLORS[item.difficulty] + '22' }]}>
            <Text style={[styles.diffText, { color: DIFFICULTY_COLORS[item.difficulty] }]}>{item.difficulty}</Text>
          </View>
        </View>
      </View>
      {item.completed ? (
        <View style={styles.scoreWrap}>
          <Text style={styles.scoreValue}>{item.score}%</Text>
          <Icon name="check-circle" size={16} color={Colors.success} />
        </View>
      ) : (
        <View style={styles.playBtn}>
          <Icon name="play" size={18} color={Colors.white} />
        </View>
      )}
    </TouchableOpacity>
  );
}

function SimuladoCard({ item }: { item: Simulado }) {
  return (
    <TouchableOpacity
      style={styles.simuladoCard}
      activeOpacity={0.85}
      onPress={() => Alert.alert(item.title, item.taken ? `Sua nota: ${item.score}%\nQuestões: ${item.questions}\nDuração: ${item.duration}` : `Questões: ${item.questions}\nDuração estimada: ${item.duration}\n\nPronto para começar?`)}
    >
      <View style={styles.simuladoHeader}>
        <View style={styles.simuladoIconWrap}>
          <Icon name="file-document-edit-outline" size={26} color={item.taken ? Colors.success : Colors.primary} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.simuladoTitle}>{item.title}</Text>
          <View style={styles.simuladoMeta}>
            <Icon name="clock-outline" size={12} color={Colors.textDisabled} />
            <Text style={styles.simuladoMetaText}>{item.duration}</Text>
            <Icon name="frequently-asked-questions" size={12} color={Colors.textDisabled} />
            <Text style={styles.simuladoMetaText}>{item.questions} questões</Text>
          </View>
        </View>
        {item.taken ? (
          <View style={styles.simuladoScoreWrap}>
            <Text style={[styles.simuladoScore, { color: item.score! >= 70 ? Colors.success : Colors.warning }]}>
              {item.score}%
            </Text>
            <Icon name="check-decagram" size={16} color={Colors.success} />
          </View>
        ) : (
          <View style={styles.startSimBtn}>
            <Text style={styles.startSimText}>Iniciar</Text>
          </View>
        )}
      </View>
      <View style={styles.subjectTags}>
        {item.subjects.map((s, i) => (
          <View key={i} style={styles.subjectTag}>
            <Text style={styles.subjectTagText}>{s}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
}

export default function QuizArenaScreen() {
  const [tab, setTab] = useState<ArenaTab>('ranking');
  const myRank = RANKING.find(p => p.name.includes('Você'));

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabBtn, tab === 'ranking' && styles.tabBtnActive]}
          onPress={() => setTab('ranking')}
        >
          <Icon name="trophy-outline" size={18} color={tab === 'ranking' ? Colors.primary : Colors.textSecondary} />
          <Text style={[styles.tabBtnText, tab === 'ranking' && styles.tabBtnTextActive]}>Ranking</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabBtn, tab === 'quizzes' && styles.tabBtnActive]}
          onPress={() => setTab('quizzes')}
        >
          <Icon name="lightning-bolt-outline" size={18} color={tab === 'quizzes' ? Colors.primary : Colors.textSecondary} />
          <Text style={[styles.tabBtnText, tab === 'quizzes' && styles.tabBtnTextActive]}>Quizzes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabBtn, tab === 'simulado' && styles.tabBtnActive]}
          onPress={() => setTab('simulado')}
        >
          <Icon name="file-document-edit-outline" size={18} color={tab === 'simulado' ? Colors.primary : Colors.textSecondary} />
          <Text style={[styles.tabBtnText, tab === 'simulado' && styles.tabBtnTextActive]}>Simulado</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {tab === 'ranking' && (
          <>
            {myRank && (
              <View style={styles.myRankBanner}>
                <Icon name="account-star" size={20} color={Colors.primary} />
                <Text style={styles.myRankText}>
                  Você está em <Text style={styles.myRankPos}>#{myRank.position}º lugar</Text> com {myRank.xp.toLocaleString('pt-BR')} XP
                </Text>
              </View>
            )}
            <Text style={styles.sectionLabel}>Top jogadores</Text>
            <View style={styles.rankCard}>
              {RANKING.map((p, i) => (
                <React.Fragment key={p.id}>
                  <PodiumCard player={p} />
                  {i < RANKING.length - 1 && <View style={styles.rankDivider} />}
                </React.Fragment>
              ))}
            </View>
          </>
        )}

        {tab === 'quizzes' && (
          <>
            <Text style={styles.sectionLabel}>Quizzes disponíveis</Text>
            {QUIZZES.map(q => <QuizCard key={q.id} item={q} />)}
          </>
        )}

        {tab === 'simulado' && (
          <>
            <View style={styles.simuladoBanner}>
              <Icon name="clock-time-eight-outline" size={28} color={Colors.primary} />
              <View style={{ flex: 1 }}>
                <Text style={styles.simuladoBannerTitle}>Modo Simulado</Text>
                <Text style={styles.simuladoBannerSub}>Treine com provas no estilo ENEM e vestibulares. Cronometrado e corrigido automaticamente.</Text>
              </View>
            </View>
            <Text style={styles.sectionLabel}>Simulados disponíveis</Text>
            {SIMULADOS.map(s => <SimuladoCard key={s.id} item={s} />)}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surfaceVariant },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  tabBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    gap: Spacing.xs,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabBtnActive: { borderBottomColor: Colors.primary },
  tabBtnText: { ...Typography.label, color: Colors.textSecondary, fontSize: 13 },
  tabBtnTextActive: { color: Colors.primary },
  scroll: { padding: Spacing.md, paddingBottom: Spacing.xl, gap: Spacing.sm },
  myRankBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.primaryLight,
    borderRadius: Radius.md,
    padding: Spacing.md,
  },
  myRankText: { ...Typography.body2, color: Colors.textPrimary, flex: 1 },
  myRankPos: { ...Typography.label, color: Colors.primary },
  sectionLabel: { ...Typography.overline, color: Colors.textSecondary, textTransform: 'uppercase' },
  rankCard: { backgroundColor: Colors.white, borderRadius: Radius.md, overflow: 'hidden', ...Shadows.sm },
  rankRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
  },
  rankRowMe: { backgroundColor: Colors.primaryLight },
  rankPos: { width: 28, alignItems: 'center' },
  rankPosText: { ...Typography.label, color: Colors.textSecondary },
  rankName: { ...Typography.body2, color: Colors.textPrimary, flex: 1 },
  rankNameMe: { fontWeight: '600', color: Colors.primary },
  rankXpWrap: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  rankXp: { ...Typography.caption, color: Colors.textSecondary, fontWeight: '600' },
  rankDivider: { height: 1, backgroundColor: Colors.divider, marginLeft: Spacing.md + 28 + Spacing.md + 40 },
  quizCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    ...Shadows.sm,
  },
  quizIconWrap: {
    width: 52, height: 52, borderRadius: Radius.md,
    justifyContent: 'center', alignItems: 'center',
  },
  quizBody: { flex: 1 },
  quizSubject: { ...Typography.caption, fontWeight: '700' },
  quizTitle: { ...Typography.label, color: Colors.textPrimary, marginBottom: 4 },
  quizMeta: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs },
  quizMetaText: { ...Typography.caption, color: Colors.textDisabled },
  diffPill: { paddingHorizontal: Spacing.xs + 2, paddingVertical: 2, borderRadius: Radius.full },
  diffText: { fontSize: 11, fontWeight: '600' },
  scoreWrap: { alignItems: 'center', gap: 2 },
  scoreValue: { ...Typography.label, color: Colors.success },
  playBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: Colors.primary,
    justifyContent: 'center', alignItems: 'center',
  },

  simuladoBanner: {
    backgroundColor: Colors.primaryLight,
    borderRadius: Radius.md,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  simuladoBannerTitle: { ...Typography.h4, color: Colors.textPrimary },
  simuladoBannerSub: { ...Typography.caption, color: Colors.textSecondary, lineHeight: 16, marginTop: 2 },

  simuladoCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    padding: Spacing.md,
    gap: Spacing.sm,
    ...Shadows.sm,
  },
  simuladoHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  simuladoIconWrap: {
    width: 48, height: 48, borderRadius: Radius.md,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center', alignItems: 'center',
    flexShrink: 0,
  },
  simuladoTitle: { ...Typography.label, color: Colors.textPrimary, marginBottom: 4 },
  simuladoMeta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  simuladoMetaText: { ...Typography.caption, color: Colors.textDisabled, marginRight: 4 },
  simuladoScoreWrap: { alignItems: 'center', gap: 2 },
  simuladoScore: { ...Typography.label, fontWeight: '700' },
  startSimBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: Radius.full,
  },
  startSimText: { ...Typography.caption, color: Colors.white, fontWeight: '700' },
  subjectTags: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.xs },
  subjectTag: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Radius.full,
  },
  subjectTagText: { ...Typography.caption, color: Colors.primary, fontWeight: '600' },
});

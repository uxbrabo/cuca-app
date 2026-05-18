import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Spacing, Typography, Radius, Shadows } from '~/theme/theme';

type NodeStatus = 'completed' | 'current' | 'locked';
type NodeType = 'video' | 'artigo' | 'quiz' | 'desafio' | 'conquista';

type TrailNode = {
  id: string;
  type: NodeType;
  title: string;
  description: string;
  subject: string;
  subjectColor: string;
  xpReward: number;
  status: NodeStatus;
  estimatedTime: string;
  isMilestone?: boolean;
};

const TYPE_ICON: Record<NodeType, string> = {
  video: 'play-circle-outline',
  artigo: 'file-document-outline',
  quiz: 'frequently-asked-questions',
  desafio: 'lightning-bolt',
  conquista: 'trophy',
};

const TYPE_LABEL: Record<NodeType, string> = {
  video: 'Vídeo aula',
  artigo: 'Leitura',
  quiz: 'Quiz',
  desafio: 'Desafio',
  conquista: 'Conquista',
};

const TRAIL_NODES: TrailNode[] = [
  {
    id: '1', type: 'artigo', status: 'completed',
    title: 'Brasil Colônia: do pau-brasil à crise do açúcar',
    description: 'Linha do tempo completa do período colonial brasileiro.',
    subject: 'História', subjectColor: Colors.warning,
    xpReward: 50, estimatedTime: '8 min',
  },
  {
    id: '2', type: 'quiz', status: 'completed',
    title: 'Quiz: Brasil Colônia',
    description: '10 questões sobre o período colonial.',
    subject: 'História', subjectColor: Colors.warning,
    xpReward: 80, estimatedTime: '10 min',
  },
  {
    id: '3', type: 'video', status: 'current',
    title: 'Expansão Territorial e Capitanias Hereditárias',
    description: 'Entenda como Portugal dividiu e administrou o território brasileiro no séc. XVI.',
    subject: 'História', subjectColor: Colors.warning,
    xpReward: 100, estimatedTime: '28 min',
  },
  {
    id: '4', type: 'quiz', status: 'locked',
    title: 'Quiz: Expansão Territorial',
    description: '8 questões para fixar o conteúdo da aula.',
    subject: 'História', subjectColor: Colors.warning,
    xpReward: 100, estimatedTime: '8 min',
  },
  {
    id: '5', type: 'artigo', status: 'locked',
    title: 'O Período Imperial Brasileiro (1822–1889)',
    description: 'Da Independência à Proclamação da República.',
    subject: 'História', subjectColor: Colors.warning,
    xpReward: 120, estimatedTime: '12 min',
  },
  {
    id: '6', type: 'desafio', status: 'locked',
    title: 'Desafio: Linha do tempo interativa',
    description: 'Ordene os eventos históricos do Império para ganhar XP bônus.',
    subject: 'História', subjectColor: Colors.warning,
    xpReward: 150, estimatedTime: '15 min',
  },
  {
    id: 'm1', type: 'conquista', status: 'locked',
    title: 'Domínio: Brasil Colonial e Imperial',
    description: 'Parabéns! Você concluiu a primeira fase da sua trilha de História.',
    subject: 'História', subjectColor: Colors.warning,
    xpReward: 300, estimatedTime: '', isMilestone: true,
  },
  {
    id: '7', type: 'video', status: 'locked',
    title: 'Era Vargas e o Estado Novo',
    description: 'O período mais controverso da história brasileira do séc. XX.',
    subject: 'História', subjectColor: Colors.warning,
    xpReward: 100, estimatedTime: '35 min',
  },
  {
    id: '8', type: 'artigo', status: 'locked',
    title: 'Brasil na Segunda Guerra Mundial',
    description: 'O papel da Força Expedicionária Brasileira no conflito.',
    subject: 'História', subjectColor: Colors.warning,
    xpReward: 80, estimatedTime: '10 min',
  },
  {
    id: '9', type: 'quiz', status: 'locked',
    title: 'Simulado ENEM: História Moderna',
    description: '15 questões no estilo ENEM com gabarito comentado.',
    subject: 'História', subjectColor: Colors.warning,
    xpReward: 200, estimatedTime: '20 min',
  },
  {
    id: 'm2', type: 'conquista', status: 'locked',
    title: 'Mestre em História do Brasil',
    description: 'Você está pronto para gabaritar História no ENEM!',
    subject: 'História', subjectColor: Colors.warning,
    xpReward: 500, estimatedTime: '', isMilestone: true,
  },
];

const completedCount = TRAIL_NODES.filter(n => n.status === 'completed').length;
const totalXP = TRAIL_NODES.filter(n => n.status === 'completed').reduce((s, n) => s + n.xpReward, 0);
const progress = completedCount / TRAIL_NODES.length;

function PulseRing() {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 1, duration: 900, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0, duration: 900, useNativeDriver: true }),
      ])
    ).start();
  }, []);
  const scale = anim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.35] });
  const opacity = anim.interpolate({ inputRange: [0, 1], outputRange: [0.5, 0] });
  return (
    <Animated.View
      style={[
        styles.pulseRing,
        { transform: [{ scale }], opacity },
      ]}
    />
  );
}

function NodeDetail({ node, visible, onClose }: { node: TrailNode | null; visible: boolean; onClose: () => void }) {
  if (!node) return null;
  const icon = TYPE_ICON[node.type];
  const label = TYPE_LABEL[node.type];
  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackdrop}>
          <TouchableWithoutFeedback>
            <View style={styles.modalCard}>
              <View style={[styles.modalIconWrap, { backgroundColor: node.subjectColor + '22' }]}>
                <Icon name={node.isMilestone ? 'trophy' : icon} size={36} color={node.subjectColor} />
              </View>
              <View style={styles.modalTypePill}>
                <Text style={styles.modalTypeText}>{label}</Text>
              </View>
              <Text style={styles.modalTitle}>{node.title}</Text>
              <Text style={styles.modalDesc}>{node.description}</Text>
              <View style={styles.modalMeta}>
                {node.estimatedTime ? (
                  <View style={styles.metaItem}>
                    <Icon name="clock-outline" size={14} color={Colors.textDisabled} />
                    <Text style={styles.metaText}>{node.estimatedTime}</Text>
                  </View>
                ) : null}
                <View style={styles.metaItem}>
                  <Icon name="star-circle" size={14} color={Colors.warning} />
                  <Text style={styles.metaText}>+{node.xpReward} XP</Text>
                </View>
              </View>
              {node.status === 'current' && (
                <TouchableOpacity style={[styles.startBtn, { backgroundColor: node.subjectColor }]} onPress={onClose}>
                  <Icon name={icon} size={18} color={Colors.white} />
                  <Text style={styles.startBtnText}>Começar agora</Text>
                </TouchableOpacity>
              )}
              {node.status === 'completed' && (
                <View style={styles.completedBanner}>
                  <Icon name="check-circle" size={18} color={Colors.success} />
                  <Text style={styles.completedBannerText}>Conteúdo concluído!</Text>
                </View>
              )}
              {node.status === 'locked' && (
                <View style={styles.lockedBanner}>
                  <Icon name="lock-outline" size={16} color={Colors.textDisabled} />
                  <Text style={styles.lockedBannerText}>Conclua o passo anterior para desbloquear</Text>
                </View>
              )}
              <TouchableOpacity style={styles.closeModalBtn} onPress={onClose}>
                <Text style={styles.closeModalText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

function TrailNodeRow({ node, isLast }: { node: TrailNode; isLast: boolean }) {
  const [selected, setSelected] = useState(false);
  const isCurrent = node.status === 'current';
  const isCompleted = node.status === 'completed';
  const isLocked = node.status === 'locked';

  const nodeColor = isCompleted
    ? Colors.success
    : isCurrent
    ? node.subjectColor
    : Colors.divider;

  const nodeIcon = isCompleted
    ? 'check'
    : isLocked
    ? (node.isMilestone ? 'trophy' : 'lock')
    : TYPE_ICON[node.type];

  return (
    <>
      <TouchableOpacity
        style={styles.nodeRow}
        activeOpacity={0.85}
        onPress={() => setSelected(true)}
      >
        {/* COLUNA ESQUERDA: linha + círculo */}
        <View style={styles.nodeTrack}>
          {isCurrent && <PulseRing />}
          <View style={[
            styles.nodeCircle,
            node.isMilestone && styles.nodeCircleMilestone,
            { backgroundColor: nodeColor, borderColor: isLocked ? Colors.border : nodeColor },
          ]}>
            <Icon
              name={nodeIcon}
              size={node.isMilestone ? 22 : 18}
              color={isLocked ? Colors.textDisabled : Colors.white}
            />
          </View>
          {!isLast && (
            <View style={[
              styles.connector,
              { backgroundColor: isCompleted ? Colors.success : Colors.divider },
            ]} />
          )}
        </View>

        {/* COLUNA DIREITA: card */}
        <View style={[
          styles.nodeCard,
          node.isMilestone && styles.milestoneCard,
          isCurrent && styles.currentCard,
          isCompleted && styles.completedCard,
          isLocked && styles.lockedCard,
        ]}>
          {node.isMilestone ? (
            <View style={styles.milestoneContent}>
              <Text style={styles.milestoneBadge}>🏆 RECOMPENSA</Text>
              <Text style={styles.milestoneTitle}>{node.title}</Text>
              <Text style={styles.milestoneDesc}>{node.description}</Text>
              <View style={styles.milestoneXP}>
                <Icon name="star-circle" size={16} color={Colors.warning} />
                <Text style={styles.milestoneXPText}>+{node.xpReward} XP</Text>
              </View>
            </View>
          ) : (
            <>
              <View style={styles.cardTop}>
                <View style={styles.cardTopLeft}>
                  <Text style={[styles.cardType, { color: isLocked ? Colors.textDisabled : node.subjectColor }]}>
                    {TYPE_LABEL[node.type].toUpperCase()}
                  </Text>
                  <Text style={[styles.cardTitle, isLocked && styles.lockedText]} numberOfLines={2}>
                    {node.title}
                  </Text>
                </View>
                <View style={[styles.xpBadge, { backgroundColor: isLocked ? Colors.surfaceVariant : node.subjectColor + '22' }]}>
                  <Text style={[styles.xpBadgeText, { color: isLocked ? Colors.textDisabled : node.subjectColor }]}>
                    +{node.xpReward} XP
                  </Text>
                </View>
              </View>

              {isCurrent && (
                <>
                  <Text style={styles.cardDesc} numberOfLines={2}>{node.description}</Text>
                  <View style={styles.cardMeta}>
                    {node.estimatedTime ? (
                      <View style={styles.metaItem}>
                        <Icon name="clock-outline" size={12} color={Colors.textDisabled} />
                        <Text style={styles.metaText}>{node.estimatedTime}</Text>
                      </View>
                    ) : null}
                    <View style={styles.metaItem}>
                      <Icon name={TYPE_ICON[node.type]} size={12} color={Colors.textDisabled} />
                      <Text style={styles.metaText}>{TYPE_LABEL[node.type]}</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={[styles.ctaBtn, { backgroundColor: node.subjectColor }]}
                    onPress={() => setSelected(true)}
                  >
                    <Icon name={TYPE_ICON[node.type]} size={16} color={Colors.white} />
                    <Text style={styles.ctaBtnText}>Continuar agora</Text>
                    <Icon name="arrow-right" size={16} color={Colors.white} />
                  </TouchableOpacity>
                </>
              )}

              {isCompleted && (
                <View style={styles.completedRow}>
                  <Icon name="check-circle" size={14} color={Colors.success} />
                  <Text style={styles.completedLabel}>Concluído</Text>
                  {node.estimatedTime ? <Text style={styles.metaText}> · {node.estimatedTime}</Text> : null}
                </View>
              )}
            </>
          )}
        </View>
      </TouchableOpacity>

      <NodeDetail node={node} visible={selected} onClose={() => setSelected(false)} />
    </>
  );
}

export default function LearningTrailScreen() {
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* BANNER IA */}
        <View style={styles.aiBanner}>
          <View style={styles.aiIconWrap}>
            <Icon name="robot-excited-outline" size={28} color={Colors.primary} />
          </View>
          <View style={styles.aiText}>
            <Text style={styles.aiTitle}>Trilha personalizada pela IA</Text>
            <Text style={styles.aiDesc}>
              Analisando seu desempenho, identifiquei que <Text style={styles.aiHighlight}>História</Text> precisa de atenção — você está com 45% de aproveitamento. Esta trilha vai te levar ao domínio completo da matéria, passo a passo.
            </Text>
          </View>
        </View>

        {/* CABEÇALHO DA TRILHA */}
        <View style={styles.trailHeader}>
          <View style={styles.trailHeaderTop}>
            <View>
              <Text style={styles.trailName}>Trilha: História do Brasil</Text>
              <Text style={styles.trailSub}>{completedCount} de {TRAIL_NODES.length} etapas · {totalXP} XP conquistados</Text>
            </View>
            <View style={styles.trailXpBubble}>
              <Icon name="star-circle" size={18} color={Colors.warning} />
              <Text style={styles.trailXpTotal}>{totalXP}</Text>
            </View>
          </View>
          <View style={styles.progressBarOuter}>
            <Animated.View
              style={[
                styles.progressBarInner,
                {
                  width: progressAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }),
                },
              ]}
            />
          </View>
          <Text style={styles.progressLabel}>{Math.round(progress * 100)}% concluído</Text>
        </View>

        {/* PAINEL DE RECOMPENSAS RÁPIDAS */}
        <View style={styles.rewardsRow}>
          <View style={styles.rewardItem}>
            <Icon name="fire" size={22} color={Colors.error} />
            <Text style={styles.rewardValue}>7</Text>
            <Text style={styles.rewardLabel}>Sequência</Text>
          </View>
          <View style={styles.rewardDivider} />
          <View style={styles.rewardItem}>
            <Icon name="trophy-outline" size={22} color={Colors.warning} />
            <Text style={styles.rewardValue}>2</Text>
            <Text style={styles.rewardLabel}>Conquistas</Text>
          </View>
          <View style={styles.rewardDivider} />
          <View style={styles.rewardItem}>
            <Icon name="lightning-bolt" size={22} color={Colors.primary} />
            <Text style={styles.rewardValue}>{totalXP}</Text>
            <Text style={styles.rewardLabel}>XP nesta trilha</Text>
          </View>
        </View>

        {/* TRILHA */}
        <View style={styles.trail}>
          {TRAIL_NODES.map((node, index) => (
            <TrailNodeRow
              key={node.id}
              node={node}
              isLast={index === TRAIL_NODES.length - 1}
            />
          ))}
        </View>

        {/* PRÓXIMA TRILHA SUGERIDA */}
        <View style={styles.nextTrailCard}>
          <Icon name="map-marker-path" size={24} color={Colors.info} />
          <View style={styles.nextTrailText}>
            <Text style={styles.nextTrailTitle}>Próxima trilha sugerida</Text>
            <Text style={styles.nextTrailSub}>Química — Reações e Equações · 11 etapas · 1.250 XP</Text>
          </View>
          <Icon name="lock-outline" size={20} color={Colors.textDisabled} />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surfaceVariant },

  // Banner IA
  aiBanner: {
    flexDirection: 'row',
    backgroundColor: Colors.primaryLight,
    margin: Spacing.md,
    borderRadius: Radius.md,
    padding: Spacing.md,
    gap: Spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  aiIconWrap: {
    width: 44,
    height: 44,
    borderRadius: Radius.full,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  aiText: { flex: 1 },
  aiTitle: { ...Typography.label, color: Colors.primary, marginBottom: 4 },
  aiDesc: { ...Typography.body2, color: Colors.textSecondary, lineHeight: 20 },
  aiHighlight: { fontWeight: '700', color: Colors.primary },

  // Cabeçalho
  trailHeader: {
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.md,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadows.sm,
  },
  trailHeaderTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: Spacing.md },
  trailName: { ...Typography.h4, color: Colors.textPrimary },
  trailSub: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },
  trailXpBubble: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#FFF8E1', paddingHorizontal: Spacing.sm, paddingVertical: 4, borderRadius: Radius.full },
  trailXpTotal: { ...Typography.label, color: Colors.warning },
  progressBarOuter: { height: 10, backgroundColor: Colors.surfaceVariant, borderRadius: Radius.full, overflow: 'hidden', marginBottom: 6 },
  progressBarInner: { height: '100%', backgroundColor: Colors.success, borderRadius: Radius.full },
  progressLabel: { ...Typography.caption, color: Colors.textSecondary },

  // Recompensas
  rewardsRow: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.md,
    borderRadius: Radius.md,
    paddingVertical: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  rewardItem: { flex: 1, alignItems: 'center', gap: 4 },
  rewardValue: { ...Typography.h4, color: Colors.textPrimary },
  rewardLabel: { ...Typography.caption, color: Colors.textSecondary },
  rewardDivider: { width: 1, backgroundColor: Colors.divider },

  // Trilha
  trail: { paddingHorizontal: Spacing.md, paddingBottom: Spacing.lg },
  nodeRow: { flexDirection: 'row', gap: Spacing.md, marginBottom: 0 },

  // Track (linha + círculo)
  nodeTrack: { width: 44, alignItems: 'center', position: 'relative' },
  nodeCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    ...Shadows.sm,
  },
  nodeCircleMilestone: { width: 52, height: 52, borderRadius: 26 },
  pulseRing: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.warning,
    zIndex: 1,
  },
  connector: { width: 3, flex: 1, minHeight: 20, marginTop: 2 },

  // Cards
  nodeCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  currentCard: {
    borderWidth: 2,
    borderColor: Colors.warning,
    ...Shadows.md,
  },
  completedCard: { backgroundColor: Colors.successLight },
  lockedCard: { backgroundColor: Colors.surfaceVariant },
  milestoneCard: {
    backgroundColor: '#FFF8E1',
    borderWidth: 2,
    borderColor: Colors.warning,
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: Spacing.sm },
  cardTopLeft: { flex: 1 },
  cardType: { ...Typography.overline, textTransform: 'uppercase', marginBottom: 2 },
  cardTitle: { ...Typography.label, color: Colors.textPrimary },
  lockedText: { color: Colors.textDisabled },
  xpBadge: { paddingHorizontal: Spacing.sm, paddingVertical: 3, borderRadius: Radius.full },
  xpBadgeText: { fontSize: 11, fontWeight: '700' },
  cardDesc: { ...Typography.body2, color: Colors.textSecondary, marginTop: Spacing.xs },
  cardMeta: { flexDirection: 'row', gap: Spacing.md, marginTop: Spacing.xs },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { ...Typography.caption, color: Colors.textDisabled },
  completedRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  completedLabel: { ...Typography.caption, color: Colors.success, fontWeight: '600' },

  // CTA atual
  ctaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    marginTop: Spacing.sm,
    borderRadius: Radius.md,
    paddingVertical: Spacing.sm,
  },
  ctaBtnText: { ...Typography.label, color: Colors.white },

  // Milestone
  milestoneContent: { alignItems: 'center', paddingVertical: Spacing.xs },
  milestoneBadge: { ...Typography.overline, color: Colors.warning, fontWeight: '700', marginBottom: 4, textTransform: 'uppercase' },
  milestoneTitle: { ...Typography.h4, color: Colors.textPrimary, textAlign: 'center', marginBottom: 4 },
  milestoneDesc: { ...Typography.body2, color: Colors.textSecondary, textAlign: 'center', marginBottom: Spacing.sm },
  milestoneXP: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#FFF8E1', paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs, borderRadius: Radius.full },
  milestoneXPText: { ...Typography.label, color: Colors.warning },

  // Próxima trilha
  nextTrailCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.xl,
    borderRadius: Radius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.divider,
    borderStyle: 'dashed',
  },
  nextTrailText: { flex: 1 },
  nextTrailTitle: { ...Typography.label, color: Colors.textPrimary },
  nextTrailSub: { ...Typography.caption, color: Colors.textSecondary },

  // Modal de detalhe
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    padding: Spacing.lg,
    alignItems: 'center',
    gap: Spacing.sm,
  },
  modalIconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTypePill: {
    backgroundColor: Colors.surfaceVariant,
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  modalTypeText: { ...Typography.caption, color: Colors.textSecondary, fontWeight: '600' },
  modalTitle: { ...Typography.h4, color: Colors.textPrimary, textAlign: 'center' },
  modalDesc: { ...Typography.body2, color: Colors.textSecondary, textAlign: 'center', lineHeight: 20 },
  modalMeta: { flexDirection: 'row', gap: Spacing.lg },
  startBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    width: '100%',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    marginTop: Spacing.sm,
  },
  startBtnText: { ...Typography.label, color: Colors.white },
  completedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.successLight,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.md,
    width: '100%',
    justifyContent: 'center',
  },
  completedBannerText: { ...Typography.label, color: Colors.success },
  lockedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.surfaceVariant,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.md,
    width: '100%',
    justifyContent: 'center',
  },
  lockedBannerText: { ...Typography.body2, color: Colors.textDisabled, textAlign: 'center' },
  closeModalBtn: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xl,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.divider,
    marginTop: Spacing.xs,
  },
  closeModalText: { ...Typography.label, color: Colors.textSecondary },
});

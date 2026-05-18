import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Avatar } from 'react-native-paper';
import { Colors, Spacing, Typography, Radius } from '~/theme/theme';

const RELATED_VIDEOS = [
  { id: '1', title: 'Aula 34 — Função Exponencial', subject: 'Matemática', duration: '28 min', teacher: 'Prof. Silva' },
  { id: '2', title: 'Aula 35 — Logaritmos na prática', subject: 'Matemática', duration: '35 min', teacher: 'Prof. Silva' },
  { id: '3', title: 'Aula 36 — Revisão Álgebra', subject: 'Matemática', duration: '42 min', teacher: 'Prof. Silva' },
];

export default function VideoPlayerScreen() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0.35);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsOpacity = useRef(new Animated.Value(1)).current;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setProgress(p => {
          if (p >= 1) { setPlaying(false); return 1; }
          return p + 0.001;
        });
      }, 100);
      const timeout = setTimeout(() => fadeOutControls(), 2500);
      return () => {
        clearInterval(intervalRef.current!);
        clearTimeout(timeout);
      };
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      fadeInControls();
    }
  }, [playing]);

  const fadeOutControls = () => {
    Animated.timing(controlsOpacity, { toValue: 0, duration: 400, useNativeDriver: true }).start(() => setShowControls(false));
  };

  const fadeInControls = () => {
    setShowControls(true);
    Animated.timing(controlsOpacity, { toValue: 1, duration: 200, useNativeDriver: true }).start();
  };

  const togglePlay = () => setPlaying(v => !v);

  const handlePlayerTap = () => {
    if (!showControls) {
      fadeInControls();
      if (playing) setTimeout(() => fadeOutControls(), 2500);
    }
  };

  const formatTime = (ratio: number) => {
    const totalSecs = Math.floor(ratio * 1932); // ~32 min
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {/* PLAYER */}
      <TouchableOpacity activeOpacity={1} style={styles.player} onPress={handlePlayerTap}>
        <View style={styles.playerBg}>
          <Icon name="play-box-outline" size={80} color={`${Colors.primary}44`} />
        </View>

        <Animated.View style={[styles.controls, { opacity: controlsOpacity }]}>
          {/* Barra do topo */}
          <View style={styles.topBar}>
            <Text style={styles.playerTitle} numberOfLines={1}>Aula 33 — Algoritmo e Álgebra</Text>
          </View>

          {/* Controles centrais */}
          <View style={styles.centerControls}>
            <TouchableOpacity onPress={() => setProgress(p => Math.max(0, p - 0.05))}>
              <Icon name="rewind-10" size={36} color={Colors.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.playBtn} onPress={togglePlay}>
              <Icon name={playing ? 'pause' : 'play'} size={40} color={Colors.white} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setProgress(p => Math.min(1, p + 0.05))}>
              <Icon name="fast-forward-10" size={36} color={Colors.white} />
            </TouchableOpacity>
          </View>

          {/* Barra de progresso */}
          <View style={styles.progressSection}>
            <Text style={styles.timeText}>{formatTime(progress)}</Text>
            <TouchableOpacity
              style={styles.progressBarWrap}
              onPress={(e) => {
                const { locationX, target } = e.nativeEvent;
              }}
            >
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: `${progress * 100}%` as any }]} />
                <View style={[styles.progressDot, { left: `${progress * 100}%` as any }]} />
              </View>
            </TouchableOpacity>
            <Text style={styles.timeText}>32:12</Text>
          </View>

          {/* Barra inferior */}
          <View style={styles.bottomBar}>
            <TouchableOpacity style={styles.ctrlBtn}>
              <Icon name="volume-high" size={22} color={Colors.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.ctrlBtn}>
              <Icon name="closed-caption-outline" size={22} color={Colors.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.ctrlBtn}>
              <Icon name="quality-high" size={22} color={Colors.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.ctrlBtn}>
              <Icon name="fullscreen" size={22} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* INFO DO VÍDEO */}
        <View style={styles.info}>
          <Text style={styles.subjectTag}>Matemática</Text>
          <Text style={styles.videoTitle}>Aula 33 — Algoritmo e Álgebra Linear</Text>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Icon name="eye-outline" size={14} color={Colors.textDisabled} />
              <Text style={styles.statText}>1.243 visualizações</Text>
            </View>
            <View style={styles.statItem}>
              <Icon name="clock-outline" size={14} color={Colors.textDisabled} />
              <Text style={styles.statText}>32 min</Text>
            </View>
          </View>

          {/* AÇÕES */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.actionBtn, liked && styles.actionBtnActive]}
              onPress={() => setLiked(v => !v)}
            >
              <Icon name={liked ? 'heart' : 'heart-outline'} size={18} color={liked ? Colors.error : Colors.textSecondary} />
              <Text style={[styles.actionText, liked && { color: Colors.error }]}>{liked ? '128' : '127'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionBtn, saved && styles.actionBtnActive]}
              onPress={() => setSaved(v => !v)}
            >
              <Icon name={saved ? 'bookmark' : 'bookmark-outline'} size={18} color={saved ? Colors.primary : Colors.textSecondary} />
              <Text style={[styles.actionText, saved && { color: Colors.primary }]}>{saved ? 'Salvo' : 'Salvar'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <Icon name="share-outline" size={18} color={Colors.textSecondary} />
              <Text style={styles.actionText}>Compartilhar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* PROFESSOR */}
        <View style={styles.teacherRow}>
          <Avatar.Image size={44} source={{ uri: 'https://i.pravatar.cc/150?img=11' }} />
          <View style={styles.teacherInfo}>
            <Text style={styles.teacherName}>Prof. Silva</Text>
            <Text style={styles.teacherSub}>Matemática · 48 aulas</Text>
          </View>
          <TouchableOpacity style={styles.followBtn}>
            <Text style={styles.followBtnText}>Seguir</Text>
          </TouchableOpacity>
        </View>

        {/* DESCRIÇÃO */}
        <View style={styles.descBox}>
          <Text style={styles.descTitle}>Sobre esta aula</Text>
          <Text style={styles.descText}>
            Nesta aula, o Prof. Silva apresenta os conceitos fundamentais de algoritmos e sua aplicação na álgebra linear. Ideal para quem está se preparando para o ENEM e vestibulares concorridos.
          </Text>
        </View>

        {/* PRÓXIMAS AULAS */}
        <View style={styles.relatedSection}>
          <Text style={styles.relatedTitle}>Próximas aulas</Text>
          {RELATED_VIDEOS.map(v => (
            <TouchableOpacity key={v.id} style={styles.relatedCard} activeOpacity={0.8}>
              <View style={styles.relatedThumb}>
                <Icon name="play-circle" size={32} color={Colors.primary} />
                <Text style={styles.relatedDuration}>{v.duration}</Text>
              </View>
              <View style={styles.relatedInfo}>
                <Text style={styles.relatedSubject}>{v.subject}</Text>
                <Text style={styles.relatedVideoTitle} numberOfLines={2}>{v.title}</Text>
                <Text style={styles.relatedTeacher}>{v.teacher}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  player: {
    height: 220,
    backgroundColor: '#0a1628',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerBg: { position: 'absolute', justifyContent: 'center', alignItems: 'center' },
  controls: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  topBar: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
  },
  playerTitle: { ...Typography.label, color: Colors.white },
  centerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xl,
  },
  playBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
  },
  timeText: { ...Typography.caption, color: Colors.white, minWidth: 36 },
  progressBarWrap: { flex: 1, height: 20, justifyContent: 'center' },
  progressBarBg: {
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    position: 'relative',
  },
  progressBarFill: { height: '100%', backgroundColor: Colors.primary, borderRadius: 2 },
  progressDot: {
    position: 'absolute',
    top: -5,
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: Colors.white,
    marginLeft: -6,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.sm,
    gap: Spacing.sm,
  },
  ctrlBtn: { padding: 4 },
  info: {
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  subjectTag: { ...Typography.caption, color: Colors.primary, fontWeight: '700', marginBottom: 4 },
  videoTitle: { ...Typography.h4, color: Colors.textPrimary, marginBottom: Spacing.sm },
  statsRow: { flexDirection: 'row', gap: Spacing.md, marginBottom: Spacing.md },
  statItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statText: { ...Typography.caption, color: Colors.textDisabled },
  actions: { flexDirection: 'row', gap: Spacing.sm },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.full,
    backgroundColor: Colors.surfaceVariant,
  },
  actionBtnActive: { backgroundColor: Colors.primaryLight },
  actionText: { ...Typography.caption, color: Colors.textSecondary, fontWeight: '500' },
  teacherRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    gap: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  teacherInfo: { flex: 1 },
  teacherName: { ...Typography.label, color: Colors.textPrimary },
  teacherSub: { ...Typography.caption, color: Colors.textSecondary },
  followBtn: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.full,
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  followBtnText: { ...Typography.label, color: Colors.primary },
  descBox: { padding: Spacing.md, borderBottomWidth: 1, borderBottomColor: Colors.divider },
  descTitle: { ...Typography.label, color: Colors.textPrimary, marginBottom: Spacing.xs },
  descText: { ...Typography.body2, color: Colors.textSecondary, lineHeight: 22 },
  relatedSection: { padding: Spacing.md, paddingBottom: Spacing.xxl },
  relatedTitle: { ...Typography.h4, color: Colors.textPrimary, marginBottom: Spacing.md },
  relatedCard: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  relatedThumb: {
    width: 100,
    height: 70,
    backgroundColor: Colors.primaryLight,
    borderRadius: Radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  relatedDuration: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: '700',
  },
  relatedInfo: { flex: 1 },
  relatedSubject: { ...Typography.caption, color: Colors.primary, fontWeight: '700' },
  relatedVideoTitle: { ...Typography.label, color: Colors.textPrimary, marginBottom: 2 },
  relatedTeacher: { ...Typography.caption, color: Colors.textSecondary },
});

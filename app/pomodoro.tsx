import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Spacing, Typography, Radius, Shadows } from '~/theme/theme';

type Mode = 'foco' | 'pausa_curta' | 'pausa_longa';

const MODES: { id: Mode; label: string; minutes: number; color: string }[] = [
  { id: 'foco', label: 'Foco', minutes: 25, color: Colors.primary },
  { id: 'pausa_curta', label: 'Pausa curta', minutes: 5, color: Colors.success },
  { id: 'pausa_longa', label: 'Pausa longa', minutes: 15, color: Colors.info },
];

const SUBJECTS = ['Matemática', 'Português', 'Física', 'Química', 'Biologia', 'História', 'Geografia', 'Inglês'];

const SESSION_HISTORY = [
  { subject: 'Matemática', pomodoros: 4, duration: '2h', date: 'Hoje' },
  { subject: 'Física', pomodoros: 2, duration: '1h', date: 'Hoje' },
  { subject: 'Português', pomodoros: 3, duration: '1h 30min', date: 'Ontem' },
  { subject: 'História', pomodoros: 2, duration: '1h', date: 'Ontem' },
];

function pad(n: number) {
  return n.toString().padStart(2, '0');
}

export default function PomodoroScreen() {
  const [mode, setMode] = useState<Mode>('foco');
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [selectedSubject, setSelectedSubject] = useState('Matemática');
  const [tab, setTab] = useState<'timer' | 'historico'>('timer');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const ringAnim = useRef(new Animated.Value(0)).current;

  const currentMode = MODES.find(m => m.id === mode)!;
  const totalSeconds = currentMode.minutes * 60;
  const progress = 1 - secondsLeft / totalSeconds;

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft(s => {
          if (s <= 1) {
            clearInterval(intervalRef.current!);
            setRunning(false);
            if (mode === 'foco') setCompletedPomodoros(p => p + 1);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running]);

  useEffect(() => {
    Animated.timing(ringAnim, {
      toValue: progress,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const switchMode = (m: Mode) => {
    setRunning(false);
    setMode(m);
    setSecondsLeft(MODES.find(x => x.id === m)!.minutes * 60);
  };

  const reset = () => {
    setRunning(false);
    setSecondsLeft(currentMode.minutes * 60);
  };

  const circumference = 2 * Math.PI * 110;
  const strokeDashoffset = ringAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, circumference],
  });

  return (
    <SafeAreaView style={s.container} edges={['bottom']}>

      {/* TABS */}
      <View style={s.tabRow}>
        {(['timer', 'historico'] as const).map(t => (
          <TouchableOpacity key={t} style={[s.tabBtn, tab === t && s.tabBtnActive]} onPress={() => setTab(t)}>
            <Text style={[s.tabBtnText, tab === t && s.tabBtnTextActive]}>
              {t === 'timer' ? 'Cronômetro' : 'Histórico'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {tab === 'timer' ? (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>

          {/* MODE SELECTOR */}
          <View style={s.modeRow}>
            {MODES.map(m => (
              <TouchableOpacity
                key={m.id}
                style={[s.modeBtn, mode === m.id && { backgroundColor: m.color, borderColor: m.color }]}
                onPress={() => switchMode(m.id)}
              >
                <Text style={[s.modeBtnText, mode === m.id && s.modeBtnTextActive]}>{m.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* DISCIPLINA */}
          <Text style={s.subjectLabel}>Estudando:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.subjectRow}>
            {SUBJECTS.map(sub => (
              <TouchableOpacity
                key={sub}
                style={[s.subjectChip, selectedSubject === sub && s.subjectChipActive]}
                onPress={() => setSelectedSubject(sub)}
              >
                <Text style={[s.subjectChipText, selectedSubject === sub && s.subjectChipTextActive]}>{sub}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* TIMER RING */}
          <View style={s.timerWrap}>
            <View style={[s.timerRingOuter, { borderColor: currentMode.color + '20' }]}>
              <View style={[s.timerRingInner, { borderColor: currentMode.color }]}>
                <Icon name={mode === 'foco' ? 'brain' : 'coffee'} size={26} color={currentMode.color} />
                <Text style={[s.timerTime, { color: currentMode.color }]}>
                  {pad(Math.floor(secondsLeft / 60))}:{pad(secondsLeft % 60)}
                </Text>
                <Text style={s.timerLabel}>{currentMode.label}</Text>
              </View>
            </View>

            {/* POMODOROS COUNT */}
            <View style={s.pomodoroRow}>
              {[0, 1, 2, 3].map(i => (
                <View key={i} style={[s.pomodoroCircle, i < completedPomodoros % 4 && { backgroundColor: currentMode.color }]} />
              ))}
            </View>
            <Text style={s.sessionText}>Sessão {Math.floor(completedPomodoros / 4) + 1} · {completedPomodoros} pomodoros hoje</Text>
          </View>

          {/* CONTROLS */}
          <View style={s.controls}>
            <TouchableOpacity style={s.controlBtnSm} onPress={reset}>
              <Icon name="restart" size={24} color={Colors.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[s.controlBtnMain, { backgroundColor: currentMode.color }]}
              onPress={() => setRunning(r => !r)}
              activeOpacity={0.85}
            >
              <Icon name={running ? 'pause' : 'play'} size={36} color={Colors.white} />
            </TouchableOpacity>
            <TouchableOpacity style={s.controlBtnSm} onPress={() => switchMode(mode === 'foco' ? 'pausa_curta' : 'foco')}>
              <Icon name="skip-next" size={24} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* DICA */}
          <View style={s.tipCard}>
            <Icon name="lightbulb-on-outline" size={18} color={Colors.warning} />
            <Text style={s.tipText}>
              {mode === 'foco'
                ? 'Foque apenas em ' + selectedSubject + '. Deixe o celular virado para baixo.'
                : 'Descanse! Levante, beba água e relaxe os olhos.'}
            </Text>
          </View>

        </ScrollView>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
          <View style={s.historyHeader}>
            <View style={s.historyStat}>
              <Text style={s.historyStatValue}>11</Text>
              <Text style={s.historyStatLabel}>pomodoros hoje</Text>
            </View>
            <View style={s.historyStatDivider} />
            <View style={s.historyStat}>
              <Text style={s.historyStatValue}>4h 35min</Text>
              <Text style={s.historyStatLabel}>tempo de foco</Text>
            </View>
            <View style={s.historyStatDivider} />
            <View style={s.historyStat}>
              <Text style={s.historyStatValue}>3</Text>
              <Text style={s.historyStatLabel}>matérias</Text>
            </View>
          </View>

          <Text style={s.sectionTitle}>Sessões recentes</Text>
          {SESSION_HISTORY.map((h, i) => (
            <View key={i} style={s.historyRow}>
              <View style={s.historyIconWrap}>
                <Icon name="brain" size={20} color={Colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.historySubject}>{h.subject}</Text>
                <Text style={s.historyMeta}>{h.date} · {h.duration}</Text>
              </View>
              <View style={s.historyPomodoroWrap}>
                {Array.from({ length: Math.min(h.pomodoros, 4) }).map((_, j) => (
                  <View key={j} style={[s.pomodoroCircle, { backgroundColor: Colors.primary }]} />
                ))}
                <Text style={s.historyPomodoroText}>{h.pomodoros}x</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surfaceVariant },
  scroll: { padding: Spacing.md, paddingBottom: Spacing.xl, gap: Spacing.md },

  tabRow: { flexDirection: 'row', backgroundColor: Colors.white, margin: Spacing.md, borderRadius: Radius.md, padding: 4, ...Shadows.sm },
  tabBtn: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: Radius.sm },
  tabBtnActive: { backgroundColor: Colors.primary },
  tabBtnText: { ...Typography.label, color: Colors.textSecondary },
  tabBtnTextActive: { color: Colors.white },

  modeRow: { flexDirection: 'row', gap: Spacing.sm },
  modeBtn: {
    flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: Radius.full,
    borderWidth: 1.5, borderColor: Colors.divider, backgroundColor: Colors.white,
  },
  modeBtnText: { ...Typography.caption, color: Colors.textSecondary, fontWeight: '600' },
  modeBtnTextActive: { color: Colors.white, fontWeight: '700' },

  subjectLabel: { ...Typography.caption, color: Colors.textSecondary, fontWeight: '600' },
  subjectRow: { gap: Spacing.sm, paddingVertical: 4 },
  subjectChip: { paddingHorizontal: Spacing.md, paddingVertical: 7, borderRadius: Radius.full, backgroundColor: Colors.white, borderWidth: 1.5, borderColor: Colors.divider },
  subjectChipActive: { backgroundColor: Colors.primaryLight, borderColor: Colors.primary },
  subjectChipText: { ...Typography.caption, color: Colors.textSecondary, fontWeight: '500' },
  subjectChipTextActive: { color: Colors.primary, fontWeight: '700' },

  timerWrap: { alignItems: 'center', gap: Spacing.md, paddingVertical: Spacing.md },
  timerRingOuter: { width: 270, height: 270, borderRadius: 135, borderWidth: 12, justifyContent: 'center', alignItems: 'center' },
  timerRingInner: { width: 228, height: 228, borderRadius: 114, borderWidth: 4, justifyContent: 'center', alignItems: 'center', gap: 4, backgroundColor: Colors.white, paddingHorizontal: 16 },
  timerTime: { fontSize: 46, fontWeight: '800', lineHeight: 52, letterSpacing: 2 },
  timerLabel: { ...Typography.caption, color: Colors.textSecondary, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1 },
  pomodoroRow: { flexDirection: 'row', gap: 8 },
  pomodoroCircle: { width: 14, height: 14, borderRadius: 7, backgroundColor: Colors.divider },
  sessionText: { ...Typography.caption, color: Colors.textSecondary },

  controls: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.xl },
  controlBtnSm: { width: 52, height: 52, borderRadius: 26, backgroundColor: Colors.white, justifyContent: 'center', alignItems: 'center', ...Shadows.sm },
  controlBtnMain: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', ...Shadows.md },

  tipCard: {
    flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm,
    backgroundColor: '#FFF8E1', borderRadius: Radius.md, padding: Spacing.md,
    borderLeftWidth: 3, borderLeftColor: Colors.warning,
  },
  tipText: { ...Typography.body2, color: Colors.textPrimary, flex: 1, lineHeight: 20 },

  historyHeader: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around',
    backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md, ...Shadows.sm,
  },
  historyStat: { alignItems: 'center', gap: 3 },
  historyStatValue: { ...Typography.h4, color: Colors.primary },
  historyStatLabel: { ...Typography.caption, color: Colors.textSecondary },
  historyStatDivider: { width: 1, height: 32, backgroundColor: Colors.divider },
  sectionTitle: { ...Typography.label, color: Colors.textSecondary, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5, marginTop: Spacing.sm },
  historyRow: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md, ...Shadows.sm,
  },
  historyIconWrap: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.primaryLight, justifyContent: 'center', alignItems: 'center' },
  historySubject: { ...Typography.label, color: Colors.textPrimary },
  historyMeta: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },
  historyPomodoroWrap: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  historyPomodoroText: { ...Typography.caption, color: Colors.primary, fontWeight: '700', marginLeft: 2 },
});

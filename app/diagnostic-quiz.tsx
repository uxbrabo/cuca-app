import React, { useState, useRef } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '~/navigation/types';
import { Colors, Spacing, Typography, Radius, Shadows } from '~/theme/theme';
import { useProfile } from '~/context/ProfileContext';
import type { StudyPlan } from '~/context/ProfileContext';

type Nav = NativeStackNavigationProp<RootStackParamList, 'DiagnosticQuiz'>;

type Option = { id: string; label: string; icon: string };

type Step = {
  id: string;
  question: string;
  subtitle?: string;
  multi: boolean;
  options: Option[];
};

const STEPS: Step[] = [
  {
    id: 'objetivo',
    question: 'Qual é o seu principal objetivo?',
    subtitle: 'Vamos personalizar sua jornada com base na sua meta.',
    multi: false,
    options: [
      { id: 'enem', label: 'Passar no ENEM', icon: 'school' },
      { id: 'vestibular', label: 'Vestibular específico', icon: 'trophy' },
      { id: 'recuperacao', label: 'Recuperar notas', icon: 'trending-up' },
      { id: 'geral', label: 'Aprendizagem geral', icon: 'book-open-variant' },
    ],
  },
  {
    id: 'disciplinas',
    question: 'Quais disciplinas precisam de mais atenção?',
    subtitle: 'Selecione quantas quiser.',
    multi: true,
    options: [
      { id: 'mat', label: 'Matemática', icon: 'calculator-variant' },
      { id: 'port', label: 'Português', icon: 'book-open-page-variant' },
      { id: 'fis', label: 'Física', icon: 'atom' },
      { id: 'quim', label: 'Química', icon: 'flask-outline' },
      { id: 'bio', label: 'Biologia', icon: 'leaf' },
      { id: 'hist', label: 'História', icon: 'bank' },
    ],
  },
  {
    id: 'tempo',
    question: 'Quanto tempo você estuda por dia?',
    subtitle: 'Seu plano será adaptado à sua rotina.',
    multi: false,
    options: [
      { id: '30min', label: 'Menos de 30 min', icon: 'timer-sand' },
      { id: '1h', label: '30 min a 1 hora', icon: 'clock-outline' },
      { id: '2h', label: '1 a 2 horas', icon: 'clock-time-four-outline' },
      { id: '3h', label: 'Mais de 2 horas', icon: 'fire' },
    ],
  },
  {
    id: 'nivel',
    question: 'Como você avalia seu nível atual?',
    subtitle: 'Sem julgamentos — só para calibrar o conteúdo.',
    multi: false,
    options: [
      { id: 'basico', label: 'Preciso retomar o básico', icon: 'sprout' },
      { id: 'medio', label: 'Conheço o essencial', icon: 'book-check' },
      { id: 'avancado', label: 'Estou bem, quero aprofundar', icon: 'rocket-launch' },
    ],
  },
];

const PLAN_SUBJECTS: Record<string, string> = {
  mat: 'Matemática', port: 'Português', fis: 'Física',
  quim: 'Química', bio: 'Biologia', hist: 'História',
};

// Dados de trilha por disciplina e nível
const TRAIL_DATA: Record<string, Record<string, { topic: string; nextTitle: string; nextType: 'video' | 'artigo' | 'quiz' | 'flashcard'; activities: number; color: string }>> = {
  'Matemática': {
    basico:    { topic: 'Equações do 1º Grau',     nextTitle: 'Vídeo · Equações lineares passo a passo', nextType: 'video',     activities: 8,  color: Colors.primary },
    medio:     { topic: 'Funções e Gráficos',       nextTitle: 'Quiz · Identificar tipos de função',       nextType: 'quiz',      activities: 10, color: Colors.primary },
    avancado:  { topic: 'Geometria Analítica',      nextTitle: 'Artigo · Cônicas e suas propriedades',     nextType: 'artigo',    activities: 12, color: Colors.primary },
  },
  'Português': {
    basico:    { topic: 'Interpretação de Texto',   nextTitle: 'Artigo · Estratégias de leitura rápida',   nextType: 'artigo',    activities: 7,  color: '#E91E63' },
    medio:     { topic: 'Gramática e Sintaxe',      nextTitle: 'Flashcard · Regência verbal e nominal',    nextType: 'flashcard', activities: 9,  color: '#E91E63' },
    avancado:  { topic: 'Literatura Brasileira',    nextTitle: 'Vídeo · Modernismo — 1ª fase',             nextType: 'video',     activities: 11, color: '#E91E63' },
  },
  'Física': {
    basico:    { topic: 'Cinemática',               nextTitle: 'Vídeo · MRU e MRUV com exemplos',          nextType: 'video',     activities: 8,  color: '#7B1FA2' },
    medio:     { topic: 'Dinâmica e Leis de Newton',nextTitle: 'Quiz · Aplicações das leis de Newton',      nextType: 'quiz',      activities: 10, color: '#7B1FA2' },
    avancado:  { topic: 'Eletromagnetismo',         nextTitle: 'Artigo · Indução eletromagnética de Faraday', nextType: 'artigo', activities: 12, color: '#7B1FA2' },
  },
  'Química': {
    basico:    { topic: 'Tabela Periódica',         nextTitle: 'Vídeo · Como ler a tabela periódica',      nextType: 'video',     activities: 7,  color: Colors.error },
    medio:     { topic: 'Reações Químicas',         nextTitle: 'Quiz · Balancear equações químicas',       nextType: 'quiz',      activities: 9,  color: Colors.error },
    avancado:  { topic: 'Eletroquímica',            nextTitle: 'Flashcard · Potenciais de redução',        nextType: 'flashcard', activities: 11, color: Colors.error },
  },
  'Biologia': {
    basico:    { topic: 'Citologia',                nextTitle: 'Vídeo · Estrutura e função das células',   nextType: 'video',     activities: 8,  color: Colors.success },
    medio:     { topic: 'Genética Mendeliana',      nextTitle: 'Artigo · Cruzamentos monibíbridos',        nextType: 'artigo',    activities: 10, color: Colors.success },
    avancado:  { topic: 'Evolução e Ecologia',      nextTitle: 'Quiz · Seleção natural e especiação',      nextType: 'quiz',      activities: 12, color: Colors.success },
  },
  'História': {
    basico:    { topic: 'Brasil Colônia',           nextTitle: 'Vídeo · Período colonial — linha do tempo', nextType: 'video',    activities: 7,  color: Colors.warning },
    medio:     { topic: 'República Velha',          nextTitle: 'Artigo · Coronelismo e política do café',  nextType: 'artigo',    activities: 9,  color: Colors.warning },
    avancado:  { topic: 'Brasil Contemporâneo',     nextTitle: 'Flashcard · Presidentes e marcos históricos', nextType: 'flashcard', activities: 11, color: Colors.warning },
  },
};

const DEFAULT_SUBJECT = 'Matemática';
const DEFAULT_NIVEL = 'medio';

export default function DiagnosticQuizScreen() {
  const navigation = useNavigation<Nav>();
  const { setStudyPlan } = useProfile();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [done, setDone] = useState(false);
  const progressAnim = useRef(new Animated.Value(0)).current;

  const currentStep = STEPS[step];
  const selected = answers[currentStep?.id] ?? [];
  const totalSteps = STEPS.length;

  const animateProgress = (to: number) => {
    Animated.timing(progressAnim, {
      toValue: to,
      duration: 350,
      useNativeDriver: false,
    }).start();
  };

  const toggleOption = (optId: string) => {
    const key = currentStep.id;
    if (currentStep.multi) {
      setAnswers(prev => {
        const cur = prev[key] ?? [];
        return {
          ...prev,
          [key]: cur.includes(optId) ? cur.filter(x => x !== optId) : [...cur, optId],
        };
      });
    } else {
      setAnswers(prev => ({ ...prev, [key]: [optId] }));
    }
  };

  const handleNext = () => {
    if (step < totalSteps - 1) {
      const next = step + 1;
      setStep(next);
      animateProgress(next / totalSteps);
    } else {
      animateProgress(1);
      setDone(true);
    }
  };

  const canAdvance = selected.length > 0;

  const chosenSubjects = (answers['disciplinas'] ?? []).map(id => PLAN_SUBJECTS[id]).filter(Boolean);
  const objetivo = answers['objetivo']?.[0];
  const tempo = answers['tempo']?.[0];

  const planTitle = objetivo === 'enem'
    ? 'Plano ENEM Intensivo'
    : objetivo === 'vestibular'
    ? 'Plano Vestibular Focado'
    : objetivo === 'recuperacao'
    ? 'Plano de Recuperação Acelerada'
    : 'Plano de Aprendizagem Geral';

  const dailyGoal = tempo === '30min' ? '2' : tempo === '1h' ? '3–4' : tempo === '2h' ? '5–6' : '7+';

  if (done) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.resultScroll} showsVerticalScrollIndicator={false}>
          <View style={styles.resultHeader}>
            <View style={styles.checkCircle}>
              <Icon name="check-bold" size={36} color={Colors.white} />
            </View>
            <Text style={styles.resultTitle}>Plano criado pela IA!</Text>
            <Text style={styles.resultSub}>Com base nas suas respostas, montamos um plano de estudos personalizado.</Text>
          </View>

          <View style={styles.planCard}>
            <View style={styles.planCardHeader}>
              <Icon name="robot-excited-outline" size={22} color={Colors.primary} />
              <Text style={styles.planCardTitle}>{planTitle}</Text>
            </View>

            <View style={styles.planRow}>
              <Icon name="star-shooting-outline" size={18} color={Colors.warning} />
              <Text style={styles.planRowText}>Meta diária: <Text style={styles.planRowBold}>{dailyGoal} atividades</Text></Text>
            </View>

            {chosenSubjects.length > 0 && (
              <View style={styles.planRow}>
                <Icon name="target" size={18} color={Colors.error} />
                <Text style={styles.planRowText}>Foco principal: <Text style={styles.planRowBold}>{chosenSubjects.slice(0, 3).join(', ')}</Text></Text>
              </View>
            )}

            <View style={styles.planRow}>
              <Icon name="chart-timeline-variant" size={18} color={Colors.success} />
              <Text style={styles.planRowText}>Trilhas geradas: <Text style={styles.planRowBold}>{Math.max(chosenSubjects.length, 2)} trilhas personalizadas</Text></Text>
            </View>

            <View style={styles.planRow}>
              <Icon name="brain" size={18} color={Colors.info} />
              <Text style={styles.planRowText}>Tutor Virtual ativado com seu perfil</Text>
            </View>
          </View>

          <View style={styles.subjectsRow}>
            {(chosenSubjects.length > 0 ? chosenSubjects : ['Matemática', 'Português']).map((s, i) => (
              <View key={i} style={styles.subjectChip}>
                <Text style={styles.subjectChipText}>{s}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={styles.startBtn}
            onPress={() => {
              const nivel = (answers['nivel']?.[0] ?? DEFAULT_NIVEL) as 'basico' | 'medio' | 'avancado';
              const primarySubject = chosenSubjects[0] ?? DEFAULT_SUBJECT;
              const trailData = TRAIL_DATA[primarySubject]?.[nivel] ?? TRAIL_DATA[DEFAULT_SUBJECT][DEFAULT_NIVEL];
              const plan: StudyPlan = {
                planTitle,
                objetivo: objetivo ?? 'geral',
                subjects: chosenSubjects.length > 0 ? chosenSubjects : [DEFAULT_SUBJECT],
                dailyGoal,
                nivel,
                firstTrail: {
                  subject: primarySubject,
                  topic: trailData.topic,
                  totalActivities: trailData.activities,
                  completedActivities: 0,
                  nextActivityType: trailData.nextType,
                  nextActivityTitle: trailData.nextTitle,
                  xp: trailData.activities * 50,
                  color: trailData.color,
                },
              };
              setStudyPlan(plan);
              navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });
            }}
          >
            <Text style={styles.startBtnText}>Começar a estudar</Text>
            <Icon name="arrow-right" size={20} color={Colors.white} />
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* PROGRESS */}
      <View style={styles.progressWrap}>
        <View style={styles.progressTrack}>
          <Animated.View
            style={[styles.progressFill, {
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            }]}
          />
        </View>
        <Text style={styles.progressLabel}>{step + 1} de {totalSteps}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* QUESTION */}
        <View style={styles.questionBlock}>
          <View style={styles.aiTag}>
            <Icon name="robot-outline" size={13} color={Colors.primary} />
            <Text style={styles.aiTagText}>Diagnóstico CUCA</Text>
          </View>
          <Text style={styles.question}>{currentStep.question}</Text>
          {currentStep.subtitle && (
            <Text style={styles.questionSub}>{currentStep.subtitle}</Text>
          )}
        </View>

        {/* OPTIONS */}
        <View style={styles.optionsGrid}>
          {currentStep.options.map(opt => {
            const isSelected = selected.includes(opt.id);
            return (
              <TouchableOpacity
                key={opt.id}
                style={[styles.optionCard, isSelected && styles.optionCardSelected]}
                activeOpacity={0.8}
                onPress={() => toggleOption(opt.id)}
              >
                <View style={[styles.optionIcon, isSelected && styles.optionIconSelected]}>
                  <Icon name={opt.icon} size={26} color={isSelected ? Colors.white : Colors.primary} />
                </View>
                <Text style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}>
                  {opt.label}
                </Text>
                {isSelected && (
                  <View style={styles.checkMark}>
                    <Icon name="check" size={12} color={Colors.white} />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* NEXT */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.nextBtn, !canAdvance && styles.nextBtnDisabled]}
          onPress={handleNext}
          disabled={!canAdvance}
        >
          <Text style={styles.nextBtnText}>
            {step < totalSteps - 1 ? 'Próximo' : 'Ver meu plano'}
          </Text>
          <Icon name={step < totalSteps - 1 ? 'arrow-right' : 'check'} size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },

  progressWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
  },
  progressTrack: {
    flex: 1,
    height: 6,
    backgroundColor: Colors.surfaceVariant,
    borderRadius: Radius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: Radius.full,
  },
  progressLabel: { ...Typography.caption, color: Colors.textSecondary, fontWeight: '600', minWidth: 40 },

  scroll: { padding: Spacing.lg, paddingBottom: Spacing.xl },

  questionBlock: { marginBottom: Spacing.lg },
  aiTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.primaryLight,
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radius.full,
    marginBottom: Spacing.md,
  },
  aiTagText: { ...Typography.caption, color: Colors.primary, fontWeight: '700' },
  question: { ...Typography.h2, color: Colors.textPrimary, marginBottom: Spacing.xs },
  questionSub: { ...Typography.body1, color: Colors.textSecondary },

  optionsGrid: { gap: Spacing.sm },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.surfaceVariant,
    borderRadius: Radius.md,
    padding: Spacing.md,
    borderWidth: 1.5,
    borderColor: 'transparent',
    position: 'relative',
  },
  optionCardSelected: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primary,
  },
  optionIcon: {
    width: 48,
    height: 48,
    borderRadius: Radius.sm,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionIconSelected: {
    backgroundColor: Colors.primary,
  },
  optionLabel: { ...Typography.body1, color: Colors.textPrimary, flex: 1 },
  optionLabelSelected: { color: Colors.primary, fontWeight: '600' },
  checkMark: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  footer: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xl,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
    backgroundColor: Colors.white,
  },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    paddingVertical: Spacing.md,
  },
  nextBtnDisabled: { backgroundColor: Colors.divider },
  nextBtnText: { ...Typography.label, color: Colors.white, fontSize: 16 },

  // Result
  resultScroll: { padding: Spacing.lg, paddingBottom: Spacing.xl, alignItems: 'center', gap: Spacing.md },
  resultHeader: { alignItems: 'center', gap: Spacing.md, marginTop: Spacing.xl },
  checkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultTitle: { ...Typography.h2, color: Colors.textPrimary, textAlign: 'center' },
  resultSub: { ...Typography.body1, color: Colors.textSecondary, textAlign: 'center', lineHeight: 24 },
  planCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    width: '100%',
    gap: Spacing.md,
    borderWidth: 1.5,
    borderColor: Colors.primaryLight,
    ...Shadows.md,
  },
  planCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  planCardTitle: { ...Typography.h4, color: Colors.primary },
  planRow: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm },
  planRowText: { ...Typography.body2, color: Colors.textPrimary, flex: 1, lineHeight: 20 },
  planRowBold: { fontWeight: '700', color: Colors.textPrimary },
  subjectsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.xs, justifyContent: 'center' },
  subjectChip: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.full,
  },
  subjectChipText: { ...Typography.label, color: Colors.primary },
  startBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    width: '100%',
    marginTop: Spacing.sm,
  },
  startBtnText: { ...Typography.label, color: Colors.white, fontSize: 16 },
});

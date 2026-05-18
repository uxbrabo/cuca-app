import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Spacing, Typography, Radius, Shadows } from '~/theme/theme';

type Subject = {
  id: string;
  name: string;
  icon: string;
  color: string;
  bg: string;
  progress: number;
  topics: number;
  completedTopics: number;
  grade: number | null;
  teacher: string;
};

const SUBJECTS: Subject[] = [
  { id: '1', name: 'Matemática', icon: 'calculator-variant', color: Colors.primary, bg: Colors.primaryLight, progress: 72, topics: 18, completedTopics: 13, grade: 8.5, teacher: 'Prof. Silva' },
  { id: '2', name: 'Português', icon: 'book-open-variant', color: '#7B1FA2', bg: '#F3E5F5', progress: 58, topics: 15, completedTopics: 9, grade: 7.2, teacher: 'Profa. Lima' },
  { id: '3', name: 'História', icon: 'bank', color: '#E65100', bg: '#FFF3E0', progress: 45, topics: 20, completedTopics: 9, grade: 6.5, teacher: 'Prof. Carlos' },
  { id: '4', name: 'Geografia', icon: 'earth', color: Colors.success, bg: Colors.successLight, progress: 63, topics: 16, completedTopics: 10, grade: 7.8, teacher: 'Profa. Ana' },
  { id: '5', name: 'Física', icon: 'atom', color: Colors.info, bg: Colors.infoLight, progress: 80, topics: 14, completedTopics: 11, grade: 9.0, teacher: 'Prof. Marcos' },
  { id: '6', name: 'Química', icon: 'flask-outline', color: '#AD1457', bg: '#FCE4EC', progress: 38, topics: 17, completedTopics: 6, grade: 6.0, teacher: 'Profa. Renata' },
  { id: '7', name: 'Biologia', icon: 'dna', color: '#2E7D32', bg: '#E8F5E9', progress: 55, topics: 19, completedTopics: 10, grade: 7.5, teacher: 'Prof. Eduardo' },
  { id: '8', name: 'Redação', icon: 'pencil-outline', color: Colors.warning, bg: Colors.warningLight, progress: 90, topics: 10, completedTopics: 9, grade: 8.8, teacher: 'Profa. Marta' },
];

function ProgressBar({ value, color }: { value: number; color: string }) {
  return (
    <View style={styles.progressBar}>
      <View style={[styles.progressFill, { width: `${value}%` as any, backgroundColor: color }]} />
    </View>
  );
}

function SubjectCard({ item }: { item: Subject }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => setExpanded(v => !v)}
      activeOpacity={0.85}
    >
      <View style={styles.cardTop}>
        <View style={[styles.iconWrap, { backgroundColor: item.bg }]}>
          <Icon name={item.icon} size={24} color={item.color} />
        </View>
        <View style={styles.cardMain}>
          <View style={styles.cardHeader}>
            <Text style={styles.subjectName}>{item.name}</Text>
            {item.grade !== null && (
              <View style={[styles.gradePill, { backgroundColor: item.grade >= 7 ? Colors.successLight : Colors.errorLight }]}>
                <Text style={[styles.gradeText, { color: item.grade >= 7 ? Colors.success : Colors.error }]}>
                  {item.grade.toFixed(1)}
                </Text>
              </View>
            )}
          </View>
          <Text style={styles.teacherText}>{item.teacher}</Text>
          <View style={styles.progressRow}>
            <ProgressBar value={item.progress} color={item.color} />
            <Text style={[styles.progressPct, { color: item.color }]}>{item.progress}%</Text>
          </View>
        </View>
        <Icon
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={Colors.textDisabled}
          style={styles.chevron}
        />
      </View>

      {expanded && (
        <View style={styles.expanded}>
          <View style={styles.expandedRow}>
            <View style={styles.expandedStat}>
              <Icon name="book-check-outline" size={18} color={Colors.success} />
              <Text style={styles.expandedStatValue}>{item.completedTopics}</Text>
              <Text style={styles.expandedStatLabel}>Tópicos concluídos</Text>
            </View>
            <View style={styles.expandedStat}>
              <Icon name="book-clock-outline" size={18} color={Colors.warning} />
              <Text style={styles.expandedStatValue}>{item.topics - item.completedTopics}</Text>
              <Text style={styles.expandedStatLabel}>Pendentes</Text>
            </View>
            <View style={styles.expandedStat}>
              <Icon name="format-list-numbered" size={18} color={Colors.info} />
              <Text style={styles.expandedStatValue}>{item.topics}</Text>
              <Text style={styles.expandedStatLabel}>Total de tópicos</Text>
            </View>
          </View>
          <TouchableOpacity style={[styles.studyBtn, { backgroundColor: item.color }]}>
            <Icon name="play-circle-outline" size={18} color={Colors.white} />
            <Text style={styles.studyBtnText}>Continuar Estudando</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
}

export default function SubjectsScreen() {
  const avgGrade = (SUBJECTS.reduce((sum, s) => sum + (s.grade ?? 0), 0) / SUBJECTS.length).toFixed(1);
  const avgProgress = Math.round(SUBJECTS.reduce((sum, s) => sum + s.progress, 0) / SUBJECTS.length);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.summary}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>{SUBJECTS.length}</Text>
            <Text style={styles.summaryLabel}>Disciplinas</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>{avgGrade}</Text>
            <Text style={styles.summaryLabel}>Média geral</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>{avgProgress}%</Text>
            <Text style={styles.summaryLabel}>Progresso</Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>Todas as disciplinas</Text>
        {SUBJECTS.map(item => <SubjectCard key={item.id} item={item} />)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surfaceVariant },
  scroll: { paddingBottom: Spacing.xl },
  summary: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    paddingVertical: Spacing.md,
  },
  summaryItem: { flex: 1, alignItems: 'center' },
  summaryValue: { ...Typography.h3, color: Colors.primary },
  summaryLabel: { ...Typography.caption, color: Colors.textSecondary },
  summaryDivider: { width: 1, backgroundColor: Colors.divider },
  sectionLabel: {
    ...Typography.overline,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  card: {
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
    borderRadius: Radius.md,
    padding: Spacing.md,
    ...Shadows.sm,
  },
  cardTop: { flexDirection: 'row', alignItems: 'center' },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: Radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
    flexShrink: 0,
  },
  cardMain: { flex: 1 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 },
  subjectName: { ...Typography.label, color: Colors.textPrimary },
  gradePill: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Radius.full,
  },
  gradeText: { fontSize: 12, fontWeight: '700' },
  teacherText: { ...Typography.caption, color: Colors.textSecondary, marginBottom: Spacing.xs },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: Colors.surfaceVariant,
    borderRadius: Radius.full,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', borderRadius: Radius.full },
  progressPct: { ...Typography.caption, fontWeight: '600', minWidth: 32 },
  chevron: { marginLeft: Spacing.xs },
  expanded: {
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },
  expandedRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: Spacing.md },
  expandedStat: { alignItems: 'center', gap: 4 },
  expandedStatValue: { ...Typography.h4, color: Colors.textPrimary },
  expandedStatLabel: { ...Typography.caption, color: Colors.textSecondary, textAlign: 'center' },
  studyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    borderRadius: Radius.md,
    paddingVertical: Spacing.sm,
  },
  studyBtnText: { ...Typography.label, color: Colors.white },
});

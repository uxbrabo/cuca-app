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

type StudyGroup = {
  id: string;
  name: string;
  subject: string;
  subjectColor: string;
  members: number;
  maxMembers: number;
  avatars: string[];
  nextSession: string;
  joined: boolean;
  description: string;
};

const GROUPS: StudyGroup[] = [
  {
    id: '1', name: 'Turma ENEM 2025', subject: 'Geral', subjectColor: Colors.primary,
    members: 24, maxMembers: 30, avatars: ['https://i.pravatar.cc/150?img=1', 'https://i.pravatar.cc/150?img=2', 'https://i.pravatar.cc/150?img=3'],
    nextSession: 'Hoje, 19h00', joined: true,
    description: 'Grupo focado na preparação para o ENEM 2025. Resolvemos questões juntos e compartilhamos materiais.',
  },
  {
    id: '2', name: 'Matemática Avançada', subject: 'Matemática', subjectColor: Colors.info,
    members: 8, maxMembers: 15, avatars: ['https://i.pravatar.cc/150?img=4', 'https://i.pravatar.cc/150?img=5'],
    nextSession: 'Amanhã, 16h00', joined: true,
    description: 'Aprofundamento em álgebra, geometria analítica e trigonometria para vestibulares concorridos.',
  },
  {
    id: '3', name: 'Redação Nota 1000', subject: 'Português', subjectColor: '#7B1FA2',
    members: 12, maxMembers: 20, avatars: ['https://i.pravatar.cc/150?img=6', 'https://i.pravatar.cc/150?img=7', 'https://i.pravatar.cc/150?img=8'],
    nextSession: 'Qui, 20h00', joined: false,
    description: 'Prática de redação com correção colaborativa. Foco em argumentação, coesão e competências ENEM.',
  },
  {
    id: '4', name: 'Física e Química', subject: 'Ciências', subjectColor: Colors.success,
    members: 5, maxMembers: 12, avatars: ['https://i.pravatar.cc/150?img=9', 'https://i.pravatar.cc/150?img=10'],
    nextSession: 'Sex, 18h30', joined: false,
    description: 'Resolução de exercícios de física e química com foco em questões de vestibulares estaduais.',
  },
];

function GroupCard({ item }: { item: StudyGroup }) {
  const [joined, setJoined] = useState(item.joined);
  const isFull = item.members >= item.maxMembers;

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85}>
      <View style={styles.cardHeader}>
        <View style={[styles.subjectBadge, { backgroundColor: item.subjectColor + '22' }]}>
          <Text style={[styles.subjectBadgeText, { color: item.subjectColor }]}>{item.subject}</Text>
        </View>
        {joined && (
          <View style={styles.joinedPill}>
            <Icon name="check-circle" size={12} color={Colors.success} />
            <Text style={styles.joinedText}>Membro</Text>
          </View>
        )}
      </View>

      <Text style={styles.groupName}>{item.name}</Text>
      <Text style={styles.groupDesc} numberOfLines={2}>{item.description}</Text>

      <View style={styles.sessionRow}>
        <Icon name="calendar-clock" size={14} color={Colors.textDisabled} />
        <Text style={styles.sessionText}>Próxima sessão: <Text style={styles.sessionTime}>{item.nextSession}</Text></Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.avatarStack}>
          {item.avatars.slice(0, 3).map((url, i) => (
            <Avatar.Image
              key={i}
              size={28}
              source={{ uri: url }}
              style={[styles.stackedAvatar, { marginLeft: i === 0 ? 0 : -10, zIndex: 3 - i }]}
            />
          ))}
          <Text style={styles.membersCount}>
            {item.members}/{item.maxMembers} membros
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.joinBtn,
            joined ? styles.joinBtnLeave : isFull ? styles.joinBtnFull : styles.joinBtnJoin,
          ]}
          onPress={() => {
            if (isFull && !joined) {
              Alert.alert('Grupo cheio', 'Este grupo atingiu o limite de membros.');
              return;
            }
            setJoined(v => !v);
          }}
          disabled={isFull && !joined}
        >
          <Text style={[styles.joinBtnText, joined && styles.joinBtnTextLeave]}>
            {joined ? 'Sair' : isFull ? 'Lotado' : 'Participar'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

export default function CollaborativeStudyScreen() {
  const myGroups = GROUPS.filter(g => g.joined);
  const discover = GROUPS.filter(g => !g.joined);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.banner}>
          <Icon name="account-group" size={32} color={Colors.primary} />
          <View style={styles.bannerText}>
            <Text style={styles.bannerTitle}>Estudo em grupo</Text>
            <Text style={styles.bannerSub}>Aprenda mais colaborando com colegas</Text>
          </View>
          <TouchableOpacity
            style={styles.createBtn}
            onPress={() => Alert.alert('Criar grupo', 'Funcionalidade em breve!')}
          >
            <Icon name="plus" size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>

        {myGroups.length > 0 && (
          <>
            <Text style={styles.sectionLabel}>Meus grupos ({myGroups.length})</Text>
            {myGroups.map(g => <GroupCard key={g.id} item={g} />)}
          </>
        )}

        {discover.length > 0 && (
          <>
            <Text style={styles.sectionLabel}>Descobrir grupos</Text>
            {discover.map(g => <GroupCard key={g.id} item={g} />)}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surfaceVariant },
  scroll: { padding: Spacing.md, paddingBottom: Spacing.xl, gap: Spacing.sm },
  banner: {
    backgroundColor: Colors.primaryLight,
    borderRadius: Radius.md,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  bannerText: { flex: 1 },
  bannerTitle: { ...Typography.h4, color: Colors.textPrimary },
  bannerSub: { ...Typography.body2, color: Colors.textSecondary },
  createBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionLabel: {
    ...Typography.overline,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    marginTop: Spacing.sm,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    padding: Spacing.md,
    gap: Spacing.sm,
    ...Shadows.sm,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  subjectBadge: { paddingHorizontal: Spacing.sm, paddingVertical: 4, borderRadius: Radius.full },
  subjectBadgeText: { ...Typography.caption, fontWeight: '700' },
  joinedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.successLight,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Radius.full,
  },
  joinedText: { ...Typography.caption, color: Colors.success, fontWeight: '600' },
  groupName: { ...Typography.h4, color: Colors.textPrimary },
  groupDesc: { ...Typography.body2, color: Colors.textSecondary },
  sessionRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  sessionText: { ...Typography.caption, color: Colors.textSecondary },
  sessionTime: { fontWeight: '600', color: Colors.primary },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 },
  avatarStack: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  stackedAvatar: { borderWidth: 2, borderColor: Colors.white },
  membersCount: { ...Typography.caption, color: Colors.textSecondary },
  joinBtn: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs + 2, borderRadius: Radius.full },
  joinBtnJoin: { backgroundColor: Colors.primary },
  joinBtnLeave: { backgroundColor: Colors.surfaceVariant, borderWidth: 1, borderColor: Colors.divider },
  joinBtnFull: { backgroundColor: Colors.divider },
  joinBtnText: { ...Typography.label, color: Colors.white },
  joinBtnTextLeave: { color: Colors.textSecondary },
});
